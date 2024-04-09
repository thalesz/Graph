import React from 'react';
import Plot from 'react-plotly.js';

const Graph03: React.FC = () => {
  const trace1 = {
    x: ['Liam', 'Sophie', 'Jacob', 'Mia', 'William', 'Olivia'],
    y: [8.0, 8.0, 12.0, 12.0, 13.0, 20.0],
    type: 'bar',
    text: ['4.17 below the mean', '4.17 below the mean', '0.17 below the mean', '0.17 below the mean', '0.83 above the mean', '7.83 above the mean'],
    marker: {
      color: 'rgb(142,124,195)'
    }
  };


  const layout = {
    title: 'Number of Graphs Made this Week',
    font: {
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: -45
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap: 0.05
  };

  return (
    <Plot
      
      data={[ 
        {
          x: trace1.x,
          y: trace1.y,
          type: 'bar',
          text: trace1.text, // Texto de legenda para cada barra
          hoverinfo: 'y+text', // Exibir legenda somente no hover
        }
      ]}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Graph03;
