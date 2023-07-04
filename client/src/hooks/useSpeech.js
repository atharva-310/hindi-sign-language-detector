import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { toastOption } from '../utils';

const useSpeech = () => {
  const [isAudioSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Check if the Speech Synthesis API is supported in the browser
    if ('speechSynthesis' in window) {
      setIsSupported(true);

      // Get the available voices
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      setVoices(voices);
    } else {
      setIsSupported(false);
    }
  }, []);

  // function to read the given text default voice will be HINDI
  const speak = (text, voice) => {
    if (!isAudioSupported) {
      toast({
        ...toastOption,
        title: 'Audio Feedback is not supported !',
        description: 'We suggest using Chrome to use this feature.',
        status: 'warning',
      });
      console.log(
        'Speech Synthesis API is not supported in this browser. We suggest using Chrome to use this feature.  '
      );
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    if (voice) {
      const selectedVoice = voices.find(v => v.name === voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    synth.speak(utterance);
    setSpeaking(true);

    utterance.onend = () => {
      setSpeaking(false);
      stopSpeaking();
    };
  };

  const stopSpeaking = () => {
    if (isAudioSupported && speaking) {
      const synth = window.speechSynthesis;
      synth.cancel();
      setSpeaking(false);
    }
  };

  return { isAudioSupported, speak };
};

export default useSpeech;
