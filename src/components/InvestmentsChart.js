import React from 'react';
import {
    Pie
} from 'react-chartjs-2';
import '../styles/InvestmentsChart.css';

const InvestmentsChart = (props) => {

    const investmentsLabels = props.userInvestments.map((investment) => {
        return (investment.investingCompany);
    })

    const investedAmounts = props.userInvestments.map((investment) => {
        return (investment.investedAmount);
    })

    return(
        <>
            <h5 className="text-center">Portafolio Inversión</h5>
            <Pie 
                data = {{
                    labels:   investmentsLabels,
                    datasets: [{
                        label: '% Portafolio',
                        data:  investedAmounts,
                        backgroundColor: [
                            'rgba(0, 123, 255, 0.5)',
                            'rgba(255, 193, 7, 0.5)',
                            'rgba(40, 167, 69, 0.5)',
                            'rgba(102, 16, 242, 0.5)',
                            'rgba(253, 126, 20, 0.5)',
                            'rgba(111, 66, 193, 0.5)'
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