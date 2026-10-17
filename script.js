/* ==========================================================================
   Diyorbekning Portfolio Sayti - Asosiy Skriptlar
   Toshkentcha: Menyular, filtrlar, hisoblagich animatsiyalari va tema almashtirish shu yerda!
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Tepadagi menyuni skroll qilganda orqa fonini o'zgartirish
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobil menyuni ochish va yopish
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Menyu punktini bosganda menyu avtomatik yopilishi
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 3. Qorong'i va Yorug' tema almashtirish (Dark / Light mode)
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('diyor_theme') || 'dark';

  // Oldin saqlangan temani tekshirib qo'yish
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('diyor_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      // Quyosh belgisi (Light rejimda turganini ko'rsatish)
      themeIcon.innerHTML = `
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      `;
    } else {
      // Oy belgisi (Dark rejimda)
      themeIcon.innerHTML = `
        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      `;
    }
  }

  // 4. Statistika raqamlarini noldan boshlab sanab chiqadigan animatsiya
  const statNumbers = document.querySelectorAll('.stat-num');
  let animatedStats = false;

  function runStatsAnimation() {
    statNumbers.forEach(item => {
      const target = parseInt(item.getAttribute('data-target'), 10);
      const suffix = item.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          item.textContent = target + suffix;
          clearInterval(timer);
        } else {
          item.textContent = current + suffix;
        }
      }, 35);
    });
  }

  // Sahifa skroll bo'lib hero ko'ringanda hisoblagichni yoqish
  window.addEventListener('scroll', () => {
    if (!animatedStats && window.scrollY < 400) {
      runStatsAnimation();
      animatedStats = true;
    }
  });
  // Agar boshidan ko'rinib turgan bo'lsa darrov ishga tushirish
  runStatsAnimation();
  animatedStats = true;

  // 5. Proektlarni filtr qilish (Barchasi, Full-Stack, Frontend, Telegram Bot)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Aktiv knopkani belgilash
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 6. Aloqa formasini to'ldirib yuborganda chiqadigan xabar
  const contactForm = document.getElementById('contactForm');
  const toastMsg = document.getElementById('toastMsg');

  if (contactForm && toastMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Forma yuborilgandagi holatni ko'rsatish
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Yuborilmoqda...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        toastMsg.style.display = 'flex';
        setTimeout(() => {
          toastMsg.style.display = 'none';
        }, 5000);
      }, 900);
    });
  }

  // 7. Skroll qilinganda aktiv menyuni belgilab borish
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 120;
      const sectionId = sec.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });
});
