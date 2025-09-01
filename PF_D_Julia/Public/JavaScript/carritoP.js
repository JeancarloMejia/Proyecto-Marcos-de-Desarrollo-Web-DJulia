document.addEventListener("DOMContentLoaded", function () {
    function abrirCarrito() {
        const carrito = document.getElementById("sidebarCarrito");
        carrito.classList.remove("oculto");
        setTimeout(() => carrito.classList.add("activo"), 10);
        document.body.style.overflow = "hidden";
    }

    function cerrarCarrito() {
        const carrito = document.getElementById("sidebarCarrito");
        carrito.classList.remove("activo");
        document.body.style.overflow = "";
        setTimeout(() => carrito.classList.add("oculto"), 300);
    }

    function vaciarCarrito() {
        total = 0;
        const lista = document.getElementById("lista-Productos");
        lista.innerHTML = "";
        document.getElementById("contenidoProductos").classList.add("oculto");
        document.getElementById("carritoVacio").classList.remove("oculto");
        document.getElementById("totalCarrito").textContent = "S/0.00";
        localStorage.removeItem("carritoProductos");
        actualizarContadorCarrito();
    }

    function agregarProducto(nombre, precio, imagen, cantidad) {
        const lista = document.getElementById("lista-Productos");
        if (!lista || cantidad <= 0) return;

        let productoExistente = lista.querySelector(`.producto-item[data-nombre="${nombre}"]`);

        if (productoExistente) {
            const cantidadSpan = productoExistente.querySelector(".cantidad");
            const subtotalSpan = productoExistente.querySelector(".subtotal");
            let cantidadActual = parseInt(cantidadSpan.textContent.replace(/\D/g, '')) || 0;
            cantidadActual += cantidad;
            cantidadSpan.textContent = `Cantidad: ${cantidadActual}`;
            subtotalSpan.textContent = `Subtotal: S/${(cantidadActual * precio).toFixed(2)}`;
            actualizarTotal(precio * cantidad);
        } else {
            const div = document.createElement("div");
            div.classList.add("producto-item");
            div.dataset.nombre = nombre;
            div.innerHTML = `
                <img src="${imagen}" class="img-producto" alt="${nombre}">
                <div class="info-producto">
                    <span class="nombre">${nombre}</span> <br>
                    <span class="precio-unitario">S/${precio.toFixed(2)} c/u</span>
                    <span class="cantidad">Cantidad: ${cantidad}</span> <br>
                    <span class="subtotal">Subtotal: S/${(precio * cantidad).toFixed(2)}</span>
                </div>
                <div class="acciones-producto">
                    <button class="btn-disminuir">-</button>
                    <button class="btn-aumentar">+</button>
                    <button class="btn-eliminar">🗑️</button>
                </div>
            `;
            lista.appendChild(div);

            div.querySelector(".btn-aumentar").addEventListener("click", () => {
                const cantidadSpan = div.querySelector(".cantidad");
                const subtotalSpan = div.querySelector(".subtotal");
                let cantidadActual = parseInt(cantidadSpan.textContent.replace(/\D/g, '')) || 0;
                cantidadActual++;
                cantidadSpan.textContent = `Cantidad: ${cantidadActual}`;
                subtotalSpan.textContent = `Subtotal: S/${(cantidadActual * precio).toFixed(2)}`;
                actualizarTotal(precio);
                actualizarContadorCarrito();
                guardarCarritoEnStorage();
            });

            div.querySelector(".btn-disminuir").addEventListener("click", () => {
                const cantidadSpan = div.querySelector(".cantidad");
                const subtotalSpan = div.querySelector(".subtotal");
                let cantidadActual = parseInt(cantidadSpan.textContent.replace(/\D/g, '')) || 0;
                if (cantidadActual > 1) {
                    cantidadActual--;
                    cantidadSpan.textContent = `Cantidad: ${cantidadActual}`;
                    subtotalSpan.textContent = `Subtotal: S/${(cantidadActual * precio).toFixed(2)}`;
                    actualizarTotal(-precio);
                    actualizarContadorCarrito();
                }
                guardarCarritoEnStorage();
            });

            div.querySelector(".btn-eliminar").addEventListener("click", () => {
                const cantidadActual = parseInt(div.querySelector(".cantidad").textContent.replace(/\D/g, '')) || 0;
                actualizarTotal(-precio * cantidadActual);
                div.remove();
                if (lista.children.length === 0) {
                    document.getElementById("contenidoProductos").classList.add("oculto");
                    document.getElementById("carritoVacio").classList.remove("oculto");
                }
                actualizarContadorCarrito();
                guardarCarritoEnStorage();
            });

            actualizarTotal(precio * cantidad);
        }

        document.getElementById("carritoVacio").classList.add("oculto");
        document.getElementById("contenidoProductos").classList.remove("oculto");
        guardarCarritoEnStorage();
        actualizarContadorCarrito();

        // NUEVO: Enviar al backend si hay sesión activa
        fetch('./router.php?controller=carrito&action=agregar', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            id_producto: idProducto,
            cantidad: cantidad
            })
        })
        .then(response => {
            if (!response.ok) throw new Error("Error HTTP: " + response.status);
            return response.text(); // primero lo leemos como texto
        })
        .then(text => {
            try {
            if (!text.trim()) throw new Error("Respuesta vacía del servidor");
            const data = JSON.parse(text);
            console.log("Respuesta del backend:", data);
            } catch (err) {
            console.error("Error procesando JSON:", err.message, "\nRespuesta recibida:", text);
            }
        })
        .catch(error => {
            console.error("Error al enviar al backend:", error);
        });
    }

    function guardarCarritoEnStorage() {
        const lista = document.getElementById("lista-Productos");
        const productos = [];
        lista.querySelectorAll(".producto-item").forEach(item => {
            const nombre = item.dataset.nombre;
            const precio = parseFloat(item.querySelector(".precio-unitario").textContent.replace("S/", ""));
            const imagen = item.querySelector("img").src;
            const cantidad = parseInt(item.querySelector(".cantidad").textContent.replace(/\D/g, '')) || 1;
            productos.push({ nombre, precio, imagen, cantidad });
        });
        localStorage.setItem("carritoProductos", JSON.stringify(productos));
    }

    function actualizarContadorCarrito() {
        const contador = document.getElementById("contadorCarrito");
        const lista = document.getElementById("lista-Productos");
        let totalProductos = 0;
        lista.querySelectorAll(".producto-item").forEach(item => {
            totalProductos += parseInt(item.querySelector(".cantidad").textContent.replace(/\D/g, '')) || 0;
        });
        contador.style.display = totalProductos > 0 ? "inline-block" : "none";
        contador.textContent = totalProductos;
    }

    let total = 0;

    function actualizarTotal(precio) {
        if (typeof precio !== "number" || isNaN(precio)) return;
        total += precio;
        document.getElementById("totalCarrito").textContent = `S/${total.toFixed(2)}`;
    }

    function realizarPedido() {
        window.location.href = '/PF_D_Julia/public/JavaScript/order.html';
    }

    window.abrirCarrito = abrirCarrito;
    window.cerrarCarrito = cerrarCarrito;
    window.vaciarCarrito = vaciarCarrito;
    window.realizarPedido = realizarPedido;
    window.agregarProducto = agregarProducto;

    const productosGuardados = JSON.parse(localStorage.getItem("carritoProductos")) || [];
    productosGuardados.forEach(prod => agregarProducto(prod.nombre, prod.precio, prod.imagen, prod.cantidad));

    const iconoCarrito = document.querySelector(".icono-carrito");
    if (iconoCarrito) iconoCarrito.addEventListener("click", abrirCarrito);
});
