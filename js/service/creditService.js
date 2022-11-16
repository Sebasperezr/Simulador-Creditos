
import { URLAPI } from '../utils/constantes.js';
const urlCustomer = `${URLAPI}customer`

export const save = (idCustomer,credit) => {
    const urlCredit =`${urlCustomer}/${idCustomer}/credit/`
    return fetch(urlCredit, {
       method: 'POST',
       body: JSON.stringify(
         credit
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

export const list = (idCustomer, id = "") => {
    const urlCredit =`${urlCustomer}/${idCustomer}/credit/${id}`
    return fetch(urlCredit)
        .then((resp) => resp.json())
        .then((data) => {
            return data
        })
}
