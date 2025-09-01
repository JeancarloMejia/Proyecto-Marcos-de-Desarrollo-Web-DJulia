window.addEventListener("DOMContentLoaded", () => {

    fetch('/PF_D_Julia/routes/router.php?action=usuarioActual')
        .then(res => res.json())
        .then(data => {
            if (data && data.id_usuario) {
                mostrarMenuUsuario(data.nombre);
            }
        });
    });

    function mostrarMenuUsuario(nombre) {
        const icono = document.getElementById("icono-usuario");
        const menu = document.getElementById("menu-usuario");
        const nombreUsu = document.getElementById("nombre-usuario");

        nombreUsu.textContent = `¡Hola, ${nombre}!`;

        icono.removeAttribute("href");

        icono.addEventListener("click", (e) => {
            e.preventDefault();
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", function (event) {
            if (!event.target.closest("#usuario-menulista")) {
                menu.style.display = "none";
            }
        });
    }

    function cerrarSesion() {
        fetch('/PF_D_Julia/routes/router.php?action=logout')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/PF_D_Julia/public/Cliente/Iconos/account.html';
                }
            });
    }