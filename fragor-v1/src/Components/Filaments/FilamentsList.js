// libs

// hooks
import useWindowSize from '../../Hooks/useWindowSize';

// components
import InfiniteScroll from 'react-infinite-scroll-component';
import FilamentItem from './UI/FilamentItem';

// UI elements
import Button from '../UI/shared/buttons/Button';

// scss
import './scss/_filament-list.scss';

const FilamentsList = (props) => {
  const windowSize = useWindowSize();

  const filamentSelectionHandler = (filament) => {
    props.onFilamentSelect(filament);
  };

  if (props.items.length === 0) {
    return (
      <div>
        <h1
          style={{ padding: '0.2rem 2rem', color: '#000', textAlign: 'center' }}
        >
          No filaments added yet.
        </h1>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={props.items.length}
      hasMore={false}
      height={windowSize * 0.6}
      className='filament__list'
    >
      {props.items.map((filament, index) => (
        <Button
          color='blue'
          key={`btn-${index}`}
          className='list__button'
        >
          <FilamentItem
            filament={filament}
            api={props.api}
            onFilamentSelect={filamentSelectionHandler}
          />
        </Button>
      ))}
    </InfiniteScroll>
  );
};

export default FilamentsList;
