import React from 'react';
import {
    Table
} from 'react-bootstrap';
import '../styles/MyInvestments.css';

const MyInvestments = (props) => {

    console.log(props);

    const investedAmounts = props.userInvestments.map((investment) => {
        return investment.total;
    })

    const totalInvested = investedAmounts.reduce((total, investmentAmount) => {
        return total + investmentAmount;
    }, 0)


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
                                <td>
                                    { investment.investingCompany }
                                </td>
                                <td className="td-amount">
                                    { investment.total.toLocaleString('en', { style: 'currency', currency: 'USD' }) }
                                </td>
                                <td className="td-percentage">
                                    { `${(((investment.total) / totalInvested) * 100).toFixed(2)} %` }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default MyInvestments;