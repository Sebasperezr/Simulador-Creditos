import { Customer, customers, Credit, credits } from './utils/models.js';
import { INTEREST, MAXINSTALLMENTS, MINISTALLMENTS } from './utils/constantes.js';

const buttonLogin = document.getElementById("buttonLogin");
const buttonGetCredit = document.getElementById("buttonGetCredit");
const buttonListCredit = document.getElementById("buttonCreditList");
const buttonGetMenu1 = document.getElementById("buttonGetMenu1");
const buttonGetMenu2 = document.getElementById("buttonGetMenu2");




const sectionMenu = document.getElementById("menu");
const sectionLogin = document.getElementById("login");
const sectionCreditList = document.getElementById("creditList");
const sectionGetCredit = document.getElementById("getCredit");
const sectionShowCreditInfo = document.getElementById("showCreditInfo");

const instalmentsRange = document.getElementById("installmentsRange");


let currentCustomer;
let credit;


// const computedLocale = Intl.Locale.toString;
// let currencyLocale = Intl.NumberFormat("computedLocale");


const getCredit = () => {
   sectionGetCredit.style.display = "";
   instalmentsRange.min = MINISTALLMENTS;
   instalmentsRange.value = MINISTALLMENTS;
   instalmentsRange.max = MAXINSTALLMENTS;
   sectionMenu.style.display = "none";
   sectionGetCredit.style.display = "";

   let requestedValue = document.getElementById("requestedValue");
   let buttonNextGetCredit = document.getElementById("buttonNextGetCredit");
   buttonNextGetCredit.addEventListener("click", () => { calculateCredit(requestedValue.value, instalmentsRange.value); showCredit(credit) });


}
const calculateCredit = (requestedValue, instalments) => {

   credit = new Credit();
   credit.idCustomer = currentCustomer.id;
   credit.requestedValue = parseInt(requestedValue);
   credit.installments = parseInt(instalments);
   credit.interestPayable = (credit.requestedValue * INTEREST * credit.installments) / 100;
   credit.totalToPay = credit.requestedValue + credit.interestPayable;
   credit.valueInstallments = credit.totalToPay / credit.installments;
   credit.interest = INTEREST



};
const showCredit = (credit) => {

   sectionShowCreditInfo.style.display = ""
   sectionGetCredit.style.display = "none"

   let aux = document.getElementById("rowCreditInfo");
   if (aux != null)
      aux.remove()




   let creditInfo = document.createElement("div")
   creditInfo.id = "rowCreditInfo";
   creditInfo.className = "row"

   creditInfo.innerHTML = '<div class="mb-3 text-center">'
      + '    <label id="customerName" class="form-label text-center">' + currentCustomer.name + '</label>'
      + '</div>'
      + '<div class="mb-3 col-6">'
      + '    <label for="requestedValueR" class="form-label">Valor a desembolsar</label>'
      + '    <input type="number" class="form-control" id="requestedValueR" value="' + credit.requestedValue + '" disabled>'
      + '</div>'

      + '<div class="mb-3 col-6">'
      + '    <label for="totalToPay" class="form-label">Total a Pagar</label>'
      + '    <input type="number" class="form-control" id="totalToPay" value="' + credit.totalToPay + '" disabled>'
      + '</div>'

      + '<div class="mb-3 col-3">'
      + '    <label for="interest" class="form-label">Interes</label>'
      + '    <input type="text" class="form-control" id="interest" value="' + credit.interest + '%"  disabled>'
      + '</div>'

      + '<div class="mb-3 col-3 ">'
      + '    <label for="installments" class="form-label">N° cuotas</label>'
      + '    <input type="number" class="form-control" id="installments" value="' + credit.installments + '" disabled>'
      + '</div>'

      + '<div class="mb-3 col-6">'
      + '    <label for="valueInstallment" class="form-label">Valor de la Cuota</label>'
      + '    <input type="number" class="form-control" id="valueInstallment" value="' + credit.valueInstallments + '" disabled>'
      + '</div>';
   document.getElementById("creditInfoFather").appendChild(creditInfo)


   let buttonAproveCredit = document.getElementById("buttonAproveCredit");
   let buttonRejectCredit = document.getElementById("buttonRejectCredit");
   buttonAproveCredit.addEventListener("click", () => {
      credits.push(credit)
      localStorage.setItem('credits', JSON.stringify(credits))
      sectionShowCreditInfo.style.display = "none";
      getMenu()
   });
   buttonRejectCredit.addEventListener("click", () => {
      sectionShowCreditInfo.style.display = "none";
      getCredit()
   });


};



const creditList = () => {


   sectionMenu.style.display = "none";
   sectionCreditList.style.display = "";

   credits.forEach(element => {
      if (element.idCustomer == currentCustomer.id) {



         console.log("si es")

         let creditList = document.createElement("div")
         creditList.id = "cardCredit";
         creditList.className = "col-12  m-1 p-2"
         creditList.style.width = "18rem"
         creditList.innerHTML = '<div class="card">'
            + '    <h5 class="card-title">$' + element.totalToPay + '</h5>'
            + '    <h6 class="card-subtitle mb-2 text-muted">Total a pagar</h6>'
            + '    <p class="card-text mb-0">Monto desembolsado: $' + element.requestedValue + ' </p>'
            + '    <p class="card-text mb-0">N° cuotas: ' + element.installments + '</p>'
            + '    <p class="card-text mb-0">Valor cuota: $' + element.valueInstallments + '</p>'
            + '    <p class="card-text mb-0">Interes: ' + element.interest + '% </p>'
            + '</div>'

         document.getElementById("divCreditList").appendChild(creditList)
      }
   });

}


const getCustomerInfo = () => {
   validLogin();
   let customer = new Customer();
   customer.name = document.getElementById("name").value;
   customer.id = document.getElementById("idUser").value;

   let customerArrayID = customers.findIndex(element => element.id == customer.id);

   if (customerArrayID == -1) {
      customer.cantCredits = 0;
      customerArrayID = customers.push(customer) - 1;
      localStorage.setItem('customers', JSON.stringify(customers))
   }
   currentCustomer = customers[customerArrayID]

   sectionLogin.style.display = "none";
   sectionMenu.style.display = "";
}



const getMenu = () => {

   sectionMenu.style.display = "";
   sectionLogin.style.display = "none";
   sectionCreditList.style.display = "none";
   sectionGetCredit.style.display = "none";
}



 
 

buttonGetMenu1.addEventListener("click", getMenu);
buttonGetMenu2.addEventListener("click", getMenu);
buttonLogin.addEventListener("click", getCustomerInfo);
buttonGetCredit.addEventListener("click", getCredit);
buttonListCredit.addEventListener("click", creditList);

instalmentsRange.addEventListener("mousemove", function () { document.getElementById("numInstallments").innerHTML = instalmentsRange.value });
instalmentsRange.addEventListener("touchmove", function () { document.getElementById("numInstallments").innerHTML = instalmentsRange.value });