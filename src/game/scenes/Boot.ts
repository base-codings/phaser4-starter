import { Scene } from 'phaser';
import { SceneKeys, GAME_WIDTH, GAME_HEIGHT } from '../constants';

/**
 * Boot has no loading bar, so it should only load the few assets the Preloader
 * itself needs to draw (e.g. the background behind the progress bar).
 */
export class Boot extends Scene {
    constructor() {
        super(SceneKeys.Boot);
    }

    preload() {
        this.load.svg('background', 'assets/background.svg', {
            width: GAME_WIDTH,
            height: GAME_HEIGHT
        });
    }

    create() {
        this.scene.start(SceneKeys.Preloader);
    }
}
