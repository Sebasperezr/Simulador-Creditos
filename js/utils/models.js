

//Son las clases que se usan en el proyecto 
 class Customer {
    constructor(name, dni, cantCredits, id) {
      this.name = name;
      this.id = id;
      this.cantCredits = cantCredits;
      this.dni = dni;

    }
  }


  class Credit {
    constructor(requestedValue = 0, interestPayable = 0, installments = 0, totalToPay = 0, valueInstallments = 0, idCustomer = 0,interest=0) {
      this.requestedValue = requestedValue;
      this.interestPayable = interestPayable;
      this.installments = installments;
      this.totalToPay = totalToPay;
      this.valueInstallments = valueInstallments;
      this.interest = interest
      this.idCustomer = idCustomer;
  
    }
  
  }
 export{Credit};
 export{Customer};