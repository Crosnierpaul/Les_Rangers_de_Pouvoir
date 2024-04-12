document.addEventListener("DOMContentLoaded", function() {
    const ajoutSectionForm = document.getElementById("ajout-section-form");
    const sectionsContainer = document.getElementById("sections-container");

    // Fonction pour créer une nouvelle section
    function createSection(titre, texte, image) {
        const section = document.createElement("section");
        section.innerHTML = `
            <h2>${titre}</h2>
            <p>${texte}</p>
            <img src="${URL.createObjectURL(image)}" alt="Image de la section">
            <!-- Ajoutez d'autres éléments de la section selon vos besoins -->
        `;
        sectionsContainer.appendChild(section);
    }

    // Gestionnaire d'événements pour la soumission du formulaire d'ajout de section
    ajoutSectionForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche la soumission du formulaire

        // Récupère les valeurs du formulaire
        const titreSection = ajoutSectionForm["titre-section"].value;
        const texteSection = ajoutSectionForm["texte-section"].value;
        const imageSection = ajoutSectionForm["image-section"].files[0];

        // Crée une nouvelle section avec les valeurs du formulaire
        createSection(titreSection, texteSection, imageSection);

        // Réinitialise le formulaire
        ajoutSectionForm.reset();
    });
});
