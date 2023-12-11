// libs

// hooks
import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import useToken from '../../Hooks/useToken';
import usePermissions from '../../Hooks/usePermissions';

// components
import Chart from 'chart.js/auto'; // v4.4.1
import { FormattedMessage } from 'react-intl';
import TopBar from '../_shared/TopBar';
import LogoutUser from '../_shared/LogoutUser';
import CustomSelect from '../_shared/CustomSelect';

// UI elements
import StyledLink from '../UI/shared/StyledLink';
import Button from '../UI/shared/buttons/Button';

// scss
import './scss/_charts.scss';

function Charts({ api }) {
  const user = useToken();
  const permission = usePermissions(user);
  const intl = useIntl();

  // variables for filters
  const [filters, setFilters] = useState([]);
  const [timeFilter, setTimeFilter] = useState('week');
  const [materialSelected, setMaterialSelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');
  const [brandSelected, setBrandSelected] = useState('');

  const chartDataHandler = (data) => {
    const chartDataElement = document.getElementById('chart-graph');

    // Sprawdź, czy element istnieje
    if (chartDataElement) {
      // Zniszcz poprzedni wykres, jeśli istnieje
      Chart.getChart(chartDataElement)?.destroy();

      // Utwórz nowy wykres
      new Chart(chartDataElement, {
        type: 'bar',
        data: {
          labels: data.map((row) => row.time),
          datasets: [
            {
              label: `Filament loss by last ${timeFilter}`,
              data: data.map((row) => row.quantity),
            },
          ],
        },
      });
    }
  };

  const filtersGetAPICall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await fetch(
        `${api.ip}${api.filamentsFiltersGet}`,
        requestOptions
      );

      const filtersList = await response.json();
      const filtersLists = {};

      for (const key in filtersList) {
        filtersLists[key] = filtersList[key].map((value, index) => ({
          id: index,
          name: value,
        }));
      }

      setFilters(filtersLists);

      console.log(filtersList);
    } catch (error) {
      console.log(error);
    }
  };

  const chartsDataApiCall = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await fetch(
        `${api.AI_ip}${api.AIChartsDataGet}`,
        requestOptions
      );

      const data = await response.json();
      console.log(data); // DELETE THIS LINE
      chartDataHandler(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filtersGetAPICall();
    chartsDataApiCall();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (permission.logged === 'logout') {
    return <LogoutUser api={api} />;
  }

  return (
    <div>
      {/* <header> */}
      <TopBar api={api} />
      {/* </ header> */}

      <main className='App-header'>
        <div className='container-charts'>
          <div className='chart-filters'>
            <CustomSelect
              options={filters.material || []}
              labelKey='name'
              valueKey='name'
            />
            <CustomSelect
              options={filters.color || []}
              labelKey='name'
              valueKey='name'
            />
            <CustomSelect
              options={filters.brand || []}
              labelKey='name'
              valueKey='name'
            />
          </div>

          <div className='chart-graph'>
            <canvas id='chart-graph'></canvas>
          </div>
        </div>

        <div className='chart-btns'>
          <Button
            className='chart-btn'
            color='blue'
          >
            Next graph
          </Button>
          <Button
            className='chart-btn'
            color='blue'
          >
            Previous graph
          </Button>
        </div>
      </main>

      <StyledLink to={api.printersPage}>
        <Button
          className=''
          color='red'
        >
          Back
        </Button>
      </StyledLink>
    </div>
  );
}

export default Charts;
