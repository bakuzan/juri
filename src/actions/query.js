export const malQuery = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json();
  });
}

export const content = () => {
  console.log('unimplemented');
}
