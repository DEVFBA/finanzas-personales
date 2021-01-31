import React from 'react';
import {
    Form,
    Row
} from 'react-bootstrap';
import '../styles/Overview.css';

const Overview = () => {
    return(
        <Row className="overview justify-content-between ml-2">
                <h3 className="col-2">Panorama</h3>
                <Form.Control as="select" custom className="col-2">
                    <option>Enero</option>
                    <option>Febrero</option>
                    <option>Marzo</option>
                    <option>Abril</option>
                </Form.Control>
        </Row>
    );
}

export default Overview;