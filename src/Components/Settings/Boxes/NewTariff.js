// libs

// hooks
// import useToken from '../../../Hooks/useToken';

// components

// UI elements

// scss

function NewTariff({ api, onNewTariff, isAdding }) {
  // const user = useToken();

  return (
    <div className='new-tariff'>
      New Tariff
      <button
        className='tarrif-close-btn'
        onClick={() => isAdding(false)}
      >
        <i className='icon-cancel' />
      </button>
      <div className='tariff-panels'>
        <button
          className='panel-btn'
          onClick={() => console.log('prev')}
        >
          <i className='icon-left-open' />
        </button>
        <button
          className='panel-btn'
          onClick={() => console.log('next')}
        >
          <i className='icon-right-open' />
        </button>
      </div>
    </div>
  );
}

export default NewTariff;
