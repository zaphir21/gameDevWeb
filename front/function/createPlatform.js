import {createBlock} from "./createBlock.js";
import {movementLeftSol} from "./movementLeft.js";
let platforms = [];
let j
export async function createPlatform(blockSize, app, PIXI) {

            if(Math.random() > 0.98){
                let lastPlatformX = platforms.length > 0 ? platforms[platforms.length - 1].x : -1;
            const minSpacing = blockSize * 10; // Espace minimum entre plateformes
            
            // Vérifie que la nouvelle plateforme ne soit pas collée à la précédente
            if (lastPlatformX !== -1 && lastPlatformX > app.screen.width - minSpacing) {
                return;
            }
            let hauteur = Math.floor(Math.random() * 3) + 4;
            let longueur= Math.floor(Math.random() * 4) + 3;
                for(let i = 0; i < longueur; i++){
                    j = i
                    const platform = createBlock(app.screen.width + i * blockSize, app.screen.height - blockSize * hauteur - 230, blockSize, blockSize, "Tile_01.png", PIXI, app);
                    platforms.push(platform);
                }
            }
                        
        
    
    platforms = await movementLeftSol(platforms, app);
    return platforms;
}
