document.addEventListener('DOMContentLoaded', () => {
    const programDivs = document.querySelectorAll('.program');

    programDivs.forEach((programDiv) => {
        programDiv.addEventListener('click', () => {
            programDiv.classList.toggle('expanded');
        });
    });
});
