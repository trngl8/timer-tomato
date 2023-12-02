const imageSlider = document.getElementById('image-slider');

let currentIndex = 0;

imageSlider.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imageSlider.children.length;
    showImage(currentIndex);
});

showImage(currentIndex);

function showImage(index) {
    const translateValue = -index * 100 + '%';
    imageSlider.style.transform = `translateX(${translateValue})`;
}
