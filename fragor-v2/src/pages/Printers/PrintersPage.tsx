import React, { useEffect, useState, useContext } from 'react';
import { message } from 'antd';

import api from 'utils/apiKeys.json';
import { Printer, RequestFetchType } from 'utils/types';

import fetchData from 'functions/fetchData';
import { useDecodedToken } from 'hooks/useToken';
import { useWindowSize } from 'hooks/useWindowSize';
import usePermissions from 'hooks/usePermissions';

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

import MessageContext, {
  MessageContextProvider,
} from 'store/printerModalContext/message-context';
import { useAppDispatch, useAppSelector } from 'store/Redux/hooks';
import { authActions } from 'store/Redux/auth-slice';
import { NoticeType } from 'antd/es/message/interface';

interface PrintersPageProps {}

const PrintersPage: React.FC<PrintersPageProps> = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const user = useDecodedToken();
  const permission = usePermissions(user.permission);
  const { windowHeight } = useWindowSize();

  const [isPrinterModal, setIsPrinterModal] = useState<boolean>(false);

  const [printersList, setPrintersList] = useState<Printer[]>([]);

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

  const messageHandler = (type: NoticeType, content: string) => {
    messageApi.open({
      type,
      content,
    });

    console.log(type, content);
  };

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
          {permission.CHANGER && (
            <PrimaryButton
              colorBtn={buttonColors.yellow}
              onClick={() => setIsPrinterModal(true)}
            >
              <FormattedMessage
                id='printers.addPrinter'
                defaultMessage='Add printer'
              />
            </PrimaryButton>
          )}
          <PrimaryButton colorBtn={buttonColors.green}>
            <FormattedMessage
              id='charts'
              defaultMessage='Charts'
            />
          </PrimaryButton>
        </div>
      </PrintersCardsContainer>

      {/* <MessageContext.Provider
        value={{
          messageText: message,
          onMessage: setMessage,
        }}
      >
        {isPrinterModal && (
          <Modal
            onClose={(modal) => {
              setIsPrinterModal(modal);
              apiPrintersGet();
            }}
          >
            <AddPrinterModal onCloseModal={setIsPrinterModal} />
          </Modal>
        )}
        </MessageContext.Provider> */}

      <MessageContextProvider>
        {contextHolder}
        <MessageContext.Consumer>
          {(ctx) => (
            <>
              {isPrinterModal && (
                <Modal
                  onClose={(modal) => {
                    setIsPrinterModal(modal);
                    apiPrintersGet();
                  }}
                >
                  <AddPrinterModal
                    onCloseModal={(modal) => {
                      setIsPrinterModal(modal);
                      messageHandler(ctx.messageType, ctx.messageText);
                    }}
                  />
                </Modal>
              )}
            </>
          )}
        </MessageContext.Consumer>
      </MessageContextProvider>
    </>
  );
};

export default PrintersPage;
