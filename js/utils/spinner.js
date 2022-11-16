

//Nos permite controlar cunado activuar o desactivar el Spinner por defecto al llamar la funcion se activa 
export const spinner = (status = true) => {
    let aux = document.getElementById("spinner");
    if (aux == null) {
        aux = create()
    }

    if (status) {
        aux.style.display = "flex"
    }
    else {
        aux.style.display = "none"
    }


}


//Crea el snipnner, es llamado desde la logica del Spinner
const create = () => {
    let spinner = document.createElement("div")
    spinner.className = "justify-content-center";
    spinner.id = "spinner";
    spinner.innerHTML = `  
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`;
    document.body.appendChild(spinner)

    return spinner;
}

