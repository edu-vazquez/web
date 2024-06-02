window.addEventListener('scroll', function() {
    const fixedDiv = document.getElementById('page-header');
    if (window.scrollY > 10) { 
        fixedDiv.style.bottom = '0dvh';
    } else {
        fixedDiv.style.bottom = '-10dvh';
        document.getElementById("footer").style.bottom = "-20dvh";
    }
});

let footerSate = "down";
document.getElementById("links").addEventListener('click', () => {
    if (footerSate == "down"){
        document.getElementById("footer").style.bottom = "0dvh";
        footerSate = "up";
    } else {
        document.getElementById("footer").style.bottom = "-20dvh";
        footerSate = "down";
        document.getElementById("email").style.bottom = "-30dvh";
        emailSate = "down";
    }
})
let emailSate = "down";
document.getElementById("email-link").addEventListener('click', () => {
    if (emailSate == "down"){
        document.getElementById("email").style.bottom = "0dvh";
        emailSate = "up";
    } else {
        document.getElementById("email").style.bottom = "-30dvh";
        emailSate = "down";
    }
})