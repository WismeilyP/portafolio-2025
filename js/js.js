const nav = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  if(nav.classList.contains('active') && !nav.classList.contains('closing')) {
    // Inicia animación de cierre
    nav.classList.add('closing');

    // Espera a que termine la transición
    setTimeout(() => {
      nav.classList.remove('active');
      nav.classList.remove('closing');
    }, 400); // Debe coincidir con el transition en CSS
  } else if(!nav.classList.contains('active')) {
    // Abrir menú
    nav.classList.add('active');
  }
});






// cards

document.addEventListener("DOMContentLoaded", () => {
	const cards = document.querySelectorAll(".cardd");
	const MAX_ROTATION = 6; // Max degrees of rotation
	const POP_DISTANCE = 7.5; // Max pixels to translateZ

	cards.forEach((card) => {
		card.addEventListener("mousemove", (event) => {
			const rect = card.getBoundingClientRect();
			const cardWidth = rect.width;
			const cardHeight = rect.height;

			// Calculate mouse position relative to the center of the card
			// event.clientX/Y is mouse position relative to viewport
			// rect.left/top is card position relative to viewport
			// mouseX/YInCard is mouse position relative to top-left of the card
			const mouseXInCard = event.clientX - rect.left;
			const mouseYInCard = event.clientY - rect.top;

			// Calculate rotation values
			// (mouseXInCard / cardWidth - 0.5) gives a range from -0.5 to 0.5
			// Multiply by 2 to get -1 to 1 range
			// Then multiply by MAX_ROTATION
			const rotateY = (mouseXInCard / cardWidth - 0.5) * 2 * MAX_ROTATION;
			const rotateX = -(mouseYInCard / cardHeight - 0.5) * 2 * MAX_ROTATION;

			// Apply the transform
			card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${POP_DISTANCE}px)`;
		});

		card.addEventListener("mouseleave", () => {
			// Reset transform smoothly
			card.style.transform =
				"perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
		});
	});
});





(function(){
  // Esperar DOM
  document.addEventListener('DOMContentLoaded', function(){

    const section = document.querySelector('.sectionCard');
    if(!section) return;

    // Seleccionamos solo los contenedores directos dentro de .sectionCard
    const containers = Array.from(section.querySelectorAll(':scope > .container'));
    if(!containers.length) return;

    const containersPerPage = 2; // 2 contenedores x página = 6 proyectos
    const totalContainers = containers.length;
    const totalPages = Math.ceil(totalContainers / containersPerPage);
    let currentPage = 1;

    // Referencias a los controles (si no existen, no causar errores)
    const paginationWrap = section.querySelector('.portfolio-pagination');
    const prevBtn = paginationWrap ? paginationWrap.querySelector('.portfolio-prev') : null;
    const nextBtn = paginationWrap ? paginationWrap.querySelector('.portfolio-next') : null;
    const pagesContainer = paginationWrap ? paginationWrap.querySelector('.portfolio-pages') : null;

    // Crear botones de paginación en base al totalPages
    if(pagesContainer){
      pagesContainer.innerHTML = ''; // asegurar limpio
      for(let i=1;i<=totalPages;i++){
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'page-btn' + (i===1 ? ' active' : '');
        btn.setAttribute('data-page', i);
        btn.textContent = i;
        btn.addEventListener('click', () => {
          currentPage = i;
          update();
          // foco accesible
          btn.focus();
        });
        pagesContainer.appendChild(btn);
      }
    }

    function update(){
      const start = (currentPage - 1) * containersPerPage;
      const end = start + containersPerPage;

      containers.forEach((cont, idx) => {
        // Mostrar exactamente las containers dentro del rango
        cont.style.display = (idx >= start && idx < end) ? '' : 'none';
      });

      // Actualizar estados botones numericos
      if(pagesContainer){
        const pageBtns = pagesContainer.querySelectorAll('.page-btn');
        pageBtns.forEach(btn => {
          btn.classList.toggle('active', Number(btn.getAttribute('data-page')) === currentPage);
        });
      }

      if(prevBtn) prevBtn.disabled = currentPage <= 1;
      if(nextBtn) nextBtn.disabled = currentPage >= totalPages;
    }

    // Prev / Next handlers
    if(prevBtn){
      prevBtn.addEventListener('click', () => {
        if(currentPage > 1){
          currentPage--;
          update();
        }
      });
    }
    if(nextBtn){
      nextBtn.addEventListener('click', () => {
        if(currentPage < totalPages){
          currentPage++;
          update();
        }
      });
    }

    // Inicializar estados: si solo hay 1 página, ocultar paginación
    if(totalPages <= 1){
      if(paginationWrap) paginationWrap.style.display = 'none';
      // mostrar todo si menos de 6?
      containers.forEach(c => c.style.display = '');
    } else {
      // mostrar la primera página
      update();
    }

  });
})();

