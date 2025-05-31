function nyalakanLampu() {
  const lamp = document.getElementById("lamp");
  lamp.classList.remove("off");
  lamp.classList.add("on");
}

function matikanLampu() {
  const lamp = document.getElementById("lamp");
  lamp.classList.remove("on");
  lamp.classList.add("off");
}