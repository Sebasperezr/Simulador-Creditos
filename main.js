//Const
const SALIR = "SALIR";
const INTERES = 5;
const MAXINSTALLMENTS = 60;
//Informacion del Cliente
let nombre = "";
let cedula = "";

//Informacion del Credito
let RequestedValue = 0;
let interestPayable = 0;
let installments = 0;
let TotalToPay = 0;

const logIn = () => {
  let selectedOption = "";
  do {
    selectedOption = prompt(
      "Digite\n" + "1: Administrador\n" + "2: Cliente\n" + "3: Salir"
    );

    switch (selectedOption) {
      case "1":
        let resultMenuAdmin = menuAdmin();
        if (resultMenuAdmin == SALIR) {
          exitMessage();
          return;
        }
        break;

      case "2":
        let resultMenuClient = menuClient();
        if (resultMenuClient == SALIR) {
          exitMessage();
          return;
        }
        break;

      case "3":
        exitMessage();
        break;

      default:
        alert("opcion invalida");
        break;
    }
  } while (selectedOption != "3");
};

const menuAdmin = () => {
  let selectedOption = prompt(
    "Binevenido al modulo e administrador.\n El modulo esta en contrucccion \n  0: Salir \n Cualquier tecla Regresar al menu anterior."
  );
  if (selectedOption == "0") selectedOption = SALIR;
  return selectedOption;
};

const menuClient = () => {
  let selectedOption = "";
  nombre = prompt("Digite su nombre");
  cedula = prompt(nombre + " \n Digite su cedula");

  do {
    selectedOption = prompt(
      "Bienvenido " +
        nombre +
        " \n 1: Solicitar Crediro \n 2: Mis Creditos \n 3: Menu anterior \n 4: Salir"
    );

    switch (selectedOption) {
      case "1":
        applyCredit();
        break;

      case "2":
        creditList();
        break;
      case "3":
        break;
      case "4":
        return SALIR;

      default:
        alert("opcion invalida");
        break;
    }
  } while (selectedOption != "3");
};

const applyCredit = () => {

  RequestedValue = parseInt(prompt("Monto a solicitar"));
  installments = numInstallments()
  interestPayable = CalculateInterest()
};
const creditList = () => alert("creditList");
const CalculateInterest = () => alert("CalculateInterest");

const exitMessage = () => alert("Fue un placer atenderlo");

const numInstallments = () => {
  let msn = "";
  let result = 0;
  do {
    msn = "";
    result = parseInt(
      prompt("Numero de Cuotas, No puede ser mayor a 60 ni menor a 1")
    );

    if (!isNaN(installments)) {
      installments = 1;
    }
    if (installments < 1) {
      msn = "El numero de cuotas no puede ser menor a 1 \n";
    } else if (installments > 60) {
      msn = msn + "El numero de cuotas no puede ser mayor a 60 \n";
    }
    if (msn != "") alert(msn);
  } while (msn != "");
  return result;
};

logIn();
