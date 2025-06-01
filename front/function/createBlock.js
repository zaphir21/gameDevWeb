export function createBlock(x, y, width, height, path, PIXI, app) {
    let texture = PIXI.Texture.from("./assets/" + path);
    let block = new PIXI.Graphics();
    block.beginTextureFill({ texture: texture });
    block.drawRect(0, 0, width, height);
    block.endFill();
    block.x = x;
    block.y = y;
    app.stage.addChild(block);
    return block;
}
