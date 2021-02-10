import React from 'react';
import {
    Table
} from 'react-bootstrap';
import '../styles/MyGoals.css';

const MyGoals = (props) => {

    return(
        <>
            <h5 className="text-center">Mis Metas</h5>
            <Table 
                responsive="md" 
                striped
                className="summary-table"
            >
                <thead>
                    <tr>
                        <th>Meta</th>
                        <th>$ Ahorrado</th>
                        <th>Total Meta</th>
                        <th>% Ahorrado</th>
                    </tr>
                </thead>
                <tbody>
                    {props.userGoals.map((goal) => {
                        return(
                            <tr>
                                <td>{ goal.goal }</td>
                                <td className="td-amount">
                                    { goal.amountSaved.toLocaleString('en', { style: 'currency', currency: 'USD' }) }
                                </td>
                                <td className="td-amount">
                                    { goal.totalObjective.toLocaleString('en', { style: 'currency', currency: 'USD' }) }
                                </td>
                                <td className="td-percentage">
                                    { `${((goal.amountSaved / goal.totalObjective) * 100).toFixed(2)} %` }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default MyGoals;