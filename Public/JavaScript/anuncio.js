document.addEventListener('DOMContentLoaded', () => {
    // Redirección menú lateral
    const catalogoBtn = document.querySelectorAll('.sidebar nav ul li')[0];
    if (catalogoBtn) catalogoBtn.addEventListener('click', () => window.location.href = '../catalogo/catalogo.html');
    const productosBtn = document.querySelectorAll('.sidebar nav ul li')[1];
    if (productosBtn) productosBtn.addEventListener('click', () => window.location.href = '../productos/productos.html');
    const bannerBtn = document.querySelectorAll('.sidebar nav ul li')[2];
    if (bannerBtn) bannerBtn.addEventListener('click', () => window.location.href = '../Banner/banner.html');
    const anuncioBtn = document.querySelectorAll('.sidebar nav ul li')[3];
    if (anuncioBtn) anuncioBtn.addEventListener('click', () => window.location.href = '../Anuncios/anuncio.html');

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
        cambiarBtn.addEventListener('click', () => {
            window.location.href = '../Cambiar-contraseña/cambiar-contraseña.html';
        });
    }
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', () => {
            window.location.href = '../Loggin/loggin.html';
        });
    }

    // Mostrar nombre de archivo seleccionado
    const fileInput = document.getElementById('anuncioFileInput');
    const fileUploadBox = document.getElementById('fileUploadBox');
    if (fileInput && fileUploadBox) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                let names = Array.from(fileInput.files).map(f => f.name).join(', ');
                fileUploadBox.querySelector('.upload-text p').textContent = names;
            } else {
                fileUploadBox.querySelector('.upload-text p').textContent =
                    'Tipos de archivo que puedas subir: PDF, PPT, Word, Excel, JPG, mp3, mp4, zip o rar';
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

    const form = document.querySelector('.anuncio-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Anuncio guardado (ejemplo visual)');
        });
    }
});