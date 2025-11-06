
/*
  Multilanguage switcher con traducción completa de la sección "Portfolio"
  - Reemplaza el script anterior por este.
  - Traduce NAV, Hero, My Focus, Portfolio (títulos + descripciones), footer y CTA.
  - Guarda la preferencia en localStorage.
  - No modifica tu HTML ni clases.
*/
(function(){
  const translations = {
    // NAV links
    ".nav-links a:nth-child(1)": { en: "About Me", es: "Sobre mí" },
    ".nav-links a:nth-child(2)": { en: "My Focus", es: "Enfoque" },
    ".nav-links a:nth-child(3)": { en: "Projects", es: "Proyectos" },
    ".nav-links a:nth-child(4)": { en: "Contact", es: "Contacto" },

    // Hero singulars
    ".hero .hero-content h1": { en: "Web Developer\nUX/UI Designer", es: "Desarrollo Web\nDiseño UX/UI" },
    ".hero .hero-content p": { 
      en: "I design and build modern websites that are fast and intuitive. \nFrom custom web development to scalable CMS solutions, I turn ideas into results.",
      es: "Diseño y desarrollo sitios web modernos y rápidos. Desde desarrollos a medida hasta soluciones CMS escalables."
    },
    "#box": { en: "Download CV", es: "Descargar CV" },

    // About / HeroAbout
    ".heroAbout .title": { en: "Wismeily Palma ", es: "Wismeily Palma " },
    ".heroAbout .subtitle": { 
      en: "I specialize in creating digital experiences that combine clean design with solid functionality",
      es: "Me especializo en crear experiencias digitales que combinan diseño limpio con funcionalidad sólida"
    },

    // Section headings
    ".h2-subtitle": { en: "My Focus", es: "En qué me enfoco" },
    ".sectionCard > h2": { en: "Portfolio", es: "Portafolio" },

    // Footer links text
    "footer a[href='#about']": { en: "About Me", es: "Sobre mí" },
    "footer a[href='#focus']": { en: "My Focus", es: "Enfoque" },
    "footer a[href='#services']": { en: "Projects", es: "Proyectos" },
    "footer a[href='#portfolio']": { en: "Contact", es: "Contacto" },

    // CTA and footer text
    ".input-email": { en_placeholder: "Enter your email", es_placeholder: "Introduce tu correo" },

    ".z-index-texto .font-extrabold": 
    { 
        en: "Turning Ideas into Digital Experiences<br><span class='letstalk'>Let’s Talk</span>", 
        es: "Ideas en experiencias digitales<br><span class='letstalk'>Hablemos</span>" 
    },


    ".btn-input-email": { en: "SEND", es: "ENVIAR" },
    "footer .text-center.text-gray-500.text-sm": { 
      en: "© 2025 Wismeily Palma. All rights reserved.",
      es: "© 2025 Wismeily Palma. Todos los derechos reservados."
    }
  };

  // My Focus arrays (títulos y párrafos)
  const focusTitles = [
    { en: "UI/UX Design", es: "Diseño UI/UX" },
    { en: "Frontend", es: "Frontend" },
    { en: "CMS & E-commerce", es: "CMS y E-commerce" }
  ];

  const focusParagraphs = [
    {
      en: "I design clear, modern, and engaging digital experiences, carefully crafting every detail. My goal is to make every interface intuitive, accessible, and capable of creating an authentic connection with users.",
      es: "Diseño experiencias digitales claras, modernas y atractivas, cuidando cada detalle. Mi objetivo es que cada interfaz sea intuitiva, accesible y genere una conexión auténtica con los usuarios."
    },
    {
      en: "I specialize in building fast, responsive, and dynamic interfaces by applying industry best practices. My priority is to transform designs into smooth and functional experiences across all devices.",
      es: "Me especializo en construir interfaces rápidas, responsivas y dinámicas aplicando las mejores prácticas. Prioritizo convertir diseños en experiencias fluidas y funcionales en todos los dispositivos."
    },
    {
      en: "I create professional websites and online stores using various CMS platforms, optimized for performance, security, and scalability. My focus is on delivering custom solutions that help brands and businesses grow in the digital world.",
      es: "Creo sitios web y tiendas en línea profesionales usando varios CMS, optimizados en rendimiento, seguridad y escalabilidad. Me enfoco en soluciones a medida que ayuden a marcas y negocios a crecer digitalmente."
    }
  ];

  // PORTFOLIO: mapas de EN -> ES (usamos el texto en inglés actual como clave)
  const portfolioTitleMap = {
    "Kissmegram": "Kissmegram",
    "Plenty Zone": "Plenty Zone",
    "Sensory": "Sensory",
    "Loulavie": "Loulavie",
    "Rippy Club": "Rippy Club",
    "Cuid": "Cuid",
    "Ternary": "Ternary",
    "Merkimarket": "Merkimarket",
    "Cuid Tech": "Cuid Tech",
    "Nanikamahao": "Nanikamahao",
    "Miami Global Supply": "Miami Global Supply",
    "Options Swing": "Options Swing",
    "Brilliant Woman": "Brilliant Woman",
    "King Jesus ATL": "King Jesus ATL",
    "Prat Espais": "Prat Espais",
    "Mused": "Mused",
    "King Jesus Partners": "King Jesus Partners",
    "King Jesus Ministries": "King Jesus Ministries",
    "Newwine": "Newwine",
    "FLAVVRR": "FLAVVRR",
    "GeckoFlux": "GeckoFlux"
  };

  const portfolioParaMap = {
    "Social platform that connects the LGBTQ+ community in an inclusive and safe environment.":
      "Plataforma social que conecta a la comunidad LGBTQ+ en un entorno inclusivo y seguro.",
    "Digital platform to explore, compare, and find new and used cars quickly and easily.":
      "Plataforma digital para explorar, comparar y encontrar coches nuevos y usados de forma rápida y sencilla.",
    "E-commerce for adult toys providing safe, discreet shopping and a reliable, private user experience.":
      "Tienda online de juguetes para adultos que ofrece compras seguras, discretas y una experiencia privada y confiable.",
    "Car rental platform that makes it easy to book reliable vehicles for business trips or weekend getaways.":
      "Plataforma de alquiler de coches que facilita reservar vehículos fiables para viajes de negocio o escapadas de fin de semana.",
    "E-commerce mentorship platform offering coaching, ad strategies, and exclusive resources to help entrepreneurs launch and scale profitable online stores.":
      "Plataforma de mentoría y e-commerce que ofrece coaching, estrategias publicitarias y recursos exclusivos para ayudar a emprendedores a lanzar y escalar tiendas rentables.",
    "Online store offering advanced security systems for homes and businesses.":
      "Tienda online que ofrece sistemas de seguridad avanzados para hogares y negocios.",
    "Platform to manage and monetize digital communities, integrating websites, payments, and Discord.":
      "Plataforma para gestionar y monetizar comunidades digitales, integrando sitios web, pagos y Discord.",
    "Online store offering bathroom, kitchen, and garden products with quality, style, and guaranteed satisfaction.":
      "Tienda online de productos para baño, cocina y jardín con calidad, estilo y satisfacción garantizada.",
    "Modular security technology platform offering AI-powered monitoring and enterprise-grade protection for providers.":
      "Plataforma tecnológica modular de seguridad que ofrece monitorización con IA y protección de nivel empresarial para proveedores.",
    "E-commerce offering high-quality nail art supplies for professionals and enthusiasts, delivering vibrant colors and long-lasting results.":
      "Tienda online de suministros de nail art de alta calidad para profesionales y aficionados, con colores vibrantes y resultados duraderos.",
    "E-commerce providing durable, high-quality packaging solutions for restaurants, cafés, and retail businesses.":
      "E-commerce que suministra soluciones de embalaje duraderas y de alta calidad para restaurantes, cafeterías y comercios.",
    "Educational platform and Discord community guiding traders of all levels to navigate financial markets and learn options trading.":
      "Plataforma educativa y comunidad en Discord que guía a traders de todos los niveles para navegar los mercados financieros y aprender trading de opciones.",
    "Website empowering women spiritually and practically, guiding them to lead with wisdom, faith, and excellence.":
      "Sitio web que empodera a las mujeres espiritual y prácticamente, guiándolas a liderar con sabiduría, fe y excelencia.",
    "Website for a new church in Atlanta, fostering community, spiritual growth, and transformative experiences.":
      "Sitio web para una nueva iglesia en Atlanta, fomentando comunidad, crecimiento espiritual y experiencias transformadoras.",
    "Website for municipal housing and parking services, providing information and management of public housing programs and parking facilities.":
      "Sitio web de servicios municipales de vivienda y aparcamiento, ofreciendo información y gestión de programas de vivienda pública y aparcamientos.",
    "Webflow agency creating visual identities and branding solutions for challenger brands worldwide.":
      "Agencia Webflow que crea identidades visuales y soluciones de branding para marcas challengers en todo el mundo.",
    "Website for a donations program supporting global outreach, children’s homes, and feeding initiatives within King Jesus Ministry.":
      "Sitio web para un programa de donaciones que apoya el alcance global, hogares infantiles e iniciativas de alimentación de King Jesus Ministry.",
    "Fill out the form and the algorithm will offer the right team of experts":
      "Completa el formulario y el algoritmo ofrecerá el equipo de expertos adecuado.",
    "Christian worship collective inspiring a return to intimacy with God through music, devotion, and community.":
      "Colectivo de adoración cristiana que inspira a volver a la intimidad con Dios a través de la música, la devoción y la comunidad.",
    "Cultural insights agency helping global brands design inclusive products and customer experiences through research, strategy, and experience design.":
      "Agencia de insights culturales que ayuda a marcas globales a diseñar productos y experiencias inclusivas mediante investigación, estrategia y diseño de experiencia.",
    "AI-driven growth and performance agency that blends strategy, creativity, and automation to deliver measurable results across LatAm and Miami.":
      "Agencia de crecimiento y rendimiento impulsada por IA que combina estrategia, creatividad y automatización para ofrecer resultados medibles en LatAm y Miami."
  };

  // Helpers
  function setHTML(selector, text){
    const el = document.querySelector(selector);
    if(!el) return;
    el.innerHTML = String(text).replace(/\n/g, "<br>");
  }

  function setPlaceholder(selector, text){
    const el = document.querySelector(selector);
    if(!el) return;
    el.setAttribute('placeholder', text);
  }

  function applyLanguage(lang){
    // html lang
    document.documentElement.lang = (lang === 'es') ? 'es' : 'en';
    const label = document.getElementById('lang-label');
    if(label) label.textContent = (lang === 'es') ? 'ES' : 'EN';

    // apply singular translations
    Object.keys(translations).forEach(sel => {
      const item = translations[sel];
      if(!item) return;
      // placeholder
      if(item[lang + "_placeholder"]){
        setPlaceholder(sel, item[lang + "_placeholder"]);
        return;
      }
      const txt = item[lang] || item.en || "";
      const el = document.querySelector(sel);
      if(!el) return;
      el.innerHTML = String(txt).replace(/\n/g, "<br>");
    });

    // My Focus (titles + paragraphs) by index
    const titleEls = document.querySelectorAll('.card-container .title-card-3d');
    titleEls.forEach((el, idx) => {
      const map = focusTitles[idx];
      if(map){
        el.textContent = (lang === 'es') ? (map.es || map.en) : (map.en || map.es);
      }
    });
    const paraEls = document.querySelectorAll('.card-container .parrafo-card');
    paraEls.forEach((el, idx) => {
      const map = focusParagraphs[idx];
      if(map){
        el.textContent = (lang === 'es') ? (map.es || map.en) : (map.en || map.es);
      }
    });

    // Portfolio: buscar todos los h3 y p dentro de .sectionCard .content y traducir si existe clave
    const portfolioTitles = document.querySelectorAll('.sectionCard .content h3');
    portfolioTitles.forEach(h3 => {
      const original = h3.textContent.trim();
      // si hay una traducción para el title (en este caso la mayoría son nombres, se mantienen)
      if(lang === 'es' && portfolioTitleMap[original]){
        h3.textContent = portfolioTitleMap[original];
      } else if(lang === 'en'){
        // intentar restaurar a inglés: buscar key whose value equals current? Simple approach: we will not auto-restore names (kept same)
      }
    });

    const portfolioParas = document.querySelectorAll('.sectionCard .content p');
    portfolioParas.forEach(p => {
      const original = p.textContent.trim();
      // Si estamos en ES y existe traducción para la cadena en inglés:
      if(lang === 'es' && portfolioParaMap[original]){
        p.textContent = portfolioParaMap[original];
      } else if(lang === 'en'){
        // Intentar restaurar al inglés: si el texto actual está en español y su valor existe en portfolioParaMap values,
        // buscar la clave cuyo valor coincide y reemplazar por la clave (inglés).
        const foundKey = Object.keys(portfolioParaMap).find(k => portfolioParaMap[k] === original);
        if(foundKey) p.textContent = foundKey;
      }
    });

    // botón CV (si existe)
    const box = document.getElementById('box');
    if(box){
      const txt = (translations["#box"] && (translations["#box"][lang] || translations["#box"].en)) || '';
      if(txt) box.textContent = txt;
    }

    // input email y botón send
    const inputEmail = document.querySelector('.input-email');
    if(inputEmail){
      inputEmail.setAttribute('placeholder', (lang === 'es') ? "Introduce tu correo" : "Enter your email");
    }
    const sendBtn = document.querySelector('.btn-input-email');
    if(sendBtn) sendBtn.textContent = (lang === 'es') ? "ENVIAR" : "SEND";
  }

  // Inicialización y control del toggle
  const saved = localStorage.getItem('site_language') || 'en';
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('lang-toggle');
    let current = (saved === 'es') ? 'es' : 'en';

    if(toggle){
      toggle.setAttribute('aria-pressed', current === 'es' ? 'true' : 'false');
      const label = document.getElementById('lang-label');
      if(label) label.textContent = current === 'es' ? 'ES' : 'EN';
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        current = (current === 'en') ? 'es' : 'en';
        localStorage.setItem('site_language', current);
        applyLanguage(current);
        toggle.setAttribute('aria-pressed', current === 'es' ? 'true' : 'false');
        if(label) label.textContent = current === 'es' ? 'ES' : 'EN';
      });
    }

    // Aplicar idioma guardado al cargar
    applyLanguage(current);
  });

})();

