import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, createRef } from 'react';

export default function DetectorBrain(props) {
  const synth = window.speechSynthesis;
  const videoRef = createRef(null);
  const canvasRef = createRef(null);
  const cameraSelectRef = createRef(null);

  const IMAGE_INTERVAL_MS = 1000;
  let voices = [];

  // populate with all the voices that client browser supports
  function populateVoiceList() {
    voices = synth.getVoices();
  }

  // Draw rectangle
  const drawFaceRectangles = (video, canvas, { x, y, width, height }) => {
    const ctx = canvas.getContext('2d');
    ctx.width = video.videoWidth;
    ctx.height = video.videoHeight;
    ctx.beginPath();
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.lineWidth = '3';
    ctx.strokeStyle = '#49fb35';
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    console.log(x, y, width, height);
    ctx.stroke();
  };

  // Read the message using the internal browser api
  function speak(message) {
    if (message !== '') {
      const utterThis = new SpeechSynthesisUtterance(message);
      utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
      };
      const selectedOption = 'Google हिन्दी';
      utterThis.voice = voices.find(voice => voice.name === selectedOption);
      synth.speak(utterThis);
    }
  }

  useEffect(() => {
    let deviceId;
    let trackId;

    populateVoiceList();
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const cameraSelect = cameraSelectRef.current;

    navigator.mediaDevices.enumerateDevices().then(devices => {
      for (const device of devices) {
        // console.log(device);
        if (device.kind === 'videoinput') {
          console.log('video source found');
          const deviceOption = document.createElement('option');
          deviceOption.innerText = device.label;
          cameraSelect.appendChild(deviceOption);
          deviceOption.value = device.deviceId;
          deviceId = device.deviceId;
          break;
        }
      }
    });
    // const deviceId = cameraSelect.selectedOptions[0].value;
    // let socket = new WebSocket('ws://127.0.0.1:9000/detector');
    // const socket = new WebSocket('ws://hand-test.herokuapp.com/detector');
    const socket = new WebSocket(
      'wss://socket-fastapi-gesture-detection-bdv72qo4da-em.a.run.app/detector'
    );
    // );

    let intervalId;
    // Connection opened
    socket.addEventListener('open', function () {
      // Start reading video from device
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            deviceId,
          },
        })
        .then(function (stream) {
          video.srcObject = stream;
          video.play().then(() => {
            // Adapt overlay canvas size to the video size
            canvas.width = props.detectorOptions.ref.current.clientWidth * 0.9;
            canvas.height =
              props.detectorOptions.ref.current.clientHeight * 0.9;

            // Send an image in the WebSocket every 42 ms
            intervalId = setInterval(() => {
              // Create a virtual canvas to draw current video image
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              ctx.drawImage(video, 0, 0);

              // Convert it to JPEG and send it to the WebSocket
              canvas.toBlob(blob => socket.send(blob), 'image/jpeg');
            }, IMAGE_INTERVAL_MS);

            trackId = stream.getTracks()[0];
          });
        });
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);
      // drawFaceRectangles(video, canvas, data.box);

      props.detectorOptions.setPastPredictions(prevState => {
        if (prevState.length >= 16) {
          return prevState.slice(4, 16) + ' ' + data.label;
        } else {
          return prevState + ' ' + data.label;
        }
      });

      props.detectorOptions.setPrediction(prevState => {
        return {
          ...prevState,
          data: data.label,
          confidence: data.confidence,
        };
      });
      if (props.detectorOptions.wantAudio) {
        speak(data.label);
      }
    });

    // Stop the interval and video reading on close
    socket.addEventListener('close', function () {
      window.clearInterval(intervalId);
      video.pause();
    });

    return () => {
      /**
       *  Clean Up function
       * - Will close the socket connection
       * - Clear the display output
       * - clear the Track and stop the video stream
       */

      socket.close();
      if (trackId) {
        trackId.enabled = false;
        trackId.stop();
      }
      // props.detectorOptions.setPastPredictions('');
      props.detectorOptions.setPrediction({
        data: '',
        confidence: '',
      });
    };
  }, []);

  return (
    <Flex justifyContent="center" height="100%" width="100%">
      <select ref={cameraSelectRef} id="camera-select" hidden></select>
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
        width={props.detectorOptions.ref.current.clientWidth}
        style={{
          position: 'absolute',
        }}
      ></canvas>
    </Flex>
  );
}