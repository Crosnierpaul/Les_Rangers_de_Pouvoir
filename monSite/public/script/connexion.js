//--------------- Requête Connexion ---------------//
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
      console.log("test")
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      console.log(email, password)
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        if (response.ok) {
          alert('Connexion réussie');
          // Rediriger l'utilisateur vers une page après la connexion réussie
          console.log("Redirection vers : page d'acceuil")
          window.location.href = "/";
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      }
    });
});