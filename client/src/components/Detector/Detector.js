import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

import { drawFaceRectangles } from '../../utils/index';

const IMAGE_INTERVAL_MS = 1000;

const Detector = ({ detectorOptions, isAudioSupported, speak }) => {
  const { setPastPredictions, setPrediction, wantAudio, detectorWindowRef } =
    detectorOptions;

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  // const cameraSelectRef = useRef(null);

  useEffect(() => {
    let track = null;
    let intervalId = null;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    // const cameraSelect = cameraSelectRef.current;

    // Function will initailly set up the devices
    const setupVideoStream = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          device => device.kind === 'videoinput'
        );

        /**
         *  If User is given the option to select 
      
          videoDevices.forEach(device => {
            const deviceOption = document.createElement('option');
            deviceOption.innerText = device.label;
            cameraSelect.appendChild(deviceOption);
            deviceOption.value = device.deviceId;
          });

         */

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            // deviceId: cameraSelect.value,
            deviceId: videoDevices[0].deviceId,
          },
        });

        video.srcObject = stream;
        await video.play();

        canvas.width = detectorWindowRef.current.clientWidth * 0.9;
        canvas.height = detectorWindowRef.current.clientHeight * 0.9;

        intervalId = setInterval(() => {
          // virtual canvas will be used to take a snap and send throught socket

          const virtualCanvas = document.createElement('canvas');
          const ctx = virtualCanvas.getContext('2d');
          virtualCanvas.width = video.videoWidth;
          virtualCanvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);
          virtualCanvas.toBlob(blob => socket.send(blob), 'image/jpeg');
        }, IMAGE_INTERVAL_MS);

        track = stream.getTracks()[0];
      } catch (error) {
        console.error('Error setting up video stream:', error);
      }
    };

    const socket = new WebSocket('ws://127.0.0.1:8000/detector');
    // const socket = new WebSocket('ws://hand-test.herokuapp.com/detector');

    socket.addEventListener('open', setupVideoStream);

    socket.addEventListener('message', event => {
      const data = JSON.parse(event.data);

      setPastPredictions(prevState => {
        const updatedState =
          prevState.length >= 16
            ? prevState.slice(4, 16) + ' ' + data.label
            : prevState + ' ' + data.label;
        return updatedState;
      });

      setPrediction(prevState => ({
        ...prevState,
        data: data.label,
        confidence: data.confidence,
      }));

      if (isAudioSupported && wantAudio) {
        speak(data.label);
      }
    });

    socket.addEventListener('close', () => {
      if (intervalId || track) {
        clearInterval(intervalId);
        track.stop();
      }
      socket.close();
    });

    // CleanUp function to clear the setInterval and stream track
    return () => {
      if (intervalId || track) {
        clearInterval(intervalId);
        track.stop();
      }
      socket.close();
      setPrediction({ data: '', confidence: '' });
    };
  }, []);

  return (
    <Flex justifyContent="center" height="100%" width="100%">
      {/* <select ref={cameraSelectRef} id="camera-select" hidden></select> */}
      <video
        ref={videoRef}
        id="video"
        style={{
          width: '100%',
          height: '90%',
          margin: 'auto',
          borderRadius: '35px',
        }}
      ></video>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={detectorWindowRef?.current?.clientWidth}
        style={{
          position: 'absolute',
        }}
      ></canvas>
    </Flex>
  );
};

export default Detector;
