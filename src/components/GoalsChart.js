import React from 'react';
import '../styles/GoalsChart.css';
import {
    Bar
} from 'react-chartjs-2';

const GoalsChart = (props) => {

    const goalsLabels = props.userGoals.map((goal) => {
        return (goal.goal);
    })

    const savedAmounts = props.userGoals.map((goal) => {
        return (goal.amountSaved);
    })


    return(
        <>
            <h5 className="text-center">Metas</h5>
            <Bar
                data = {{
                    labels: goalsLabels,
                    datasets: [{
                        label: 'Monto Ahorrado',
                        data: savedAmounts,
                        backgroundColor: [
                            'rgba(0, 123, 255, 0.5)',
                            'rgba(255, 193, 7, 0.5)',
                            'rgba(40, 167, 69, 0.5)',
                            'rgba(102, 16, 242, 0.5)',
                            'rgba(253, 126, 20, 0.5)',
                            'rgba(111, 66, 193, 0.5)'
                        ],
                        borderWidth: 2
                    }
                    ]
                }
                }
                options = {{
                    scales: {
                        xAxes:[{
                            ticks: {
                                fontColor: 'rgba(255, 255, 255)'
                            },
                            scaleLabel: {
                                fontColor: 'rgba(255, 255, 255)'
                            }
                        }
                        ],
                        yAxes:[{
                            ticks: {
                                fontColor: 'rgba(255, 255, 255)'
                            },
                            scaleLabel: {
                                fontColor: 'rgba(255, 255, 255)'
                            }
                        }
                        ]
                    }
                }}
            />
        </>
    );
}

export default GoalsChart;