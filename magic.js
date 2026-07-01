
// Frases románticas
const phrases = [
"Te amo más de lo que imaginas ❤️",
"Eres mi lugar favorito 🌹",
"Gracias por existir ✨",
"Contigo todo es mejor 💖",
"Eres mi sueño hecho realidad 💕",
"Nunca dejes de sonreír ❤️",
"Mi corazón es tuyo 🌸"
];

// Emojis mágicos
const emojis = ["🌹","❤️","✨","💖","🌸"];

const layer = document.getElementById("magic-layer");
const msg = document.getElementById("secret-message");

// Crear magia al mover mouse
document.addEventListener("mousemove", (e)=>{

    const item = document.createElement("div");

    item.className="magic-item";

    item.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];

    item.style.left = e.pageX + "px";
    item.style.top = e.pageY + "px";

    layer.appendChild(item);

    setTimeout(()=>{
        item.remove();
    },4000);

});

// Click en pantalla = mensaje romántico
document.addEventListener("click", ()=>{

    const text = phrases[Math.floor(Math.random()*phrases.length)];

    msg.innerHTML = text;
    msg.style.display = "block";

    setTimeout(()=>{
        msg.style.display = "none";
    },3000);

});