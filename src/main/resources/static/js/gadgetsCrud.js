const cargarsesionStore = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);

    const perfil = user.type === 'ASE' ? 'Asesor Comercial' : user.type === 'COORD' ? 'Coordinador de zona' : 'Administrador';

    const tabla = ` <table class="table">
    <tr><th>identification</th><th>name</th><th>email</th><th>zone</th><th>Perfil</th></tr>
    <body>
        <tr>
            <td >${user.identification}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.zone}</td>
            <td>${perfil}</td>
        </tr>
    </body>
    
    </table>`;

    $("#resultadoTabla").html(tabla);

}
$(document).ready(() => {
    cargarsesionStore();
})

function traerGadgets() {
    $.ajax({
        url: "http://140.238.133.71:8080/api/gadget/all", //140.238.133.71


        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaGadgets(respuesta);
        }

    });
}


const pintarRespuestaGadgets = (respuesta) => {
    let tabla = `<div class=' overflow-scroll'>
        <table class="table text-center ">
        <tr><th>ID</th><th>Brand</th><th>Category</th><th>Name</th><th>Description</th><th>Price</th><th>Availability</th><th>Quantity</th><th>Photography</th><th>pedidos</th></tr>
        <body>
    `;

    for (let i = 0; i < respuesta.length; i++) {
        tabla += `
        <tr>
            <td class='border'>${respuesta[i].id}</td>
            <td class='border'>${respuesta[i].brand}</td>
            <td class='border'>${respuesta[i].category}</td>
            <td class='border'>${respuesta[i].name}</td>
            <td class='border'>${respuesta[i].description}</td>
            <td class='border'>${respuesta[i].price}</td>
            <td class='border'>${respuesta[i].availability}</td>
            <td class='border'>${respuesta[i].quantity}</td>
            <td class='border'><img src="${respuesta[i].photography}" height="80"></td>
            <td class='border'><input type="number"></td>
            <td> <button onclick='borrarGadget(${respuesta[i].id})' class='btn btn-danger'> Borrar</button>
        </tr>`;
    }
    tabla += `</body></table></div>`;
    $("#resultado2").html(tabla);
}



function borrarGadget(id) {
    let myData = {
        id: id

    };

    let dataToSend = JSON.stringify(myData);
    console.log(myData);
    $.ajax({

        url: "http://140.238.133.71:8080/api/gadget/" + id,

        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            alert("SE BORRO LA INFORMCION");
            traerGadgets();

        }
    });
}

const limpiarCampos = () => {
    $("#id").val("");
    $("#brand").val("");
    $("#category").val("");
    $("#name").val("");
    $("#description").val("");
    $("#price").val("");
    $("#availability").val("");
    $("#quantity").val("");
    $("#photography").val("");
    /* setTimeout(()=>{
         window.location.href ='paginaInicio.html';
         }, 1000);  */
}


function editarGadget(id) {
    let myData = {
        id: $("#id").val(),
        brand: $("#brand").val(),
        category: $("#category").val(),
        name: $("#name").val(),
        description: $("#description").val(),
        price: $("#price").val(),
        availability: $("#availability").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val(),

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://140.238.133.71:8080/api/gadget/update",

        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            $("#resultado2").empty();
            alert("SE EDITO LA INFORMACION");
            limpiarCampos();
            traerGadgets();

        }
    });
}
function crearGadget() {
    let myData = {
        id: $("#id").val(),
        brand: $("#brand").val(),
        category: $("#category").val(),
        name: $("#name").val(),
        description: $("#description").val(),
        price: $("#price").val(),
        availability: $("#availability").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val(),

    };

    $.ajax({
        url: "http://140.238.133.71:8080/api/gadget/new",
        type: "POST",
        dataType: 'JSON',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(myData),
        statusCode: {
            201: function () {
                alert('Gadget Creado');
                limpiarCampos();
            }
        },
    });

    /* setTimeout(()=>{
    window.location.href ='index.html';
    }, 1000);         */


}