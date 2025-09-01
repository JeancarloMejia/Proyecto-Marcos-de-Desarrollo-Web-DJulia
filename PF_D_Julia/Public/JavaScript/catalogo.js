document.addEventListener('DOMContentLoaded', () => {
    // Actualiza los contadores de productos por categoría
    const counts = {};
    document.querySelectorAll('.product-card').forEach(card => {
        const cat = card.getAttribute('data-category');
        counts[cat] = (counts[cat] || 0) + 1;
    });
    document.querySelectorAll('.cat-count').forEach(span => {
        const cat = span.getAttribute('data-category');
        span.textContent = counts[cat] || 0;
    });

    //mostrar y ocutar sidebar
    document.addEventListener('DOMContentLoaded', function () {
        const sidebar = document.querySelector('.sidebar');
        const logo = document.getElementById('sidebarToggle');

        if (logo && sidebar) {
            logo.addEventListener('click', function () {
                sidebar.classList.toggle('active');
            });
        }
    });

    // Filtrado de productos al hacer clic en la imagen de la categoría
    document.querySelectorAll('.cat-color-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const cat = this.getAttribute('data-category');
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.display = (card.getAttribute('data-category') === cat) ? '' : 'none';
            });
        });
    });

    // Mostrar todos los productos al hacer clic en "Categories"
    const categoriesTitle = document.querySelector('.categories-title');
    if (categoriesTitle) {
        categoriesTitle.addEventListener('click', () => {
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.display = '';
            });
        });
    }

    // Redirección al hacer clic en "TODOS LOS PRODUCTOS"
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

    // Redirección a Catalogo
    const catalogoBtn = document.querySelectorAll('.sidebar nav ul li')[0];
    if (catalogoBtn) {
        catalogoBtn.addEventListener('click', function () {
            window.location.href = '../catalogo/catalogo.html';
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

    // Funcionalidad de búsqueda y notificaciones
    // Búsqueda
    const searchIcon = document.getElementById('searchIcon');
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    if (searchIcon && searchBox && searchInput) {
        searchIcon.addEventListener('click', () => {
            if (searchBox.style.display === 'none' || searchBox.style.display === '') {
                searchBox.style.display = 'block';
                searchInput.focus();
            } else {
                searchBox.style.display = 'none';
            }
        });

        searchInput.addEventListener('input', () => {
            const value = searchInput.value.trim().toLowerCase();
            document.querySelectorAll('.product-card').forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                card.style.display = title.includes(value) ? '' : 'none';
            });
        });
    }

    // Notificaciones
    const notifIcon = document.getElementById('notifIcon');
    const notifPanel = document.getElementById('notifPanel');
    if (notifIcon && notifPanel) {
        notifIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            notifPanel.style.display = notifPanel.style.display === 'none' || notifPanel.style.display === '' ? 'block' : 'none';
        });
        document.addEventListener('click', () => {
            notifPanel.style.display = 'none';
        });
        notifPanel.addEventListener('click', e => e.stopPropagation());
    }
});

// Función para editar categoría
window.editarCategoria = function(categoria) {
    // Busca el <li> correspondiente
    const li = document.querySelector(`.categories-list [data-category="${categoria}"]`).closest('li');
    if (!li) return;
    // Obtiene el nombre actual
    const labelSpan = li.querySelector('.cat-label');
    const nombreActual = labelSpan ? labelSpan.textContent.split('(')[0].trim() : categoria;
    // Prompt para nuevo nombre
    const nuevoNombre = prompt('Editar nombre de la categoría:', nombreActual);
    if (nuevoNombre && labelSpan) {
        // Actualiza el nombre en la etiqueta
        const countMatch = labelSpan.innerHTML.match(/\(<span.*<\/span>\)/);
        labelSpan.innerHTML = `${nuevoNombre} ${countMatch ? countMatch[0] : ''}`;
        // También podrías actualizar atributos/data si es necesario
    }
};

// Función para eliminar categoría
window.eliminarCategoria = function(categoria) {
    if (!confirm('¿Seguro que deseas eliminar la categoría?')) return;
    // Elimina el <li> de la lista
    const btn = document.querySelector(`.categories-list [data-category="${categoria}"]`);
    if (btn) {
        const li = btn.closest('li');
        if (li) li.remove();
    }
    // Opcional: podrías ocultar productos de esa categoría
    document.querySelectorAll(`.product-card[data-category="${categoria}"]`).forEach(card => {
        card.style.display = 'none';
    });
};