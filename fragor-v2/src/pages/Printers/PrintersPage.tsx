import React, { useEffect, useState } from 'react';

import api from 'utils/apiKeys.json';
import { Printer, RequestFetchType } from 'utils/types';

import fetchData from 'functions/fetchData';
import { useDecodedToken } from 'hooks/useToken';
import { useWindowSize } from 'hooks/useWindowSize';

import InfiniteScroll from 'react-infinite-scroll-component';
import Menu from 'components/Menu/Menu';
import PrinterCard from 'components/ui/Card/Printers/PrinterCard';
import PrintersCardsContainer from './PrintersCardsContainer';
import PrimaryButton from 'components/ui/Button/PrimaryButton';
import buttonColors from 'utils/button-colors';
import { FormattedMessage } from 'react-intl';
import Modal from 'components/ui/Card/Modal';

interface PrintersPageProps {}

const PrintersPage: React.FC<PrintersPageProps> = () => {
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
  };

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
        <Modal onClose={setIsPrinterModal}>
          <>ADD PRINTER</>
        </Modal>
      )}
    </>
  );
};

export default PrintersPage;
