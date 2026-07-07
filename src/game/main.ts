import { AUTO, Game, Scale } from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from './constants';
import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainMenu } from './scenes/MainMenu';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';

// Game config reference: https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'game-container',
    backgroundColor: '#14141f',
    // FIT keeps aspect ratio and scales the canvas to the parent; CENTER_BOTH centers it.
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scene: [Boot, Preloader, MainMenu, MainGame, GameOver]
};

const StartGame = (parent: string) => new Game({ ...config, parent });

export default StartGame;
