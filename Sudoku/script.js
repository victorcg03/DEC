let tableroArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

window.addEventListener('load', () => {
    let i = 0, j = 0;

    while (i < 9) {
        if (j < 9) {
            let numActual = tableroArray[i][j];
            let placed = false;

            for (let k = 1; k <= 9; k++) {
                if (numActual != k && numeroValido(k, i, j)) {
                    tableroArray[i][j] = k;
                    j++;
                    placed = true;
                    break;
                }
            }

            if (!placed) {
                tableroArray[i][j] = 0;  // Reset si no se pudo colocar un número válido
                j--;
                if (j < 0) {
                    i--;  // Retrocede de fila
                    j = 8; // Resetea la columna a la última posición
                }
            }

            if (j === 9) {
                i++;
                j = 0;
            }
        } else {
            i++;
            j = 0;
        }
    }
    console.log(tableroArray);
});

function numeroValido(numero, i, j) {
    for (let index = 0; index < 9; index++) {
        if (tableroArray[i][index] == numero || tableroArray[index][j] == numero) {
            return false;
        }
    }
    return true;
}
