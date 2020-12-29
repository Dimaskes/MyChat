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

document.querySelector('.widget__username').innerHTML = firstUpperCase(
  names[getRandomInt(0, names.length)],
);
