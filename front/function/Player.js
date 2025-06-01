export async function createPlayer(color, app, PIXI) {
    const textures = []
    for (let i = 1; i <= 7; i++)
        {
            const texture = PIXI.Texture.from(`./assets/slime/${color}/move/${i}.png`);
            textures.push(texture);

        }

    let player = new PIXI.AnimatedSprite(textures);

    // Positionnement du joueur
    player.anchor.set(0.5);
    player.x = 100;
    player.y = app.screen.height - 400;
    player.width = 40;
    player.height = 25;
    player.vy = 0;
    player.onGround = false;
    player.animationSpeed = 0.2;
    player.play();
    return player;
}
export function jump(player, color, hauteur, dead = false) {
    if (player.onGround || dead) {
        player.vy = -hauteur; // Force du saut
        player.onGround = false;
        const textures = []
        for (let i = 1; i <= 6; i++)
        {
            const texture = PIXI.Texture.from(`./assets/slime/${color}/jump/j${i}.PNG`);
            textures.push(texture);

        }
        if (textures.length > 0) {
            player.textures = textures;
            player.gotoAndPlay(0);
        }
    }
}

export function gravity(player){
    player.vy += 0.5; // Gravité
    player.y += player.vy;
    player.onGround = false;
    return player
}
