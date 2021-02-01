import React from 'react';
import {
    Table
} from 'react-bootstrap';
import '../styles/MyGoals.css';

const MyGoals = () => {
    return(
        <>
            <h5 className="text-center">Mis Metas</h5>
            <Table responsive="md" striped>
                <thead>
                    <tr>
                        <th>Meta</th>
                        <th>$ Ahorrado</th>
                        <th>Total Meta</th>
                        <th>% Ahorrado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Auto</td>
                        <td>$ 15,000.00</td>
                        <td>$ 350,000.00</td>
                        <td>4.28 %</td>
                    </tr>
                    <tr>
                        <td>Casa</td>
                        <td>$ 150,000.00</td>
                        <td>$ 500,000.00</td>
                        <td>30.00 %</td>
                    </tr>
                    <tr>
                        <td>Curso BEDU</td>
                        <td>$ 20,000.00</td>
                        <td>$ 25,000.00</td>
                        <td>80.00 %</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default MyGoals;