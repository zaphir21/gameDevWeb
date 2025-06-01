let speed = 0;
const leaderboardNode = document.getElementById("leaderboard");
const showLeaderboard = document.getElementById("showLeaderboard");
export function movementLeft(platforms, app) {
    for (let platform of platforms.slice(1)) {
        platform.x -= speed; // Vitesse de défilement
        if (platform.x + 10 < -platform.width) {
            app.stage.removeChild(platform);
        }
    }
    return platforms.filter(platform => platform.x + 10 >= -platform.width);
}

export function movementLeftSol(platforms, app) {
    for (let platform of platforms) {
        platform.x -= speed; // Vitesse de défilement
        if (platform.x + 10 < -platform.width) {
            app.stage.removeChild(platform);
        }
    }
    return platforms.filter(platform => platform.x + 10 >= -platform.width);
}


// Fonction pour modifier la vitesse depuis un autre fichier
export function setSpeed(newSpeed) {
    speed = newSpeed;
    console.log(speed)
}

// Fonction pour obtenir la vitesse actuelle
export function getSpeed() {
    return speed;
}

setInterval(() => {
    speed += 0.01
}, 300)