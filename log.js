export const logs = [
    '[ПЕРСОНАЖ №1] атакує [ПЕРСОНАЖ №2]',
    '[ПЕРСОНАЖ №1] наніс удар по [ПЕРСОНАЖ №2]',
    '[ПЕРСОНАЖ №1] влучив у [ПЕРСОНАЖ №2]'
];

export function generateLog(attacker, defender, damage, remainingHP) {
    const text = logs[Math.floor(Math.random() * logs.length)]
        .replace('[ПЕРСОНАЖ №1]', attacker)
        .replace('[ПЕРСОНАЖ №2]', defender);
    
    return `🌀 ${text}<br>💥 Втрата: ${damage} HP | ❤️ Залишилось: ${remainingHP} HP`;
}
