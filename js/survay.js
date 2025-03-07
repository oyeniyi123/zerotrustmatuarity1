/* menu */
let menu = document.querySelector(".menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () =>{
   navbar.classList.toggle("open-menu");
   menu.classList.toggle("move");
};

window.onscroll = () =>{
   navbar.classList.remove("open-menu");
   menu.classList.remove("move");
}

/* Background change on scroll */
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("header-active", window.scrollY > 0);
}) 


// survay
const sectionOrder = ['identities', 'endpoint', 'infrastructure', 'data', 'apps', 'network'];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    document.getElementById('appreciation').style.display = 'none';

    document.querySelectorAll('.header button').forEach(button => {
        button.classList.remove('active');
    });
    const buttonId = `btn-${sectionId}`;
    const button = document.getElementById(buttonId);
    if (button) {
        button.classList.add('active');
    }
}

function navigate(direction, currentSectionId) {
    const currentIndex = sectionOrder.indexOf(currentSectionId);
    let nextIndex = direction === 'previous' ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex >= 0 && nextIndex < sectionOrder.length) {
        showSection(sectionOrder[nextIndex]);
    }
}

function updateMaturity(inputId) {
    const input = document.getElementById(inputId).value.toLowerCase();
    const bar = document.getElementById(`maturity_${inputId}`);
    let score = 0;

    if (input.includes('manual') || input === '') {
        score = 0; // Traditional
        bar.style.backgroundColor = '#fdd';
    } else if (input.includes('some') || input.includes('basic')) {
        score = 1; // Initial
        bar.style.backgroundColor = '#ffd';
    } else if (input.includes('automated') || input.includes('required')) {
        score = 2; // Advanced
        bar.style.backgroundColor = '#dfd';
    } else if (input.includes('ai') || input.includes('dynamic')) {
        score = 3; // Optimal
        bar.style.backgroundColor = '#bdf';
    }

    bar.style.width = `${(score / 3) * 100}%`;
    return score;
}

function showPopup() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function calculateScores() {
    const sections = {
        identity: { questions: 8, maxScore: 24 },
        device: { questions: 10, maxScore: 30 },
        infra: { questions: 6, maxScore: 18 },
        data: { questions: 7, maxScore: 21 },
        app: { questions: 5, maxScore: 15 },
        network: { questions: 8, maxScore: 24 }
    };

    let unanswered = false;
    for (let section in sections) {
        const totalQuestions = sections[section].questions;
        for (let i = 1; i <= totalQuestions; i++) {
            const input = document.getElementById(`${section}_q${i}`).value;
            if (input.trim() === '') {
                unanswered = true;
                break;
            }
        }
        if (unanswered) break;
    }

    if (unanswered) {
        showPopup();
        return;
    }

    document.getElementById('appreciation').style.display = 'block';

    let resultHTML = "";
    for (let section in sections) {
        let score = 0;
        const totalQuestions = sections[section].questions;

        for (let i = 1; i <= totalQuestions; i++) {
            score += updateMaturity(`${section}_q${i}`);
        }

        let maturityLevel = "";
        let color = "";
        const advancedOptimalCount = score >= 2 ? Math.floor(score / 2) : 0;

        if (advancedOptimalCount <= 4) {
            maturityLevel = "Traditional (High Risk)";
            color = "#f00";
        } else if (advancedOptimalCount <= 8) {
            maturityLevel = "Initial (Basic Security)";
            color = "#ff0";
        } else if (advancedOptimalCount <= 11) {
            maturityLevel = "Advanced (Mature Zero Trust)";
            color = "#0f0";
        } else {
            maturityLevel = "Optimal (AI-Driven)";
            color = "#00f";
        }

        resultHTML += `<p>${section.charAt(0).toUpperCase() + section.slice(1)} Maturity: <span style="color:${color}">${maturityLevel}</span> (Score: ${score}/${sections[section].maxScore})</p>`;
    }

    document.getElementById("result").innerHTML = resultHTML;
}

// Show identities section by default
showSection('identities');