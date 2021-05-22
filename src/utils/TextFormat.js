function determineTextClass(change) {
    let textClass = '';

    if(change >= 0){
        textClass = 'text-right text-success';
    } else{
        textClass = 'text-right text-danger';
    }

    return textClass;
}

function determineProgressColor(value) {
    let color = '';

    if(value <= 50){
        color = 'success';
    } else if(value >50 && value <=75){
        color = 'warning'
    } else{
        color = 'danger'
    }

    return color;
}

function getDateString(date){

    let dateString = '';

    let dateToFormat = new Date(date);

    dateToFormat = new Date(dateToFormat.setDate(dateToFormat.getDate() + 1));

    const day = dateToFormat.getDate();
    const month = dateToFormat.getMonth() + 1;
    const year = dateToFormat.getFullYear();

    dateString = `${day} / ${month} / ${year}`

    return dateString;

}

function convertStrAmountToNum(stringAmount){
    
    let amount = 0;

    if(stringAmount){
        amount = parseFloat(stringAmount.replace('$', '').replace(',','')).toFixed(2);
    } else {
        amount = 0
    }

    return amount;

}

export default determineTextClass;
export { 
    determineProgressColor,
    getDateString,
    convertStrAmountToNum
};