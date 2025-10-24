// pokemon.js
export class Pokemon {
    constructor({ name, defaultHP, elHP, elProgressbar }) {
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = defaultHP;
        this.elHP = elHP;
        this.elProgressbar = elProgressbar;
        this.renderHP();
    }

    renderHP() {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
        this.elProgressbar.style.width = `${this.damageHP}%`;
        this.elProgressbar.style.backgroundColor =
            this.damageHP < this.defaultHP * 0.3 ? 'red' :
            this.damageHP < this.defaultHP * 0.6 ? 'yellow' : 'lime';
    }

    changeHP(count) {
        this.damageHP = Math.max(this.damageHP - count, 0);
        this.renderHP();
        return this.damageHP;
    }

    isDead() {
        return this.damageHP === 0;
    }
}
