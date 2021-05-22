async function completeGoal(goal, targetAmount, targetDate) {

    let completeGoal = false;
    
    //Remember to get back and fight with this sh**%y dates

    if(goal && targetAmount && (new Date(targetDate) > new Date())){
        completeGoal = true;
    } else {
        completeGoal = false;
    }
  
    return completeGoal;

}

async function completeUpdateInvestment(investedAmount, investmentTotal) {

    let completeGoal = false;

    if(investedAmount && investmentTotal){
        completeGoal = true;
    } else {
        completeGoal = false;
    }
  
    return completeGoal;

}

async function completeInvestment(broker, instrument, investedAmount, total) {

    let completeInvestment = false;
    
    //Remember to get back and fight with this sh**%y dates

    if(broker && instrument && investedAmount && total){
        completeInvestment = true;
    } else {
        completeInvestment = false;
    }
  
    return completeInvestment;

}

async function completeUpdate(targetAmount) {

    let completeGoal = false;

    if(targetAmount){
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

async function deleteGoal(savingGoalID, token){

    const response = await fetch(`https://personal-finance-mexico.herokuapp.com/v1/savingGoals/${savingGoalID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(response);

}

async function updateGoal(targetAmount, savedAmount, token, savingGoalID){

    const body = {
        amountSaved: savedAmount,
        targetAmount: targetAmount
    }

    console.log('Body', body);

    const response = await fetch(`https://personal-finance-mexico.herokuapp.com/v1/savingGoals/${savingGoalID}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(response);

}

async function saveInvestment(broker, instrument, investedAmount, investmentTotal, token){

    const body = {
        investingCompany: broker,
        investingInstrument: instrument,
        investedAmount: investedAmount,
        total: investmentTotal
    }

    const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/investments', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    const investmentData = await response.json();

    if(response.ok) {
        return investmentData;
    } else {
        return investmentData;
    }  
    
}

async function updateInvestment(investedAmount, investmentTotal, investmentID, token){

    const body = {
        investedAmount: investedAmount,
        total: investmentTotal
    }

    const response = await fetch(`https://personal-finance-mexico.herokuapp.com/v1/investments/${investmentID}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(response);

}

async function deleteInvestment(investmentID, token){

    const response = await fetch(`https://personal-finance-mexico.herokuapp.com/v1/investments/${investmentID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(response);

}

export default completeGoal;
export {
    saveGoal,
    deleteGoal,
    completeUpdate,
    updateGoal,
    completeInvestment,
    saveInvestment,
    deleteInvestment,
    completeUpdateInvestment,
    updateInvestment
}