//Const
const SALIR = "SALIR";
const INTEREST = 10;
const MAXINSTALLMENTS = 60;
const MAINSTALLMENTS = 1;
//Informacion del Cliente
class Customer {
  constructor(name, id, cantCredits) {
    this.name = name;
    this.id = id;
    this.cantCredits = cantCredits;
  }
}
const customers = [];

//Informacion del Credito

class Credit {
  constructor(requestedValue = 0, interestPayable = 0, installments = 0, totalToPay = 0, valueInstallments = 0, idCustomer = 0) {
    this.requestedValue = requestedValue;
    this.interestPayable = interestPayable;
    this.installments = installments;
    this.totalToPay = totalToPay;
    this.valueInstallments = valueInstallments;
    this.idCustomer = idCustomer;

  }

}

const credits = [];

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
  let nombre = prompt("Digite su nombre");
  let cedula = prompt(nombre + " \n Digite su cedula");
  let customerArrayID = customers.findIndex(element => element.id == cedula);

  if (customerArrayID == -1) {
    customerArrayID = customers.push(new Customer(nombre, cedula, 0)) - 1;
  }
  let currentCustomer = customers[customerArrayID]

  do {
    selectedOption = prompt(
      "Bienvenido " +
      currentCustomer.name +
      " \n 1: Solicitar Crediro \n 2: Mis Creditos \n 3: Menu anterior \n 4: Salir"
    );

    switch (selectedOption) {
      case "1":
        applyCredit(currentCustomer);
        break;

      case "2":
        creditList(currentCustomer);
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

const applyCredit = (currentCustomer) => {

  let credit = new Credit()
  let selectedOption = 0;
  credit.idCustomer = currentCustomer.id;
  do {
    credit.RequestedValue = parseInt(prompt("Monto a solicitar"));
    credit.installments = numInstallments();
    credit.interestPayable = CalculateInterest(credit.RequestedValue);
    credit.TotalToPay = credit.RequestedValue + credit.interestPayable;
    credit.ValueInstallment = credit.TotalToPay / credit.installments;
    selectedOption = parseInt(
      prompt(
        currentCustomer.name +
        "Estas Son las Condiciones del Credito \n" +
        "Valor a desembolsar: $" +
        credit.RequestedValue +
        "\nTotal a Pagar: $" +
        credit.TotalToPay +
        "\nInteres E.A: " +
        INTEREST +
        "%" +
        "\n" +
        credit.installments +
        " cuotas de: $" +
        credit.ValueInstallment +
        "\n" +
        "\n" +
        "1: ACEPTAR CREDITO\n 2: SIMULAR DE NUEVO\n 3:ATRAS"
      )
    );

    if (selectedOption == 1) {
      let customerArrayID = customers.indexOf(currentCustomer);
      customers[customerArrayID].cantCredits = customers[customerArrayID].cantCredits + 1;
      credits.push(credit);
      selectedOption = 0;
    } else if (selectedOption == 3) {
      selectedOption = 0;
    }
  } while (selectedOption != 0);
};

const creditList = (customer) => {
  if (customer.cantCredits == 0) {
    alert(customer.name + " No tiene creditos con nosotros");
    return

  }
  let msn = "";
  let totalToPay = 0;
  credits.forEach(element => {
    if(element.idCustomer == customer.id){
    totalToPay+= element.TotalToPay ;
    msn += "Valor desembolsado: $" +
      element.RequestedValue +
      "\nTotal a Pagar: $" +
      element.TotalToPay +
      "\nInteres E.A: " +
      INTEREST +
      "%" +
      "\n" +
      element.installments +
      " cuotas de: $" +
      element.ValueInstallment +
      "\n" +
      "===============================" +
      "\n"
    }
  });
  if (msn != "")
    alert(msn +"Total a pagar: $"+totalToPay + "\n");
}

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


    if (result < MAINSTALLMENTS) {
      msn =
        "El numero de cuotas no puede ser menor a " + MAINSTALLMENTS + " \n";
    } else if (result > MAXINSTALLMENTS) {
      msn =
        "El numero de cuotas no puede ser mayor a " + MAXINSTALLMENTS + " \n";
    }

    if (msn != "") alert(msn);
  } while (msn != "");
  return result;
};

logIn();
