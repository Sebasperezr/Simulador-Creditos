export const icons = {
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
    question: "question",
}
export const position = {
    top: "top",
    topStart: "top-start", 
    topEnd: 'top-end', 
    center:'center', 
    centerStart:'center-start', 
    centerEnd:'center-end', 
    bottom:'bottom', 
    bottomStart:'bottom-start',
    bottomEnd:'bottom-end'
}

//Alert temporal contimer y progresive bar
export const toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,

    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


//Alert Con boton de confirmacion
export const alert = Swal.mixin({
    showConfirmButton: true,
    confirmButtonColor:'#000'
})


