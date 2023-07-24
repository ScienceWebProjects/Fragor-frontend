// hooks
import React, { useState, useEffect } from 'react';
import useWindowSize from '../../Hooks/useWindowSize';

// components
import FilamentItem from './UI/FilamentItem';

// downloaded components
import InfiniteScroll from 'react-infinite-scroll-component';

const FilamentsList = (props) => {
  const windowSize = useWindowSize();

  if (props.items.length === 0) {
    return (
      <div>
        <h1 style={{ padding: '0.2rem 2rem', color: '#000' }}>Found no filaments.</h1>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={props.items.length}
      hasMore={false}
      height={windowSize * 0.6}
      endMessage={'No more added filaments'}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {props.items.map((filament) => (
        <FilamentItem
          key={filament.id}
          quantity={filament.quantity}
          type={filament.type}
          color={filament.color}
          hotbed={filament.hotbed}
          hotend={filament.hotend}
        />
      ))}
    </InfiniteScroll>
  );
};

export default FilamentsList;
