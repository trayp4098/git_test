import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBk4a0zeWvfjnQkQcgh7rJElSDCz1V9yy4",
  authDomain: "quiztest-5088b.firebaseapp.com",
  databaseURL: "https://quiztest-5088b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quiztest-5088b",
  storageBucket: "quiztest-5088b.firebasestorage.app",
  messagingSenderId: "405246599500",
  appId: "1:405246599500:web:ffd0e884d2d8aed1922fe9",
  measurementId: "G-YN00QQ190M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app); // <-- тепер доступно


// Решта коду без змін
document.addEventListener('DOMContentLoaded', function() {

  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const nextButton = document.querySelector('#next');
  const prevButton = document.querySelector('#prev');
  const sendButton = document.querySelector('#send');

  let userAnswers = [];

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
    userAnswers = [];
    sendButton.classList.add("d-none");

    const updateButtons = () => {
      const last = questions[0].questions.length - 1;

      if(numberQuestion === 0){
        prevButton.classList.add("d-none");
        nextButton.classList.remove("d-none");
        sendButton.classList.add("d-none");
      }
      else if(numberQuestion === last){
        prevButton.classList.remove("d-none");
        nextButton.classList.add("d-none");
        sendButton.classList.remove("d-none");
      }
      else{
        prevButton.classList.remove("d-none");
        nextButton.classList.remove("d-none");
        sendButton.classList.add("d-none");
      }
    };

    const saveAnswer = (i) => {
      const current = questions[0].questions[i];
      const checked = [...formAnswers.querySelectorAll("input:checked")].map(el => {
        const index = parseInt(el.id.replace("answerItem",""));
        return current.answers[index].title;
      });
      userAnswers[i] = (current.type === "radio") ? checked[0] : checked;
    };

    const renderQuestion = (i) => {
      if(i === questions[0].questions.length){
        questionTitle.textContent = "Тест завершено!";
        formAnswers.innerHTML = "<h3 class='text-center'>Дякуємо за проходження!</h3>";
        updateButtons();
        return;
      }

      const q = questions[0].questions[i];
      questionTitle.textContent = q.question;
      formAnswers.innerHTML = "";

      q.answers.forEach((ans,j) => {
        formAnswers.innerHTML += `
          <div class="answers-item d-flex flex-column p-2">
            <input type="${q.type}" id="answerItem${j}" name="${q.type + i}" class="d-none">
            <label for="answerItem${j}" class="d-flex flex-column align-items-center">
              <img class="answerImg" src="${ans.url}">
              <span>${ans.title}</span>
            </label>
          </div>`;
      });

      updateButtons();
    };

    renderQuestion(numberQuestion);

    nextButton.onclick = () => {
      saveAnswer(numberQuestion);
      numberQuestion++;
      renderQuestion(numberQuestion);
    };

    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestion(numberQuestion);
    };

    sendButton.onclick = () => {
      saveAnswer(numberQuestion);  // зберігаємо останню відповідь

      // --- Запис у Firebase ---
      const resultRef = push(ref(db, "quizResults")); // новий запис
      set(resultRef, {
        timestamp: Date.now(),
        answers: userAnswers
      });

      alert("Результат збережено у Firebase!");
      console.log("Відповіді користувача:", userAnswers);
      modalBlock.classList.remove('d-block'); // закриваємо модалку
    };
  };
});
