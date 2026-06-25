// ============================================================
// ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ
// ============================================================

(function() {
    'use strict';

    // Функция для применения BVI-режима
    function applyBviMode(enabled) {
        if (enabled) {
            document.body.classList.add('bvi-mode');
            localStorage.setItem('bvi-mode', 'true');
        } else {
            document.body.classList.remove('bvi-mode');
            localStorage.setItem('bvi-mode', 'false');
        }
    }

    // Функция для обновления текста кнопки
    function updateButtonText(btn, enabled) {
        if (!btn) return;
        if (enabled) {
            btn.innerHTML = '<i class="fas fa-eye-slash"></i> Обычная версия';
        } else {
            btn.innerHTML = '<i class="fas fa-eye"></i> Версия для слабовидящих';
        }
    }

    // Восстанавливаем состояние при загрузке страницы
    if (localStorage.getItem('bvi-mode') === 'true') {
        document.body.classList.add('bvi-mode');
    }

    // Ждём, пока загрузится DOM
    document.addEventListener('DOMContentLoaded', function() {
        var btn = document.getElementById('bvi-open');

        // Обновляем текст кнопки, если BVI включён
        if (btn) {
            var isBvi = localStorage.getItem('bvi-mode') === 'true';
            updateButtonText(btn, isBvi);

            // Обработчик клика
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var isCurrentlyBvi = document.body.classList.toggle('bvi-mode');
                applyBviMode(isCurrentlyBvi);
                updateButtonText(btn, isCurrentlyBvi);
            });
        }
    });

})();