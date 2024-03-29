import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineGraphProps {
  data: {
    months: {};
  };
}

const LineGraph = ({ data }: LineGraphProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy previous chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        // Create new chart instance
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Object.keys(data.months),
            datasets: [
              {
                label: 'Placement Drives',
                data: Object.values(data.months),
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
              },
            ],
          },
        });
      }
    }
    return () => {
      // No need to destroy chart instance here, it will be automatically cleaned up by React when the component unmounts
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineGraph;
