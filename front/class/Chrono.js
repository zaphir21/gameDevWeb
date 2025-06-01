export class Chrono {
    timerOn = false;
    constructor(displayElementId) {
        this.displayElement = document.getElementById(displayElementId);
        this.milliseconds = 0;
    }

    start() {
        if (this.timerOn === false) {
            this.timerInterval = setInterval(() => this.update(), 10);
            this.timerOn = true;
        }
        return;
    }

    update() {
        this.milliseconds += 10;
        this.displayElement.innerText =  convertMs(this.milliseconds);
        
    }
    stop() {
        clearInterval(this.timerInterval);
        this.timerOn = false;
    }

    reset() {
        this.stop();
        this.milliseconds = 0;
        this.displayElement.innerText = "";
    }

    getElapsedTime() {
        return this.milliseconds;
    }

}

export function convertMs(milliseconds){
    let secondes = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(secondes / 60);
    const timeBase =  (secondes - 60*minutes).toString().padStart(2, '0') + "s " + (milliseconds - 1000*secondes).toString().padStart(3, '0') + " ms"
    if (minutes > 0) {
        return minutes + "m " + timeBase; 
    }else{
        return timeBase;
    }
}