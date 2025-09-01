function cargarCarritoResumen() {
        const productosCarrito = JSON.parse(localStorage.getItem("carritoProductos")) || [];
        const contenedor = document.getElementById("productos-carrito");
        const subtotalSpan = document.getElementById("subtotal-carrito");
        const impuestosSpan = document.getElementById("impuestos-carrito");
        const totalGeneralSpan = document.getElementById("total-general");

        console.log("Productos encontrados en localStorage:", productosCarrito);

        contenedor.innerHTML = "";
        let subtotal = 0;

        productosCarrito.forEach(p => {
            const div = document.createElement("div");
            div.classList.add("producto-item");
            div.innerHTML = `
                <img src="${p.imagen}" alt="${p.nombre}" class="producto-img-resumen">
                <div class="producto-info">
                    <span class="nombre">${p.nombre}</span>
                    <span class="cantidad">Cantidad: ${p.cantidad}</span>
                    <span class="precio">Precio total: S/ ${(p.precio * p.cantidad).toFixed(2)}</span>
                </div>
            `;
            contenedor.appendChild(div);
            subtotal += p.precio * p.cantidad;
        });

        const impuestos = subtotal * 0.18;
        const total = subtotal + impuestos;

        console.log({ subtotalSpan, impuestosSpan, totalGeneralSpan });

        if (subtotalSpan && impuestosSpan && totalGeneralSpan) {
            subtotalSpan.textContent = `S/ ${subtotal.toFixed(2)}`;
            impuestosSpan.textContent = `S/ ${impuestos.toFixed(2)}`;
            totalGeneralSpan.textContent = `S/ ${total.toFixed(2)}`;
        } else {
            console.warn("Uno o más elementos no se encontraron en el DOM");
        }

        actualizarTotalConDelivery();
    }

    document.addEventListener("DOMContentLoaded", cargarCarritoResumen);

    let pasoActual = 1;

function cambiarPaso(nuevoPaso) {
        pasoActual = nuevoPaso;

        // Cambiar visualmente los pasos
        document.querySelectorAll('.paso-item').forEach(item => {
            item.classList.remove('paso-activo');
            if (parseInt(item.dataset.paso) === pasoActual) {
                item.classList.add('paso-activo');
            }
        });

        // Mostrar/Ocultar secciones según el paso
        document.querySelectorAll('.bloque-formulario, .bloque-delivery, .bloque-pago')
                .forEach(b => b.style.display = 'none');

        if (pasoActual === 1) {
            document.querySelector('.bloque-formulario').style.display = 'block';
        } else if (pasoActual === 2) {
            document.querySelector('.bloque-delivery').style.display = 'block';
        } else if (pasoActual === 3) {
            document.querySelector('.bloque-pago').style.display = 'block';
        }
    }

    document.querySelector('.btn-confirmar')?.addEventListener('click', e => {
        e.preventDefault();
        cambiarPaso(2);
    });

    // Si en el paso 2/3 hay botones con ID btn-atras o btn-siguiente:
    document.addEventListener('click', function(e) {
        if (e.target.matches('#btn-atras') || e.target.matches('#btn-atras-pago')) cambiarPaso(pasoActual - 1);
        if (e.target.matches('#btn-siguiente')) cambiarPaso(pasoActual + 1);
    });

    document.addEventListener("DOMContentLoaded", () => {
    const radios = document.querySelectorAll('input[name="pago"]');
    const formularioTarjeta = document.getElementById('formulario-tarjeta');

    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.value === "tarjeta") {
                formularioTarjeta.style.display = "block";
            } else {
                formularioTarjeta.style.display = "none";
            }
        });
    });
});

function actualizarTotalConDelivery() {
    const deliverySeleccionado = document.querySelector('input[name="delivery"]:checked');
    let costoDelivery = 0;

    if (deliverySeleccionado) {
        if (deliverySeleccionado.value === 'standard') costoDelivery = 10;
        else if (deliverySeleccionado.value === 'express') costoDelivery = 25;
        else if (deliverySeleccionado.value === 'pickup') costoDelivery = 0;
    }

    const subtotal = parseFloat(document.getElementById('subtotal-carrito').textContent.replace('S/', '')) || 0;
    const impuestos = subtotal * 0.18;
    const total = subtotal + impuestos + costoDelivery;

    document.getElementById('impuestos-carrito').textContent = `S/ ${impuestos.toFixed(2)}`;
    document.getElementById('total-general').textContent = `S/ ${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const radiosDelivery = document.querySelectorAll('input[name="delivery"]');

    radiosDelivery.forEach(radio => {
        radio.addEventListener("change", actualizarTotalConDelivery);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btnConfirmarFinal = document.getElementById("btn-confirmar-final");

    if (btnConfirmarFinal) {
        btnConfirmarFinal.addEventListener("click", function () {
        // Aquí va tu lógica al hacer clic en "Confirmar pedido"
        document.querySelector(".contenido-pedido").style.display = "none";
        document.getElementById("mensaje-confirmacion").style.display = "block";
        });
    }
});