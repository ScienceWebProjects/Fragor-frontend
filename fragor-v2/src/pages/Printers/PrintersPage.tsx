import React, { useEffect, useState } from 'react';

import api from 'utils/apiKeys.json';
import { Printer, RequestFetchType } from 'utils/types';

import fetchData from 'functions/fetchData';
import { useDecodedToken } from 'hooks/useToken';
import { useWindowSize } from 'hooks/useWindowSize';

import InfiniteScroll from 'react-infinite-scroll-component';
import PrintersCardsContainer from './PrintersCardsContainer';
import Menu from 'components/Menu/Menu';
import PrinterCard from 'components/ui/Card/Printers/PrinterCard';
import PrimaryButton from 'components/ui/Button/PrimaryButton';
import buttonColors from 'utils/button-colors';
import { FormattedMessage } from 'react-intl';
import Modal from 'components/modals/Modal';
import AddPrinterModal from 'components/modals/AddPrinterModal';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { authActions } from 'store/auth-slice';

interface PrintersPageProps {}

const PrintersPage: React.FC<PrintersPageProps> = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const user = useDecodedToken();
  const { windowHeight } = useWindowSize();

  const [printersList, setPrintersList] = useState<Printer[]>([]);
  const [isPrinterModal, setIsPrinterModal] = useState<boolean>(false);

  const apiPrintersGet = async () => {
    const requestOptions: RequestFetchType = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = await fetchData({
      api: `${api.ip}${api.printersList}`,
      requestOptions: requestOptions,
    });

    setPrintersList(response.response);

    // console.log('apiPrintersGet fcn executed');
  };

  useEffect(() => {
    if (!isLogin && !user.token) {
      navigate(api.loginPage);
    } else {
      dispatch(authActions.login());
    }
  }, [isLogin, user, navigate, dispatch]);

  useEffect(() => {
    apiPrintersGet();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Menu isMenuBar />

      <PrintersCardsContainer>
        <InfiniteScroll
          dataLength={printersList.length}
          hasMore={false}
          height={windowHeight * 0.8}
          style={{
            width: '75vw',
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            flexWrap: 'wrap',
          }}
          loader='Load printers...'
          next={() => {}}
        >
          {printersList.map((printer) => (
            <PrinterCard
              key={printer.id}
              printer={printer}
            />
          ))}
        </InfiniteScroll>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          <PrimaryButton
            colorBtn={buttonColors.yellow}
            onClick={() => setIsPrinterModal(true)}
          >
            <FormattedMessage
              id='printers.addPrinter'
              defaultMessage='Add printer'
            />
          </PrimaryButton>
          <PrimaryButton colorBtn={buttonColors.green}>Charts</PrimaryButton>
        </div>
      </PrintersCardsContainer>

      {isPrinterModal && (
        <Modal
          onClose={(modal) => {
            setIsPrinterModal(modal);
            apiPrintersGet();
          }}
        >
          <AddPrinterModal />
        </Modal>
      )}
    </>
  );
};

export default PrintersPage;
