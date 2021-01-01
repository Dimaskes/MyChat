const socket = io();

const names = [
  'ксолотль',
  'аллигатор',
  'баклан',
  'барсук',
  'белка',
  'бобёр',
  'броненосец',
  'буйвол',
  'бурундук',
  'верблюд',
  'волк',
  'вомбат',
  'ворона',
  'выдра',
  'гепард',
  'гиена',
  'гиппопотам',
  'гризли',
  'дельфин',
  'динго',
  'енот',
  'ёж',
  'жираф',
  'землеройка',
  'зубр',
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const firstUpperCase = (name) => name[0].toUpperCase() + name.slice(1);

const username = firstUpperCase(names[getRandomInt(0, names.length)]);

// Отображение никнейма в левой части чата
document.querySelector('.widget__username').innerText = username;

const sendButton = document.querySelector('.send-btn');
const messageText = document.querySelector('.message-text');
const messages = document.querySelector('.content__messages');

sendButton.addEventListener('click', () => {
  if (messageText.value) {
    socket.emit('sendMessage', { name: username, msg: messageText.value });
    messageText.value = '';
  } else {
    alert('Вы ничего не написали.');
  }
});

socket.on('getMessage', (obj) => renderMessage(obj));

const autoScroll = (area) => (area.scrollTop = area.scrollHeight - area.clientHeight);

const printMessage = (obj) => {
  const html = `
  <div class="message card ${obj.author && 'author'}">
    <div class="card-body text-dark">
      <h5 class="card-title">${obj.name}</h5>
      <p class="card-text">${obj.msg}</p>
    </div>
  </div>
  `;
  messages.insertAdjacentHTML('beforeend', html);
};

const renderMessage = (obj, oldMessages = 0) => {
  if (oldMessages) {
    for (const curMsg of oldMessages) {
      printMessage(obj[curMsg]);
    }
  } else {
    printMessage(obj);
  }
  autoScroll(messages);
};

socket.once('renderOldMessages', (obj) => {
  const oldMessages = Object.keys(obj);
  renderMessage(obj, oldMessages);
});
