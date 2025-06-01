import { getSpeed } from "../function/movementLeft.js";

export class Vitesse {
    vitesseOn = false;
    constructor(displayElementId) {
        this.displayElement = document.getElementById(displayElementId);

    }

    start() {
        if (this.vitesseOn === false) {
            this.vitesseInterval = setInterval(() => this.update(), 300);
            this.vitesseOn = true;
        }
        return;
    }

    update() {
        this.speed = getSpeed()*20;
        const displaySpeed = this.speed.toFixed(1);
        this.displayElement.innerText = displaySpeed + "km/h";
    }
    stop() {
        clearInterval(this.vitesseInterval);
        this.vitesseOn = false;
    }

    reset() {
        this.stop();
        this.displayElement.innerText = "80km/h";
    }

    getSpeed() {
        return this.speed.toFixed(1);
    }

}
