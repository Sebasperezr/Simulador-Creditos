export const spinner = (status = true) => {
    let aux = document.getElementById("spinner");
    if (aux == null) {
        aux = create()
    }

    if (status) {
        console.log(" vacio")
        aux.style.display = "flex"
    }
    else {
        console.log(" none")
        aux.style.display = "none"
    }


}

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

