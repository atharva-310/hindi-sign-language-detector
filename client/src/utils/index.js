// Default Toast options
export const toastOption = {
  position: 'top',
  title: '',
  description: '',
  status: 'success',
  duration: 2000,
  isClosable: true,
};

// To encode body for the requests with header type "application/x-www-form-urlencoded"
export function urlencodeBody(body) {
  var encodedBody = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    encodedBody.push(encodedKey + '=' + encodedValue);
  }
  return (encodedBody = encodedBody.join('&'));
}

// function to draw Bounding box
export const drawFaceRectangles = (video, canvas, { x, y, width, height }) => {
  const ctx = canvas.getContext('2d');
  ctx.width = video.videoWidth;
  ctx.height = video.videoHeight;
  ctx.beginPath();
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  ctx.lineWidth = '3';
  ctx.strokeStyle = '#49fb35';
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.stroke();
};
