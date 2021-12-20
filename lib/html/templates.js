const loginEmail = (token, groupname) => {
  return {
    subject: "Písemkář - potvrzení emailu",
    html: `
    <div style="font-family: Arial, Helvetica, sans-serif">
      <h2>Ověření vašeho emailu</h2>
      <p>
        Pokud jste se nedávno pokoušeli připojit do skupiny: ${groupname} v aplikaci Písemkář kliknětě na
        tlačítko ověřit email a poté se přesuňte zpátky do aplikace
      </p>
      <div style="display: flex; justify-content: center; width: 100%">
        <button  style="background-color: #4caf50;
          border: none;
          color: white;
          padding: 5px 14px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 18px;
          margin: 4px 2px;
          transition-duration: 0.4s;
          cursor: pointer;
          background-color: white;
          border: 2px solid #008cba;
          border-radius: 10px;
          background-color: #008cba;
          color: white;
        ">
          <a style="color: white" href="https://testar-server.herokuapp.com/auth/login_email_verification?token=${token}">Ověřit email</a>
        </button>
      </div>
      <p id="verified" style="font-size: 18px; color: green"></p>
    </div>
     
    `,
  };
};
const registerEmail = (token, groupname) => {
  return {
    subject: "Písemkář - potvrzení emailu",
    html: `
    <div style="font-family: Arial, Helvetica, sans-serif">
      <h2>Ověření vašeho emailu</h2>
      <p>
        Pokud jste se nedávno pokoušeli vytvořit skupinu ${groupname} v aplikaci Písemkář kliknětě na
        tlačítko ověřit email a poté se přesuňte zpátky do aplikace
      </p>
      <div style="display: flex; justify-content: center; width: 100%">
        <button  style="background-color: #4caf50;
          border: none;
          color: white;
          padding: 5px 14px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 18px;
          margin: 4px 2px;
          transition-duration: 0.4s;
          cursor: pointer;
          background-color: white;
          border: 2px solid #008cba;
          border-radius: 10px;
          background-color: #008cba;
          color: white;
        ">
          <a style="color: white" href="https://testar-server.herokuapp.com/auth/create_group_email_verification?token=${token}">Ověřit email</a>
        </button>
      </div>
      <p id="verified" style="font-size: 18px; color: green"></p>
    </div>
    `,
  };
};
const landingPageRegister = (user, groupname) => {
  return `<html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Potvrzení emailu</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <style>
          body {
            padding-top: 50px;
          }
        </style>
      </head>
      <body style="background-color: black; color: white;">
        <!-- Begin page content -->
        <main role="main" class="container">
          <h2 class="mt-5">Váš email ověřen: ${user.email}</h2>
          <p class="lead">
            Úspěšně se vám podařilo vytvořit skupinu s názvem : <b>${groupname}<b>, </br>
            nyní můžete pozvat ostatní tím, že jim řeknete její jméno. 
          </p>
          <p>Děkujeme za spolupráci </p>
        </main>
    
        <footer class="footer">
          <div class="container">
            <span class="text-muted">david.kristek05@gmail.com</span>
          </div>
        </footer>
      </body>
    </html>
    `;
};
const landingPageLogin = (user, groupname) => {
  return `<html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Potvrzení emailu</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <style>
          body {
            padding-top: 50px;
          }
        </style>
      </head>
      <body style="background-color: black; color: white;">
        <!-- Begin page content -->
        <main role="main" class="container">
          <h2 class="mt-5">Váš email ověřen: ${user.email}</h2>
          <p class="lead">
            Úspěšně jste o ověřili váš email a připojili jste se do skupiny s názvem : <b>${groupname}<b>, </br>
            nyní se můžete přesunout do aplikace
          </p>
          <p>Děkujeme za spolupráci </p>
        </main>
    
        <footer class="footer">
          <div class="container">
            <span class="text-muted">david.kristek05@gmail.com</span>
          </div>
        </footer>
      </body>
    </html>
    `;
};

export { landingPageRegister, landingPageLogin, loginEmail, registerEmail };
