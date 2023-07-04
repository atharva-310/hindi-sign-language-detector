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
