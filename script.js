document.addEventListener('DOMContentLoaded', () => {
    
    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    // Optional: Add a fade-in animation here
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // Simple Mobile Menu Toggle (Optional)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '60px';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.width = '100%';
            navLinks.style.textAlign = 'center';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
        }
    });

    // Auto-load project images if matching image files exist in `files/`
    const imageExts = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

    function loadProjectImages() {
        projectCards.forEach(card => {
            const info = card.querySelector('.project-info');
            const imgContainer = card.querySelector('.project-img');
            const link = info.querySelector('a.download-link');

            let base = null;
            if (link) {
                const href = link.getAttribute('href') || '';
                const fileName = href.split(/[/\\]/).pop();
                base = fileName ? fileName.replace(/\.[^/.]+$/, '') : null;
            }

            if (!base) {
                const h3 = info.querySelector('h3');
                base = h3 ? h3.textContent.trim().replace(/\s+/g, '_') : null;
            }

            if (!base) return;

            let tried = 0;
            function tryExt() {
                if (tried >= imageExts.length) return;
                const ext = imageExts[tried++];
                const src = 'files/' + encodeURIComponent(base + '.' + ext);
                const img = new Image();
                img.onload = () => {
                    img.alt = base;
                    img.classList.add('project-thumb');
                    imgContainer.innerHTML = '';
                    imgContainer.appendChild(img);
                    const p = info.querySelector('p');
                    if (p) p.textContent = `Preview available (${base}.${ext})`;
                };
                img.onerror = () => { tryExt(); };
                img.src = src;
            }
            tryExt();
        });
    }

    loadProjectImages();
});