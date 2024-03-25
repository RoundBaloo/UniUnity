document.querySelector('.button-text').addEventListener('click', function(event) {
    event.stopPropagation(); // Предотвращаем распространение события клика
    const filterContent = this.parentNode.querySelector('.filter-content');
    if (filterContent.style.display === 'none') {
       filterContent.style.display = 'block';
       filterContent.style.opacity = '1'; // Показываем содержимое
       this.parentNode.style.height = '220px'; // Расширяем кнопку
    } else {
       filterContent.style.opacity = '0'; // Скрываем содержимое
       setTimeout(() => {
           filterContent.style.display = 'none'; // После завершения анимации скрываем содержимое
       }, 300); // Задержка соответствует длительности анимации
       this.parentNode.style.height = '60px'; // Возвращаем кнопку к исходному размеру
    }
});
   