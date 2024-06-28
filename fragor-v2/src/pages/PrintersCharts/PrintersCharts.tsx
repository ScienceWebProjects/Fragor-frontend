import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';

import api from 'utils/apiKeys.json';
import en from 'data/en.json';

import { useAppDispatch, useAppSelector } from 'store/Redux/hooks';

import { useDecodedToken } from 'hooks/useToken';

import Menu from 'components/Menu/Menu';
import { authActions } from 'store/Redux/auth-slice';

interface PrintersChartsProps {}

const PrintersCharts: React.FC<PrintersChartsProps> = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const user = useDecodedToken();

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  Chart.register(...registerables);

  const chartDataHandler = () => {
    const ctx = document.getElementById(
      'chart-loss'
    ) as HTMLCanvasElement | null;

    if (ctx) {
      Chart.getChart(ctx)?.destroy();

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: MONTHS,
          datasets: [
            {
              label: 'Black',
              data: [28, 40, 72, 16],
              // backgroundColor: Utils.CHART_COLORS.red,
            },
            {
              label: 'Blue',
              data: [65, 59, 80, 81, 56, 55, 40],
            },
            {
              label: 'Red',
              data: [12, 12, 0, 50, 56, 0, 7],
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Filament loss last year',
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      });
    } else {
      console.error('Element with id "chart-loss" not found');
    }
  };

  useEffect(() => {
    if (!isLogin && !user.token) {
      navigate(api.loginPage);
    } else {
      dispatch(authActions.login());
      chartDataHandler();
    }
  }, [isLogin, user, navigate, dispatch]);

  return (
    <>
      <Menu
        isMenuBar
        backNavi={api.printersPage}
      />

      <div style={{ width: '100%' }}>
        <canvas id='chart-loss'></canvas>
      </div>
    </>
  );
};

export default PrintersCharts;
