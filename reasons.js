const reasons = [
"Porque tu sonrisa ilumina mi día.",
"Porque contigo todo es más bonito.",
"Porque me haces sentir amado.",
"Porque me haces mejor persona.",
"Porque sin ti nada tiene sentido.",
"Porque eres mi paz.",
"Porque eres mi alegría.",
"Porque pienso en ti todo el día.",
"Porque tu voz me calma.",
"Porque me haces feliz sin esfuerzo.",
"Porque te amo más cada día.",
"Porque contigo quiero todo mi futuro.",
"Porque eres mi lugar favorito.",
"Porque me haces soñar despierto.",
"Porque me enamoras incluso en silencio.",
"Porque contigo todo es especial.",
"Porque eres mi persona favorita.",
"Porque me haces reír.",
"Porque te extraño incluso cuando estás.",
"Porque eres mi hogar.",
"Porque te elegiría siempre.",
"Porque contigo quiero envejecer.",
"Porque eres mi historia favorita.",
"Porque me haces sentir completo.",
"Porque eres mi casualidad perfecta."
];

const list = document.getElementById("reasons-list");

reasons.forEach((r,i)=>{
    const p=document.createElement("p");
    p.innerHTML = (i+1)+". "+r;
    list.appendChild(p);
});

document.getElementById("openReasons").onclick=()=>{
    document.getElementById("reasons-panel").style.display="flex";
}

document.getElementById("closeReasons").onclick=()=>{
    document.getElementById("reasons-panel").style.display="none";
}