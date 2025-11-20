// обработчик событий
document.addEventListener('DOMContentLoaded', function() {
  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const nextButton = document.querySelector('#next');
  const prevButton = document.querySelector('#prev');

  // объект вопросов
  const questions = [
    {
      questions: [
        {
          question: "Якого кольору бургер?",
          answers: [
            { title: "Стандарт", url: "./image/burger.png" },
            { title: "Чорний", url: "./image/burgerBlack.png" }
          ],
          type: "radio"
        },
        {
          question: "З якого м'яса котлета?",
          answers: [
            { title: "Курка", url: "./image/chickenMeat.png" },
            { title: "Яловичина", url: "./image/beefMeat.png" },
            { title: "Свинина", url: "./image/porkMeat.png" }
          ],
          type: "radio"
        },
        {
          question: "Додаткові інгредієнти?",
          answers: [
            { title: "Помідор", url: "./image/tomato.png" },
            { title: "Огірок", url: "./image/cucumber.png" },
            { title: "Салат", url: "./image/salad.png" },
            { title: "Цибуля", url: "./image/onion.png" }
          ],
          type: "checkbox"
        },
        {
          question: "Додати соус?",
          answers: [
            { title: "Часниковий", url: "./image/sauce1.png" },
            { title: "Томатний", url: "./image/sauce2.png" },
            { title: "Гірчичний", url: "./image/sauce3.png" }
          ],
          type: "radio"
        }
      ]
    }
  ];

  // обработчик открытия
  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    playTest();
  });

  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
  });

  // функция теста
  const playTest = () => {
    let numberQuestion = 0;

    // Логика показа кнопок — ТУТ switch/case
    const updateButtons = () => {
      switch (numberQuestion) {
        // Перше питання
        case 0:
          prevButton.style.display = 'none';
          nextButton.style.display = 'block';
          break;

        // Останнє питання (перед фінальною сторінкою)
        case questions[0].questions.length - 1:
          prevButton.style.display = 'block';
          nextButton.style.display = 'block';
          break;

        // Фінальна сторінка
        case questions[0].questions.length:
          prevButton.style.display = 'none';
          nextButton.style.display = 'none';
          break;

        // Усі інші кроки
        default:
          prevButton.style.display = 'block';
          nextButton.style.display = 'block';
          break;
      }
    };

    // рендер вопроса
    const renderQuestion = (index) => {

      // если закончились
      if (index === questions[0].questions.length) {
        questionTitle.textContent = "Тест завершён!";
        formAnswers.innerHTML = `
          <div style="text-align:center; width:100%; font-size:22px; margin-top:20px;">
            Спасибо за пройденный тест!
          </div>
        `;

        // кнопки скрываем
        updateButtons();

        // кнопка SEND
        const sendBtn = document.createElement('button');
        sendBtn.textContent = "Send";
        sendBtn.classList.add("btn", "btn-primary");
        sendBtn.style.marginTop = "20px";
        formAnswers.appendChild(sendBtn);

        return;
      }

      // обычные вопросы
      const current = questions[0].questions[index];
      questionTitle.textContent = current.question;
      formAnswers.innerHTML = '';

      current.answers.forEach((answer, i) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

        answerItem.innerHTML = `
          <input type="${current.type}" id="answerItem${i}" name="answer" class="d-none">
          <label for="answerItem${i}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="img">
            <span>${answer.title}</span>
          </label>
        `;
        formAnswers.appendChild(answerItem);
      });

      updateButtons();
    };

    // старт
    renderQuestion(numberQuestion);

    nextButton.onclick = () => {
      if (numberQuestion <= questions[0].questions.length) {
        numberQuestion++;
        renderQuestion(numberQuestion);
      }
    };

    prevButton.onclick = () => {
      if (numberQuestion > 0) {
        numberQuestion--;
        renderQuestion(numberQuestion);
      }
    };
  };
});
