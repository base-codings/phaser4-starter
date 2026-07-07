import { Scene } from 'phaser';
import { SceneKeys, GAME_WIDTH, GAME_HEIGHT } from '../constants';

export class Preloader extends Scene {
    constructor() {
        super(SceneKeys.Preloader);
    }

    init() {
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        this.add.image(cx, cy, 'background');

        // Progress bar outline + fill.
        this.add.rectangle(cx, cy, 468, 32).setStrokeStyle(1, 0xffffff);
        const bar = this.add.rectangle(cx - 230, cy, 4, 28, 0xffd166);

        this.load.on('progress', (progress: number) => {
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        // Load the main game assets here — replace with your own.
        this.load.setPath('assets');
        this.load.svg('logo', 'logo.svg', { width: 260, height: 260 });
        this.load.svg('player', 'player.svg', { width: 64, height: 64 });
    }

    create() {
        // Good place to define global animations once assets are ready.
        this.scene.start(SceneKeys.MainMenu);
    }
}
