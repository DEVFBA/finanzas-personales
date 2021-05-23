import React from 'react';
import {
    Table,
    ProgressBar
} from 'react-bootstrap';

import {
    calcPercChange
} from '../utils/Calculations.js';
import {
    determineProgressColor
} from '../utils/TextFormat.js';

import '../styles/MyBudget.css';

const MyBudget = (props) => {
    return(
        <>
            <h5 className="text-center">Mi Presupuesto</h5>
            <Table 
                responsive="md" 
                striped
                className="summary-table"
            >
                <tbody>

                    {props.userBudget.map((concept) => {

                        const percentageExpended    = calcPercChange(concept.expendedAmount, concept.budgetedAmount);
                        const progressColor         = determineProgressColor(percentageExpended);

                        return(
                            <tr
                                key = { concept._id }
                            >
                                <td>{ concept.concept }</td>
                                <td
                                    className="budgetProgress"
                                >
                                    <ProgressBar
                                        animated 
                                        now         = { percentageExpended }
                                        variant     = { progressColor }
                                        min         = "0"
                                        max         = "100"
                                    />
                                </td>
                                <td 
                                    className="td-percentage"
                                >
                                    { `${ percentageExpended } %` }
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </Table>
        </>
    );
}

export default MyBudget;