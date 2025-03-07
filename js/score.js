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

   



// summary table
function toggleContent(header) {
    const content = header.nextElementSibling;
    content.classList.toggle('active');
}

function searchTable(input, tableId) {
    const filter = input.value.toLowerCase();
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) { // Skip header row
        const cells = rows[i].getElementsByTagName('td');
        let match = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(filter)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none';
    }
}



// first and second table

document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.ztm-scores .table-container, .ztm-levels .table-container');
    containers.forEach(container => {
        const table = container.querySelector('.ztm-table');
        let isDragging = false;
        let startX;
        let scrollLeft;

        function checkScreenSize() {
            if (window.innerWidth <= 756) {
                container.style.overflowX = 'auto';
                table.style.width = 'auto';
            } else {
                container.style.overflowX = 'auto';
                table.style.width = '100%';
            }
        }

        // Mouse events
        container.addEventListener('mousedown', (e) => {
            if (window.innerWidth > 756) return;
            isDragging = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            container.style.cursor = 'grabbing';
        });

        container.addEventListener('mouseleave', () => {
            isDragging = false;
            container.style.cursor = 'default';
        });

        container.addEventListener('mouseup', () => {
            isDragging = false;
            container.style.cursor = 'default';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDragging || window.innerWidth > 756) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        });

        // Touch events
        container.addEventListener('touchstart', (e) => {
            if (window.innerWidth > 756) return;
            isDragging = true;
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('touchend', () => {
            isDragging = false;
        });

        container.addEventListener('touchmove', (e) => {
            if (!isDragging || window.innerWidth > 756) return;
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
        });

        // Initial check and resize listener
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    });
});
  