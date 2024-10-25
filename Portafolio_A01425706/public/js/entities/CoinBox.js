import Entity from '../Entity.js';
import {Trait} from '../Entity.js';
import {loadSpriteSheet} from '../loaders.js';


class CoinBox extends Trait {
    constructor() {
        super('coinBox');
        this.broken = false;  // Estado de la caja, si ha sido golpeada.
    }
    
    loadCoinBox() {
        return loadSpriteSheet('mario')
        .then(createCoinBox);
    }

    update(entity, gameContext, level) {
        if (this.broken) {
            // Lógica si la caja ya ha sido golpeada.
        }
    }

    onHit() {
        if (!this.broken) {
            this.broken = true;
            alert('¡Moneda obtenida!');
        }
    }
}

export function createCoinBox() {
    const coinBox = new Entity();
    coinBox.size.set(16, 16); // Tamaño de la caja
    coinBox.addTrait(new CoinBox());

    return coinBox;
}
export function loadCoinBox() {
    return loadSpriteSheet('mario')
        .then(createCoinBox);
}