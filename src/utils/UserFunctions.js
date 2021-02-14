const users = [
    {
      userID: "aegh",
      userName: "Ángel Enrique",
      userLastName: "Gutiérrez Huerta",
      eMail: "angenrique.gutierrez@gmail.com",
      password: "admin",
      profilePicture: "/images/Angel.jpg",
      savingsGoals: [
        {
          goal: "Auto",
          amountSaved: 15000.00,
          totalObjective: 350000.00
        },
        {
          goal: "Casa",
          amountSaved: 150000.00,
          totalObjective: 500000.00
        },
        {
          goal: "Curso BEDU",
          amountSaved: 20000.00,
          totalObjective: 25000.00
        }
      ],
      investments: [
        {
          investingConcept: "CetesDirecto",
          investedAmount: 15000.00
        },
        {
          investingConcept: "GBM",
          investedAmount: 95000.00
        },
        {
          investingConcept: "Allianz Retiro",
          investedAmount: 250000.00
        },
        {
          investingConcept: "Allianz No Deducible",
          investedAmount: 350000.00
        }
      ],
      budget: [
        {
          concept: 'Alimentos',
          budgetedAmount: 8000,
          expendedAmount: 342.40
        },
        {
          concept: 'Mantenimiento Casa',
          budgetedAmount: 2500,
          expendedAmount: 750
        },
        {
          concept: 'Transporte',
          budgetedAmount: 3100,
          expendedAmount: 2480
        },
        {
          concept: 'Recreacion',
          budgetedAmount: 4000,
          expendedAmount: 2600
        },
        {
          concept: 'Ahorro',
          budgetedAmount: 8000,
          expendedAmount: 3600
        }
      ]
    },
    {
      userID: "dagh",
      userName: "Dulce Angélica",
      userLastName: "Gutiérrez Huerta",
      eMail: "dulce.angelica@hotmail.com",
      password: "Bo",
      profilePicture: "/images/Dulce.jpg",
      savingsGoals: [
        {
          goal: "Auto Nuevo",
          amountSaved: 17820.00,
          totalObjective: 250000.00
        },
        {
          goal: "Retiro",
          amountSaved: 400000.00,
          totalObjective: 5000000.00
        }
      ],
      investments: [
        {
          investingConcept: "CetesDirecto",
          investedAmount: 10000.00
        },
        {
          investingConcept: "GBM",
          investedAmount: 100000.00
        },
        {
          investingConcept: "Plan de Retiro",
          investedAmount: 250000.00
        }
      ],
      budget: [
        {
          concept: 'Alimentos',
          budgetedAmount: 10000,
          expendedAmount: 6400
        },
        {
          concept: 'Automóvil',
          budgetedAmount: 12000,
          expendedAmount: 500
        },
        {
          concept: 'Salud y Belleza',
          budgetedAmount: 2500,
          expendedAmount: 1750
        },
        {
          concept: 'Recreacion',
          budgetedAmount: 4000,
          expendedAmount: 3500
        },
        {
          concept: 'Ahorro',
          budgetedAmount: 6000,
          expendedAmount: 3600
        }
      ]
    },
    {
      userID: "ahm",
      userName: "Angélica",
      userLastName: "Huerta Morales",
      eMail: "ardilla_2709@gmail.com",
      password: "squirrel",
      profilePicture: "/images/Angelica.jpg",
      savingsGoals: [
        {
          goal: "Camioneta Nueva",
          amountSaved: 150000.00,
          totalObjective: 560000.00
        },
        {
          goal: "Mejoras Casa",
          amountSaved: 150000.00,
          totalObjective: 60000.00
        },
        {
          goal: "Retiro",
          amountSaved: 2000000.00,
          totalObjective: 2500000.00
        }
      ],
      investments: [
        {
          investingConcept: "Retiro",
          investedAmount: 1500000.00
        },
        {
          investingConcept: "Pagaré",
          investedAmount: 350000.00
        }
      ],
      budget: [
        {
          concept: 'Alimentos',
          budgetedAmount: 8000,
          expendedAmount: 4000
        },
        {
          concept: 'Mantenimiento Casa',
          budgetedAmount: 10000,
          expendedAmount: 2560
        },
        {
          concept: 'Transporte',
          budgetedAmount: 2500,
          expendedAmount: 1230
        },
        {
          concept: 'Recreacion',
          budgetedAmount: 4000,
          expendedAmount: 1200
        },
        {
          concept: 'Ahorro',
          budgetedAmount: 10000,
          expendedAmount: 8900
        }
      ]
    },
    {
      userID: "egt",
      userName: "Enrique",
      userLastName: "Gutiérrez Tovar",
      eMail: "egutierrez@gtcta.mx",
      password: "GTCTA",
      profilePicture: "/images/Enrique.jpg",
      savingsGoals: [
        {
          goal: "Auto",
          amountSaved: 15000.00,
          totalObjective: 350000.00
        },
        {
          goal: "Retiro",
          amountSaved: 1500000.00,
          totalObjective: 5500000.00
        },
        {
          goal: "Crecimiento Empresarial",
          amountSaved: 200000.00,
          totalObjective: 500000.00
        },
        {
          goal: "Vacaciones",
          amountSaved: 25600.00,
          totalObjective: 52500.00
        }
      ],
      investments: [
        {
          investingConcept: "UDI Bonos",
          investedAmount: 150000.00
        },
        {
          investingConcept: "Forex",
          investedAmount: 956000.00
        },
        {
          investingConcept: "Plan de Retiro",
          investedAmount: 2500000.00
        }
      ],
      budget: [
        {
          concept: 'Alimentos',
          budgetedAmount: 8000,
          expendedAmount: 4500
        },
        {
          concept: 'Transporte',
          budgetedAmount: 3100,
          expendedAmount: 2300
        },
        {
          concept: 'Recreacion',
          budgetedAmount: 4000,
          expendedAmount: 1500
        },
        {
          concept: 'Ahorro',
          budgetedAmount: 8000,
          expendedAmount: 3600
        }
      ]
    },
    {
      userID: "ragh",
      userName: "Ricardo Antonio",
      userLastName: "Gutiérrez Huerta",
      eMail: "elenano@yahoo.com",
      password: "enano",
      profilePicture: "/images/Ricardo.jpg",
      savingsGoals: [
        {
          goal: "Auto",
          amountSaved: 15000.00,
          totalObjective: 350000.00
        },
        {
          goal: "Casa",
          amountSaved: 150000.00,
          totalObjective: 500000.00
        },
        {
          goal: "Universidad",
          amountSaved: 150000.00,
          totalObjective: 750000.00
        }
      ],
      investments: [
        {
          investingConcept: "CetesDirecto",
          investedAmount: 70000.00
        },
        {
          investingConcept: "GBM",
          investedAmount: 100000.00
        },
        {
          investingConcept: "Acciones",
          investedAmount: 257000.00
        }
      ],
      budget: [
        {
          concept: 'Alimentos',
          budgetedAmount: 8000,
          expendedAmount: 2300
        },
        {
          concept: 'Juegos PlayStation',
          budgetedAmount: 1200,
          expendedAmount: 750
        },
        {
          concept: 'Recreacion',
          budgetedAmount: 2000,
          expendedAmount: 1200
        },
        {
          concept: 'Ahorro',
          budgetedAmount: 8000,
          expendedAmount: 3600
        }
      ]
    }
  ]

function userLogin(eMail, password) {

    let correctLogin = false;

    const user = users.filter((user) => user.eMail === eMail && user.password === password) // Fetch to Users API Method should be here

    if(user.length > 0){
        correctLogin = true;
    } else{
        correctLogin = false;
    }

    return correctLogin;

}

function retrieveUserProfile(eMail, password) {
    const user = users.filter((user) => user.eMail === eMail && user.password === password)

    return user[0];
}

function retrieveUserProfileByID(userId) {
  const user = users.filter((user) => user.userID === userId)

  return user[0];
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

function completeLogin(eMail, password) {
  let completeLogin = false;

  if(eMail && password){
      completeLogin = true;
  } else {
      completeLogin = false;
  }

  return completeLogin;
}


export default userLogin;
export {
  retrieveUserProfile, 
  retrieveUserProfileByID,
  completeRegister,
  completeLogin
};
