import Cookies from 'js-cookie';

function useToken() {
  const encodedToken = Cookies.get('token', { json: true });

  if (encodedToken) {
    const decodedToken = JSON.parse(atob(encodedToken));
    return decodedToken;
  }

  return;
}

export default useToken;
