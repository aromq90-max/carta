const text = `
Mi amor ❤️

Si estás leyendo esto, quiero que sepas algo muy importante...

Desde que llegaste a mi vida, todo cambió para mejor.

No hay día en el que no piense en ti,
no hay noche en la que no te extrañe,
y no hay futuro en el que no te imagine conmigo.

Este julio no es solo un mes,
es una forma de decirte cuánto te amo.

Quiero verte feliz,
quiero verte sonreír,
y quiero ser siempre esa persona que te acompañe en cada momento.

Gracias por existir,
gracias por elegirme,
y gracias por dejarme amarte.

Te amo hoy,
te amo mañana,
y te amaré en todos los julios de mi vida. ❤️
`;

let i = 0;

function openLetter(){

document.getElementById("envelope").style.display="none";

document.getElementById("letter").style.display="block";

typeWriter();

}

function typeWriter(){

if(i < text.length){

document.getElementById("typing-text").innerHTML += text.charAt(i);

i++;

setTimeout(typeWriter,40);

}
.photo.zoom{

position:fixed;

top:50%;

left:50%;

transform:translate(-50%,-50%) scale(1.8);

z-index:9999;

}

}
