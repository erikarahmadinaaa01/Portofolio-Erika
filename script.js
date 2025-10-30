document.addEventListener('DOMContentLoaded', () => {
    // 1. Logika Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Mengambil tema tersimpan dari localStorage, default ke 'light-theme'
    const currentTheme = localStorage.getItem('theme') || 'light-theme';

    body.className = currentTheme;
    themeToggle.textContent = currentTheme === 'light-theme' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            // Ganti ke Dark Mode
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            themeToggle.textContent = '☀️';
        } else {
            // Ganti ke Light Mode
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
            themeToggle.textContent = '🌙';
        }
    });

    // 2. Logika Reveal Animation DAN Skill Bar Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    // Membuat Intersection Observer untuk mendeteksi kapan elemen muncul di viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ketika elemen terlihat:
                
                // a. Animasi Reveal
                entry.target.classList.add('active');

                // b. Animasi Skill Bar (hanya jalankan jika elemen mengandung skill-bar)
                entry.target.querySelectorAll('.skill-bar').forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level; // Mengatur lebar bar
                });

                // Hentikan observer setelah elemen muncul (agar animasi hanya berjalan sekali)
                observer.unobserve(entry.target);
            }
        });
    }, {
        // threshold: 0.2 berarti animasi akan mulai saat 20% elemen terlihat
        threshold: 0.2 
    });

    // Mendaftarkan semua elemen dengan class 'reveal' ke observer
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // 3. Smooth Scrolling untuk Navigasi Internal (Hanya di index.html)
    // Ini penting karena Anda menggunakan MPA (Multiple Page Application)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Cek apakah link adalah link internal (dimulai dengan #)
            const href = this.getAttribute('href');
            
            // Jika kita berada di index.html (atau root URL) DAN link adalah internal (#about, #skills)
            if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                e.preventDefault();
                // Scroll dengan smooth ke section yang dituju
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});