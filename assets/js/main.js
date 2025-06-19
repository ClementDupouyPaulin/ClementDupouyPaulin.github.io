/**
* Template Name: DevFolio
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Updated: Jun 14 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  window.setLanguage = function(lang) {
    const t = {
      fr: {
        "exp-eau-1": "Participation à la refonte du portail interne pour les agents, permettant une centralisation des demandes et une réduction du temps de traitement de 30%.",
        "exp-eau-2": "Création d'outils en C# et SQL Server pour automatiser le suivi des interventions sur le réseau hydraulique.",
        "exp-eau-3": "Modernisation des supports de communication en ligne utilisés par les différents départements techniques.",
        "exp-eau-4": "Amélioration de la collaboration entre services via une application de tickets intégrée dans Microsoft Teams.",
        "exp-galet-1": "Accueilli en moyenne plus de 200 clients par jour pendant la saison estivale, assurant un service fluide et personnalisé.",
        "exp-galet-2": "Mis en place un système de communication entre cuisine et salle pour réduire les erreurs de commande.",
        "exp-galet-3": "Formé de nouveaux serveurs à la gestion de la clientèle étrangère, améliorant l'expérience client internationale.",
        "exp-galet-4": "Géré les encaissements et la clôture des caisses sans erreur pendant 3 étés consécutifs.",
        "edu-but-1": "Réalisé un projet de site web e-commerce en groupe, avec une base de données MySQL et une interface en HTML/CSS/JS.",
        "edu-but-2": "Participé à des ateliers sur la cybersécurité, incluant la création de scripts de détection d'intrusion réseau.",
        "edu-but-3": "Stage de 8 semaines dans une PME où j’ai développé un tableau de bord d'analyse de données avec Python.",
        "edu-but-4": "Alternance valorisée par l’application directe des enseignements en entreprise sur des projets réels.",
        "edu-epi-1": "Créé un jeu multijoueur type RPG en C avec gestion de serveur et protocoles réseau simples.",
        "edu-epi-2": "Travaillé sur un projet fullstack utilisant Node.js et React, dans le cadre d’un hackathon de 48h.",
        "edu-epi-3": "Contribué à un outil open-source permettant l’automatisation de tests en ligne de commande.",
        "edu-epi-4": "Développé des compétences en gestion de versions avec Git et résolution de conflits en environnement collaboratif."
      },
      en: {
        "exp-eau-1": "Redesigned the internal portal for agents, centralizing requests and reducing processing time by 30%.",
        "exp-eau-2": "Built tools in C# and SQL Server to automate tracking of hydraulic network interventions.",
        "exp-eau-3": "Modernized online communication materials used by various technical departments.",
        "exp-eau-4": "Improved interdepartmental collaboration through a Microsoft Teams-integrated ticketing app.",
        "exp-galet-1": "Welcomed over 200 clients daily during the summer season, ensuring smooth and personalized service.",
        "exp-galet-2": "Implemented a communication system between kitchen and floor to reduce order errors.",
        "exp-galet-3": "Trained new servers on handling international clients, improving customer satisfaction.",
        "exp-galet-4": "Managed cash registers and end-of-day reports without error for three consecutive summers.",
        "edu-but-1": "Developed a group e-commerce website project with MySQL database and HTML/CSS/JS interface.",
        "edu-but-2": "Participated in cybersecurity workshops including creation of intrusion detection scripts.",
        "edu-but-3": "Interned 8 weeks at a small business building a Python-based data analysis dashboard.",
        "edu-but-4": "Applied university concepts directly in real business projects through apprenticeship.",
        "edu-epi-1": "Built a multiplayer RPG game in C with server management and basic network protocols.",
        "edu-epi-2": "Worked on a fullstack project using Node.js and React during a 48h hackathon.",
        "edu-epi-3": "Contributed to an open-source tool for automating command-line tests.",
        "edu-epi-4": "Developed strong version control skills with Git and conflict resolution in team settings."
      }
    };
    const langMap = t[lang];
    for (const key in langMap) {
      const el = document.getElementById(key);
      if (el) el.innerText = langMap[key];
    }
  }

  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

})();