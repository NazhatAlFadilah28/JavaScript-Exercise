function hitungDiskon() {
  const nama = document.getElementById("nama").value;
  const harga = parseFloat(document.getElementById("harga").value);
  const diskon = parseFloat(document.getElementById("diskon").value);
  const output = document.getElementById("output");

  // Validasi input
  if (!nama || isNaN(harga) || isNaN(diskon)) {
      output.innerHTML = "Mohon isi semua data dengan benar.";
      return;
  }

  const potongan = (diskon / 100) * harga;
  const total = harga - potongan;

  output.innerHTML =
      "Baju: " + nama + "<br>" +
      "Harga Asli: Rp" + harga.toFixed(0) + "<br>" +
      "Diskon: " + diskon + "%<br>" +
      "Harga Setelah Diskon: Rp" + total.toFixed(0);
}