import React from 'react';
import {
    Form
} from 'react-bootstrap';
import '../styles/SummaryHeader.css';

const SummaryHeader = () => {
    return(
        <>
            <h3 className="col-4">Resumen Financiero</h3>
            <Form.Control as="select" custom className="offset-4 col-2">
                <option>Enero</option>
                <option>Diciembre</option>
                <option>Noviembre</option>
                <option>Octubre</option>
            </Form.Control>
            <Form.Control as="select" custom className="offset-1 col-1">
                <option>2020</option>
                <option>2021</option>
            </Form.Control>
        </>
    );
}

export default SummaryHeader;