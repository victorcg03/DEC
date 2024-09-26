export default function(){
    let menu = "¿Qué deseas hacer? \n";
    menu+= "(0). Salir del programa \n";
    menu+= "(1). Agregar producto \n";
    menu+= "(2). Eliminar producto \n";
    menu+= "(3). Actualizar producto \n";
    menu+= "(4). Mostrar inventario \n";
    menu+= "(5). Calcular valor total";
    return parseInt(prompt(menu));
}