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

    let completeInvestment = false;

    if(investedAmount && investmentTotal){
        completeInvestment = true;
    } else {
        completeInvestment = false;
    }
  
    return completeInvestment;

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

async function completeIncome(concept, incomeAmount) {

    let completeIncome = false;
    
    //Remember to get back and fight with this sh**%y dates

    if(concept && incomeAmount){
        completeIncome = true;
    } else {
        completeIncome = false;
    }
  
    return completeIncome;

}

async function completeExpense(concept, expenseAmount) {

    let completeExpense = false;
    
    //Remember to get back and fight with this sh**%y dates

    if(concept && expenseAmount){
        completeExpense = true;
    } else {
        completeExpense = false;
    }
  
    return completeExpense;

}

async function saveIncome(concept, incomeAmount, recurring, token){

    const body = {
        concept: concept,
        incomeAmount: incomeAmount,
        recurring: recurring
    }

    const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/incomes', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    const incomeData = await response.json();

    if(response.ok) {
        return incomeData;
    } else {
        return incomeData;
    }  
    
}

async function deleteIncome(incomeID, token){

    const response = await fetch(`https://personal-finance-mexico.herokuapp.com/v1/incomes/${incomeID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(response);

}

async function updateIncome(incomeAmount, recurring, incomeID, token){

    const body = {
        incomeAmount: incomeAmount,
        recurring: recurring
    }

    console.log('Body', body);

    const response = await fetch(`https://personal-finance-mexico.herokuapp.com/v1/incomes/${incomeID}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(response);

}

async function completeUpdateIncome(incomeAmount) {

    let completeIncome = false;

    if(incomeAmount){
        completeIncome = true;
    } else {
        completeIncome = false;
    }
  
    return completeIncome;

}

async function saveExpense(concept, expenseAmount, recurring, token){

    const body = {
        concept: concept,
        expenseAmount: expenseAmount,
        recurring: recurring
    }

    const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/expenses', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    const expenseData = await response.json();

    if(response.ok) {
        return expenseData;
    } else {
        return expenseData;
    }  
    
}

async function deleteExpense(expenseID, token){

    const response = await fetch(`https://personal-finance-mexico.herokuapp.com/v1/expenses/${expenseID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(response);

}

async function completeUpdateExpense(expenseAmount) {

    let completeExpense = false;

    if(expenseAmount){
        completeExpense = true;
    } else {
        completeExpense = false;
    }
  
    return completeExpense;

}

async function updateExpense(expenseAmount, recurring, expenseID, token){

    const body = {
        expenseAmount: expenseAmount,
        recurring: recurring
    }

    console.log('Body', body);

    const response = await fetch(`https://personal-finance-mexico.herokuapp.com/v1/expenses/${expenseID}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(response);

}

async function completeTransaction(type, concept, description, amount, date, origin) {

    let completeTransaction = false;
    
    //Remember to get back and fight with this sh**%y dates

    if(type && concept && description && amount && date && origin){
        completeTransaction = true;
    } else {
        completeTransaction = false;
    }
  
    return completeTransaction;

}

async function saveTransaction(type, concept, date, description, amount, recurring, origin, accountNumber, token){

    const body = {
        type: type,
        concept: concept,
        description: description,
        amount: amount,
        recurring: recurring,
        date: date,
        origin: origin,
        accountNumber: accountNumber
    }

    console.log('Body ', body);

    const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/transactions', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    const transactionData = await response.json();

    if(response.ok) {
        return transactionData;
    } else {
        return transactionData;
    }  
    
}

async function saveTransactionFromBank(body, token){

    console.log('Body Bank ', body);

    const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/transactions', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    const transactionData = await response.json();

    if(response.ok) {
        return transactionData;
    } else {
        return transactionData;
    }  
    
}

async function updateTransaction(body, transactionID, token){

    const response = await fetch(`https://personal-finance-mexico.herokuapp.com/v1/transactions/${transactionID}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(response);

}

async function deleteTransaction(transactionID, token){

    const response = await fetch(`https://personal-finance-mexico.herokuapp.com/v1/transactions/${transactionID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(response);

}

async function updateBankTransaction(body, id, token){

    const response = await fetch(`https://personal-finance-mexico.herokuapp.com/v1/bankTransactions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
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
    updateInvestment,
    completeIncome,
    saveIncome,
    deleteIncome,
    updateIncome,
    completeUpdateIncome,
    completeExpense,
    saveExpense,
    deleteExpense,
    completeUpdateExpense,
    updateExpense,
    completeTransaction,
    saveTransaction,
    deleteTransaction,
    updateTransaction,
    saveTransactionFromBank,
    updateBankTransaction
}