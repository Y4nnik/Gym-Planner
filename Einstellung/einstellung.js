function tabs(tabIndex) {
    // Alle Tab-Inhalte verbergen
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    // Den ausgewählten Tab-Inhalt anzeigen
    const tabIds = ['benutzer', 'benutzereinstellungen', 'privatsphaere', 'kontaktanfrage', 'logout'];
    document.getElementById(tabIds[tabIndex]).style.display = 'block';

    // Entferne die 'active' Klasse von allen Menülinks
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => link.classList.remove('actual'));

    // Füge die 'active' Klasse zum ausgewählten Menülink hinzu
    menuLinks[tabIndex].classList.add('actual');
}
tabs(0);

const container = document.querySelectorAll(".range-slider");

for (let i = 0; i < container.length; i++) {
    const slider = container[i].querySelector(".slider");
    const thumb = container[i].querySelector(".slider-thumb");
    const tooltip = container[i].querySelector(".tooltip");
    const progress = container[i].querySelector(".progress");

    function customSlider() {
        const maxVal = slider.getAttribute("max");
        const val = (slider.value / maxVal) *100 + "%";

        tooltip.innerHTML = slider.value;
        progress.style.width = val;
        thumb.style.left = val;
    }
    customSlider();

    slider.addEventListener("input", () => {
        customSlider();
    })
}
