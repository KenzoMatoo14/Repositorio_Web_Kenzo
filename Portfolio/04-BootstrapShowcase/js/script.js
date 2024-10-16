// Selecciona el botón y el body para cambiar el modo de color
const toggleButton = document.getElementById('toggleMode');
const body = document.body;

toggleButton.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');

  if (body.classList.contains('dark-mode')) {
    toggleButton.textContent = 'Cambiar a modo claro';
  } else {
    toggleButton.textContent = 'Cambiar a modo oscuro';
  }
});

// Sidebar collapsible
const toggleSidebarButton = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');

toggleSidebarButton.addEventListener('click', function() {
  sidebar.classList.toggle('show');
});

// Inicializar tooltips
document.addEventListener('DOMContentLoaded', function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Inicializar popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});

// Popovers
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

// Actualizar la barra de progreso al hacer scroll
document.addEventListener('scroll', function() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = scrollPercent + '%';
  progressBar.setAttribute('aria-valuenow',scrollPercent);
});
