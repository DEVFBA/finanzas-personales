import React from 'react';
import {
    Table
} from 'react-bootstrap';
import '../styles/MyInvestments.css';

const MyInvestments = (props) => {

    const investedAmounts = props.userInvestments.map((investment) => {
        return investment.investedAmount;
    })

    const totalInvested = investedAmounts.reduce((total, investmentAmount) => {
        return total + investmentAmount;
    }, 0)

    console.log('Montos', investedAmounts);
    console.log('Total', totalInvested);

    return(
        <>
            <h5 className="text-center">Mis Inversiones</h5>
            <Table 
                responsive="md" 
                striped
                className="summary-table"
            >
                <thead>
                    <tr>
                        <th>Inversión</th>
                        <th>$ Inversión</th>
                        <th>% Portafolio</th>
                    </tr>
                </thead>
                <tbody>
                    {props.userInvestments.map((investment) => {
                        return (
                            <tr>
                                <td>{investment.investingConcept}</td>
                                <td className="td-amount">{investment.investedAmount.toLocaleString('en', { style: 'currency', currency: 'USD' })}</td>
                                <td className="td-percentage">{`${(((investment.investedAmount) / totalInvested) * 100).toFixed(2)} %`}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default MyInvestments;