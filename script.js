

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and sections for scroll animations
document.querySelectorAll('.card, .type, .grid .item').forEach(el => {
    observer.observe(el);
});

// Quiz logic with explanations for quiz.html page
if (document.getElementById('checkBtn')) {
    document.getElementById('checkBtn').addEventListener('click', function(){
      const questions = [
        { name: 'q1', correct: 'b', explanation: 'Batu bara adalah bahan bakar fosil yang terbentuk dari sisa-sisa tumbuhan dan hewan purba selama jutaan tahun. Energi ini tidak terbarukan karena sumbernya terbatas dan tidak dapat diperbaharui secara alami dalam waktu singkat.' },
        { name: 'q2', correct: 'b', explanation: 'Energi surya berasal langsung dari matahari melalui proses fotovoltaik di panel surya. Panel ini mengubah energi cahaya matahari menjadi energi listrik yang dapat digunakan untuk rumah tangga, industri, dan pembangkit listrik skala besar.' },
        { name: 'q3', correct: 'a', explanation: 'Energi terbarukan membantu mengurangi emisi gas rumah kaca seperti CO2 yang menyebabkan pemanasan global dan perubahan iklim. Dengan beralih ke energi bersih, kita dapat memperlambat laju perubahan iklim dan menjaga keseimbangan ekosistem bumi.' },
        { name: 'q4', correct: 'b', explanation: 'Panel surya modern memiliki efisiensi konversi antara 15-25%. Ini berarti 15-25% dari energi cahaya matahari yang diterima dapat dikonversi menjadi energi listrik.' },
        { name: 'q5', correct: 'b', explanation: 'Energi angin menghasilkan listrik melalui turbin angin yang berputar karena hembusan angin. Putaran turbin menggerakkan generator yang menghasilkan listrik.' },
        { name: 'q6', correct: 'b', explanation: 'PLTA adalah singkatan dari Pembangkit Listrik Tenaga Air. Ini adalah pembangkit listrik yang memanfaatkan energi kinetik dari aliran air.' },
        { name: 'q7', correct: 'b', explanation: 'Biomassa dapat berasal dari berbagai sumber organik seperti limbah pertanian, kayu, dan bahan organik lainnya. Ini berbeda dari energi fosil yang berasal dari bahan organik yang telah terkompresi selama jutaan tahun.' },
        { name: 'q8', correct: 'b', explanation: 'Energi air (hidroelektrik) adalah energi terbarukan yang paling banyak digunakan di dunia saat ini, menyumbang sekitar 16% dari total produksi listrik global.' },
        { name: 'q9', correct: 'b', explanation: 'Keuntungan utama energi terbarukan adalah tidak menghasilkan emisi CO2 saat beroperasi, berbeda dengan pembangkit listrik berbahan bakar fosil.' },
        { name: 'q10', correct: 'b', explanation: 'Transisi ke energi terbarukan menciptakan jutaan lapangan kerja di sektor manufaktur panel surya, turbin angin, instalasi, dan pemeliharaan sistem energi terbarukan.' }
      ];

      // Only evaluate questions that exist on the current page
      const available = questions.filter(q => document.getElementsByName(q.name).length > 0);
      const total = available.length;
      let results = [];
      let correctCount = 0;
      let allAnswered = true;

      available.forEach((q, index) => {
        const choices = document.getElementsByName(q.name);
        let selected = null;
        for(const c of choices){ if(c.checked) selected = c.value; }

        if(!selected){
          allAnswered = false;
          results.push(`<div style="color: orange; margin: 8px 0;">Pertanyaan ${index + 1}: Belum dijawab.</div>`);
        } else if(selected === q.correct){
          correctCount++;
          results.push(`<div style="color: green; margin: 8px 0;"><strong>Pertanyaan ${index + 1}: ✓ Benar!</strong><br><small>${q.explanation}</small></div>`);
        } else {
          results.push(`<div style="color: red; margin: 8px 0;"><strong>Pertanyaan ${index + 1}: ✗ Salah</strong><br><small>${q.explanation}</small></div>`);
        }
      });

      const res = document.getElementById('result');
      const score = document.getElementById('score');
      const quizStatus = document.getElementById('quizStatus');

      if (!res) return; // nothing to show

      if(!allAnswered){
        res.innerHTML = '<div style="color: orangered; font-weight: bold;">Jawab semua pertanyaan dulu ya!</div>';
        if (quizStatus) {
          quizStatus.textContent = 'Belum Selesai';
          quizStatus.className = 'badge';
        }
      } else {
        if (score) score.textContent = `${correctCount}/${total}`;
        if (quizStatus) {
          quizStatus.textContent = correctCount >= Math.ceil(total * 0.7) ? 'Lulus' : 'Coba Lagi';
          quizStatus.className = 'badge';
          quizStatus.style.backgroundColor = correctCount >= Math.ceil(total * 0.7) ? '#10b981' : '#ef4444';
        }

        let summary = `<div style="margin-bottom: 15px; padding: 10px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #0ea5e9;">
          <strong>Skor Anda: ${correctCount}/${total}</strong><br>
          <small>${correctCount >= Math.ceil(total * 0.7) ? 'Selamat! Anda lulus quiz ini.' : 'Coba lagi untuk mendapatkan skor yang lebih baik.'}</small>
        </div>`;

        res.innerHTML = summary + results.join('');
      }
    });
}

