export class CompteurPiece {
    constructor(displayElementId, pseudo) {
        this.displayElement = document.getElementById(displayElementId);
        fetch(`http://localhost:8080/search/user/${pseudo}`)
        .then(response => response.json())
        .then(data => {
            this.piece = data.PIECE;
            this.displayElement.innerHTML = this.piece + "<img src='../assets/coin.svg' alt='coin' width='20px' height='20px'>";
        })
    }
    increment() {
        this.piece++;
        this.displayElement.innerHTML = this.piece + "<img src='../assets/coin.svg' alt='coin' width='20px' height='20px'>";
    }
    getPiece(){
        return this.piece;
    }
}