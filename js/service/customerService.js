//Servicio para conectar con la API los datos del Cliente 



import { URLAPI } from '../utils/constantes.js';
const urlCustomer = `${URLAPI}customer/`

export const save = (customer) => {

   return fetch(urlCustomer, {
      method: 'POST',
      body: JSON.stringify(
       customer
      ),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then((data) => {
         return data
      })
}
export const update = (customer) => {
   return fetch(`${urlCustomer}${customer.id}`, {
      method: 'PUT',
      body: JSON.stringify(
       customer
      ),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then((data) => {
         return data
      })
}

export const list = (id = "") => {

   return fetch(`${urlCustomer}${id}`)
      .then((resp) => resp.json())
      .then((data) => {
         return data
      })
}
export const findByDni = (dni) => {

   return fetch(urlCustomer)
      .then((resp) => resp.json())
      .then((data) => {
         return data.find(element =>
            element.dni == dni
         );
      })
}
