const video = document.getElementById('video');
const absenBtn = document.getElementById('absen');
const absenList = document.getElementById('absen-list');
const namaInput = document.getElementById('nama');

const canvas = document.createElement('canvas');

// Aktifkan kamera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert('Tidak bisa mengakses kamera: ' + err);
  });

// Ambil absen
absenBtn.addEventListener('click', () => {
  const nama = namaInput.value.trim();
  if (!nama) {
    alert("Masukkan nama terlebih dahulu!");
    return;
  }

  // Ambil snapshot dari video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);

  const imgData = canvas.toDataURL('image/png');
  const waktu = new Date().toLocaleString('id-ID');

  // Buat elemen absen
  const item = document.createElement('div');
  item.className = 'absen-item';
  item.innerHTML = `
    <img src="${imgData}" alt="Foto">
    <div>
      <strong>${nama}</strong><br/>
      <small>${waktu}</small>
    </div>
  `;

  absenList.prepend(item);
  namaInput.value = '';
});