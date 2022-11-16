import { Customer, Credit } from './utils/models.js';
import { alert, icons, position, toast } from './utils/alert.js';
import { spinner } from './utils/spinner.js';
import { INTEREST, MAXINSTALLMENTS, MINISTALLMENTS } from './utils/constantes.js';
import { findByDni, save as saveCustomer, update as updateCustomer, findById } from './service/customerService.js';
import { save as saveCredit, list as listCredit } from './service/creditService.js';


//Elementos globales del DOM
const buttonLogin = document.getElementById("buttonLogin");
const buttonGetCredit = document.getElementById("buttonGetCredit");
const buttonListCredit = document.getElementById("buttonCreditList");
const buttonGetMenu1 = document.getElementById("buttonGetMenu1");
const buttonGetMenu2 = document.getElementById("buttonGetMenu2");
const buttonExit = document.getElementById("buttonExit");
const instalmentsRange = document.getElementById("installmentsRange");

const sectionMenu = document.getElementById("menu");
const sectionLogin = document.getElementById("login");
const sectionCreditList = document.getElementById("creditList");
const sectionGetCredit = document.getElementById("getCredit");
const sectionShowCreditInfo = document.getElementById("showCreditInfo");



let currentCustomer = undefined;
let credit;


const validActiveSesion = async () => {
   if (localStorage.getItem('currentCustomerID')) {
      let customerId = JSON.parse(localStorage.getItem('currentCustomerID'))
      currentCustomer = await findById(customerId)

      if (currentCustomer != undefined) {
         sectionMenu.style.display = "";
         sectionLogin.style.display = "none";
      }
   }
}
validActiveSesion()




const getCredit = () => {
   document.getElementById("numInstallments").innerHTML = MINISTALLMENTS;
   credit = new Credit();
   let requestedValue = document.getElementById("requestedValue");
   sectionGetCredit.style.display = "";

   instalmentsRange.min = MINISTALLMENTS;
   instalmentsRange.value = MINISTALLMENTS;
   instalmentsRange.max = MAXINSTALLMENTS;
   sectionMenu.style.display = "none";
   sectionGetCredit.style.display = "";

   requestedValue.value = 0;
   let buttonNextGetCredit = document.getElementById("buttonNextGetCredit");
   buttonNextGetCredit.addEventListener("click", async () => {
      await calculateCredit(requestedValue.value, instalmentsRange.value);
      showCredit(credit)
   });
}

const calculateCredit = (requestedValue, instalments) => {
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

   creditInfo.innerHTML = `<div class="mb-3 text-center">
               <label id="customerName" class="form-label text-center"> ${currentCustomer.name} </label>
            </div>
            <div class="mb-3 col-12 col-sm-6">
               <label for="requestedValueR" class="form-label">Solicitado</label>
               <input type="number" class="form-control" id="requestedValueR" value="${credit.requestedValue}"
                  disabled>
            </div>

            <div class="mb-3 col-12 col-sm-6">
               <label for="totalToPay" class="form-label">Total a Pagar</label>
               <input type="number" class="form-control" id="totalToPay" value="${credit.totalToPay}" disabled>
            </div>

            <div class="mb-3 col-6 col-sm-3">
               <label for="interest" class="form-label">Interes</label>
               <input type="text" class="form-control" id="interest" value="${credit.interest}%" disabled>
            </div>

            <div class="mb-3 col-6 col-sm-3 ">
               <label for="installments" class="form-label">N° cuotas</label>
               <input type="number" class="form-control" id="installments" value="${credit.installments}"
                  disabled>
            </div>

            <div class="mb-3 col-12 col-sm-6">
               <label for="valueInstallment" class="form-label">Valor de la Cuota</label>
               <input type="number" class="form-control" id="valueInstallment"
                  value="${credit.valueInstallments}" disabled>
            </div>`
   document.getElementById("creditInfoFather").appendChild(creditInfo)

   let buttonAproveCredit = document.getElementById("buttonAproveCredit");
   let buttonRejectCredit = document.getElementById("buttonRejectCredit");
   buttonAproveCredit.disabled = false;
   buttonAproveCredit.addEventListener("click", sendCredit);

   buttonRejectCredit.addEventListener("click", () => {
      sectionShowCreditInfo.style.display = "none";
      getCredit()
   });


};

