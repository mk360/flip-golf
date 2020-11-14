import "phaser";
import Constants from "../constants";

interface ButtonConstructor {
    scene: Phaser.Scene
    x: number
    y: number
};

abstract class GenericButton extends Phaser.GameObjects.GameObject {
    constructor(options: ButtonConstructor) {
        super(options.scene, Constants.HUD_BUTTON);

    };
};

export default GenericButton;
