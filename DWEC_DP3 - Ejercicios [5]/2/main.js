import mostrar_menu from "./menu.js";
let productos = [];
let opcionElegida = mostrar_menu();

switch (opcionElegida) {
    case 1:
        agregarProducto();
        break;
    default:
        break;
}

function agregarProducto(){
    let productoNuevo = [];
    productoNuevo.nombre = prompt("Introduce el nombre del nuevo producto:");
    productoNuevo.precio = prompt("Introduce el precio del nuevo producto:");
    productoNuevo.stock = prompt("Introduce el stock del nuevo producto:");
    console.table(productoNuevo);
}