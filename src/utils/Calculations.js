function calcChange(latest, previous) {
    return (
        (latest - previous).toFixed(2)
    );
}

function calcPercChange(change, previous) {
    return(
        ((change / previous) * 100).toFixed(2)
    );
}

export default calcChange;
export {calcPercChange};
