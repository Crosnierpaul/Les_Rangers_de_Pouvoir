// Smooth scroll to section
document.querySelectorAll('.navbarHori a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section'); // Sélectionne toutes les sections
    const navbarLinks = document.querySelectorAll('.navbarHori a'); // Sélectionne tous les liens de la barre de navigation

    // Fonction pour déterminer quelle section est actuellement visible à l'écran
    function highlightNavbarLink() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop; // Position du haut de la section par rapport au document
            const sectionHeight = section.clientHeight; // Hauteur de la section
            const sectionId = section.getAttribute('id');

            // Vérifie si la moitié supérieure de la section est visible à l'écran
            if (window.scrollY >= sectionTop - sectionHeight / 2) {
                currentSection = sectionId;
            }
        });

        // Réinitialise la couleur de tous les liens de la navbar
        navbarLinks.forEach(link => {
            link.style.backgroundColor = '#fff'; // Couleur par défaut du point
        });

        // Trouve le lien correspondant à la section visible et change sa couleur
        navbarLinks.forEach(link => {
            const sectionName = link.getAttribute('data-section');

            if (sectionName === currentSection) {
                link.style.backgroundColor = '#8167a9'; // Couleur de surbrillance du point
            }
        });
    }

    // Appelle la fonction pour la première fois au chargement de la page
    highlightNavbarLink();

    // Écoute les événements de défilement pour mettre à jour la surbrillance en temps réel
    window.addEventListener('scroll', highlightNavbarLink);
});
