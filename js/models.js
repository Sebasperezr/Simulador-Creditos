let customers = [];
let credits = [];

if(localStorage.getItem('customers')){
  customers = JSON.parse(localStorage.getItem('customers'))
}
if(localStorage.getItem('credits')){
  credits = JSON.parse(localStorage.getItem('credits'))
}
 class Customer {
    constructor(name, id, cantCredits) {
      this.name = name;
      this.id = id;
      this.cantCredits = cantCredits;
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
 export{Customer,Credit,customers,credits};