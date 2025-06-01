import {addObjet, getUser} from "./function/listObjet.js";


document.addEventListener("DOMContentLoaded", () => {
    const boutiqueNode = document.getElementById("shop");
    const boutiqueButton = document.getElementById("boutiqueButton");
    const pseudoNode = document.getElementById("pseudo");
    const buttonAchat = document.querySelectorAll(".buttonAcheter")
    let hideBoutique = false;
    const closeBoutique = document.getElementById("close-shop");
    
    closeBoutique.addEventListener("click", () => {
        boutiqueNode.style.display = "none";
        hideBoutique = false;
    });
    buttonAchat.forEach((button)=>{
        button.addEventListener("click", async function(event) {
            event.preventDefault();
            const objet = await addObjet(button.id); 
            if(!objet) return
            button.style.backgroundColor = "red";
        });
    })
    
    boutiqueButton.addEventListener("click", (event) => {
        event.preventDefault();

        if (pseudoNode.value === "") {
            alert("Veuillez entrer un pseudo");
            return;
        }

        if (!hideBoutique) {
            boutiqueNode.style.display = "block";
            const url = new URL(window.location);
            url.searchParams.set("pseudo", pseudoNode.value);
            window.history.pushState({}, "", url);

            getUser();
            hideBoutique = true;
        } else {
            boutiqueNode.style.display = "none";
            hideBoutique = false;
        }
    });
});