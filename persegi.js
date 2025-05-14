const sisi = document.getElementById('fr-sisi')
const btnHitung = document.querySelector('#btn-hitung');
const keliling = document.querySelector("#txt-keliling");
const luas = document.querySelector("#txt-luas")

function hasilkeliling(sisi) {
  return 4 * sisi;
}
function hasilluas(sisi) {
  return sisi * sisi
}
btnHitung.addEventListener("click", function () {
  let s = sisi.value

  luas.textContent = hasilluas(sisi.value)
})
btnHitung.addEventListener("click", function () {
  let s = sisi.value;

  keliling.textContent = hasilkeliling(sisi.value);
});