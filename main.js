//Const
const SALIR = "SALIR";
const INTEREST = 10;
const MAXINSTALLMENTS = 60;
const MAINSTALLMENTS = 1;
//Informacion del Cliente
let nombre = "";
let cedula = "";

//Informacion del Credito
let RequestedValue = 0;
let interestPayable = 0;
let installments = 0;
let TotalToPay = 0;
let ValueInstallment = 0;
let cantCredits = 0;

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
  let selectedOption = 0;
  do {
    RequestedValue = parseInt(prompt("Monto a solicitar"));
    installments = numInstallments();
    interestPayable = CalculateInterest(RequestedValue);
    TotalToPay = RequestedValue + interestPayable;
    ValueInstallment = TotalToPay / installments;
    selectedOption = parseInt(
      prompt(
        nombre +
          "Estas Son las Condiciones del Credito \n" +
          "Valor a desembolsar: $" +
          RequestedValue +
          "\nTotal a Pagar: $" +
          TotalToPay +
          "\nInteres E.A: " +
          INTEREST +
          "%" +
          "\n" +
          installments +
          " cuotas de: $" +
          ValueInstallment +
          "\n" +
          "\n" +
          "1: ACEPTAR CREDITO\n 2: SIMULAR DE NUEVO\n 3:ATRAS"
      )
    );

    if (selectedOption == 1) {
      cantCredits = cantCredits + 1;
      alert("Credito aprobado por valor de " + RequestedValue);
      selectedOption = 0;
    } else if (selectedOption == 3) {
      selectedOption = 0;
    }
  } while (selectedOption != 0);
};

const creditList = () =>
  alert(nombre + " tiene " + cantCredits + " creditos con nosotros");
const exitMessage = () => alert("Fue un placer atenderlo");
const CalculateInterest = (RequestedValue) => {
  return (RequestedValue * INTEREST) / 100;
};

const numInstallments = () => {
  let msn = "";
  let result = 0;
  do {
    msn = "";
    result = parseInt(
      prompt(
        "Numero de Cuotas, No puede ser mayor a " +
          MAXINSTALLMENTS +
          " ni menor a " +
          MAINSTALLMENTS
      )
    );

    if (isNaN(result)) {
      result = MAINSTALLMENTS;
    }
    console.log(result);

    if (result < MAINSTALLMENTS) {
      msn =
        "El numero de cuotas no puede ser menor a " + MAINSTALLMENTS + " \n";
    } else if (result > MAXINSTALLMENTS) {
      msn =
        "El numero de cuotas no puede ser mayor a " + MAXINSTALLMENTS + " \n";
    }
    console.log(msn);
    if (msn != "") alert(msn);
  } while (msn != "");
  return result;
};

logIn();
