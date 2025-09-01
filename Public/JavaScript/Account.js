let modoRegistro = false;

function cambiarModo() {
    modoRegistro = !modoRegistro;

    document.getElementById('titulo').innerHTML = modoRegistro
        ? '<i class="fas fa-user-plus"></i> Crear Cuenta'
        : '<i class="fas fa-user"></i> Iniciar Sesión';

    document.getElementById('campo-nombre').style.display = modoRegistro ? 'block' : 'none';
    document.getElementById('campo-telefono').style.display = modoRegistro ? 'block' : 'none';
    document.getElementById('campo-direccion').style.display = modoRegistro ? 'block' : 'none';

    document.getElementById('boton-principal').innerText = modoRegistro
        ? 'Registrar'
        : 'Iniciar Sesión';

    document.getElementById('boton-secundario').innerText = modoRegistro
        ? 'Ya tengo cuenta'
        : 'Crear Cuenta';

    document.getElementById('boton-principal').onclick = modoRegistro
        ? registrarCuenta
        : iniciarSesion;
}

function togglePassword() {
    const passInput = document.getElementById("contraseña");
    if (passInput.type === "password") {
        passInput.type = "text";
    } else {
        passInput.type = "password";
    }
}

function iniciarSesion() {
    const correo = document.getElementById("correo").value;
    const contraseña = document.getElementById("contraseña").value;

    fetch("/PF_D_Julia/routes/router.php?action=login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.redirect;
        } else {
            alert(data.message || "Credenciales incorrectas");
        }
    })
    .catch(error => {
        console.error("Error al iniciar sesión:", error);
        alert("Error en el servidor");
    });
}

function registrarCuenta() {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contraseña = document.getElementById("contraseña").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;

    if (!nombre || !correo || !contraseña || !telefono || !direccion) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    fetch("/PF_D_Julia/routes/router.php?action=registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contraseña, telefono, direccion })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Registro exitoso");
            cambiarModo();
        } else {
            alert(data.message || "Error al registrar");
        }
    })
    .catch(error => {
        console.error("Error al registrar:", error);
        alert("Error en el servidor");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("boton-secundario").addEventListener("click", cambiarModo);
    document.getElementById("boton-principal").addEventListener("click", iniciarSesion);
});