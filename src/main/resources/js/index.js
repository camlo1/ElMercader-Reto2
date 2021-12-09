


const iniciarSesion = () => {
    const loading = '<img src="imagenes/carrito-de-compra-3.gif">';
    $("#loading").html(loading);

    setTimeout(() => {
        autenticar();
    }, 200);
}
//creamos  la  funcion para  llamar los  datos  
const autenticar = () => {
    const email = $("#email").val();
    const password = $("#password").val();
    re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

    // si   el  email   esta  vacio   y   el  password tambien  
    if (email.length === 0 || password.length === 0) {
        //nos  envia  esta  alerta  de  no puede haber  campos   vacios  
        alert("no pueden haber campos vacios");
        limpiarCampos();
        $("#loading").html("");
        return;
    } else if (!re.exec(email)) {
        alert('email no valido');
        limpiarCampos();
        $("#loading").html("");
        return;
    }
    // en  este metodo   ajax llamamos al  email   y   al   passwoerd que  estan   creado   en  el  back con   el  get
    $.ajax({
        url: "http://140.238.133.71:8080/api/user/" + email + "/" + password,
        type: "GET",
        dataType: 'json',
        success: function (respuesta) {
            $("#loading").html("");
            console.log(respuesta);

            if (respuesta.email === true || respuesta.password !== password) {
                alert('contraseña invalida')
                limpiarCampos();

            } else if (respuesta.email === false) {
                alert('email no existe')
                limpiarCampos();
                return;
            } else if (respuesta.id === null) {
                alert('email no usuario')
                limpiarCampos();
                return;
            } else {
                const sesionStore = JSON.stringify(respuesta);
                console.log(sesionStore);
                sessionStorage.setItem("user", sesionStore);
                window.location.href = 'gadgetsCrud.html';
                //de lo   contrario  usuario  valido 
                alert('usuario valido');


                /*  setTimeout(()=>{
                 window.location.href ='userCrud.html';
                 }, 1000);      */
            }

        },
        error: function (xhr, status) {
            $("#loading").val("");
            console.log(xhr);
            console.log(status);
            alert("error   al   validar ");
            $("#loading").html("");

        },
    });
}
function limpiarCampos() {
    $("#email").val("");
    $("#password").val("");
    /* location.href ="index.html"; */
}
