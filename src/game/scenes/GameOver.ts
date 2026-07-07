import { Scene } from 'phaser';
import { SceneKeys, GAME_WIDTH, GAME_HEIGHT } from '../constants';

export class GameOver extends Scene {
    constructor() {
        super(SceneKeys.GameOver);
    }

    create() {
        const cx = GAME_WIDTH / 2;
        const cy = GAME_HEIGHT / 2;

        this.cameras.main.setBackgroundColor(0x2a1a2f);
        this.add.image(cx, cy, 'background').setAlpha(0.25);

        this.add.text(cx, cy - 40, 'Game Over', {
            fontFamily: 'Arial Black',
            fontSize: 64,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(cx, cy + 40, 'Click to return to the menu', {
            fontFamily: 'Arial',
            fontSize: 22,
            color: '#ffd166'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => this.scene.start(SceneKeys.MainMenu));
    }
}
