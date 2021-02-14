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

export default determineTextClass;
export { determineProgressColor };