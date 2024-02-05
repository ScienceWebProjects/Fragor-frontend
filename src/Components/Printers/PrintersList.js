// libs
import React from 'react';
import { useState, useEffect } from 'react';

// hooks
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';
import useWindowSize from '../../Hooks/useWindowSize';

// components
import { FormattedMessage } from 'react-intl';
import TopBar from '../_shared/TopBar';
import Button from '../UI/shared/buttons/Button';
import NavBar from '../_shared/NavBar';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import PrinterItem from './PrinterItem';
import InfiniteScroll from 'react-infinite-scroll-component';

// scss
import '../../App.css';
import '../UI/shared/_media-queries.scss';
import './scss/_printers-list.scss';

function PrintersList(props) {
  const user = useToken();
  const permission = usePermissions(user);
  const windowSize = useWindowSize();

  const [printers, setPrinters] = useState([]);

  const printerSelectionHandler = (printer) => {
    props.onPrinterSelect(printer);
  };

  const makeAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${props.api.ip}${props.api.printersList}`,
        requestOptions
      );

      const data = await response.json();
      setPrinters(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    makeAPICall();
  });

  return (
    <div>
      {/* <header> */}
      <TopBar api={props.api} />
      {/* </ header> */}

      <div className='media-background'>
        <div className='media__content'>
          <NavBar
            api={props.api}
            backBtnLink={props.api.home}
          />

          <div className='list__main'>
            <div className='list__btns'>
              {permission.changer && (
                <StyledLink to={props.api.printerAddPage}>
                  <Button
                    className='list--btn'
                    color='yellow'
                  >
                    <FormattedMessage
                      id='printers.addPrinter'
                      defaultMessage='Add Printer'
                    />
                  </Button>
                </StyledLink>
              )}

              <StyledLink to={props.api.chartsPage}>
                <Button
                  className='list--btn'
                  color='green'
                >
                  <FormattedMessage
                    id='charts'
                    defaultMessage='Charts'
                  />
                </Button>
              </StyledLink>
            </div>

            <main
              className='App-header'
              style={{ minHeight: 'unset' }}
            >
              <InfiniteScroll
                dataLength={printers.length}
                hasMore={false}
                height={windowSize * 0.6}
                className='list__items'
              >
                {printers.map((printer) => (
                  <Button
                    color='blue'
                    key={printer.id}
                    className='printer__details-btn'
                  >
                    <PrinterItem
                      printer={printer}
                      api={props.api}
                      onPrinterSelect={printerSelectionHandler}
                    />
                  </Button>
                ))}
              </InfiniteScroll>
            </main>

            <StyledLink to={props.api.home}>
              <Button
                className='back__btn'
                color='red'
              >
                <FormattedMessage
                  id='back'
                  defaultMessage='Back'
                />
              </Button>
            </StyledLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintersList;
