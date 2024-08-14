const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

// Event listener untuk efek scale
document.addEventListener('mouseover', (e) => {
    if (e.target.matches('.cursor-scale, .cursor-scale *')) {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.matches('.cursor-scale, .cursor-scale *')) {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
    }
});