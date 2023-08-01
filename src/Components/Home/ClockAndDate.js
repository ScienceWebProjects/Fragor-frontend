// libs
import { useEffect, useState } from 'react';

// UI elemnts
import ClockCard from './UI/ClockCard';

// scss
import './UI/_date.scss';

const ClockAndDate = (props) => {
  const [clockState, setClockState] = useState();
  const [date, setDate] = useState();

  const time = () => {
    const time = new Date();
    setClockState(time.toLocaleTimeString());
    setDate(
      time.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  };

  useEffect(() => {
    time();
    setInterval(() => {
      time();
    }, 1000);
  }, []);

  return (
    <ClockCard className='date'>
      <div>{date}</div>
      <div>{clockState}</div>
    </ClockCard>
  );
};

export default ClockAndDate;
