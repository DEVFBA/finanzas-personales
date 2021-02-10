import React from 'react';

const Quote = (props) => {
    return(
        <>
            <h4>{props.quote}</h4>
            <p className="text-right">{props.value}</p>
            <p className={ props.textClass }>
                ({props.change})
            </p>
            <p className={ props.textClass }>
                ({props.percentageChange} %)
            </p>
        </>
    );
}

export default Quote;