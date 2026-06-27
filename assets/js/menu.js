// ============================================================
// БУРГЕР-МЕНЮ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    var burger = document.getElementById('burgerMenu');
    var navLinks = document.querySelector('.nav-links');
    
    // Если бургера нет на странице — выходим
    if (!burger) return;
    
    // Создаём мобильное меню и оверлей
    var mobileNav = document.createElement('ul');
    mobileNav.className = 'nav-links-mobile';
    mobileNav.id = 'mobileNav';
    
    // Копируем пункты меню из десктопной версии
    var originalLinks = document.querySelector('.nav-links');
    if (originalLinks) {
        mobileNav.innerHTML = originalLinks.innerHTML;
        document.body.appendChild(mobileNav);
    }
    
    // Создаём оверлей (затемнение фона)
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    document.body.appendChild(overlay);
    
    // Функция открытия/закрытия меню
    function toggleMenu() {
        burger.classList.toggle('active');
        mobileNav.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    }
    
    // Клик по бургеру
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Клик по оверлею (закрыть меню)
    overlay.addEventListener('click', function() {
        if (mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    });
    
    // Клик по пункту меню — закрываем меню (кроме выпадающих подменю)
    mobileNav.addEventListener('click', function(e) {
        var target = e.target.closest('a');
        if (target) {
            // Если это пункт с выпадающим меню — переключаем подменю
            var parentLi = target.closest('li');
            if (parentLi && parentLi.querySelector('.dropdown-menu')) {
                var subMenu = parentLi.querySelector('.dropdown-menu');
                subMenu.classList.toggle('open');
                // Закрываем другие открытые подменю
                var allSubMenus = mobileNav.querySelectorAll('.dropdown-menu.open');
                allSubMenus.forEach(function(item) {
                    if (item !== subMenu) {
                        item.classList.remove('open');
                    }
                });
                return;
            }
            // Иначе закрываем меню
            setTimeout(function() {
                if (mobileNav.classList.contains('open')) {
                    toggleMenu();
                }
            }, 300);
        }
    });
    
    // При изменении размера окна — если стало больше 768px, закрываем меню
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    });
});