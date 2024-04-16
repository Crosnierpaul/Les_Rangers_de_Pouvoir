document.getElementById('articleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    var imageFile = document.getElementById('image').files[0];

    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var imageData = event.target.result;

            var article = {
                title: title,
                content: content,
                image: imageData
            };

            var articles = JSON.parse(localStorage.getItem('articles')) || [];
            articles.push(article);
            localStorage.setItem('articles', JSON.stringify(articles));

            alert('Article enregistré avec succès !');

            // Réinitialiser les champs titre, contenu et image après l'enregistrement
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
            document.getElementById('image').value = '';

        };

        reader.readAsDataURL(imageFile);
    } else {
        // Si aucune image n'a été sélectionnée, enregistrer l'article sans image
        var article = {
            title: title,
            content: content
        };

        var articles = JSON.parse(localStorage.getItem('articles')) || [];
        articles.push(article);
        localStorage.setItem('articles', JSON.stringify(articles));

        alert('Article enregistré avec succès !');

        // Réinitialiser les champs titre et contenu après l'enregistrement
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
    }
});

// Gérer le clic sur le bouton "Vider les articles"
document.getElementById('clearArticles').addEventListener('click', function() {
    // Supprimer les articles du localStorage
    localStorage.removeItem('articles');
    // Supprimer les images téléchargées du localStorage
    localStorage.removeItem('images');
    alert('Les articles et les images ont été supprimés avec succès !');
});

// Gérer le clic sur le bouton "Supprimer le dernier article"
document.getElementById('deleteLastArticle').addEventListener('click', function() {
    var articles = JSON.parse(localStorage.getItem('articles')) || [];

    if (articles.length > 0) {
        articles.pop(); // Supprimer le dernier article
        localStorage.setItem('articles', JSON.stringify(articles));
        alert('Le dernier article a été supprimé avec succès !');
    } else {
        alert('Il n\'y a aucun article à supprimer !');
    }
});

// Gérer le clic sur le bouton "Supprimer l'article"
document.getElementById('deleteArticle').addEventListener('click', function() {
    var articleTitle = document.getElementById('articleTitle').value.trim();
    var articles = JSON.parse(localStorage.getItem('articles')) || [];

    if (articleTitle === '') {
        alert('Veuillez saisir un titre d\'article.');
        return;
    }

    // Rechercher l'indice de l'article avec le titre spécifié
    var index = articles.findIndex(function(article) {
        return article.title === articleTitle;
    });

    if (index !== -1) {
        articles.splice(index, 1); // Supprimer l'article
        localStorage.setItem('articles', JSON.stringify(articles));
        alert('L\'article a été supprimé avec succès !');
        document.getElementById('articleTitle').value = ''; 
    } else {
        alert('Aucun article trouvé avec ce titre.');
    }
});


// Gérer le clic sur le bouton "Rechercher l'article"
document.getElementById('searchArticle').addEventListener('click', function() {
    var articleTitle = document.getElementById('searchTitle').value.trim(); // Utiliser 'searchTitle' au lieu de 'articleTitle'
    var articles = JSON.parse(localStorage.getItem('articles')) || [];

    if (articleTitle === '') {
        alert('Veuillez saisir un titre d\'article.');
        return;
    }

    // Rechercher l'indice de l'article avec le titre spécifié
    var index = articles.findIndex(function(article) {
        return article.title === articleTitle;
    });

    if (index !== -1) {
        // Remplir les champs titre, contenu et image avec les données de l'article
        document.getElementById('editTitle').value = articles[index].title;
        document.getElementById('editContent').value = articles[index].content;

        if (articles[index].image) {
            // Si l'article a une image, afficher l'image
            document.getElementById('editImagePreview').src = articles[index].image;
        } else {
            // Si l'article n'a pas d'image, cacher l'image
            document.getElementById('editImagePreview').src = '';
        }

        alert('Article trouvé avec succès !');
    } else {
        alert('Aucun article trouvé avec ce titre.');
    }
});

document.getElementById('saveChanges').addEventListener('click', function(event) {
    event.preventDefault();

    var editTitle = document.getElementById('editTitle').value;
    var editContent = document.getElementById('editContent').value;
    var editImageFile = document.getElementById('editImage').files[0];

    var articles = JSON.parse(localStorage.getItem('articles')) || [];
    var index = articles.findIndex(function(article) {
        return article.title === editTitle;
    });

    if (index !== -1) {
        // Mettre à jour les propriétés de l'article avec les nouvelles valeurs
        articles[index].title = editTitle;
        articles[index].content = editContent;

        // Si une nouvelle image est sélectionnée, mettre à jour l'image de l'article
        if (editImageFile) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var editImageData = event.target.result;
                articles[index].image = editImageData;

                // Enregistrer les modifications dans le localStorage
                localStorage.setItem('articles', JSON.stringify(articles));

                alert('Modifications enregistrées avec succès !');
                // Redirection ou autre action après enregistrement...
            };

            reader.readAsDataURL(editImageFile);
        } else {
            // Si aucune nouvelle image n'est sélectionnée, enregistrer les modifications sans changer l'image
            localStorage.setItem('articles', JSON.stringify(articles));
            alert('Modifications enregistrées avec succès !');
            // Redirection ou autre action après enregistrement...
        }
    } else {
        alert('Aucun article trouvé avec ce titre.');
    }
});