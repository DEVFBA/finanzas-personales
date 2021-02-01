import React from 'react';
import {
    Table,
    ProgressBar
} from 'react-bootstrap';
import '../styles/MyBudget.css';

const MyBudget = () => {
    return(
        <>
            <h5 className="text-center">Mi Presupuesto</h5>
            <Table responsive="md" striped>
                <tbody>
                    <tr>
                        <td>Alimentos</td>
                        <td className="budgetProgress">
                            <ProgressBar
                                animated now={4.28}
                                variant="success"
                                min="0"
                                max="100"
                            />
                        </td>
                        <td>4.28 %</td>
                    </tr>
                    <tr>
                        <td>Mantenimiento Casa</td>
                        <td className="budgetProgress">
                            <ProgressBar
                                animated now={30}
                                variant="success"
                            />
                        </td>
                        <td>30.00 %</td>
                    </tr>
                    <tr>
                        <td>Transporte</td>
                        <td className="budgetProgress">
                            <ProgressBar
                                animated now={80}
                                variant="danger"
                            />
                        </td>
                        <td>80.00 %</td>
                    </tr>
                    <tr>
                        <td>Recreación</td>
                        <td className="budgetProgress">
                            <ProgressBar
                            animated now={65}
                            variant="warning"
                        />
                        </td>
                        <td>65.00 %</td>
                    </tr>
                    <tr>
                        <td>Ahorro</td>
                        <td className="budgetProgress">
                            <ProgressBar
                                animated now={45}
                                variant="success"
                            />
                        </td>
                        <td>45.00 %</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default MyBudget;