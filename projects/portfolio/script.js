document.getElementById("open-navbar").addEventListener("click", showMenu);

function showMenu(){
    document.getElementById("navbar").style.right = `0`;
}

document.getElementById("close-navbar").addEventListener('click', close);

function close(){
    document.getElementById("navbar").style.right = `-40%`;
}

window.addEventListener('scroll', function() {
    const fixedDiv = document.getElementById('page-header');
    if (window.scrollY > 10) { // Cambia '100' por la cantidad de scroll que desees
        fixedDiv.style.top = '0';
    } else {
        fixedDiv.style.top = '-10dvh';
    }
});