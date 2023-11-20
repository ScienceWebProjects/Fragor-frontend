// libs

// hooks
import useWindowSize from '../../../Hooks/useWindowSize';

// components
import InfiniteScroll from 'react-infinite-scroll-component';

// UI elements
import Button from '../../UI/shared/buttons/Button';
import InfoType from '../../Authorization/Signin/UI/InfoType';

// scss
import '../../UI/shared/_box.scss';
import '../scss/_hour-input.scss';

function HourInput({
  onHourInput,
  whatHour,
  fromHourSelected,
  toHourSelected,
}) {
  const windowSize = useWindowSize();

  const hours = [];
  const hourTexts = [];

  for (let hour = 0; hour <= 23; hour++) {
    hours.push(hour);
    const hourText = (hour < 10 ? '0' : '') + hour + ':00';
    hourTexts.push(hourText);
  }

  return (
    <div className='shadow'>
      <div className='box'>
        <InfoType text={`Set ${whatHour}`} />
        <InfiniteScroll
          dataLength={24}
          hasMore={false}
          height={windowSize * 0.5}
          className='hours'
        >
          <div className='two-columns'>
            <div className='AM'>
              {hours.slice(0, 12).map((hour) => (
                <Button
                  className='hour-btn'
                  key={hour}
                  color='blue'
                  onClick={() => {
                    console.log(hour);
                    if (whatHour === 'from hour') {
                      fromHourSelected(hour);
                    } else if (whatHour === 'to hour') {
                      toHourSelected(hour);
                    }
                    onHourInput(false);
                  }}
                >
                  {hourTexts[hour]}
                </Button>
              ))}
            </div>
            <div className='PM'>
              {hours.slice(12).map((hour) => (
                <Button
                  className='hour-btn'
                  key={hour}
                  color='blue'
                  onClick={() => {
                    console.log(hour);
                    if (whatHour === 'from hour') {
                      fromHourSelected(hour);
                    } else if (whatHour === 'to hour') {
                      toHourSelected(hour);
                    }
                    onHourInput(false);
                  }}
                >
                  {hourTexts[hour]}
                </Button>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default HourInput;
