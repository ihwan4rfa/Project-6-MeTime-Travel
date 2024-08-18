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
        cursor.style.width = '10px';
        cursor.style.height = '10px';
    }
});

// Hiding the custom cursor on specific elements
document.addEventListener('mouseover', (e) => {
    if (e.target.matches('.hide-custom-cursor, .hide-custom-cursor *')) {
        document.body.classList.add('custom-cursor-hidden');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.matches('.hide-custom-cursor, .hide-custom-cursor *')) {
        document.body.classList.remove('custom-cursor-hidden');
    }
});