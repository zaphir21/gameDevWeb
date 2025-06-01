import { Chrono, convertMs } from './class/Chrono.js';
import { Vitesse } from './class/Vitesse.js';
import { Backgrounds } from "./class/Backgrounds.js";
import {createPlayer, jump, gravity} from "./function/Player.js";
import {createBlock} from "./function/createBlock.js";
import {createPlatform} from "./function/createPlatform.js";
import {checkIfFloor, checkIfPlatform, checkIfSablier} from "./function/checkIf.js";
import {movementLeft, setSpeed, getSpeed, movementLeftSol} from "./function/movementLeft.js";
import { getColor, getNewVie, getSablier } from './function/listObjet.js';
import {dead} from "./function/dead.js";
import { CompteurPiece } from "./class/CompteurPiece.js";
const leaderboardNode = document.getElementById("leaderboard");
const startButton = document.getElementById("startButton");
const ulStartGame = document.getElementById("startGame");
document.addEventListener("DOMContentLoaded", () => {
const pseudoNode = document.getElementById("pseudo");
let isStart = false;
let url = new URL(window.location);
let pseudo = url.searchParams.get("pseudo") || "Anonyme";
let speedS = url.searchParams.get("vitesse") || 0;
let chronoS = url.searchParams.get("chrono") || 0;
if(speedS !== 0 && chronoS !== 0){
    const chrono = document.getElementById("chrono");
    chrono.innerText = convertMs(chronoS);
    const vitesse = document.getElementById("vitesse");

    vitesse.innerText = speedS + "km/h";
}
let piece;
const game = document.getElementById("game");

    pseudoNode.value = pseudo;
    const background = new Backgrounds('game', 8000);
    background.start();

    // Création de l'application PixiJS
    const app = new PIXI.Application({
        backgroundAlpha: 0,
        width: window.innerWidth,
        height: window.innerHeight});
    game.appendChild(app.view);
    game.style.height = window.innerHeight  + 30 + "px"
    app.renderer.resize(window.innerWidth, window.innerHeight);
   


async function start () {
    
    const chrono = new Chrono('chrono');
    chrono.start();
    const vitesse = new Vitesse('vitesse');
    vitesse.start();
    let color = getColor();
    let player = await createPlayer(color, app, PIXI);
    let newVie = getNewVie();
    let sablierToucheA = getSablier();
    app.stage.addChild(player);
    
    // Gestion des plateformes
    let platforms = [];
    const blockSize = 30;
    let nbrSol = 0;
    let sols = [];
    let sabliers = []
    let pieces = []
    // SOL
    let addNbrHole = 2;
    let lastSolIsHole = false;
    app.ticker.add(async () => {
            if (nbrSol <= 10) {
                const sol = createBlock(nbrSol * blockSize, app.screen.height - blockSize * 8, blockSize, blockSize, "Tile_01.png", PIXI, app);
                sols.push(sol);
                nbrSol++;

            } else if (lastSolIsHole === true || Math.random() > 0.15) { // 15% de chance de créer un trou
                const sol = createBlock(nbrSol * blockSize, app.screen.height - blockSize * 8, blockSize, blockSize, "Tile_01.png", PIXI, app);
                sols.push(sol);
                nbrSol++;
                lastSolIsHole = false
            } else {
                const random = Math.floor(Math.random() * 3)

                for (let i = 0; i <= random + addNbrHole; i++) {
                    nbrSol++
                }
                const sol = createBlock(nbrSol * blockSize + 20, app.screen.height - blockSize * 8, blockSize, blockSize, "Tile_01.png", PIXI, app);
                sols.push(sol);
                nbrSol++
                const sol2 = createBlock(nbrSol * blockSize + 23, app.screen.height - blockSize * 8, blockSize, blockSize, "Tile_01.png", PIXI, app);
                sols.push(sol2);
                nbrSol++
                nbrSol += 0.7

                lastSolIsHole = true
            }

    
        platforms = await createPlatform(blockSize, app, PIXI);
        gravity(player);

        checkIfFloor(player, sols);
        checkIfPlatform(player, platforms);
        isSablierDetected = checkIfSablier(player, sabliers, app)
        isPieceDetected = checkIfSablier(player, pieces, app)

        sols = await movementLeftSol(sols, app);
        sabliers = await movementLeft(sabliers, app)
        pieces = await movementLeft(pieces, app)

        if(isSablierDetected){
            if(!oneSablierDetected){
            setSpeed(getSpeed() * 0.95)
            oneSablierDetected = true}
        }
        if(isPieceDetected){
            if(!onePieceDetected){
                piece.increment()
                onePieceDetected = true
            }
        }
        if (player.y > app.screen.height - player.height / 2) {
            
            if(newVie){
                console.log("newVie")
                newVie = false
                jump(player,color, 24, true)
            }else{
            url.searchParams.set("vitesse", vitesse.getSpeed())
            url.searchParams.set("chrono", chrono.getElapsedTime())
            //window.history.pushState({}, "", url);
            app.stop();
            await dead(pseudo, chrono.getElapsedTime(), vitesse.getSpeed(), piece.getPiece());
            window.location.href = url}
        }
    });

    setInterval(() => {
        addNbrHole++

    }, 2000);
let isSablierDetected = false
let oneSablierDetected = false
    setInterval(() =>{
        sabliers.push(createBlock(app.screen.width, app.screen.height - blockSize * 11 - 220, 50, 71, "sablier.png", PIXI, app))
        oneSablierDetected = false
    }, 5000)
    let isPieceDetected = false
    let onePieceDetected = false
    setInterval(() =>{
        const hauteur = Math.floor(Math.random() * 7) + 4;
        pieces.push(createBlock(app.screen.width, app.screen.height - blockSize * hauteur - 220 , 50, 50, "coin.svg", PIXI, app))
        onePieceDetected = false
    }, 1500)
   let hauteur = 8;
    if(color === "red"){
        hauteur = 13
    }
    let SpaceDown = false
    // Gestion du saut avec la touche espace
    window.addEventListener("keydown", (event) => {
        if (event.code === "ShiftLeft") {
            hauteur = 13;
            if(color === "red"){
                hauteur = 18
            }
        }
        if(event.code === "KeyQ"){
            if(!sablierToucheA) return
            setSpeed(getSpeed() * 0.95)
            sablierToucheA = false
        }
        if (event.code === "Space") {
            if(SpaceDown) return
            jump(player,color, hauteur);
            SpaceDown = true
        }

    });
    window.addEventListener("keyup", (event) => {
        if (event.code === "ShiftLeft") {
            hauteur = 8;
            if(color === "red"){
                hauteur = 13
            }
        }
        
        if(event.code === "Space"){
            SpaceDown = false
        }


    });

}
startButton.addEventListener("click", () => {
    if(pseudoNode.value === ""){
        alert("Veuillez entrer un pseudo");
        return;
    }
        pseudo = pseudoNode.value;
        url.searchParams.set("pseudo", pseudo)
        window.history.pushState({}, "", url);
        leaderboardNode.style.display = "none";
        ulStartGame.style.display = "none";
        piece = new CompteurPiece("piece", pseudo);

        setSpeed(4)
        start()
    
});

document.addEventListener("keydown", (event) => {   
   
    if(event.code === "Enter"){
        if(pseudoNode.value === ""){
            alert("Veuillez entrer un pseudo");
            return;
        }
        if(isStart){
            return
        }
        pseudo = pseudoNode.value;

        url.searchParams.set("pseudo", pseudo)
        window.history.pushState({}, "", url);
        leaderboardNode.style.display = "none";
        ulStartGame.style.display = "none";
        piece = new CompteurPiece("piece", pseudo);
        isStart = true
        setSpeed(4) 
        start()
    }

})

});