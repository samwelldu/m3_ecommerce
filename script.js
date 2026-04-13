const productos_cursoJs = [
    {id:1, nombre:"APP Móvil", precio: 950900},
    {id:2, nombre:"Landing Page", precio: 220900},
    {id:3, nombre:"APP Web", precio: 1200900}
];
const carrito_bootcampSamuel = [];

function agregarAlCarrito(id, cantidad) {
    let indiceProducto = -1;
    for (let i = 0; i < productos_cursoJs.length; i++) {
        if (productos_cursoJs[i].id === id) {
            indiceProducto = i;
            break;
        }
    }

    if (indiceProducto === -1) {
        console.log("Producto no encontrado");
        return; 
    }

    for (let i = 0; i < carrito_bootcampSamuel.length; i++) {
        if (carrito_bootcampSamuel[i].id === id) {
            carrito_bootcampSamuel[i].cantidad += cantidad;
            return; 
        }
    }

    carrito_bootcampSamuel.push({ id: id, cantidad: cantidad });
}

function subTotal() {
    let sumaTotal = 0;
    for (let i = 0; i < carrito_bootcampSamuel.length; i++) {
        for (let j = 0; j < productos_cursoJs.length; j++) { 
            if (carrito_bootcampSamuel[i].id === productos_cursoJs[j].id) {
                sumaTotal += productos_cursoJs[j].precio * carrito_bootcampSamuel[i].cantidad;
                break;
            }
        }
    }
    return sumaTotal;
}

function aplicarDescuento(codigo) {
    let montoSubtotal = subTotal(); 
    let descuentoTotal = 0;
    let mensajeDetalle = "Sin descuento";

    if (codigo === "PROMO10") {
        if (montoSubtotal >= 30000) {
            descuentoTotal = montoSubtotal * 0.10;
            mensajeDetalle = "10% aplicado";
        }
    } 
    else if (codigo === "ENVIOGRATIS") {
        if (montoSubtotal >= 25000) {
            descuentoTotal = 3990;
            mensajeDetalle = "Envío gratis aplicado";
        }
    } 

    let resultadoFinal = montoSubtotal - descuentoTotal;
    if (resultadoFinal < 0) resultadoFinal = 0;

    return { total: resultadoFinal, detalle: mensajeDetalle };
}

function resumen(codigo) {
    let sub = subTotal(); 
    let aplicacion = aplicarDescuento(codigo);
    
    let textoItems = "";
    for (let i = 0; i < carrito_bootcampSamuel.length; i++) {
        for (let j = 0; j < productos_cursoJs.length; j++) {
            if (carrito_bootcampSamuel[i].id === productos_cursoJs[j].id) {
                textoItems += `- ${productos_cursoJs[j].nombre} (Cant: ${carrito_bootcampSamuel[i].cantidad})\n`;
            }
        }
    }

    return `--- RESUMEN DE COMPRA ---
productos
${textoItems}
Subtotal: $${subTotal()}
Descuento: ${aplicacion.detalle}
Total Final: $${aplicacion.total}
-------------------------`;
}

agregarAlCarrito(1, 2); 
agregarAlCarrito(3, 1); 

console.log(resumen("PROMO10"));