export const encodedToken = (user: object) => {
  const token = btoa(JSON.stringify(user));
  sessionStorage.setItem('token', token);
};

export const useDecodedToken = (): { permission: string; token: string } => {
  const encodedToken = sessionStorage.getItem('token');

  if (encodedToken) {
    const decodedToken = JSON.parse(atob(encodedToken));

    return { permission: decodedToken.permission, token: decodedToken.token };
  }

  return { permission: '', token: '' };
};