const sendCredit = async () => {
   spinner()
   let auxCredit = await saveCredit(currentCustomer.id, credit)
   if (auxCredit == undefined) {
      toast.fire({
         icon: icons.error,
         title: "No se pudo generar el credito intentelo de nuevo",
         position: position.topEnd
      })
      spinner(false)
      return;
   }
   currentCustomer.cantCredits += 1;
   await updateCustomer(currentCustomer);
   sectionShowCreditInfo.style.display = "none";
   toast.fire({
      icon: icons.success,
      title: "Credito exitoso",
      position: position.topEnd
   })
   spinner(false)
   getMenu()
}


const creditList = async () => {
   spinner()
   let aux = document.getElementById("divCreditList");
   if (aux != null)
      aux.innerHTML = ""
   sectionMenu.style.display = "none";
   sectionCreditList.style.display = "";
   let credits = await listCredit(currentCustomer.id)
   if (credits.length == 0) {
      alert.fire({
         icon: icons.info,
         title: "No tiene Creditos con nosotros",
      })
      spinner(false)
      return;
   }
   credits.forEach(element => {
      if (element.idCustomer == currentCustomer.id) {
         let creditList = document.createElement("div")
         creditList.id = "cardCredit";
         creditList.className = "col-12  col-md-3  m-1 p-1"
         creditList.innerHTML = `<div class="card">
            <h5 class="card-title">$ ${element.totalToPay} </h5>
            <h6 class="card-subtitle mb-1 text-muted">Total a pagar</h6>
            <p class="card-text mb-0">Monto desembolsado: $ ${element.requestedValue} </p>
            <p class="card-text mb-0">N° cuotas: ${element.installments} </p>
            <p class="card-text mb-0">Valor cuota: $ ${element.valueInstallments}</p>
            <p class="card-text mb-0">Interes: ${element.interest}% </p>
      </div>`

         document.getElementById("divCreditList").appendChild(creditList)
      }
   });
   spinner(false)
}


const getCustomerInfo = async () => {
   spinner()
   let customer = new Customer();
   let nameLogin = document.getElementById("name");
   let dnilogin = document.getElementById("dniUser");
   let validResponse = validLogin(nameLogin, dnilogin)
   let msn = "Bienvenido "
   let icon = icons.info
   if (validResponse != "") {
      alert.fire({
         icon: icons.error,
         title: 'Oops',
         text: validResponse
      })
      spinner(false);
      return false;
   }
   customer = await findByDni(dnilogin.value)

   if (customer == undefined) {
      customer = new Customer();
      customer.cantCredits = 0;
      customer.name = nameLogin.value;
      customer.dni = dnilogin.value
      customer = await saveCustomer(customer)
      msn = "Registro exitoso"
      icon = icons.success
   }
   currentCustomer = customer;
   localStorage.setItem('currentCustomerID', JSON.stringify(customer.id))
   sectionLogin.style.display = "none";
   sectionMenu.style.display = "";
   toast.fire({
      icon: icon,
      timer: 2000,
      position: position.topEnd,
      text: msn
   })
   spinner(false);
}

const validLogin = (nameLogin, dnilogin) => {
   let msn = ""
   if (nameLogin.value.length < 3)
      msn += "\n El nombre debe ser mayor a 3 caracteres. "

   if (dnilogin.value.length < 5)
      msn += "La cedula  debe ser mayor a 5 digitos. \n"

   return msn;

}

const getMenu = () => {

   sectionMenu.style.display = "";
   sectionLogin.style.display = "none";
   sectionCreditList.style.display = "none";
   sectionGetCredit.style.display = "none";
}
const exit = () => {
   localStorage.clear()
   window.location.href = "../index.html";
}




//Eventos
buttonGetMenu1.addEventListener("click", getMenu);
buttonGetMenu2.addEventListener("click", getMenu);
buttonLogin.addEventListener("click", getCustomerInfo);
buttonGetCredit.addEventListener("click", getCredit);
buttonListCredit.addEventListener("click", creditList);
buttonExit.addEventListener("click", exit);

instalmentsRange.addEventListener("mousemove", function () { document.getElementById("numInstallments").innerHTML = instalmentsRange.value });
instalmentsRange.addEventListener("touchmove", function () { document.getElementById("numInstallments").innerHTML = instalmentsRange.value });