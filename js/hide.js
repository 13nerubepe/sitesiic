// const btn =document.getElementById("toggle-services-btn")
// const extra = document.getElementById("extra-services")
//
// // ecouter un evenement
// btn.addEventListener("click", function (e){
// e.preventDefault(); // Empêche la redirection
// if (extra.style.display === "none") {
//     extra.style.display = "block";
//     btn.textContent = "Voir moins";
// } else {
//     extra.style.display = "none";
//     btn.textContent = "Voir tout";
// }
// }
// )






document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault(); // Empêche l'envoi standard du formulaire

    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData
    })
        .then(async response => {
            if (!response.ok) {
                const errors = await response.json();
                displayErrors(errors);
            } else {
                alert("Message envoyé avec succès !");
                form.reset();
                clearErrors();
            }
        })
        .catch(error => {
            alert("Erreur lors de l'envoi : " + error);
        });
});

function displayErrors(errors) {
    clearErrors();
    Object.keys(errors).forEach(field => {
        const input = document.querySelector(`[name="${field}"]`);
        if (input) {
            const errorDiv = document.createElement("div");
            errorDiv.className = "text-danger mt-1";
            errorDiv.textContent = errors[field];
            input.parentNode.appendChild(errorDiv);
        }
    });
}

function clearErrors() {
    document.querySelectorAll(".text-danger").forEach(el => el.remove());
}