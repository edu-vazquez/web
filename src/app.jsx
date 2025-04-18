import { useState } from 'preact/hooks'

import './app.css'

export function App() {
  const [count, setCount] = useState(0)


    const container = document.querySelector(".container");
    const factorDecaimiento = 0.995; // El factor de desaceleración
    const velocidadMinima = 0.3; // La velocidad mínima para detener la inercia
    const planos = document.querySelectorAll(".plano");
    let containerPosition = {x: 0, y: 0, z:0};
    let velocidad = 0; // Almacena la velocidad del desplazamiento
    let enMovimiento = false; // Flag para evitar múltiples llamadas a requestAnimationFrame

    let targetPosition = { x: 0, y: 0, z: 0 };
    let isAnimating = false; // Controla si la animación está en curso

    planos.forEach(plano => {
        plano.addEventListener("click", (event) => {

            // Definir la posición objetivo
            targetPosition.x = -plano.getAttribute("data-x");
            targetPosition.y = -plano.getAttribute("data-y");
            targetPosition.z = -plano.getAttribute("data-z");

            if (!isAnimating) {
                isAnimating = true;
                animateMovement(plano);
            }
        });
    });

    function animateMovement(elemento) {
        // Interpolación: acercamos la posición actual a la posición objetivo
        containerPosition.x += (targetPosition.x - containerPosition.x) * 0.2;
        containerPosition.y += (targetPosition.y - containerPosition.y) * 0.2;
        containerPosition.z += (targetPosition.z - containerPosition.z) * 0.2;

        // GROW
        let positcionDelContainer = Math.abs(targetPosition.z - containerPosition.z)
        console.log(`${calcularWidth(positcionDelContainer)}px`);


        // Aplicar transformación
        container.style.transform = `translate3d(${containerPosition.x}px, ${containerPosition.y}px, ${containerPosition.z}px)`;

        // Si la diferencia es mínima, detener la animación
        if (Math.abs(targetPosition.x - containerPosition.x) < 0.5 &&
            Math.abs(targetPosition.y - containerPosition.y) < 0.5 &&
            Math.abs(targetPosition.z - containerPosition.z) < 0.5) {
            containerPosition.x = targetPosition.x;
            containerPosition.y = targetPosition.y;
            containerPosition.z = targetPosition.z;
            isAnimating = false;
            return;
        }
        requestAnimationFrame(animateMovement);
    }

    /* FUNCION EXTRA PARA CALCULAR EL WIDTH QUE DEBERIA TENER EN UNA POSICION DEFINIDA */
    function calcularWidth(posicion) {
        let x0 = 1600, x1 = 0;
        let w0 = 300, w1 = 1200;

        return w0 + ((w1 - w0) * (x0 - posicion)) / (x0 - x1);
    }


    // Función que actualiza el transform del container
    function updateZoom() {
        if (Math.abs(velocidad) > velocidadMinima) {
            // Aplicar el movimiento (por ejemplo, zoom en el eje Z)
            if (containerPosition.z >= 0 ){
                containerPosition.z += velocidad
                
                // Continuar la desaceleración
                velocidad *= factorDecaimiento;

                container.style.transform = `translate3d(${containerPosition.x}px, ${containerPosition.y}px, ${containerPosition.z}px)`;

            } else {
                containerPosition.z = 0
                /* 
                DEFINIR SI QUEDA BIEN PONER O NO ESTO
                containerPosition.y = 0
                containerPosition.x = 0 */
            }
            // Llamar a requestAnimationFrame para hacer el zoom suave
            requestAnimationFrame(() => {
                    updateZoom();
                });
        }
    }

    // FUNCION QUE MANJEA EL SCROLL PARA DESPLAZARSE 
    window.addEventListener('wheel', (event) => {

        if (!isAnimating){
            velocidad = event.deltaY * 0.05;
            updateZoom()
        }

        event.preventDefault(); // Prevenir el comportamiento por defecto del scroll
    }, { passive: false });


    /// CREAR PLANOS AL AZAR    
    function generarPlanos(cantidad, maxZ, minX, maxX) {
        for (let i = 0; i < cantidad; i++) {
            const x = Math.random() * (maxX - minX) + minX;
            const y = Math.random() * (maxX - minX) + minX;
            const z = -i * 100; // Espaciado uniforme cada 1100px en Z

            const plano = document.createElement("div");
            plano.classList.add("planos-extra");
            plano.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            plano.setAttribute("data-z", z);
            container.appendChild(plano);
        }
    }

    /* generarPlanos(200, 1000, -5000, 5000); */ // Llamar a la función con parámetros personalizados


    // EFECTO CARRUSEL EN CADA PLANO
    document.querySelectorAll(".carousel").forEach(carousel => {
        const track = carousel.querySelector(".carousel-track");
        let posicion = 0;
        const velocidad = 1;
        
        function mover() {
            posicion -= velocidad;
            if (posicion <= -track.children[0].offsetWidth) {
                track.appendChild(track.children[0]); // Mueve el primer elemento al final
                posicion = 0;
            }
            track.style.transform = `translateX(${posicion}px)`;
            requestAnimationFrame(mover);
        }

        requestAnimationFrame(mover);
        });

  return (
    <div class="escena">
        <div class="container">
            <div class="plano plano1" data-x="-200" data-y="-200" data-z="0">
                <div class="carousel">
                    <div class="carousel-track">
                        <img src="img1.jpg" alt="1"/>
                        <img src="img2.jpg" alt="2"/>
                        <img src="img3.jpg" alt="3"/>
                        <img src="img4.jpg" alt="4"/>
                    </div>
                </div>  
            </div>
            <div class="plano plano2" data-x="800" data-y="800" data-z="-2000">
                <div class="carousel">
                    <div class="carousel-track">
                        <img src="img1.jpg" alt="1"/>
                        <img src="img2.jpg" alt="2"/>
                        <img src="img3.jpg" alt="3"/>
                        <img src="img4.jpg" alt="4"/>
                    </div>
                </div>  
            </div>
            <div class="plano plano3" data-x="-150" data-y="200" data-z="-4000">
                <div class="carousel">
                    <div class="carousel-track">
                        <img src="img1.jpg" alt="1"/>
                        <img src="img2.jpg" alt="2"/>
                        <img src="img3.jpg" alt="3"/>
                        <img src="img4.jpg" alt="4"/>
                    </div>
                </div>  
            </div>
            <div class="plano plano4" data-x="250" data-y="-200" data-z="-6000">
                <div class="carousel">
                    <div class="carousel-track">
                        <img src="img1.jpg" alt="1"/>
                        <img src="img2.jpg" alt="2"/>
                        <img src="img3.jpg" alt="3"/>
                        <img src="img4.jpg" alt="4"/>
                    </div>
                </div>  
            </div>
            <div class="plano plano5" data-x="-200" data-y="100" data-z="-8000">
                <div class="carousel">
                    <div class="carousel-track">
                        <img src="img1.jpg" alt="1"/>
                        <img src="img2.jpg" alt="2"/>
                        <img src="img3.jpg" alt="3"/>
                        <img src="img4.jpg" alt="4"/>
                    </div>
                </div>  
            </div>
        </div>
    </div>
  )
}
