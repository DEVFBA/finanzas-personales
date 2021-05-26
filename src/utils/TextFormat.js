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

function completeString(string){

    string = String(string);

    let newString = '';

    if(string.length === 1){
        newString = '0' + string;
    } else {
        newString = string;
    }

    return newString;

}

function getDateString(date){

    let dateString = '';

    let dateToFormat = new Date(date);

    dateToFormat = new Date(dateToFormat.setDate(dateToFormat.getDate() + 1));

    const day = completeString(dateToFormat.getDate());
    const month = completeString(dateToFormat.getMonth() + 1);
    const year = dateToFormat.getFullYear();

    dateString = `${day}/${month}/${year}`

    return dateString;

}

function unformatDate(dateString){

    let date;
    
    const year      = dateString.slice(6, 10);
    const month     = dateString.slice(3, 5);
    const day       = dateString.slice(0, 2);

    date = year + '-' + month + '-' + day;

    return date;

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

function recurringString(recurring){
    
    let string = '';

    recurring ? string = 'Recurrente' : string = 'No Recurrente';

    return string;

}

export default determineTextClass;
export { 
    determineProgressColor,
    getDateString,
    convertStrAmountToNum,
    recurringString,
    unformatDate
};