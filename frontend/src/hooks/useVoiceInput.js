import { useState, useCallback, useEffect, useRef } from 'react';

const MAX_NETWORK_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

export const useVoiceInput = (onResult) => {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [error, setError] = useState(null);
    const onResultRef = useRef(onResult);
    const isListeningRef = useRef(false);
    const networkRetryCount = useRef(0);

    useEffect(() => {
        onResultRef.current = onResult;
    }, [onResult]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = true;
            rec.lang = 'en-US';

            rec.onresult = (event) => {
                // Reset retry counter on any successful result
                networkRetryCount.current = 0;

                let finalTranscript = '';
                let interimTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                
                console.log(`🎤 [Voice Input] Interim: "${interimTranscript}", Final: "${finalTranscript}"`);
                
                // If we get a final transcript, we stop and emit
                if (finalTranscript) {
                    const text = finalTranscript.trim();
                    if (text && onResultRef.current) {
                        onResultRef.current(text);
                    }
                    
                    // Automatically stop listening after one command
                    isListeningRef.current = false;
                    setIsListening(false);
                    try { rec.stop(); } catch(e) {}
                }
            };

            rec.onaudiostart = () => console.log('🎤 [Voice Input] 🟢 Audio hardware engaged (Microphone active).');
            rec.onsoundstart = () => console.log('🎤 [Voice Input] 🔊 Sound detected (noise or voice).');
            rec.onspeechstart = () => console.log('🎤 [Voice Input] 🗣️ Speech recognized! Listening to words...');
            rec.onspeechend = () => console.log('🎤 [Voice Input] 🤐 Speech stopped.');

            rec.onerror = (event) => {
                if (event.error === 'no-speech') {
                    console.log('🎤 [Voice Input] No speech detected. Waiting...');
                    return;
                }

                if (event.error === 'aborted') {
                    return;
                }
                
                let errorMessage = null;
                switch(event.error) {
                    case 'network':
                        // Auto-retry for transient network failures
                        if (networkRetryCount.current < MAX_NETWORK_RETRIES && isListeningRef.current) {
                            networkRetryCount.current++;
                            console.warn(`🎤 [Voice Input] Network error, retrying (${networkRetryCount.current}/${MAX_NETWORK_RETRIES})...`);
                            setTimeout(() => {
                                if (isListeningRef.current) {
                                    try { rec.start(); } catch(e) {
                                        // If start fails, surface error
                                        networkRetryCount.current = 0;
                                        isListeningRef.current = false;
                                        setIsListening(false);
                                        setError('Voice service unavailable. Check your internet connection.');
                                        setTimeout(() => setError(null), 6000);
                                    }
                                }
                            }, RETRY_DELAY_MS);
                            return; // Don't show error yet, retrying
                        }
                        // All retries exhausted
                        networkRetryCount.current = 0;
                        errorMessage = 'Voice service unavailable — Speech Recognition requires an internet connection and HTTPS (or localhost). Check your network and try again.';
                        isListeningRef.current = false;
                        setIsListening(false);
                        break;
                    case 'not-allowed':
                    case 'service-not-allowed':
                        errorMessage = 'Microphone access denied. Please allow microphone permissions.';
                        isListeningRef.current = false;
                        setIsListening(false);
                        break;
                    case 'audio-capture':
                        errorMessage = 'No microphone found. Please check your hardware.';
                        isListeningRef.current = false;
                        setIsListening(false);
                        break;
                    default:
                        console.warn('🎤 [Voice Input] Unexpected error:', event.error);
                        errorMessage = `Voice input error: ${event.error}`;
                }
                
                if (errorMessage) {
                    setError(errorMessage);
                    setTimeout(() => setError(null), 6000);
                }
            };

            rec.onend = () => {
                console.log('🎤 [Voice Input] Listening ended (Microphone turned off).');
                // Ensure state matches — but only if we're not mid-retry
                if (isListeningRef.current && networkRetryCount.current === 0) {
                   isListeningRef.current = false;
                   setIsListening(false);
                }
            };

            setRecognition(rec);
        }
    }, []);

    const toggleListening = useCallback(() => {
        setError(null);
        networkRetryCount.current = 0;

        if (!recognition) {
            setError('Speech recognition not supported in this browser. Try Chrome or Edge.');
            setTimeout(() => setError(null), 5000);
            return;
        }

        if (isListeningRef.current) {
            isListeningRef.current = false;
            recognition.stop();
            setIsListening(false);
        } else {
            try {
                console.log('🎤 [Voice Input] Starting to listen...');
                isListeningRef.current = true;
                recognition.start();
                setIsListening(true);
            } catch (err) {
                console.error('Failed to start recognition:', err);
                isListeningRef.current = false;
                setIsListening(false);
                setError('Could not start voice input. Please try again.');
                setTimeout(() => setError(null), 5000);
            }
        }
    }, [recognition]);

    return { isListening, toggleListening, isSupported: !!recognition, error };
};
