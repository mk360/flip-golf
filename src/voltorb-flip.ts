import VoltorbFlipTile from "./components/voltorb-tile";
import { TileComponents } from "./types";
import VoltorbFlipLogic from "./voltorb-flip-logic";
import Constants from "./constants";

interface VoltorbFlip extends VoltorbFlipLogic {
    buttons: {
        [label: string]: Phaser.GameObjects.Image
    }
};

Phaser.GameObjects.GameObjectFactory.register("tile", function(x: number, y: number, value: number) {
    const tile = new VoltorbFlipTile(this.scene, x, y, value);
    this.displayList.add(tile);
    this.updateList.add(tile);
    return tile;
});

class VoltorbFlip extends VoltorbFlipLogic {
    constructor() {
        super();
        this.buttons = {};
    };

    create() {
        this.gridAppearance = this.initializeGameState();
        this.generateTiles();
        // const buildTilesLinks = this.prepareLinkBuilder();
        // buildTilesLinks(0, 0);

    };

    generateTiles() {
        for (let i = 0 as 0 | 1 | 2 | 3 | 4; i < 5; i++) {
            const arr = [];
            for (let j = 0 as 0 | 1 | 2 | 3 | 4; j < 5; j++) {
                arr.push(this.createTile(i, j));
            }
            this.grid.push(arr);
        }
    };

    createTile(line: 0 | 1 | 2 | 3 | 4, column: 0 | 1 | 2 | 3 | 4) {
        const tile: VoltorbFlipTile = this.add["tile"](100 * line + 200, 100 * column + 90, this.gridAppearance[line][column]);
        const text = this.add.text(tile.getCenter().x, tile.getCenter().y, tile.pointsValue.toString(), {
            color: "black"
        }).setAlpha(0);
        // const flag = this.add.sprite(tile.getCenter().x, tile.getCenter().y, "");
        const components = {
            tile,
            text,
            // flag
        };
        tile.setInteractive();
        tile.on("pointerup", () => {
            console.log(tile.pointsValue);
            if (this.state.mode === "flag") {
                // if (!tile.isFlipped) this.toggleTileFlag(components);
            } else {
                // this.flipTile(components);
            }
        });
        return components;
    };

    createButton(label: { content: string, style?: Phaser.GameObjects.TextStyle }, coordinates: { x: number, y: number }, onClick: (button: Phaser.GameObjects.Image, text: Phaser.GameObjects.Text) => void) {
        const button = this.add.image(coordinates.x, coordinates.y, Constants.HUD_BUTTON);
        const buttonCenter = button.getCenter();
        // const text = this.add.text(buttonCenter.x, buttonCenter.y, label.content, label.style);
        button.on("pointerup", () => {
            // onClick(button, text);
        });
    };

    addButtons() {

    };

    toggleTileFlag(tileComponents: TileComponents) {
        tileComponents.tile.toggleFlag();
        if (tileComponents.tile.isFlagged) {
            tileComponents.flag.setAlpha(1);
        } else {
            tileComponents.flag.setAlpha(0);
        }
    };

    preload() {
        this.load.atlas("tile", "./assets/tiles_data-0.png", "./assets/tiles_data.json");
    };

    flipTile(tileComponents: TileComponents) {
        tileComponents.tile.removeListener("pointerup");
        tileComponents.tile.isFlipped = true;
        tileComponents.tile.disableInteractive();
        tileComponents.flag.destroy();
        tileComponents.flag = null;
        const textFadeIn = this.tweens.create({
            from: 0,
            to: 1,
            duration: 3000,
            repeat: 0,
            onUpdate(tween) {
                tileComponents.text.setAlpha(tween.getValue());
            }
        });
        tileComponents.tile.flip();
        this.handleProgress(tileComponents.tile);
    };
};

export default VoltorbFlip;
