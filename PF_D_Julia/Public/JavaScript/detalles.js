// Redirección al hacer clic en "CATALOGO", "PRODUCTOS", "BANNER", "ANUNCIO"
document.addEventListener('DOMContentLoaded', () => {
    const catalogoBtn = document.querySelectorAll('.sidebar nav ul li')[0];
    if (catalogoBtn) {
        catalogoBtn.addEventListener('click', function () {
            window.location.href = '../catalogo/catalogo.html';
        });
    }
    const productosBtn = document.querySelectorAll('.sidebar nav ul li')[1];
    if (productosBtn) {
        productosBtn.addEventListener('click', function () {
            window.location.href = '../productos/productos.html';
        });
    }
    const bannerBtn = document.querySelectorAll('.sidebar nav ul li')[2];
    if (bannerBtn) {
        bannerBtn.addEventListener('click', function () {
            window.location.href = '../Banner/banner.html';
        });
    }
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
            window.location.href = '../Cambiar-contraseña/cambiar-contraseña.html';
        });
    }
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../Loggin/loggin.html';
        });
    }

    // Opcional: Manejo de subida de imagen 
    const fileInput = document.querySelector('.gallery-upload input[type="file"]');
    const previewImg = document.querySelector('.main-image img');

    if (fileInput && previewImg) {
        fileInput.addEventListener('change', function () {
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        previewImg.src = e.target.result; // Carga la imagen en el <img>
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert('El archivo no es una imagen válida.');
                }
            }
        });
    }

       document.addEventListener('DOMContentLoaded', () => {
    const indexProducto = parseInt(localStorage.getItem('editarProductoIndex'), 10);
    const uploadBtn = document.getElementById('uploadBtn');
    const input = document.getElementById('imageInput');

    if (uploadBtn && input) {
        uploadBtn.addEventListener('click', function (e) {
            e.preventDefault(); // Evita que se recargue la página

            const file = input.files[0];
            if (!file) {
                alert('Selecciona una imagen');
                return;
            }

            const nombreImagen = file.name;

            const productosGuardados = JSON.parse(localStorage.getItem('productosTodos')) || [];

            if (productosGuardados[indexProducto]) {
                // Actualizamos solo el nombre de la imagen
                productosGuardados[indexProducto].image = `../imagenes/${nombreImagen}`;

                // Guardamos los cambios
                localStorage.setItem('productosTodos', JSON.stringify(productosGuardados));

                // Redirigimos a productos.html
                window.location.href = '../productos/productos.html';
            } else {
                alert('Producto no encontrado');
            }
        });
    }
});



});    