

import { spinner } from './utils/spinner.js';
import { list } from './service/customerService.js';
import { list as listCreditsAjax} from './service/creditService.js';
import { alert, icons} from './utils/alert.js';
import { toCurrency } from './utils/formater.js';
//Elementos del DOM
const tbodyCustomerList = document.getElementById("tbodyCustomerList");
const sectionCreditList = document.getElementById("creditList");
const sectionCustomerList = document.getElementById("customerList");


//Optiene la lista de clientes 
const  getCustomerList = async () => {
   sectionCustomerList.style.display=""
   sectionCreditList.style.display="none"
   let aux = document.getElementById("tbodyCustomerList");
   if (aux != null) aux.innerHTML=""

   spinner()   
   const customers = await list()
   spinner(false) 
   customers.forEach(element => {
      let creditList = document.createElement("tr")
      creditList.id = `tr${element.id}`;
      creditList.innerHTML = `
      <th scope="row">
         <div class="row">
            <div class="col-12">${element.name}</div>
            <div class="col-12">${element.dni}</div>
         </div>
      </th>
      <td>${element.cantCredits}</td>
      <td><button id="btn${element.id}" value="${element.id}" class="btn btn-dark">Creditos</button></td>`
      document.getElementById("tbodyCustomerList").appendChild(creditList)

   });

}

//Optiene la lista de creditos
const getCredits = async (idCustomer)=>{
   spinner();
   sectionCreditList.style.display=""
   sectionCustomerList.style.display="none"

   let aux = document.getElementById("crediList");
   if (aux != null)
      aux.innerHTML=""

   const creditList = await listCreditsAjax(idCustomer)
   if(creditList.length == 0){
      alert.fire({
         icon: icons.info,
         title: "No tiene Creditos con nosotros",
      })
   }
   spinner(false);

   creditList.forEach(element => {

      let creditList = document.createElement("div")
      creditList.id = "cardCredit";
      creditList.className = "card col-sm-4 col-md-4 col-lg-3 col-xl-2  m-1 p-3"

      creditList.innerHTML = `<h5 class="card-title">${toCurrency(element.totalToPay,"$")}</h5>
             <h6 class="card-subtitle mb-2 text-muted">Total a pagar</h6>
             <p class="card-text mb-0">Monto desembolsado: ${toCurrency(element.requestedValue,"$")} </p>
             <p class="card-text mb-0">N° cuotas: ${element.installments}</p>
             <p class="card-text mb-0">Valor cuota: ${toCurrency(element.valueInstallments,"$")}</p>
             <p class="card-text mb-0">Interes: ${element.interest}% </p>`
      
         document.getElementById("crediList").appendChild(creditList)
   });

   const buttonBack = document.getElementById("buttonBack")
   buttonBack.addEventListener("click",getCustomerList)
}
getCustomerList()




//Eventos
tbodyCustomerList.addEventListener("click", (e) => getCredits(e.target.value));