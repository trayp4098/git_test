document.addEventListener('DOMContentLoaded', function() {
  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const nextButton = document.querySelector('#next');
  const prevButton = document.querySelector('#prev');

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

  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    playTest();
  });

  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
  });

  const playTest = () => {
    let numberQuestion = 0;

    const renderQuestion = (index) => {
      const current = questions[0].questions[index]; // берём текущий вопрос
      questionTitle.textContent = `${current.question}`;
      formAnswers.innerHTML = '';

      current.answers.forEach((answer, i) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

        answerItem.innerHTML = `
          <input type="${current.type}" id="answerItem${i}" name="answer" class="d-none">
          <label for="answerItem${i}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
        `;
        formAnswers.appendChild(answerItem);
      });
    };

    renderQuestion(numberQuestion);

    nextButton.onclick = () => {
      if (numberQuestion < questions[0].questions.length - 1) {
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
