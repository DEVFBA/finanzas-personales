import React from 'react';
import FormSelect from './FormSelect';
import '../styles/SummaryHeader.css';

const SummaryHeader = (props) => {
    return(
        <>
            <h3 className="col-4">Resumen Financiero</h3>
            <FormSelect
                options={props.months}
                className="offset-4 col-2 summary-header-select"
            >
            </FormSelect>
            <FormSelect
                options={props.years}
                className="offset-1 col-1 summary-header-select"
            >
            </FormSelect>
        </>
    );
}

export default SummaryHeader;