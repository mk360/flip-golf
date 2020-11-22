const fs = require("fs");
const tilesData = require("./assets/tiles_data.json");
let tilesDataCopy = {...tilesData};
tilesDataCopy.textures.frames = tilesDataCopy.textures[0].frames.sort((a, b) => {
    let { filename: filename1 } = a;
    let { filename: filename2 } = b;
    let frameNumber1 = +filename1.match(/[0-9]/)[0];
    let frameNumber2 = +filename2.match(/[0-9]/)[0];
    return frameNumber1 - frameNumber2;
});

fs.writeFileSync("./assets/tiles_data.json", JSON.stringify(tilesDataCopy));
