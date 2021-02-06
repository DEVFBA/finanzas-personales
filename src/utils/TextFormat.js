function determineTextClass(change) {
    let textClass = '';

    if(change >= 0){
        textClass = 'text-right text-success';
    } else{
        textClass = 'text-right text-danger';
    }

    return textClass;
}

export default determineTextClass;