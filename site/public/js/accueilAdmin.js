document.getElementById('sectionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the selected section and its content
    var sectionSelect = document.getElementById('sectionSelect');
    var selectedSection = sectionSelect.options[sectionSelect.selectedIndex].value;
    var sectionTitle = document.getElementById('sectionTitle').value;
    var sectionContent = document.getElementById('sectionContent').value;

    console.log(selectedSection);
    // Update the section on the homepage
    var section = document.getElementById(selectedSection);
    if (section) {
        section.querySelector('h1').innerText = sectionTitle;
        section.querySelector('p').innerText = sectionContent;
    } else {
        alert("La section sélectionnée n'existe pas sur la page d'accueil.");
    }
});