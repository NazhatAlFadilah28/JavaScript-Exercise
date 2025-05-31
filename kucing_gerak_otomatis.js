document.addEventListener("DOMContentLoaded", function () {
  const karakter = document.getElementById("karakter");
  const scene = document.querySelector(".scene");

  let posisi = 0;
  let arah = 1; // 1 ke kanan, -1 ke kiri
  const kecepatan = 2;

  function gerakkanKarakter() {
      const maxPosisi = scene.clientWidth - karakter.clientWidth;

      posisi += arah * kecepatan;

      // Jika menyentuh batas, ubah arah dan balik tampilan
      if (posisi >= maxPosisi) {
          posisi = maxPosisi;
          arah = -1;
          karakter.style.transform = "translateY(-50%) scaleX(-1)";
      } else if (posisi <= 0) {
          posisi = 0;
          arah = 1;
          karakter.style.transform = "translateY(-50%) scaleX(1)";
      }

      karakter.style.left = posisi + "px";

      requestAnimationFrame(gerakkanKarakter);
  }

  gerakkanKarakter();
});