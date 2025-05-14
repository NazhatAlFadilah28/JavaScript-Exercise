const Panjang = document.getElementById('Panjang')
const Lebar = document.getElementById('Lebar')
const Tinggi = document.getElementById('Tinggi')
const btnHitung =document.getElementById("btn-hitung");
const hasil = document.querySelector("#txt-hasil");

btnHitung.addEventListener('click', function () {
  let hasilHitung = Panjang.value * Lebar.value * Tinggi.value; 
  hasil.textContent = hasilHitung
})