const DEFAULT_MINUTES = storage.getItem('minutes') || DEFAULT_MINUTES;

setDefaults();

function setDefaults() {
    document.getElementById('work-time').value = DEFAULT_MINUTES;
}
