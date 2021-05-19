function completeGoal(goal, targetAmount, targetDate) {

    let completeGoal = false;
    
    //Remember to get back and fight with this sh**%y dates

    if(goal && targetAmount && (new Date(targetDate) > new Date())){
        completeGoal = true;
    } else {
        completeGoal = false;
    }
  
    return completeGoal;

}

async function saveGoal(goal, targetAmount, savedAmount, targetDate, token){

    const body = {
        goal: goal,
        amountSaved: savedAmount,
        targetAmount: targetAmount,
        targetDate: targetDate
    }

    const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/savingGoals', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    const goalData = await response.json();

    if(response.ok) {
        return goalData;
    } else {
        return goalData;
    }  
    
}

export default completeGoal;
export {
    saveGoal
}