export const GAME_WIDTH = 1024;
export const GAME_HEIGHT = 768;

/** Central registry of scene keys so scene transitions aren't stringly-typed. */
export const SceneKeys = {
    Boot: 'Boot',
    Preloader: 'Preloader',
    MainMenu: 'MainMenu',
    Game: 'Game',
    GameOver: 'GameOver'
} as const;

export type SceneKey = (typeof SceneKeys)[keyof typeof SceneKeys];
