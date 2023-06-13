window.addEventListener("DOMContentLoaded",e=>{var t=function(){const e=document.body.querySelector("#mainNav");e&&(0===window.scrollY?e.classList.remove("navbar-shrink"):e.classList.add("navbar-shrink"))};t(),document.addEventListener("scroll",t),document.body.querySelector("#mainNav")&&new bootstrap.ScrollSpy(document.body,{target:"#mainNav",offset:74});const l=document.body.querySelector(".navbar-toggler");[].slice.call(document.querySelectorAll("#navbarResponsive .nav-link")).map(function(e){e.addEventListener("click",()=>{"none"!==window.getComputedStyle(l).display&&l.click()})});const n=document.getElementById("submitButton"),o=document.querySelector("form"),s=document.getElementById("reason"),i=document.getElementById("yourname"),a=document.getElementById("email"),c=document.getElementById("phone"),r=document.getElementById("message"),d=new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,"m");let m=[],u=!0,y="localhost"===location.hostname?"http://localhost:8888/.netlify/functions/sendContactMail":"https://cedemi.netlify.app/.netlify/functions/sendContactMail";o.addEventListener("submit",e=>{const t=d.test(a.value);i.value.length<3||i.value.length>150?(console.log("Le champ nom doit avoir entre 3 et 150 caractères."),m.push("Le champ nom doit avoir entre 3 et 150 caractères."),u=!0,e.preventDefault(),document.getElementById("nameError").style.cssText="display : block; visibility : visible;"):(console.log("name OK"),u=!1,document.getElementById("nameError").style.cssText="display : none; visibility : hidden;"),s.value.length<3||s.value.length>150?(console.log("Le champ raison sociale doit avoir entre 3 et 150 caractères."),m.push("Le champ raison sociale doit avoir entre 3 et 150 caractères."),u=!0,e.preventDefault(),document.getElementById("reasonError").style.cssText="display : block; visibility : visible;"):(console.log("reason OK"),u=!1,document.getElementById("reasonError").style.cssText="display : none; visibility : hidden;"),!t||a.validity.typeMismatch||""===a.value.trim()?(e.preventDefault(),console.log("email NOK : "+a.value+", valide="+t),m.push("Le champ email semble invalide, veuillez entrer une adresse mail valide."),u=!0,document.getElementById("emailError").style.cssText="display : block; visibility : visible;"):(console.log("email OK"),u=!1,document.getElementById("emailError").style.cssText="display : none; visibility : hidden;"),c.validity.typeMismatch||c.validity.patternMismatch||""===c.value.trim()?(e.preventDefault(),console.log("phone NOK"),m.push("Le format du champ téléphone est incorrect."),u=!0,document.getElementById("phoneError").style.cssText="display : block; visibility : visible;"):(console.log(c.value+" = phone"),console.log("phone OK"),c.setCustomValidity(""),u=!1,document.getElementById("phoneError").style.cssText="display : none; visibility : hidden;"),r.validity.typeMismatch||r.validity.patternMismatch||""===r.value.trim()||r.value.length<15||r.value.length>850?(e.preventDefault(),console.log("message NOK"),m.push("Le champ message doit comporter au minimum 15 caractères (max 850)."),u=!0,document.getElementById("messageError").style.cssText="display : block; visibility : visible;"):(console.log("message OK"),r.setCustomValidity(""),u=!1,document.getElementById("messageError").style.cssText="display : none; visibility : hidden;"),u||0!==m.length?console.log("ERRORS"):fetch(y,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i.value,reason:s.value,phone:c.value,email:a.value,message:r.value})}).then(e=>{console.log("Request complete! response:",e),"OK"===e.statusText&&(document.getElementById("form-wrapper").className="d-none",n.style.cssText="display : none; visibility : hidden;",document.getElementById("submitSuccessMessage").className="form-success")}).then(e=>{console.log("Success: ",e)}),m=[],console.log("prevent form validation"),e.preventDefault()})});