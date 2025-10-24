// main.js
import { Pokemon } from './pokemon.js';
import { playerAttack, createClickCounter } from './battle.js';

// Створюємо кнопки
const $btnKick = document.getElementById('btn-kick');
const $btnStrong = document.createElement('button');
$btnStrong.innerText = 'Thunder Strike';
$btnStrong.classList.add('button');
document.querySelector('.control').appendChild($btnStrong);

// === Створюємо покемонів ===
const character = new Pokemon({
  name: 'Pikachu',
  defaultHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
});

const enemy = new Pokemon({
  name: 'Charmander',
  defaultHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
});

// Ініціалізація HP
character.renderHP();
enemy.renderHP();

// Прив'язка кнопок
$btnKick.addEventListener('click', createClickCounter($btnKick, 6, playerAttack, 20, character, enemy));
$btnStrong.addEventListener('click', createClickCounter($btnStrong, 6, playerAttack, 35, character, enemy));
