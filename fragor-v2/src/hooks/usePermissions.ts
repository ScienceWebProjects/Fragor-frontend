const usePermissions = (
  permission: string
): { OWNER: boolean; MASTER: boolean; CHANGER: boolean; COMMON: boolean } => {
  if (permission) {
    switch (permission) {
      case 'OWNER':
        return { OWNER: true, MASTER: true, CHANGER: true, COMMON: true };
      case 'MASTER_USER':
        return { OWNER: false, MASTER: true, CHANGER: true, COMMON: true };
      case 'CHANGER_USER':
        return { OWNER: false, MASTER: false, CHANGER: true, COMMON: true };
      case 'COMMON_USER':
        return { OWNER: false, MASTER: false, CHANGER: false, COMMON: true };
    }
  }

  return { OWNER: false, MASTER: false, CHANGER: false, COMMON: false };
};

export default usePermissions;
