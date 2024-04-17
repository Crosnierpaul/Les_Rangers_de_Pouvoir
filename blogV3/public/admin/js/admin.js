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

            // Envoyer l'article à votre backend pour enregistrement dans la base de données
            // Exemple d'envoi avec fetch :
            fetch('/articles/Create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(article)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Article enregistré avec succès !', data);
                alert('Article enregistré avec succès !');
                // Vous pouvez rediriger l'utilisateur vers une autre page ici si nécessaire
            })
            .catch(error => {
                console.error('Erreur lors de l\'enregistrement de l\'article :', error);
                alert('Une erreur est survenue lors de l\'enregistrement de l\'article.');
            });
        };

        reader.readAsDataURL(imageFile);
    } else {
        // Si aucune image n'a été sélectionnée, enregistrer l'article sans image
        var article = {
            title: title,
            content: content
        };

        // Envoyer l'article à votre backend pour enregistrement dans la base de données
        // Exemple d'envoi avec fetch :
        fetch('/articles/Create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Article enregistré avec succès !', data);
            alert('Article enregistré avec succès !');
            // Vous pouvez rediriger l'utilisateur vers une autre page ici si nécessaire
        })
        .catch(error => {
            console.error('Erreur lors de l\'enregistrement de l\'article :', error);
            alert('Une erreur est survenue lors de l\'enregistrement de l\'article.');
        });
    }
});
