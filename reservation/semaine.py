from datetime import datetime, timedelta
from pymongo import MongoClient

# Connexion à la base de données MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["reservation"]
collection = db["semaines"]

# Fonction pour générer les semaines du samedi au samedi pour une année spécifique
def generer_semaines(annee):
    semaines = []
    # Date du premier samedi de l'année
    date = datetime(annee, 1, 1)
    while date.weekday() != 5:  # 5 correspond à samedi
        date += timedelta(days=1)

    # Génération des semaines jusqu'à la fin de l'année
    while date.year == annee:
        semaine = {
            "date_debut": date.strftime("%Y-%m-%d"),  # Convertir la date en format YYYY-MM-DD
            "date_fin": (date + timedelta(days=6)).strftime("%Y-%m-%d")  # Convertir la date en format YYYY-MM-DD
        }
        semaines.append(semaine)
        date += timedelta(days=7)

    return semaines

# Insérer les semaines dans la base de données MongoDB
def inserer_semaines(semaines):
    if semaines:
        collection.insert_many(semaines)
        print("Les semaines ont été insérées avec succès dans la base de données.")
    else:
        print("Aucune semaine à insérer.")

annee = 2024
for _ in range(2):
    # Générer les semaines
    semaines_a_inserer = generer_semaines(annee)

    # Insérer les semaines dans MongoDB
    inserer_semaines(semaines_a_inserer)
    annee += 1