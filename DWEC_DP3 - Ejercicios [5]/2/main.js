import mostrar_menu from "./menu.js";
let productos = [];
let opcionElegida = mostrar_menu();

while (opcionElegida != 0) {
    switch (opcionElegida) {
        case 1:
            agregar_producto();
            break;
        case 2:
            eliminar_producto();
            break;
        case 3:
            actualizar_producto();
            break;
        case 4:
            mostrar_inventario();
            break;
        case 5:
            calcular_valor_total();
            break;
        default:
            alert("La opción elegida no es valida.")
            break;
    }
    opcionElegida = mostrar_menu();
}
function agregar_producto(){
    let productoNuevo = [];
    productoNuevo.id = prompt("Introduce ID única del producto:");
    while (existeProducto(productoNuevo["id"])) {
        productoNuevo.id = prompt("¡Esa ID de producto ya esta en uso! Introduce otra diferente, por favor:");
    }
    productoNuevo.nombre = prompt("Introduce el nombre del producto:");
    productoNuevo.precio = prompt("Introduce el precio del producto:");
    productoNuevo.stock = prompt("Introduce el stock del producto:");
    productos.push(productoNuevo);
    alert("Producto agregado!");
}
function eliminar_producto(){
    let idProducto = prompt("Introduce ID del producto que quieres borrar:");
    if (!existeProducto(idProducto)) {
        alert("No existe ningun producto con esa ID.");
    }else{
        let indice = productos.findIndex(prod => prod.id == idProducto);
        productos.splice(indice, 1);
        alert("Producto eliminado!");
    }
}
function actualizar_producto(){
    let idProducto = prompt("Introduce ID del producto que quieres actualizar:");
    let producto = existeProducto(idProducto);
    if (!producto) {
        alert("No existe ningun producto con esa ID.");
    }else{
        let nuevoNombre = prompt(`Introduce el nuevo nombre del producto (actual: ${producto.nombre}):`);
        let nuevoPrecio = prompt(`Introduce el nuevo precio del producto (actual: ${producto.precio}):`);
        let nuevoStock = prompt(`Introduce el nuevo stock del producto (actual: ${producto.stock}):`);
        producto.nombre = nuevoNombre ? nuevoNombre : producto.nombre;
        producto.precio = nuevoPrecio ? nuevoPrecio : producto.precio;
        producto.stock = nuevoStock ? nuevoStock : producto.stock;
        let indice = productos.findIndex(prod => prod.id == producto.id);
        productos.splice(indice, 1, producto);
        alert("Producto actualizado!");
    }
}
function mostrar_inventario(){
    if (productos.length == 0) {
        alert("No hay productos.");
    }else{
        let output = "ID - NOMBRE - PRECIO - STOCK \n";
        productos.forEach(producto => {
            output+= `${producto.id} - ${producto.nombre} - ${producto.precio} - ${producto.stock} \n`;
        });
        alert(output);
    }
}
function calcular_valor_total(){
    let valor = productos.reduce((acumulador, producto) =>
        acumulador + (parseFloat(producto.precio) * parseInt(producto.stock)), 0);
    alert("El valor total del inventario es: " + valor)
}
function existeProducto(id){
    return productos.find(producto => producto.id == id);
}