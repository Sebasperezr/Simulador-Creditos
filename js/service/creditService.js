
import { URLAPI } from '../utils/constantes.js';
const urlCustomer = `${URLAPI}customer/`



export const get = (idCustomer, id = "") => {
    const urlCredit =`${urlCustomer}/${idCustomer}/credit/${id}`
    return fetch(urlCredit)
        .then((resp) => resp.json())
        .then((data) => {
            return data
        })
}
