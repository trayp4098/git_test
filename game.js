// game.js
import { Pokemon } from './pokemon.js';
import { pokemons } from './pokemons.js';
import { createClickCounter } from './battle.js';

export class Game {
  constructor() {
    this.player1 = null;
    this.player2 = null;
  }

  getRandomPokemon() {
    const index = Math.floor(Math.random() * pokemons.length);
    return pokemons[index];
  }

  startGame() {
    const allButtons = document.querySelectorAll('.control button');
    allButtons.forEach(btn => btn.remove());

    const player1Data = this.getRandomPokemon();
    const player2Data = this.getRandomPokemon();

    this.player1 = new Pokemon({
      ...player1Data,
      elHP: document.getElementById('health-player1'),
      elProgressbar: document.getElementById('progressbar-player1'),
    });

    this.player2 = new Pokemon({
      ...player2Data,
      elHP: document.getElementById('health-player2'),
      elProgressbar: document.getElementById('progressbar-player2'),
    });

    document.getElementById('img-player1').src = this.player1.img;
    document.getElementById('img-player2').src = this.player2.img;
    document.getElementById('name-player1').innerText = this.player1.name;
    document.getElementById('name-player2').innerText = this.player2.name;

    this.player1.attacks.forEach(attack => {
      const $btn = document.createElement('button');
      $btn.classList.add('button');
      $btn.innerText = `${attack.name} (${attack.maxCount})`;
      document.querySelector('.control').appendChild($btn);

      createClickCounter($btn, attack.maxCount, attack, this.player1, this.player2);
    });

    const $reset = document.createElement('button');
    $reset.classList.add('button');
    $reset.innerText = 'RESET GAME';
    document.querySelector('.control').appendChild($reset);

    $reset.addEventListener('click', () => this.startGame());
  }
}
