function useToken() {
  const encodedToken = sessionStorage.get('token', { json: true });

  if (encodedToken) {
    const decodedToken = JSON.parse(atob(encodedToken));
    return decodedToken;
  }

  return;
}

export default useToken;
