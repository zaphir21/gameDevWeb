export async function dead(pseudo, time, speed, piece) {
    console.log(pseudo, time, speed, piece);
    fetch(`http://localhost:8080/insert/user?SPEED=${speed}&TIME=${time}&PSEUDO=${pseudo}&PIECE=${piece}`)
}