// Reset quiz functionality
if (document.getElementById('resetBtn')) {
    document.getElementById('resetBtn').addEventListener('click', function(){
      // Reset all radio buttons
      const radioButtons = document.querySelectorAll('input[type="radio"]');
      radioButtons.forEach(radio => radio.checked = false);

      // Reset results
      const res = document.getElementById('result');
      res.innerHTML = '';

      // Reset score and status
      const score = document.getElementById('score');
      const quizStatus = document.getElementById('quizStatus');
      const total = (Array.from(document.querySelectorAll('input[type="radio"]')).map(i => i.name).filter((v, i, a) => a.indexOf(v) === i).length) || 0;
      if (score) score.textContent = `0/${total}`;
      if (quizStatus) {
        quizStatus.textContent = 'Belum Dimulai';
        quizStatus.className = 'badge';
      }

      // Scroll to top of quiz
      document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

    // Small keyboard-accessible focus effect for types
    document.querySelectorAll('.type').forEach(el => {
      el.addEventListener('click', () => showTypeDetail(el));
      el.addEventListener('keypress', (e) => { if(e.key === 'Enter') showTypeDetail(el) });
    });
    function showTypeDetail(el){
      const titleEl = el.querySelector('h3');
      const title = titleEl ? titleEl.innerText : 'Detail';
      const detail = el.querySelector('.muted')?.innerText ?? 'Detail tidak tersedia';
      alert('Jenis: ' + title + '\n\n' + detail);
    }

    // Contact Form Handler with EmailJS
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Initialize EmailJS (replace 'YOUR_PUBLIC_KEY' with your actual public key from EmailJS dashboard)
    if (typeof emailjs !== 'undefined' && emailjs && typeof emailjs.init === 'function') {
      emailjs.init('YOUR_PUBLIC_KEY');
    } else {
      console.warn('EmailJS tidak ditemukan — pengiriman formulir dinonaktifkan.');
    }

    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Simple form validation
      if (!data.name || !data.email || !data.subject || !data.message) {
        showFormMessage('Harap isi semua field yang diperlukan.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showFormMessage('Format email tidak valid.', 'error');
        return;
      }

      // Prepare email parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: 'nathasyajp2@gmail.com'
      };

      // Send email using EmailJS (only if EmailJS is available)
      if (typeof emailjs !== 'undefined' && emailjs && typeof emailjs.send === 'function') {
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showFormMessage('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.', 'success');
            contactForm.reset();
          }, function(error) {
            console.log('FAILED...', error);
            showFormMessage('Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.', 'error');
          });
      } else {
        showFormMessage('Pengiriman email dinonaktifkan (EmailJS tidak tersedia).', 'error');
        contactForm.reset();
      }
      });
    } else {
      console.warn('contactForm tidak ditemukan di halaman — event submit tidak didaftarkan.');
    }

    function showFormMessage(message, type) {
      formMessage.textContent = message;
      formMessage.style.display = 'block';
      formMessage.style.backgroundColor = type === 'success' ? '#d1fae5' : '#fee2e2';
      formMessage.style.color = type === 'success' ? '#065f46' : '#dc2626';
      formMessage.style.border = `1px solid ${type === 'success' ? '#a7f3d0' : '#fecaca'}`;

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch() {
      const query = searchInput.value.toLowerCase().trim();
      if (!query) return;

      // Define searchable content
      const searchableSections = [
        { id: 'jenis', title: 'Jenis Energi Terbarukan', keywords: ['matahari', 'surya', 'angin', 'air', 'biomassa', 'biogas', 'energi', 'panel', 'kincir', 'plta'] },
        { id: 'manfaat', title: 'Manfaat Energi Terbarukan', keywords: ['manfaat', 'emisi', 'karbon', 'iklim', 'udara', 'polusi', 'lapangan', 'kerja', 'energi', 'keamanan'] },
        { id: 'quiz', title: 'Quiz Singkat tentang Energi', keywords: ['quiz', 'tes', 'pertanyaan', 'jawaban', 'pengetahuan'] },
        { id: 'kontak', title: 'Hubungi Kami', keywords: ['kontak', 'hubungi', 'pesan', 'email', 'pertanyaan'] }
      ];

      // Find matching sections
      const matches = searchableSections.filter(section =>
        section.keywords.some(keyword => keyword.includes(query) || query.includes(keyword))
      );

      if (matches.length > 0) {
        // Scroll to first match
        const targetElement = document.getElementById(matches[0].id);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Highlight temporarily
          targetElement.style.boxShadow = '0 0 20px rgba(15,118,110,0.5)';
          setTimeout(() => {
            targetElement.style.boxShadow = '';
          }, 2000);
        }
      } else {
        // Show no results message
        alert('Tidak ditemukan hasil untuk: ' + query);
      }
    }

    if (searchBtn && typeof performSearch === 'function') {
      searchBtn.addEventListener('click', performSearch);
    }
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          performSearch();
        }
      });
    }

    // Calculator Functionality
    const calculateBtn = document.getElementById('calculateBtn');
    const results = document.getElementById('results');
    const monthlySavings = document.getElementById('monthlySavings');
    const initialInvestment = document.getElementById('initialInvestment');
    const paybackPeriod = document.getElementById('paybackPeriod');
    const co2Reduction = document.getElementById('co2Reduction');

    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
      const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
      const roofArea = parseFloat(document.getElementById('roofArea').value);
      const location = document.getElementById('location').value;

      if (!monthlyBill || !roofArea) {
        alert('Harap isi semua field yang diperlukan.');
        return;
      }

      // Solar panel efficiency and cost assumptions (Indonesian market)
      const panelEfficiency = 0.18; // 18% efficiency
      const sunlightHours = 5.5; // Average daily sunlight hours in Indonesia
      const panelCostPerWatt = 5000; // IDR per watt
      const maintenanceCost = 0.01; // 1% of initial investment per year

      // Calculate potential solar generation
      const dailyGeneration = roofArea * panelEfficiency * sunlightHours; // kWh/day
      const monthlyGeneration = dailyGeneration * 30; // kWh/month

      // Electricity price (average in Indonesia)
      const electricityPrice = 1500; // IDR per kWh

      // Calculate savings
      const monthlySavingsValue = Math.min(monthlyGeneration * electricityPrice, monthlyBill);
      const annualSavings = monthlySavingsValue * 12;

      // Calculate system size and cost
      const systemSize = (monthlyGeneration * 12) / (sunlightHours * 365); // kW system
      const initialCost = systemSize * 1000 * panelCostPerWatt; // Total cost in IDR

      // Payback period
      const paybackYears = initialCost / annualSavings;

      // CO2 reduction (0.5 kg CO2 per kWh saved)
      const annualCO2Reduction = monthlyGeneration * 12 * 0.5;

      // Display results
      monthlySavings.textContent = `Rp ${monthlySavingsValue.toLocaleString('id-ID')}`;
      initialInvestment.textContent = `Rp ${initialCost.toLocaleString('id-ID')}`;
      paybackPeriod.textContent = `${paybackYears.toFixed(1)} tahun`;
      co2Reduction.textContent = `${annualCO2Reduction.toFixed(0)} kg/tahun`;

        if (results) {
          results.style.display = 'block';
          results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

// Optional: Save a snapshot to localStorage when user leaves (simple demo)
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('et_saved', JSON.stringify({visited: Date.now()}));
    });

// Dynamic Background Gradient Following Cursor
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Calculate gradient position based on mouse position
    const gradientX = x * 100;
    const gradientY = y * 100;

    // Update background with dynamic gradient
    // Only update on the main page to avoid unnecessary repaints on other pages
    if (document.body && document.querySelector('.container')) {
      document.body.style.background = `linear-gradient(${135 + gradientX * 0.5}deg, #3b82f6 ${gradientY}%, #fbbf24 ${100 - gradientY}%)`;
    }
});

// Dark mode toggle (persists in localStorage)
const darkToggle = document.getElementById('darkModeToggle');
function setDarkMode(enabled) {
  if (enabled) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  localStorage.setItem('et_dark', enabled ? '1' : '0');
}
if (darkToggle) {
  // initialize from storage
  const saved = localStorage.getItem('et_dark');
  setDarkMode(saved === '1');
  darkToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setDarkMode(isDark);
    // swap icons
    const sun = darkToggle.querySelector('.sun-icon');
    const moon = darkToggle.querySelector('.moon-icon');
    if (sun && moon) {
      sun.style.display = isDark ? 'none' : 'inline-block';
      moon.style.display = isDark ? 'inline-block' : 'none';
    }
  });
}
