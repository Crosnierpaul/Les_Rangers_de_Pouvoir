document.addEventListener("DOMContentLoaded", function() {
    const commentForm = document.getElementById("comment-form");
    const listeCommentaires = document.getElementById("liste-commentaires");

    // Fonction pour gérer la soumission du formulaire de commentaire
    commentForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche la soumission du formulaire

        // Récupère les valeurs du formulaire
        const nom = commentForm.nom.value;
        const commentaire = commentForm.commentaire.value;

        // Crée un nouvel élément de commentaire
        const nouveauCommentaire = document.createElement("div");
        nouveauCommentaire.classList.add("commentaire");
        nouveauCommentaire.innerHTML = `
            <p><strong>${nom}</strong>: ${commentaire}</p>
        `;

        // Ajoute le nouveau commentaire à la liste des commentaires
        listeCommentaires.appendChild(nouveauCommentaire);

        // Réinitialise le formulaire
        commentForm.reset();
    });
});
