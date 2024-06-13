import React from 'react';

import { useDecodedToken } from 'hooks/useToken';
import { useWindowSize } from 'hooks/useWindowSize';
import usePermissions from 'hooks/usePermissions';

interface AddPrinterModalProps {}

const AddPrinterModal: React.FC<AddPrinterModalProps> = () => {
  const user = useDecodedToken();
  const permission = usePermissions(user.permission);
  const { windowHeight } = useWindowSize();

  return (
    <div
      style={{
        height: '100%',
        width: '100%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <div>
        NEW MODEL
        <div>model name</div>
        <div>new model button</div>
      </div>

      <div>
        NEW PRINTER
        <div>image</div>
        <div>printer name</div>
        <div>printer model</div>
        <div>printer power</div>
        <div>new printer button</div>
      </div>
    </div>
  );
};

export default AddPrinterModal;
