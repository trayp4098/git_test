// ====================== Завдання 1 ======================
const firstRow = 'Slow and steady wins the race';
const secondRow = 'You can say that again';

function countLetter(str, letter) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i).toLowerCase() === letter.toLowerCase()) {
      count++;
    }
  }
  return count;
}

function getRow(firstRow, secondRow, letter = 'a') {
  const firstCount = countLetter(firstRow, letter);
  const secondCount = countLetter(secondRow, letter);
  return firstCount > secondCount ? firstRow : secondRow;
}

// Кнопка для Завдання 1
document.getElementById('lettersBtn').addEventListener('click', () => {
  const letter = prompt('Введіть літеру для підрахунку:');
  if (!letter || letter.length !== 1) {
    alert('Будь ласка, введіть одну літеру!');
    return;
  }
  const result = getRow(firstRow, secondRow, letter);
  const firstCount = countLetter(firstRow, letter);
  const secondCount = countLetter(secondRow, letter);
  alert(
    `У першому рядку "${firstRow}" літера "${letter}" зустрічається ${firstCount} раз(и)\n` +
    `У другому рядку "${secondRow}" літера "${letter}" зустрічається ${secondCount} раз(и)\n\n` +
    `Більше у рядку: "${result}"`
  );
});


// ====================== Завдання 2 ======================
function formattedPhone(phone) {
  // прибираємо всі пробіли та зайві символи
  phone = phone.replace(/\D/g, '');

  if (phone.startsWith('380') && phone.length === 12) {
    phone = '+' + phone;
  } else if (phone.startsWith('0') && phone.length === 10) {
    phone = '+38' + phone;
  } else if (phone.startsWith('80') && phone.length === 11) {
    phone = '+' + phone;
  } else if (phone.startsWith('+380') && phone.length === 13) {
    // вже у правильному форматі
  } else {
    return '❌ Неправильний формат номера!';
  }

  // витягуємо частини
  const code = phone.slice(-9, -6);
  const part1 = phone.slice(-6, -3);
  const part2 = phone.slice(-3, -1);
  const part3 = phone.slice(-1);

  return `${phone.slice(0, 3)} (${code}) ${part1}-${part2}${part3}`;
}

// Кнопка для Завдання 2
document.getElementById('phoneBtn').addEventListener('click', () => {
  const input = prompt('Введіть номер телефону (наприклад: 0671234567):');
  if (!input) return;
  const result = formattedPhone(input);
  alert(result);
});
