// battle.js
import { Pokemon } from './pokemon.js';
import { generateLog } from './log.js';

const $btnKick = document.getElementById('btn-kick');
const $btnStrong = document.createElement('button');
$btnStrong.innerText = 'Thunder Strike';
$btnStrong.classList.add('button');
document.querySelector('.control').appendChild($btnStrong);

const $logs = document.getElementById('logs');

function addLog(text) {
    const p = document.createElement('p');
    p.innerHTML = text;
    p.style.borderBottom = '1px solid #ccc';
    p.style.padding = '5px';
    p.style.margin = '5px 0';
    $logs.prepend(p);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Створюємо героїв
const character = new Pokemon({
    name: 'Pikachu',
    defaultHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character')
});

const enemy = new Pokemon({
    name: 'Charmander',
    defaultHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy')
});

function playerAttack(maxDamage) {
    if (enemy.isDead() || character.isDead()) return;

    const damage = random(10, maxDamage);
    const remainingHP = enemy.changeHP(damage);
    addLog(generateLog(character.name, enemy.name, damage, remainingHP));

    if (enemy.isDead()) {
        addLog(`💀 ${enemy.name} вибув із бою!`);
        $btnKick.disabled = true;
        $btnStrong.disabled = true;
        return;
    }

    setTimeout(() => {
        const enemyDamage = random(5, 20);
        const charHP = character.changeHP(enemyDamage);
        addLog(generateLog(enemy.name, character.name, enemyDamage, charHP));

        if (character.isDead()) {
            addLog(`💀 ${character.name} вибув із бою!`);
            $btnKick.disabled = true;
            $btnStrong.disabled = true;
        }
    }, 700);
}

function createClickCounter(button, maxClicks, damage) {
    let clicks = 0;
    button.innerText += ` (${maxClicks})`;

    button.addEventListener('click', () => {
        if (clicks >= maxClicks) return;

        clicks++;
        playerAttack(damage);

        const clicksLeft = maxClicks - clicks;
        button.innerText = `${button.innerText.split(' (')[0]} (${clicksLeft})`;

        if (clicksLeft === 0) {
            button.disabled = true;
            button.style.backgroundColor = '#ccc';
        }
    });
}

createClickCounter($btnKick, 6, 20);
createClickCounter($btnStrong, 6, 35);
