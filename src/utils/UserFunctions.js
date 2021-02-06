const users = [
    {
      userName: "Ángel Enrique",
      userLastName: "Gutiérrez Huerta",
      eMail: "angenrique.gutierrez@gmail.com",
      password: "admin",
      profilePicture: "/images/Angel.jpg"
    },
    {
      userName: "Dulce Angélica",
      userLastName: "Gutiérrez Huerta",
      eMail: "dulce.angelica@hotmail.com",
      password: "Bo",
      profilePicture: "/images/Dulce.jpg"
    },
    {
      userName: "Angélica",
      userLastName: "Huerta Morales",
      eMail: "ardilla_2709@gmail.com",
      password: "squirrel",
      profilePicture: "/images/Angelica.jpg"
    },
    {
      userName: "Enrique",
      userLastName: "Gutiérrez Tovar",
      eMail: "egutierrez@gtcta.mx",
      password: "GTCTA",
      profilePicture: "/images/Enrique.jpg"
    },
    {
      userName: "Ricardo Antonio",
      userLastName: "Gutiérrez Huerta",
      eMail: "elenano@yahoo.com",
      password: "enano",
      profilePicture: "/images/Ricardo.jpg"
    },
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

export default userLogin;
export {retrieveUserProfile};
