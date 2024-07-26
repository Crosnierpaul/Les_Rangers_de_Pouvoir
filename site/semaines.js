const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Roll:1vt7jgcn@lamaisondugrandmas.gvocidr.mongodb.net/";

async function insertWeeksOfYear(year) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('lamaisondugrandmas');
    const collection = database.collection('semaines');

    // Supprimer les documents existants dans la collection
    await collection.deleteMany({});

    // Commencer à la première semaine de l'année
    let firstDayOfYear = new Date(year, 0, 1);
    let firstWeekday = firstDayOfYear.getDay();  // Dimanche = 0, Lundi = 1, ..., Samedi = 6

    // Si le 1er janvier n'est pas un lundi, trouver le lundi précédent
    let firstMonday;
    if (firstWeekday !== 1) {
      firstMonday = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() - (firstWeekday === 0 ? 6 : firstWeekday - 1)));
    } else {
      firstMonday = firstDayOfYear;
    }

    let currentMonday = firstMonday;
    let weekNumber = 1;
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    // Boucle à travers les semaines
    while (currentMonday.getFullYear() === year || new Date(currentMonday.getTime() + 6 * 24 * 60 * 60 * 1000).getFullYear() === year) {
      let startOfWeek = new Date(currentMonday);
      let endOfWeek = new Date(currentMonday.getTime() + 6 * 24 * 60 * 60 * 1000);

      // Créer un document pour la semaine
      let weekDocument = {
        week_number: weekNumber,
        start_of_week: startOfWeek.toISOString().split('T')[0],
        end_of_week: endOfWeek.toISOString().split('T')[0]
      };

      // Insérer le document dans la collection
      await collection.insertOne(weekDocument);

      // Passe à la semaine suivante
      currentMonday = new Date(currentMonday.getTime() + oneWeekInMilliseconds);
      weekNumber++;
    }

    console.log(`Toutes les semaines de l'année ${year} ont été insérées dans la base de données.`);
  } finally {
    await client.close();
  }
}

// Appel de la fonction pour l'année en cours
const currentYear = new Date().getFullYear();
insertWeeksOfYear(currentYear).catch(console.error);
