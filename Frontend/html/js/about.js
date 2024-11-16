const e = document.getElementById("email");
const hrefe = document.getElementById("hrefe");
var em= "marcio@gmail.com";

e.textContent=em;

hrefe.href=`mailto:${em}`;