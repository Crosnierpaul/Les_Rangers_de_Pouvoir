const articlesList = document.getElementById('articlesList');

//----------- Requête Articles  -----------//
async function loadArticles() {
    try {
        // Récupérer les articles depuis le serveur
        const response = await fetch('/articles');
        const articles = await response.json();

        // Afficher les articles sur la page
        articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('blogarticle');
            articleDiv.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.content}</p>
                ${article.image ? `<img src="${article.image}" alt="Image de l'article">` : ''}
            `;
            articlesList.appendChild(articleDiv);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des articles :', error);
    }
}

document.addEventListener('DOMContentLoaded', loadArticles);