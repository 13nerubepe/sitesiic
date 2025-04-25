//
// // Fonction pour initialiser i18next avec le backend
// function initializeI18n() {
//     i18next.use(i18nextHttpBackend).init({
//         debug: true,  // Afficher les logs pour le debug
//         fallbackLng: 'fr',  // Langue par défaut si la langue sélectionnée échoue
//         backend: {
//             loadPath: 'i18n/{{lng}}.json',  // Chemin vers les fichiers de traduction
//         }
//     }, function(err, t) {
//         if (err) {
//             console.error('Erreur i18n:', err);
//         }
//         loadTranslations();  // Charger les traductions sur la page
//     });
// }
//
// // Fonction pour charger les traductions sur la page
// function loadTranslations() {
//     // Mettre à jour le contenu de chaque élément ayant l'attribut 'data-i18n'
//     document.querySelectorAll('[data-i18n]').forEach(function(element) {
//         var key = element.getAttribute('data-i18n');
//         element.textContent = i18next.t(key);  // Remplacer le texte par la traduction
//     });
// }
//
// // Fonction pour changer la langue sélectionnée
// function changeLanguage(language) {
//     i18next.changeLanguage(language, function() {
//         loadTranslations();  // Recharger les traductions après changement de langue
//         localStorage.setItem("selectedLanguage", language);  // Sauvegarder la langue sélectionnée
//     });
//     // fermer le menu appres la selection
//     hideSelect();
// }
//
// // Charger la langue sauvegardée dans le localStorage
// function loadSavedLanguage() {
//     const savedLang = localStorage.getItem("selectedLanguage") || 'fr';  // Langue par défaut
//     document.getElementById('lang-select').value = savedLang;  // Mettre à jour le selecteur
//     changeLanguage(savedLang);  // Changer la langue initiale
// }
// // cacher le menu avec un delai
// function hideSelect() {
//     let select = document.getElementById("custom-select");
//     setTimeout(() => {
//         select.style.opacity = "0";
//         select.style.pointerEvents = "none"; // Désactive l'interaction
//     }, 200);}
//
// // afficher et masquer le menu deroulant
// function toggleSelect() {
//     const options = document.getElementById("custom-select");
//     options.style.display = ( options.style.display==="block")? "none" : "block";
//     options.focus();
// }
//
// // ferme le menu si on clique ailleurs
// document.addEventListener("click", function(event){
//     let selectContainer = this.document.querySelector(".select-container");
//     let menu = document.getElementById("custom-select");
//
// if(!selectContainer.contains(event.target)){
//     menu.style.display = "none";
// }
// })
//
// // Ajouter un écouteur pour le changement de langue
// // document.getElementById('lang-select').addEventListener('change', function() {
// //     changeLanguage(this.value);
// // });
//
// // Initialiser i18next et charger la langue sauvegardée
// initializeI18n();
// loadSavedLanguage();
//
//
//
//
//
//









// Fonction pour initialiser i18next avec le backend
function initializeI18n() {
    i18next.use(i18nextHttpBackend).init({
        debug: false,  // Désactive les logs en production
        fallbackLng: 'fr',  // Langue par défaut
        backend: {
            loadPath: 'i18n/{{lng}}.json',  // Chemin des fichiers de traduction
        }
    }, function(err, t) {
        if (err) {
            console.error('Erreur i18n:', err);
        }
        loadTranslations();  // Charger les traductions après initialisation
    });
}

// Fonction pour charger les traductions sur la page
function loadTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);  // Traduction de chaque élément
    });
}

// Fonction pour changer la langue sélectionnée
function changeLanguage(language) {
    i18next.changeLanguage(language, function() {
        loadTranslations();  // Mise à jour des traductions
        localStorage.setItem("selectedLanguage", language);  // Sauvegarde de la langue
    });

    // Marquer l'option sélectionnée visuellement
    document.querySelectorAll(".custom-option").forEach(option => {
        option.classList.remove("selected");
    });
    document.querySelector(`.custom-option[data-lang="${language}"]`).classList.add("selected");

    // Fermer le menu après sélection
    hideSelect();
}


// Charger la langue sauvegardée dans le localStorage
function loadSavedLanguage() {
    const savedLang = localStorage.getItem("selectedLanguage") || 'fr';  // Langue par défaut
    changeLanguage(savedLang);  // Appliquer la langue sauvegardée
}

// Fonction pour cacher le menu avec une transition fluide
function hideSelect() {
    const menu = document.getElementById("custom-select");
    menu.style.opacity = "0";
    menu.style.transform = "translateY(-10px)";  // Effet de montée pour fermer
    setTimeout(() => {
        menu.style.display = "none";
    }, 200);
}

// Fonction pour afficher et masquer le menu déroulant
function toggleSelect() {
    let select = document.getElementById("lang-select");
    select.classList.toggle("show");
}

// Fermer le menu si on clique ailleurs
document.addEventListener("click", function(event) {
    let selectContainer = document.querySelector(".select-container");
    let select = document.getElementById("lang-select");

    if (!selectContainer.contains(event.target)) {
        select.classList.remove("show");
    }
});

// Initialiser i18next et charger la langue sauvegardée
initializeI18n();
loadSavedLanguage();
