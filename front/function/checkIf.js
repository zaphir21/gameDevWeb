import { getColor } from "./listObjet.js";

export async function checkIfFloor(player, sols) {
    for (let sol of sols) {

        if (testForAABB(player, sol)) {
            player.y = sol.y - player.height / 2;
            player.vy = 0;
            player.onGround = true;
            if(player.textures.length !== 7) {
                modificationTexturePlayer(player)
            }
            break;
        }
    }
}

function modificationTexturePlayer(player) {
    const textures = []
    const color = getColor()
    for (let i = 1; i <= 7; i++)
    {
        const texture = PIXI.Texture.from(`./assets/slime/${color}/move/${i}.png`);
        textures.push(texture);
    }
    if (textures.length > 0) {
        // 🔥 Changer les textures sans recréer un nouvel AnimatedSprite
        player.textures = textures;
        player.gotoAndPlay(0); // Recommencer l'animation
    }
}

export function testForAABB(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return (
        bounds1.x < bounds2.x + bounds2.width &&
        bounds1.x + bounds1.width > bounds2.x &&
        bounds1.y < bounds2.y + bounds2.height &&
        bounds1.y + bounds1.height > bounds2.y
    );
}

export function checkIfPlatform(player, platforms) {
    if(platforms === undefined) {
        return
    }
    for (let platform of platforms) {
        if (testForAABB(player, platform)) {
            player.y = platform.y - player.height / 2;
            player.vy = 0;
            player.onGround = true;
            if(player.textures.length !== 7) {
                modificationTexturePlayer(player)
            }
            break;
        }
    }
}
export function checkIfSablier(player, blocks, app) {
    for (let block of blocks) {
        if (testForAABB(player, block)) {
            app.stage.removeChild(block);
            return true
        }
    }
}
