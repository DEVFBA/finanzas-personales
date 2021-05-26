async function userLogin(eMail, password) {

    let body = {
      email: `${eMail}`,
      password: `${password}`
    }

    const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/users/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const userData = await response.json();

    if(response.ok) {
      return userData;
    } else {
      return userData;
    }

}

async function retrieveUserProfile(token) {

  const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  const user = await response.json();

  return user;

}

async function retrieveUserProfileByID(token) {

  const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

    const user = await response.json();

    return user;

}

function completeLogin(eMail, password) {
  let completeLogin = false;

  if(eMail && password){
      completeLogin = true;
  } else {
      completeLogin = false;
  }

  return completeLogin;
}

function completeRegister(name, lastName, eMail, password) {
  let completeRegister = false;

  if(name && lastName && eMail && password){
      completeRegister = true;
  } else {
      completeRegister = false;
  }

  return completeRegister;
}

async function signUp(name, lastName, eMail, password) {

  const body = {

    userName: `${name}`,
    userLastName: `${lastName}`,
    email: `${eMail}`,
    password: `${password}`,
    profilePicture: `/images/default.png`

  }

  const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/users', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const userData = await response.json();

  if(response.ok) {
    return userData;
  } else {
    return userData;
  }  

}

async function retrieveUserGoals(token){

  const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/savingGoals', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

    const userGoals = await response.json();

    return userGoals;

}

async function retrieveUserTransactions(token){

  const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/transactions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

    const userTransactions = await response.json();

    return userTransactions;

}

async function retrieveUserInvestments(token){

  const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/investments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

    const investments = await response.json();

    return investments;
  
}

async function retrieveUserBudget(token){
  
  const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/budgets', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

    const userBudgets = await response.json();

    return userBudgets;

}

async function retrieveUserIncomes(token){
  
  const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/incomes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

    const userIncomes = await response.json();

    return userIncomes;

}

async function retrieveUserExpenses(token){
  
  const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/expenses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

    const userExpenses = await response.json();

    return userExpenses;

}

async function retrieveUserBankTransactions(token){
  
  const response = await fetch('https://personal-finance-mexico.herokuapp.com/v1/bankTransactions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

    const userBankTrans = await response.json();

    return userBankTrans;

}


export default userLogin;
export {
  retrieveUserProfile, 
  retrieveUserProfileByID,
  completeRegister,
  completeLogin,
  retrieveUserGoals,
  retrieveUserInvestments,
  retrieveUserBudget,
  signUp,
  retrieveUserIncomes,
  retrieveUserExpenses,
  retrieveUserTransactions,
  retrieveUserBankTransactions
};
