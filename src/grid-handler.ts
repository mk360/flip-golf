interface Grid {
    1: number
    2: number
    3: number
}

class GridsHandler {
    private levels: {
        [k: number]: Grid
    }
    constructor() {
        this.levels = {
            1: {
                1: 9,
                2: 1,
                3: 4
            }
        };

        for (let level in this.levels) {
            const levelData = this.levels[level];
            let count = 0;
            for (let property in levelData) count += levelData[property];
            if (count !== 25) throw new Error(`Tiles total in level ${level} is not equal to 25.`);
        }
    };

    getGrid(level: number) {
        const grid = this.getLevelGrid(level);
        const points = this.getGridTotalPoints(grid);
        const flips = this.getGridParFlips(grid);
        return {
            grid,
            points,
            flips
        };
    };

    private getGridParFlips(grid: Grid) {
        let flips = 0;
        for (let property in grid) {
            if (Number(property) === 1) continue;
            flips += grid[property];
        }
        return flips;
    };

    private getLevelGrid(level: number) {
        const defaultGrid = {
            1: 0,
            2: 0,
            3: 0
        };
        if (!this.levels[level]) return defaultGrid;
        return this.levels[level];
    };

    private getGridTotalPoints(grid: Grid) {
        if (!grid) return 0;
        let points = 0;
        for (let prop in grid) {
            points *= grid[prop] * Number(prop);
        }
        return points;
    };
};

export default GridsHandler;
