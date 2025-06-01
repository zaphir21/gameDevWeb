import  {convertMs} from './class/Chrono.js';

const leaderboardNode = document.getElementById("leaderboard");
const leaderboardButton = document.getElementById("leaderboardButton");
const pseudoNode = document.getElementById("pseudo");
let url = new URL(window.location);
let hideLeaderboard = false;
async function leaderboard(){
    fetch("http://localhost:8080/top/users/time?nbr=10").then(response => response.json()).then(data => {
            leaderboardNode.innerHTML = "<div id='close-leaderboard'>X</div>";
            const table = document.createElement("table");
            const caption = document.createElement("caption");
            caption.textContent = "Leaderboard";
            const thead = document.createElement("thead");
            thead.innerHTML = "<tr><th>Position</th><th>Pseudo</th><th>Temps</th><th>Vitesse</th><th>Pièces</th></tr>";
            const tbody = document.createElement("tbody");
            data.forEach((user, index) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${index + 1}</td><td>${user.PSEUDO}</td><td>${convertMs(user.TIME)}</td><td>${user.SPEED}</td><td>${user.PIECE}</td>`;
            
                switch(index){
                    case 0:
                        tr.id = "one";
                        break;
                    case 1:
                        tr.id = "two";
                        break;
                    case 2:
                        tr.id = "three";
                        break;
                }
                tbody.appendChild(tr);     
            });
            table.appendChild(caption);
            table.appendChild(thead);
            table.appendChild(tbody);
            leaderboardNode.appendChild(table);
           
            const closeLeaderboard = document.getElementById("close-leaderboard");
            closeLeaderboard.addEventListener("click", () => {
                leaderboardNode.style.display = "none";
                hideLeaderboard = false;
            });
        })
}

leaderboardButton.addEventListener("click", () => {
    if(pseudoNode.value === ""){
        alert("Veuillez entrer un pseudo");
        return;
    }
    if(!hideLeaderboard){
        url.searchParams.set("pseudo", pseudoNode.value)
        window.history.pushState({}, "", url);
        leaderboardNode.style.display = "block";
        leaderboard();
        hideLeaderboard = true;
    }else{
        leaderboardNode.style.display = "none";
        hideLeaderboard = false;
    }
});