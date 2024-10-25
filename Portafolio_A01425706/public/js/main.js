import Camera from './Camera.js';
import Entity from './Entity.js';
import PlayerController from './traits/PlayerController.js';
import Timer from './Timer.js';
import {createLevelLoader} from './loaders/level.js';
import {loadEntities} from './entities.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers.js';

const missions = {
    killTurtle: false,
    killKoopa: false,
    breakBlocks: false,
    finishLevel: false,
};

export function checkMissionCompletion() {
    if (missions.killTurtle && missions.killKoopa && missions.breakBlocks && missions.finishLevel) {
        showAllCards();
    }
}

let cardCount = 0;
const maxCards = 3;

export function showCard(message, repoLink) {
    const cardContainer = document.querySelector('.card-container');
    
    if (!cardContainer) {
        console.error('El contenedor de tarjetas no existe.');
        return;
    }

    if (cardCount >= maxCards) {
        console.log('Ya hay demasiadas tarjetas visibles.');
        return;
    }

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <button class="close-btn">&times;</button>
        <h2>¡Felicidades!</h2>
        <p>${message}.</p>
        <a href="${repoLink}" class="repo-link" target="_blank">Ver repositorio</a>
    `;

    card.style.top = `${10 + cardCount * 40}px`;

    cardCount++;

    const closeButton = card.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
        cardContainer.removeChild(card);
        cardCount--;
        repositionCards();
    });

    cardContainer.appendChild(card);
}

function repositionCards() {
    const cards = document.querySelectorAll('.card');
    let index = 0;
    cards.forEach(card => {
        card.style.top = `${10 + index * 40}px`;
        index++;
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.card-container')) {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        document.body.appendChild(cardContainer);
    }
});

function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

async function main(canvas) {
    const context = canvas.getContext('2d');

    const entityFactory = await loadEntities();
    const loadLevel = await createLevelLoader(entityFactory);

    const level = await loadLevel('1-1');

    const camera = new Camera();

    const mario = entityFactory.mario();

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);

    level.comp.layers.push(createCollisionLayer(level));

    const input = setupKeyboard(mario);
    input.listenTo(window);

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        camera.pos.x = Math.max(0, mario.pos.x - 100);

        level.comp.draw(context, camera);
    };

    timer.start();
}

const canvas = document.getElementById('screen');
main(canvas);
