const cities = [
  { name: 'Jakarta', timeZone: 'Asia/Jakarta' },
  { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { name: 'London', timeZone: 'Europe/London' },
  { name: 'New York', timeZone: 'America/New_York' }
];

const container = document.getElementById('clockContainer');

cities.forEach(city => {
  const clock = document.createElement('div');
  clock.className = 'clock';
  clock.innerHTML = `
      <div class="city">${city.name}</div>
      <div class="time" id="${city.timeZone.replace(/\//g, '_')}">Loading...</div>
  `;
  container.appendChild(clock);
});

function updateClocks() {
  cities.forEach(city => {
      const timeElement = document.getElementById(city.timeZone.replace(/\//g, '_'));
      const now = new Date().toLocaleTimeString('en-US', {
          timeZone: city.timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
      });
      timeElement.textContent = now;
  });
}

setInterval(updateClocks, 1000);
updateClocks();