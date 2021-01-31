import React from 'react';

const Quote = (props) => {
    return(
        <>
            <h4>{props.quote}</h4>
            <p className="text-right">{props.value}</p>
            <p className="text-right text-success">({props.change} %)</p>
            <p className="text-right text-success">({props.percentageChange} %)</p>
        </>
    );
}

export default Quote;