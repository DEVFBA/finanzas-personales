import React from 'react';
import {
    Pie
} from 'react-chartjs-2';
import '../styles/InvestmentsChart.css';

const InvestmentsChart = () => {
    return(
        <>
            <h5 className="text-center">Portafolio Inversión</h5>
            <Pie 
                data = {{
                    labels: ['CetesDirecto', 'GBM', 'Plan de Retiro'],
                    datasets: [{
                        label: '% Portafolio',
                        data: [4.17, 26.39, 69.44],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ]
                    }
                    ]
                }
                }
            />
        </>
    );
}

export default InvestmentsChart;