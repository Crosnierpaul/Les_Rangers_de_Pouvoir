//--------------- Requête Connexion ---------------//
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
      console.log("test")
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      console.log(username, password)
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        if (response.ok) {
          alert('Connexion réussie');
          // Rediriger l'utilisateur vers une page après la connexion réussie
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      }
    });
});