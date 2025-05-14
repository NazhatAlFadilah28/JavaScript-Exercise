const jarijari = document.getElementById("jari-jari")
const tinggi = document.getElementById("tinggi")
const btnHitung = document.querySelector("#btn-hitung")
const volume = document.querySelector("#txt-volume")
const keliling = document.querySelector("#txt-keliling")

btnHitung.addEventListener('click', function () {
  let volume = 3.14.value * jarijari.value * jarijari.value * tinggi.value;
  .textContent = volume
})