document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('changePasswordForm');
    const nueva = document.getElementById('nueva');
    const confirmar = document.getElementById('confirmar');
    const guardarBtn = document.getElementById('guardarBtn');
    const cancelarBtn = document.getElementById('cancelBtn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!nueva.value || !confirmar.value) {
            alert('Por favor, completa ambos campos.');
            return;
        }
        if (nueva.value !== confirmar.value) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        // Guardar en PHP
        fetch('guardar_contraseña.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: 'admin', nuevaContrasena: nueva.value })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('¡Contraseña cambiada exitosamente!');
                window.location.href = '../productos/productos.html';
            } else {
                alert('Error al guardar la contraseña');
            }
        });
    });

    cancelarBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../productos/productos.html';
    });
});