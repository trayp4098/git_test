// pokemon.js
export class Pokemon {
    constructor({ name, img, hp, type, attacks = [], elHP, elProgressbar }) {
        this.name = name;
        this.img = img;
        this.hp = hp;
        this.type = type;
        this.attacks = attacks;

        this.defaultHP = hp;
        this.damageHP = hp;
        this.elHP = elHP;
        this.elProgressbar = elProgressbar;

        this.renderHP();
    }

    renderHP() {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
        const percent = (this.damageHP / this.defaultHP) * 100;
        const bar = this.elProgressbar;
        bar.style.width = `${percent}%`;
        bar.classList.remove('low', 'critical');
        if (percent < 20) bar.classList.add('critical');
        else if (percent < 60) bar.classList.add('low');
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
