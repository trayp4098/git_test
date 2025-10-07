const $btnKick = document.getElementById('btn-kick');
const $logs = document.getElementById('logs');

// створюємо другу кнопку
const $btnStrong = document.createElement('button');
$btnStrong.innerText = 'Thunder Strike';
$btnStrong.classList.add('button');
document.querySelector('.control').appendChild($btnStrong);

// === Функція створення покемона ===
function createPokemon({ name, defaultHP, elHP, elProgressbar }) {
  let damageHP = defaultHP;

  const renderHP = () => {
    elHP.innerText = `${damageHP} / ${defaultHP}`;
    elProgressbar.style.width = `${damageHP}%`;
    elProgressbar.style.backgroundColor =
      damageHP < defaultHP * 0.3 ? 'red' :
      damageHP < defaultHP * 0.6 ? 'yellow' : 'lime';
  };

  const changeHP = (count, attacker) => {
    const prevHP = damageHP;
    damageHP = Math.max(damageHP - count, 0);
    renderHP();

    const logText = generateLog(attacker, name, count, damageHP);
    addLog(logText);

    if (damageHP === 0) {
      addLog(`💀 ${name} вибув із бою!`);
      disableButtons();
    }
  };

  const disableButtons = () => {
    $btnKick.disabled = true;
    $btnStrong.disabled = true;
  };

  return { name, renderHP, changeHP, disableButtons };
}

// === Герой і вороги ===
const character = createPokemon({
  name: 'Pikachu',
  defaultHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
});

const enemy1 = createPokemon({
  name: 'Charmander',
  defaultHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
});

// === Логіка ===
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateLog(firstPerson, secondPerson, damage, remainingHP) {
  const text = logs[random(0, logs.length - 1)]
    .replace('[ПЕРСОНАЖ №1]', firstPerson)
    .replace('[ПЕРСОНАЖ №2]', secondPerson);

  return `🌀 ${text}<br>💥 Втрата: ${damage} HP | ❤️ Залишилось: ${remainingHP} HP`;
}

function addLog(text) {
  const p = document.createElement('p');
  p.innerHTML = text;
  p.style.borderBottom = '1px solid #ccc';
  p.style.padding = '5px';
  p.style.margin = '5px 0';
  // новий лог зверху
  $logs.prepend(p);
}

function init() {
  character.renderHP();
  enemy1.renderHP();
}

function playerAttack(maxDamage) {
  const damage = random(10, maxDamage);
  enemy1.changeHP(damage, character.name);

  // Відповідь ворога
  setTimeout(() => {
    const enemyDamage = random(5, 20);
    character.changeHP(enemyDamage, enemy1.name);
  }, 700);
}

$btnKick.addEventListener('click', () => playerAttack(20));
$btnStrong.addEventListener('click', () => playerAttack(35));

init();
