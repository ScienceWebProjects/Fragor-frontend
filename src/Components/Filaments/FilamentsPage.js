// libs
import React from 'react';

// components
import TopBar from '../_shared/TopBar';

// UI elements
import FiltersBar from './FiltersBar';

function FilamentsPage(props) {
  return (
    <div>
      {/* <header> */}
      <TopBar />
      {/* </ header> */}

      <main className='App-header'>
        <FiltersBar />
      </main>
    </div>
  );
}

export default FilamentsPage;
