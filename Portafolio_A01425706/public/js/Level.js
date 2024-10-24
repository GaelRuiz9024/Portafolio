import Compositor from './Compositor.js';
import EntityCollider from './EntityCollider.js';
import TileCollider from './TileCollider.js';
import { showCard } from './main.js';
import { checkMissionCompletion } from './main.js';
export default class Level {
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;

        this.comp = new Compositor();
        this.entities = new Set();

        this.entityCollider = new EntityCollider(this.entities);
        this.tileCollider = null;

        // Bandera para determinar si el nivel ya ha sido completado
        this.levelCompleted = false;
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this);
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });

        // Llamar a la verificación del final del nivel
        this.entities.forEach(entity => {
            this.checkLevelCompletion(entity); 
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });

        this.totalTime += deltaTime;
    }

    checkLevelCompletion(entity) {
        const goalX = 3101;
        const goalY = 192;
        const toleranceX = 1;  // Tolerancia para la coordenada x
        const toleranceY = 5;  // Tolerancia para la coordenada y

        // Imprimir la posición actual de la entidad
        //console.log(`Posición de la entidad: X=${entity.pos.x}, Y=${entity.pos.y}`);

        // Si la entidad está dentro de la zona de finalización y no se ha completado el nivel antes
        if (Math.abs(entity.pos.x - goalX) < toleranceX && Math.abs(entity.pos.y - goalY) < toleranceY) {
            if (!this.levelCompleted) {
                this.endLevel();
                this.levelCompleted = true;  // Activar la bandera de nivel completado
                
            }
        } else {
            // Si Mario sale de la zona de meta, reiniciar la bandera
            this.levelCompleted = false;
        }
    }

    endLevel() {
        console.log('¡Nivel completado!');
        showCard("Nivel completado", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        // Aquí puedes manejar la lógica para el final del nivel, como transiciones o mostrar una pantalla de victoria.
    }
}
