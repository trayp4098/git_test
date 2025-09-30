const $btnKick = document.getElementById('btn-kick');

// Додаємо другу кнопку для сильної атаки
const $btnStrong = document.createElement('button');
$btnStrong.innerText = 'Thunder Strike';
$btnStrong.classList.add('button');
document.querySelector('.control').appendChild($btnStrong);

// === Базовий конструктор для будь-якого персонажа ===
function createPokemon({ name, defaultHP, elHP, elProgressbar }) {
  return {
    name,
    defaultHP,
    damageHP: defaultHP,
    elHP,
    elProgressbar,

    renderHP() {
      this.elHP.innerText = this.damageHP + '/' + this.defaultHP;
      this.elProgressbar.style.width = this.damageHP + '%';

      if (this.damageHP < this.defaultHP * 0.3) {
        this.elProgressbar.style.backgroundColor = 'red';
      } else if (this.damageHP < this.defaultHP * 0.6) {
        this.elProgressbar.style.backgroundColor = 'yellow';
      } else {
        this.elProgressbar.style.backgroundColor = 'lime';
      }
    },

    changeHP(count) {
      this.damageHP -= count;
      if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert('Бідний ' + this.name + ' програв бій!');
        this.disableButtons?.();
      }
      this.renderHP();
    },

    disableButtons() {
      $btnKick.disabled = true;
      $btnStrong.disabled = true;
    }
  };
}

// === Герой ===
const character = createPokemon({
  name: 'Pikachu',
  defaultHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character')
});

// === Супротивники ===
const enemy1 = createPokemon({
  name: 'Charmander',
  defaultHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy')
});

const enemy2 = createPokemon({
  name: 'Bulbasaur',
  defaultHP: 100,
  elHP: (() => {
    const el = document.createElement('span');
    el.classList.add('text');
    return el;
  })(),
  elProgressbar: (() => {
    const el = document.createElement('div');
    el.classList.add('health');
    el.style.width = '100%';
    return el;
  })()
});

// Додаємо Bulbasaur на сторінку
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

const enemies = [enemy1, enemy2];

// === Службові функції ===
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {
  character.renderHP();
  enemies.forEach(e => e.renderHP());
}

// === Атака ===
function playerAttack(maxDamage) {
  // Вибір випадкового супротивника
  const target = enemies[random(0, enemies.length - 1)];
  target.changeHP(random(1, maxDamage));

  // Хід суперників
  setTimeout(() => {
    character.changeHP(random(5, 25));
    enemies.forEach(enemy => {
      enemy.changeHP(random(1, 15));
    });
  }, 500);
}

// === Події кнопок ===
$btnKick.addEventListener('click', () => playerAttack(20));
$btnStrong.addEventListener('click', () => playerAttack(35));

init();
