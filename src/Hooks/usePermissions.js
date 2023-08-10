function usePermissions(user) {
  if (user === null) {
    return;
  }

  const loggedUser = user ? 'logged' : 'logout';

  const ownerUser = loggedUser === 'logged' && user.permission === 'OWNER' ? true : false;

  const masterUser = loggedUser === 'logged' && user.permission === 'MASTER_USER' ? true : false;

  const changerUser = loggedUser === 'logged' && user.permission === 'CHANGER_USER' ? true : false;

  const commonUser = loggedUser === 'logged' && user.permission === 'COMMON_USER' ? true : false;

  return {
    logged: loggedUser,
    owner: ownerUser,
    master: masterUser,
    changer: changerUser,
    common: commonUser,
  };
}

export default usePermissions;
