
let newVie = false;
let sablier = false; 
let pseudo = "";
let color = "blue";
let url;
let piece = 0;
let displayElement = document.getElementById("piece");
export function getUser(){
    url = new URL(window.location);
    if(pseudo !== url.searchParams.get("pseudo")){
        pseudo = url.searchParams.get("pseudo");
    }
    console.log(pseudo);
    fetch(`http://localhost:8080/search/user/${pseudo}`).then(response => response.json())
    .then(data => {
        piece = data.PIECE;
        displayElement.innerHTML = piece + "<img src='../assets/coin.svg' alt='coin' width='20px' height='20px'>";
    }).catch(error => {
        console.error("Erreur :", error);
    });

}
    export async function addObjet(objet) {
        try {
            if (objet === "vie") {
                if(piece >= 30){
                    //url.searchParams.set("newVie", true);
                    //window.history.pushState({}, "", url);
                    newVie = true;
                    return true
                }else{
                    alert("Vous n'avez pas assez de pièces pour débloquer cet objet");
                    return false
                }
            } else if (objet === "sablier") {
                if(piece >= 15){
                    //url.searchParams.set("sablier", true);
                    //window.history.pushState({}, "", url);
                    sablier = true;
                    return true
                }else{
                    alert("Vous n'avez pas assez de pièces pour débloquer cet objet");
                    return false
                }
            }else if(objet === "redSlime"){
                if(piece >= 50){
                    //url.searchParams.set("redSlime", true);
                    //window.history.pushState({}, "", url);
                    color = "red";
                    return true
                }else{
                    alert("Vous n'avez pas assez de pièces pour débloquer cet objet");
                    return false
                }
            }
        } catch (error) {
            console.error("❌ Erreur dans addObjet():", error);
        }
    }
    
    export function getNewVie(){
        return newVie;
    }
    export function getSablier(){
        return sablier;
    }

    export function getColor(){
        return color;
    }