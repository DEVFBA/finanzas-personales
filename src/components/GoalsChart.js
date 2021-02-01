import React from 'react';
import '../styles/GoalsChart.css';
import {
    Bar
} from 'react-chartjs-2';

const GoalsChart = () => {
    return(
        <>
            <h5 className="text-center">Metas</h5>
            <Bar
                data = {{
                    labels: ['Auto', 'Casa', 'Curso BEDU'],
                    datasets: [{
                        label: 'Monto Ahorrado',
                        data: [15000, 150000, 20000],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ]
                    }
                    ]
                }
                }
            />
        </>
    );
}

export default GoalsChart;