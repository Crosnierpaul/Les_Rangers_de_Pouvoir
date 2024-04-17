// Récupérer la référence à l'élément qui contiendra les articles
const articlesList = document.getElementById('articlesList');

// Fonction pour charger les articles depuis le serveur
async function loadArticles() {
    try {
        // Récupérer les articles depuis le serveur
        const response = await fetch('/articles');
        const articles = await response.json();

        // Afficher les articles sur la page
        articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.content}</p>
                ${article.image ? `<img src="${article.image}" alt="Image de l'article">` : ''}
                <hr>
            `;
            articlesList.appendChild(articleDiv);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des articles :', error);
    }
}

// Appeler la fonction pour charger les articles au chargement de la page
document.addEventListener('DOMContentLoaded', loadArticles);
