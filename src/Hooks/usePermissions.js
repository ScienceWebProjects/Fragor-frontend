function usePermissions(user) {
  if (user === null) {
    return { logged: 'logout' };
  }

  const loggedUser = user ? 'logged' : 'logout';
  let ownerUser = false;
  let masterUser = false;
  let changerUser = false;
  let commonUser = false;

  if (loggedUser === 'logged') {
    switch (user.permission) {
      case 'OWNER':
        ownerUser = true;
        masterUser = true;
        changerUser = true;
        commonUser = true;
        break;
      case 'MASTER_USER':
        masterUser = true;
        changerUser = true;
        commonUser = true;
        break;
      case 'CHANGER_USER':
        changerUser = true;
        commonUser = true;
        break;
      case 'COMMON_USER':
        commonUser = true;
        break;
    }
  }

  return {
    logged: loggedUser,
    owner: ownerUser,
    master: masterUser,
    changer: changerUser,
    common: commonUser,
  };
}

export default usePermissions;
