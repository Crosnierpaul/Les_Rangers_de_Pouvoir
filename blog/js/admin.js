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

            // Rediriger vers la page principale après enregistrement
            window.location.href = '../public/index.html';
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

        // Rediriger vers la page principale après enregistrement
        window.location.href = '../public/index.html';
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
        console.log("yo")
        articles.pop(); // Supprimer le dernier article
        localStorage.setItem('articles', JSON.stringify(articles));
        alert('Le dernier article a été supprimé avec succès !');
    } else {
        console.log("yo")
        alert('Il n\'y a aucun article à supprimer !');
    }
});
