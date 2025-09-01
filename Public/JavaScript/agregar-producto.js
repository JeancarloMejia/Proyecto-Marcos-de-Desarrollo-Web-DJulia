document.addEventListener('DOMContentLoaded', () => {
    // Redirección al hacer clic en "CATALOGO"
    const catalogoBtn = document.querySelectorAll('.sidebar nav ul li')[0];
    if (catalogoBtn) {
        catalogoBtn.addEventListener('click', function () {
            window.location.href = '../catalogo/catalogo.html';
        });
    }
    // Redirección a productos
    const productosBtn = document.querySelectorAll('.sidebar nav ul li')[1];
    if (productosBtn) {
        productosBtn.addEventListener('click', function () {
            window.location.href = '../productos/productos.html';
        });
    }
    // Redirección a Banner
    const bannerBtn = document.querySelectorAll('.sidebar nav ul li')[2];
    if (bannerBtn) {
        bannerBtn.addEventListener('click', function () {
            window.location.href = '../Banner/banner.html';
        });
    }
    // Redirección a Anuncios
    const anuncioBtn = document.querySelectorAll('.sidebar nav ul li')[3];
    if (anuncioBtn) {
        anuncioBtn.addEventListener('click', function () {
            window.location.href = '../Anuncios/anuncio.html';
        });
    }

    // Menú Admin Header
    const adminBtn = document.getElementById('adminMenuBtn');
    const adminDropdown = document.getElementById('adminDropdown');
    if (adminBtn && adminDropdown) {
        adminBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            adminDropdown.classList.toggle('active');
        });
        document.addEventListener('click', () => {
            adminDropdown.classList.remove('active');
        });
        adminDropdown.addEventListener('click', (e) => e.stopPropagation());
    }

    // Funcionalidad para Cambiar Contraseña y Cerrar Sesión
    const cambiarBtn = document.querySelector('.admin-dropdown-item.cambiar');
    const cerrarBtn = document.querySelector('.admin-dropdown-item.cerrar');
    if (cambiarBtn) {
        cambiarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../Cambiar-Contraseña/cambiar-contraseña.html';
        });
    }
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../Loggin/loggin.html';
        });
    }

    // Opcional: Manejo de subida de imagen (solo muestra el nombre)
    const fileInput = document.querySelector('.gallery-upload input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener('change', function () {
            if (fileInput.files.length > 0) {
                alert('Imagen seleccionada: ' + fileInput.files[0].name);
            }
        });
    }
    // Cancelar vuelve a productos
    const cancelBtn = document.querySelector('.btn-cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            window.location.href = '../productos/productos.html';
        });
    }
});
// ...existing code...

// Envío del formulario por AJAX
const productForm = document.getElementById('productForm');
const subirBtn = document.querySelector('.btn-black');
if (productForm && subirBtn) {
    subirBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const formData = new FormData(productForm);
        fetch('guardar-producto.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then(data => {
            if (data.trim() === 'ok') {
                alert('Producto guardado correctamente');
                window.location.href = '../productos/productos.html';
            } else {
                alert('Error al guardar el producto');
            }
        })
        .catch(() => alert('Error en la conexión'));
    });
}