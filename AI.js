function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (message === '') return;

  displayMessage(message, 'user');
  respond(message);
  input.value = '';
}

function displayMessage(text, sender) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.className = sender;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function respond(message) {
  let response = "Maaf, saya tidak mengerti.";

  const msg = message.toLowerCase();

  if (msg.includes("halo") || msg.includes("hai")) {
    response = "Halo! Ada yang bisa saya bantu?";
  } else if (msg.includes("nama kamu")) {
    response = "Saya adalah AI sederhana.";
  } else if (msg.includes("apa kabar")) {
    response = "Saya baik, terima kasih! Kamu bagaimana?";
  } else if (msg.includes("terima kasih")) {
    response = "Sama-sama!";
  }

  setTimeout(() => {
    displayMessage(response, 'bot');
  }, 500);
}