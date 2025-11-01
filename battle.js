// battle.js
import { generateLog } from './log.js';

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

export function playerAttack(maxDamage, minDamage, player1, player2) {
    if (player2.isDead() || player1.isDead()) return;

    const damage = random(minDamage, maxDamage);
    const remainingHP = player2.changeHP(damage);
    addLog(generateLog(player1.name, player2.name, damage, remainingHP));

    if (player2.isDead()) {
        addLog(`💀 ${player2.name} вибув із бою!`);
        return;
    }

    setTimeout(() => {
        const attack = player2.attacks[0]; // ворог завжди атакує першим ударом
        const enemyDamage = random(attack.minDamage, attack.maxDamage);
        const charHP = player1.changeHP(enemyDamage);
        addLog(generateLog(player2.name, player1.name, enemyDamage, charHP));

        if (player1.isDead()) {
            addLog(`💀 ${player1.name} вибув із бою!`);
        }
    }, 700);
}

export function createClickCounter(button, maxClicks, attack, player1, player2) {
    let clicks = 0;
    const baseText = attack.name;

    button.innerText = `${baseText} (${maxClicks})`;

    button.addEventListener('click', () => {
        if (clicks >= maxClicks || player1.isDead() || player2.isDead()) return;

        clicks++;
        playerAttack(attack.maxDamage, attack.minDamage, player1, player2);

        const clicksLeft = maxClicks - clicks;
        button.innerText = `${baseText} (${clicksLeft})`;

        if (clicksLeft === 0) {
            button.disabled = true;
            button.style.backgroundColor = '#ccc';
        }
    });
}
