document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const user = document.getElementById('user').value.trim();
    const password = document.getElementById('password').value.trim();

    if (user === "" || password === "") {
        alert("Por favor, completa ambos campos.");
        return;
    }

    fetch('Administrador/Loggin/validar_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: user, contrasena: password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("¡Login exitoso!");
                window.location.href = '../catalogo/catalogo.html';
            } else {
                alert(data.message || "Usuario o contraseña incorrectos.");
            }
        })
        .catch(error => {
            alert("Error en la conexión con el servidor.");
            console.error(error);
        });
});