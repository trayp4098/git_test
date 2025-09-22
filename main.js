const $btnKick = document.getElementById('btn-kick');

// Додаємо другу кнопку для сильної атаки
const $btnStrong = document.createElement('button');
$btnStrong.innerText = 'Thunder Strike';
$btnStrong.classList.add('button');
document.querySelector('.control').appendChild($btnStrong);

// Другий суперник
const enemy2 = {
  name: 'Bulbasaur',
  defaultHP: 100,
  damageHP: 100,
  elHP: null,
  elProgressbar: null
};

// Всі персонажі
const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character')
};

const enemies = [
  {
    ...{
      name: 'Charmander',
      defaultHP: 100,
      damageHP: 100,
      elHP: document.getElementById('health-enemy'),
      elProgressbar: document.getElementById('progressbar-enemy')
    }
  },
  enemy2
];

// Створюємо прогрессбари для другого суперника
enemy2.elHP = document.createElement('span');
enemy2.elHP.classList.add('text');
enemy2.elProgressbar = document.createElement('div');
enemy2.elProgressbar.classList.add('health');
enemy2.elProgressbar.style.width = '100%';

// Додаємо їх на сторінку
const enemyDiv = document.createElement('div');
enemyDiv.classList.add('pokemon', 'enemy');
enemyDiv.innerHTML = `
    <span class="lvl">Lv. 1</span>
    <img src="https://i.pinimg.com/736x/9e/c0/2e/9ec02e24d669583868549b8ac67c6423.jpg" class="sprite">
    <div class="details">
        <h2 class="name">${enemy2.name}</h2>
        <div class="hp">
            <div class="bar"></div>
        </div>
    </div>
`;
enemyDiv.querySelector('.bar').appendChild(enemy2.elProgressbar);
enemyDiv.querySelector('.hp').appendChild(enemy2.elHP);
document.querySelector('.playground').appendChild(enemyDiv);

// Функції
function init() {
  renderHP(character);
  enemies.forEach(renderHP);
}

function renderHP(person) {
  person.elHP.innerText = person.damageHP + '/' + person.defaultHP;
  person.elProgressbar.style.width = person.damageHP + '%';

  if (person.damageHP < person.defaultHP * 0.3) {
    person.elProgressbar.style.backgroundColor = 'red';
  } else if (person.damageHP < person.defaultHP * 0.6) {
    person.elProgressbar.style.backgroundColor = 'yellow';
  } else {
    person.elProgressbar.style.backgroundColor = 'lime';
  }
}

function changeHP(count, person) {
  person.damageHP -= count;
  if (person.damageHP <= 0) {
    person.damageHP = 0;
    alert('Бідний ' + person.name + ' програв бій!');
    disableButtons();
  }
  renderHP(person);
}

function disableButtons() {
  $btnKick.disabled = true;
  $btnStrong.disabled = true;
}

// Функція випадкового числа
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функція атаки гравця
function playerAttack(maxDamage) {
  // Вибір випадкового супрника
  const target = enemies[random(0, enemies.length - 1)];
  changeHP(random(1, maxDamage), target);

  // Хід суперників
  setTimeout(() => {
    changeHP(random(5, 25), character);
    enemies.forEach(enemy => {
      changeHP(random(1, 15), enemy);
    });
  }, 500);
}

// Події для кнопок
$btnKick.addEventListener('click', () => playerAttack(20));
$btnStrong.addEventListener('click', () => playerAttack(35));

init();
