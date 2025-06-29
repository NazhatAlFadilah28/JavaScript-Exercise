document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const colorPicker = document.getElementById('color');
  const brushSize = document.getElementById('size');
  const sizeValue = document.getElementById('size-value');
  const clearBtn = document.getElementById('clear');
  const saveBtn = document.getElementById('save');
  
  function resizeCanvas() {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth - 2; 
      canvas.height = 500;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  sizeValue.textContent = brushSize.value;
  brushSize.addEventListener('input', () => {
      sizeValue.textContent = brushSize.value;
  });
  
  function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = getPosition(e);
  }
  
  function draw(e) {
      if (!isDrawing) return;
      
      ctx.strokeStyle = colorPicker.value;
      ctx.lineWidth = brushSize.value;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      const [x, y] = getPosition(e);
      
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      [lastX, lastY] = [x, y];
  }
  
  function stopDrawing() {
      isDrawing = false;
  }
  
  function getPosition(e) {
      let x, y;
      
      if (e.type.includes('touch')) {
          const rect = canvas.getBoundingClientRect();
          x = e.touches[0].clientX - rect.left;
          y = e.touches[0].clientY - rect.top;
      } else {
          x = e.offsetX;
          y = e.offsetY;
      }
      
      return [x, y];
  }

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startDrawing(e);
  });
  
  canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      draw(e);
  });
  
  canvas.addEventListener('touchend', stopDrawing);

  clearBtn.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  saveBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'drawing.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
  });
});