// libs
import React from 'react';
import { useState, useEffect } from 'react';

// components
import TopBar from '../_shared/TopBar';

// downloaded components
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements
import FiltersBar from './FiltersBar';
// import FilamentsWindow from './UI/FilamentsWindow';
import FilamentsList from './FilamentsList';

function FilamentsPage(props) {
  const [filaments, setFilaments] = useState([
    {
      id: '1',
      quantity: 0.745,
      type: 'PLA',
      color: 'RED',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '2',
      quantity: 3.02,
      type: 'EASY PLA',
      color: 'YELLOW',
      hotbed: 40,
      hotend: 205,
    },
    {
      id: '3',
      quantity: 2.45,
      type: 'PET-G',
      color: 'GREEN',
      hotbed: 60,
      hotend: 235,
    },
  ]);

  const makeAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `token ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        // `${props.api.ip}${props.api.filterFilament}${filteredColor}/${filteredMaterial}/${filteredStock}/`,
        requestOptions
      );

      if (response.status === 404) {
        setFilaments([]);
        return;
      }

      const data = await response.json();
      console.log(data);

      setFilaments(data);
    } catch (e) {
      console.log('Error in filter fetch');
    }
  };

  useEffect(() => {
    makeAPICall();
    // }, [filteredMaterial, filteredColor, filteredBrand, filteredStock]);
  }, []);

  const filteredFilaments = filaments;

  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'>
        <FiltersBar />

        {/* <FilamentsWindow>
          <FilamentsList items={filteredFilaments} />
        </FilamentsWindow> */}

        <InfiniteScroll
          pullDownToRefresh
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
          refreshFunction={this.refresh}
          // next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          height={400}
        >
          <FilamentsList items={filteredFilaments} />
        </InfiniteScroll>
      </main>
    </div>
  );
}

export default FilamentsPage;
