//Servicio para conectar con la API los datos del Cliente 



import { URLAPI } from '../utils/constantes.js';
const urlCustomer = `${URLAPI}customer/`

export const post = (customer) => {

   return fetch(urlCustomer, {
      method: 'POST',
      body: JSON.stringify({
         name: customer.name,
         cantCredits: customer.cantCredits,
         dni: customer.dni,
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then((data) => console.log(data))
}


export const get =  (id = "") => {

    return fetch(`${urlCustomer}${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            return data
        })
}
