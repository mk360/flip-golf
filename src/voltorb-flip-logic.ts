import "phaser";
import VoltorbFlipTile from "./components/voltorb-tile";
import GridLink from "./components/grid-link";
import GridHandler from "./grid-handler";
import { TileComponents } from "./types";

Phaser.GameObjects.GameObjectFactory.register("voltorb-tile", function (x: number, y: number, value: number) {
    const voltorbTile = new VoltorbFlipTile(this.scene, x, y, value);
    this.displayList.add(voltorbTile);
    this.updateList.add(voltorbTile);
    return voltorbTile;
});

Phaser.GameObjects.GameObjectFactory.register("grid-link", function (tile1: VoltorbFlipTile, tile2: VoltorbFlipTile) {
    const gridLink = new GridLink(this.scene, tile1, tile2);
    this.displayList.add(gridLink);
    return gridLink;
});

interface Voltorbataille extends Phaser.Scene {
    state: {
        level: number
        mode: "play" | "flag"
        score: number
        maxScore: number
        flips: number
        maxFlips: number
        parFlips: number
    }
    grid: TileComponents[][]
    gridHandler: GridHandler
    gridAppearance: number[][]
};

class Voltorbataille extends Phaser.Scene {
    constructor() {
        super("voltorbataille");
        this.state = {
            level: 1,
            mode: "play",
            score: 1,
            maxScore: 0,
            maxFlips: 0,
            parFlips: 0,
            flips: 0
        };
        this.grid = [];
        this.gridHandler = new GridHandler();
    };

    setState(newState: Partial<Voltorbataille["state"]>) {
        for (let property in newState) {
            this.state[property] = newState[property];
        }
    };

    initializeGameState() {
        const { level } = this.state;
        const { grid, points, flips } = this.gridHandler.getGrid(level);
        const picks = [{ type: 1, count: grid["1"] },
        { type: 2, count: grid["2"] }, { type: 3, count: grid["3"] }];

        this.setState({ maxScore: points, parFlips: flips });

        const shuffledGrid: number[][] = [];
        for (let i = 0; i < 5; i++) {
            const line: number[] = [];
            for (let j = 0; j < 5; j++) {
                const valueIndex = Math.floor(Math.random() * picks.length);
                const valueType = picks[valueIndex];
                line.push(valueType.type);
                valueType.count--;
                if (valueType.count === 0) picks.splice(valueIndex, 1);
            }
            shuffledGrid.push(line);
        }
        return shuffledGrid;
    };

    getPointsSum(grid: number[][], targetType: "line" | "column", index: 0 | 1 | 2 | 3 | 4) {
        let maxIterations = targetType === "line" ? grid[0].length : grid.length;
        let score = 0;
        for (let i = 0; i < maxIterations; i++) {
            let studiedTileValue = targetType === "line" ? grid[index][i] : grid[i][index];
            score += studiedTileValue;
        }
        return score;
    };

    prepareLinkBuilder() {
        let linksStore = [];
        const buildTilesLinks = (startLine: number, startColumn: number) => {
            if (linksStore[startLine] && linksStore[startLine][startColumn]) return;
            if (!linksStore[startLine]) linksStore[startLine] = [];
            if (!linksStore[startLine][startColumn]) linksStore[startLine][startColumn] = 1;
            let tile1 = this.grid[startLine][startColumn];
            if (this.grid[startLine + 1]) {
                let tile2 = this.grid[startLine + 1][startColumn];
                this.add["grid-link"](tile1, tile2);
                buildTilesLinks(startLine + 1, startColumn);
            }
            if (this.grid[startLine][startColumn + 1]) {
                let tile2 = this.grid[startLine][startColumn + 1];
                console.log({ startLine, startColumn });
                this.add["grid-link"](tile1, tile2);
                buildTilesLinks(startLine, startColumn + 1);
            }
        };
        return buildTilesLinks;
    };

    handleProgress({ pointsValue }: VoltorbFlipTile) {
        this.setState({
            score: this.state.score * pointsValue
        });
        if (this.state.score === this.state.maxScore) {
            // progress to next level
        }
        // else just keep flipping
        this.setState({
            flips: this.state.flips++
        });
    };

    toggleGameMode() {
        if (this.state.mode === "play") this.setState({ mode: "flag" });
        else this.setState({ mode: "play" });
    };
};

export default Voltorbataille;
