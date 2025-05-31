function terjemahkan() {
  const inputText = document.getElementById("input").value.toLowerCase().trim();
  const output = document.getElementById("output");

  if (!inputText) {
      output.innerHTML = "Silakan masukkan kalimat.";
      return;
  }

  // Kamus sederhana (bisa ditambah)
  const kamus = {
      "hello": "halo",
      "how are you": "apa kabar",
      "good morning": "selamat pagi",
      "good night": "selamat malam",
      "thank you": "terima kasih",
      "what is your name": "siapa namamu",
      "my name is": "nama saya",
      "i love you": "aku cinta kamu"
  };

  let hasil = "Maaf, terjemahan tidak tersedia.";

  // Coba cocokkan seluruh kalimat dulu
  if (kamus[inputText]) {
      hasil = kamus[inputText];
  } else {
      // Jika tidak ditemukan, coba terjemahkan kata per kata
      const kata = inputText.split(" ");
      const terjemahan = kata.map(k => kamus[k] || k);
      hasil = terjemahan.join(" ");
  }

  output.innerHTML = hasil;
}