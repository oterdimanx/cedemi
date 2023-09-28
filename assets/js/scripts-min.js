window.addEventListener("DOMContentLoaded",e=>{const t=function(){const e=document.body.querySelector("#mainNav");e&&(0===window.scrollY?e.classList.remove("navbar-shrink"):e.classList.add("navbar-shrink"))};t(),document.addEventListener("scroll",t),document.body.querySelector("#mainNav")&&new bootstrap.ScrollSpy(document.body,{target:"#mainNav",offset:74});const n=document.body.querySelector(".navbar-toggler");[].slice.call(document.querySelectorAll("#navbarResponsive .nav-link")).map(function(e){e.addEventListener("click",()=>{"none"!==window.getComputedStyle(n).display&&n.click()})});const s=document.URL.includes("fr_en")?"en":"fr",l=document.getElementById("submitButton"),i=document.querySelector("form"),a=document.getElementById("reason"),o=document.getElementById("yourname"),d=document.getElementById("email"),r=document.getElementById("phone"),c=document.getElementById("message"),m=new RegExp(/^\b[a-zA-Z0-9._%+-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,"m");let u=[],y=!0,v="localhost"===location.hostname?"http://localhost:8888/.netlify/functions/sendContactMail":"/.netlify/functions/sendContactMail",p="";i.addEventListener("submit",e=>{const t=m.test(d.value);o.value.length<3||o.value.length>150?(p="fr"===s?"Le champ nom doit avoir entre 3 et 150 caractères.":"the name field must contain between 3 and 150 characters.",u.push(p),y=!0,e.preventDefault(),document.getElementById("nameError").style.cssText="display : block; visibility : visible;",p=""):(y=!1,document.getElementById("nameError").style.cssText="display : none; visibility : hidden;"),a.value.length<3||a.value.length>150?(p="fr"===s?"Le champ raison sociale doit avoir entre 3 et 150 caractères.":"the Company Name field must contain between 3 and 150 characters.",u.push(p),y=!0,e.preventDefault(),document.getElementById("reasonError").style.cssText="display : block; visibility : visible;",p=""):(y=!1,document.getElementById("reasonError").style.cssText="display : none; visibility : hidden;"),!t||d.validity.typeMismatch||""===d.value.trim()?(p="fr"===s?"Le champ email semble invalide, veuillez entrer une adresse mail valide.":"the Email field doesn't appear to be valid. Please provide a valid email address.",u.push(p),y=!0,e.preventDefault(),document.getElementById("emailError").style.cssText="display : block; visibility : visible;",p=""):(y=!1,document.getElementById("emailError").style.cssText="display : none; visibility : hidden;"),r.validity.typeMismatch||r.validity.patternMismatch||""===r.value.trim()?(e.preventDefault(),p="fr"===s?"Le format du champ téléphone est incorrect.":"The Phone field is not valid.",u.push(p),y=!0,document.getElementById("phoneError").style.cssText="display : block; visibility : visible;",p=""):(r.setCustomValidity(""),y=!1,document.getElementById("phoneError").style.cssText="display : none; visibility : hidden;"),c.validity.typeMismatch||c.validity.patternMismatch||""===c.value.trim()||c.value.length<15||c.value.length>850?(e.preventDefault(),p="fr"===s?"Le champ message doit comporter au minimum 15 caractères (max 850).":"The Message field must contain at least 15 characters (850 max).",u.push(p),y=!0,document.getElementById("messageError").style.cssText="display : block; visibility : visible;",p=""):(c.setCustomValidity(""),y=!1,document.getElementById("messageError").style.cssText="display : none; visibility : hidden;"),y||0!==u.length?console.log("ERRORS"):fetch(v,{method:"POST",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":!0},body:JSON.stringify({name:o.value,reason:a.value,phone:r.value,email:d.value,message:c.value})}).then(e=>{"OK"===e.statusText&&(document.getElementById("form-wrapper").className="d-none",l.style.cssText="display : none; visibility : hidden;",document.getElementById("submitSuccessMessage").className="form-success")}).then(e=>{console.log("Success: ",e)}),u=[],e.preventDefault()})});