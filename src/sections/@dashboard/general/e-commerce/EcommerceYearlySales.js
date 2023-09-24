import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { CustomSmallSelect } from '../../../../components/custom-input';
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

EcommerceYearlySales.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function EcommerceYearlySales({ title, subheader, chart, ...other }) {
  const { colors, categories, series, options } = chart;

  const [seriesData, setSeriesData] = useState('2023');

  const chartOptions = useChart({
    colors:[other.color],
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    xaxis: {
      categories,
    },
    ...options,
  });

  useEffect(() => {
    console.log(series)
  },[series]);
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <CustomSmallSelect value={seriesData} onChange={(event) => setSeriesData(event.target.value)}>
            {series.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />

      {series.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && <Chart type="area"  series={item.data} options={chartOptions} height={200 } />}
        </Box>
      ))}
    </Card>
  );
}
