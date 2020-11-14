import "phaser";
import VoltorbFlipTile from "./components/voltorb-tile";

export interface TileComponents {
    tile: VoltorbFlipTile
    text: Phaser.GameObjects.Text
    flag: Phaser.GameObjects.Sprite
};
