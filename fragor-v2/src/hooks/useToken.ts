export const encodedToken = (user: object) => {
  const token = btoa(JSON.stringify(user));
  sessionStorage.setItem('token', token);
};

export const useDecodedToken = () => {
  const encodedToken = sessionStorage.getItem('token');

  if (encodedToken) {
    const decodedToken = JSON.parse(atob(encodedToken));
    return decodedToken;
  }

  return console.error('The token could not be decoded.');
};
