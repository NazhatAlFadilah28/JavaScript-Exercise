const kanvas = document.getElementById("kanvas");
const ctx = kanvas.getContext("2d");

let menggambar = false;

kanvas.addEventListener("mousedown", () => {
    menggambar = true;
});

kanvas.addEventListener("mouseup", () => {
    menggambar = false;
    ctx.beginPath(); // reset jalur
});

kanvas.addEventListener("mousemove", (event) => {
    if (!menggambar) return;

    const rect = kanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
});