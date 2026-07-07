import { Scene } from 'phaser';
import { SceneKeys, GAME_WIDTH, GAME_HEIGHT } from '../constants';

const PLAYER_SPEED = 320;

/**
 * Minimal playable demo: an arcade-physics sprite you steer with the arrow keys
 * or WASD. Replace this with your actual gameplay.
 */
export class Game extends Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private keys!: {
        up: Phaser.Input.Keyboard.Key;
        down: Phaser.Input.Keyboard.Key;
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
    };

    constructor() {
        super(SceneKeys.Game);
    }

    create() {
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'background').setAlpha(0.35);

        this.player = this.physics.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'player');
        this.player.setCollideWorldBounds(true);

        const keyboard = this.input.keyboard!;
        this.cursors = keyboard.createCursorKeys();
        this.keys = {
            up: keyboard.addKey('W'),
            down: keyboard.addKey('S'),
            left: keyboard.addKey('A'),
            right: keyboard.addKey('D')
        };

        this.add.text(GAME_WIDTH / 2, 48, 'Move: Arrow keys / WASD     Game Over: ESC', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        keyboard.once('keydown-ESC', () => this.scene.start(SceneKeys.GameOver));
    }

    update() {
        const left = this.cursors.left.isDown || this.keys.left.isDown;
        const right = this.cursors.right.isDown || this.keys.right.isDown;
        const up = this.cursors.up.isDown || this.keys.up.isDown;
        const down = this.cursors.down.isDown || this.keys.down.isDown;

        const dx = (right ? 1 : 0) - (left ? 1 : 0);
        const dy = (down ? 1 : 0) - (up ? 1 : 0);

        // Normalize so diagonal movement isn't faster than straight movement.
        const body = this.player.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(dx, dy);
        body.velocity.normalize().scale(dx || dy ? PLAYER_SPEED : 0);
    }
}
