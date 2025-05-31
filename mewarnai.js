let selectedColor = 'red';

// Pilih warna
document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedColor = btn.getAttribute('data-color');
  });
});

// Mewarnai bagian gambar
document.querySelectorAll('#coloring-image *').forEach(part => {
  part.addEventListener('click', () => {
    part.setAttribute('fill', selectedColor);
  });
});