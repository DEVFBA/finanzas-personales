import React from 'react';
import {
    Form
} from 'react-bootstrap';
import '../styles/FormSelect.css';

const FormSelect = (props) => {
    return(
        <Form.Control
        as="select"
        custom
        className={props.className}
        >
            {props.options.map((option) => {
                return(
                    <option>{option}</option>
                );
            })}
        </Form.Control>
    );
}

export default FormSelect;