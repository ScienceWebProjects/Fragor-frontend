function usePermissions(user) {
  if (user === null) {
    return;
  }

  const loggedUser = user ? 'logged' : 'logout';

  const masterUser =
    loggedUser === 'logged' && (user.permission === 'MASTER_USER' || user.permission === 'OWNER')
      ? true
      : false;

  return {
    logged: loggedUser,
    master: masterUser,
  };
}

export default usePermissions;
