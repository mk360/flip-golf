import VoltorbTile from "./voltorb-tile";

declare namespace Phaser.GameObjects {
    interface GameObjectFactory {
        tile(): VoltorbTile
    }
}