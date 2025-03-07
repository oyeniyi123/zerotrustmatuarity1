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


       
    //    questioneir
       const sectionOrder = ['home', 'identities', 'endpoint', 'infrastructure', 'data', 'apps', 'network'];

        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
            if (sectionId !== 'home') {
                updateProgress(sectionId, getTotalQuestions(sectionId));
            }
        }

        function navigate(direction, currentSectionId) {
            const currentIndex = sectionOrder.indexOf(currentSectionId);
            let nextIndex;

            if (direction === 'previous') {
                nextIndex = currentIndex - 1;
            } else if (direction === 'next') {
                nextIndex = currentIndex + 1;
            }

            if (nextIndex >= 0 && nextIndex < sectionOrder.length) {
                showSection(sectionOrder[nextIndex]);
            }
        }

        function getTotalQuestions(sectionId) {
            const questionCounts = {
                'identities': 8,
                'endpoint': 10,
                'infrastructure': 6,
                'data': 7,
                'apps': 5,
                'network': 8
            };
            return questionCounts[sectionId] || 0; // Return 0 for 'home'
        }

        function updateProgress(sectionId, totalQuestions) {
            if (totalQuestions === 0) return; // Skip for home
            const answered = document.querySelectorAll(`#${sectionId} input[type="radio"]:checked`).length;
            const percentage = Math.round((answered / totalQuestions) * 100);
            const progressBar = document.getElementById(`progress-${sectionId}`);
            progressBar.style.width = `${percentage}%`;
            progressBar.querySelector('span').textContent = `${percentage}%`;
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

            // Check for unanswered questions
            let unanswered = [];
            for (let section in sections) {
                const totalQuestions = sections[section].questions;
                for (let i = 1; i <= totalQuestions; i++) {
                    const selected = document.querySelector(`input[name="${section}_q${i}"]:checked`);
                    if (!selected) {
                        unanswered.push(`${section.charAt(0).toUpperCase() + section.slice(1)} Question ${i}`);
                    }
                }
            }

            if (unanswered.length > 0) {
                showPopup();
                return;
            }

            // Calculate scores if all questions are answered
            let resultHTML = "";
            for (let section in sections) {
                let score = 0;
                const totalQuestions = sections[section].questions;

                for (let i = 1; i <= totalQuestions; i++) {
                    const selected = document.querySelector(`input[name="${section}_q${i}"]:checked`);
                    if (selected) {
                        score += parseInt(selected.value);
                    }
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

        // Show home section by default
        showSection('home');

        // dashboard table
        document.addEventListener('DOMContentLoaded', () => {
            const tableContainer = document.querySelector('.table-container');
            const table = tableContainer.querySelector('table');
            let isDragging = false;
            let startX;
            let scrollLeft;

            function checkScreenSize() {
                if (window.innerWidth <= 702) {
                    tableContainer.style.overflowX = 'auto';
                    table.style.width = 'auto';
                } else {
                    tableContainer.style.overflowX = 'auto';
                    table.style.width = '100%';
                }
            }

            // Mouse events
            tableContainer.addEventListener('mousedown', (e) => {
                if (window.innerWidth > 702) return;
                isDragging = true;
                startX = e.pageX - tableContainer.offsetLeft;
                scrollLeft = tableContainer.scrollLeft;
                tableContainer.style.cursor = 'grabbing';
            });

            tableContainer.addEventListener('mouseleave', () => {
                isDragging = false;
                tableContainer.style.cursor = 'default';
            });

            tableContainer.addEventListener('mouseup', () => {
                isDragging = false;
                tableContainer.style.cursor = 'default';
            });

            tableContainer.addEventListener('mousemove', (e) => {
                if (!isDragging || window.innerWidth > 702) return;
                e.preventDefault();
                const x = e.pageX - tableContainer.offsetLeft;
                const walk = (x - startX) * 1.5;
                tableContainer.scrollLeft = scrollLeft - walk;
            });

            // Touch events
            tableContainer.addEventListener('touchstart', (e) => {
                if (window.innerWidth > 702) return;
                isDragging = true;
                startX = e.touches[0].pageX - tableContainer.offsetLeft;
                scrollLeft = tableContainer.scrollLeft;
            });

            tableContainer.addEventListener('touchend', () => {
                isDragging = false;
            });

            tableContainer.addEventListener('touchmove', (e) => {
                if (!isDragging || window.innerWidth > 702) return;
                const x = e.touches[0].pageX - tableContainer.offsetLeft;
                const walk = (x - startX) * 1.5;
                tableContainer.scrollLeft = scrollLeft - walk;
            });

            // Initial check and resize listener
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
        });


         /* Scroll top */
// let scrollTop = document.querySelector(".backto-top");

// window.addEventListener("scroll", () => {
//     scrollTop.classList.toggle("scroll-active", window.scrollY >= 400);
// }) 

