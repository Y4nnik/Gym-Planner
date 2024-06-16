var datum = new Date();
var wochentag = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

// Aktuellen Wochentag ermitteln
var currentDay = datum.getDay();

// Entsprechenden Tag-String aus Array holen
var day = wochentag[currentDay].toLowerCase();

// Aktuelle Klasse "actual" entfernen
document.querySelector('.actual')?.classList.remove('actual');

// Neue Klasse "actual" zum aktuellen Tag hinzufügen
document.getElementById(day).classList.add('actual');