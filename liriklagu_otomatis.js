const lirik = [
  "Hari ini ku bahagia",
  "Melihatmu tersenyum ceria",
  "Tak terasa waktu berlalu",
  "Kau selalu di hatiku",

  "Walau raga kita terpisah",
  "Namun cinta takkan musnah",
  "Kuingin kau tahu satu hal",
  "Aku selalu setia"

  // Tambahkan lebih banyak baris jika ingin
];

const lirikDiv = document.getElementById("lirik");
let index = 0;

function tampilkanLirik() {
  if (index < lirik.length) {
      const baris = document.createElement("p");
      baris.textContent = lirik[index];
      lirikDiv.appendChild(baris);
      index++;
      setTimeout(tampilkanLirik, 2000); // Tampilkan tiap 2 detik
  }
}

tampilkanLirik();