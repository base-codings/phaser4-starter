import { Scene } from 'phaser';
import { SceneKeys, GAME_WIDTH, GAME_HEIGHT } from '../constants';

export class MainMenu extends Scene {
    constructor() {
        super(SceneKeys.MainMenu);
    }

    create() {
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        this.add.image(cx, cy, 'background');
        this.add.image(cx, cy - 90, 'logo');

        this.add.text(cx, cy + 120, 'Eggtart Game', {
            fontFamily: 'Arial Black',
            fontSize: 46,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(cx, cy + 190, 'Click to start', {
            fontFamily: 'Arial',
            fontSize: 22,
            color: '#ffd166'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => this.scene.start(SceneKeys.Game));
    }
}
