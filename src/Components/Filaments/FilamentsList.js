// hooks
import useWindowSize from '../../Hooks/useWindowSize';

// components
import FilamentItem from './UI/FilamentItem';

// downloaded components
import InfiniteScroll from 'react-infinite-scroll-component';
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
        <h1 style={{ padding: '0.2rem 2rem', color: '#000', textAlign: 'center' }}>
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
      endMessage={'No more added filaments'}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}
    >
      {props.items.map((filament, index) => (
        <Button
          color='blue'
          key={`btn-${index}`}
          className='filament-button'
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
