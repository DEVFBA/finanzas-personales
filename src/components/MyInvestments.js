import React from 'react';
import {
    Table
} from 'react-bootstrap';
import '../styles/MyInvestments.css';

const MyInvestments = () => {
    return(
        <>
            <h5 className="text-center">Mis Inversiones</h5>
            <Table responsive="md" striped>
                <thead>
                    <tr>
                        <th>Inversión</th>
                        <th>$ Inversión</th>
                        <th>% Portafolio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CetesDirecto</td>
                        <td>$ 15,000.00</td>
                        <td>4.17 %</td>
                    </tr>
                    <tr>
                        <td>GBM</td>
                        <td>$ 95,000.00</td>
                        <td>26.39 %</td>
                    </tr>
                    <tr>
                        <td>Plan de Retiro</td>
                        <td>$ 250,000.00</td>
                        <td>69.44 %</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default MyInvestments;