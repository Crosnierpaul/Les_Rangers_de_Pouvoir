document.getElementById('articleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    var imageFile = document.getElementById('image').files[0];

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
});

// Gérer le clic sur le bouton "Vider les articles"
document.getElementById('clearArticles').addEventListener('click', function() {
    // Supprimer les articles du localStorage
    localStorage.removeItem('articles');
    // Supprimer les images téléchargées du localStorage
    localStorage.removeItem('images');
    alert('Les articles et les images ont été supprimés avec succès !');
});


