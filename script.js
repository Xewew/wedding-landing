document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    const heroTitle = document.getElementById('heroTitle');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupBtn = document.getElementById('popupBtn');

    let welcomeDismissed = false;

    function dismissWelcome() {
        if (welcomeDismissed) return;
        welcomeDismissed = true;

        welcomeScreen.classList.add('hidden');

        setTimeout(() => {
            popupOverlay.classList.add('visible');
        }, 500);
    }

    function closePopup() {
        popupOverlay.classList.remove('visible');
        mainContent.classList.add('visible');

        setTimeout(() => {
            heroTitle.style.animation = 'heroTitleAppear 2s ease forwards';
        }, 300);

        setTimeout(() => {
            initScrollAnimations();
        }, 600);
    }

    welcomeScreen.addEventListener('click', dismissWelcome);
    welcomeScreen.addEventListener('touchstart', function(e) {
        e.preventDefault();
        dismissWelcome();
    });

    popupBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    const scrollHint = document.getElementById('scrollHint');
    let scrollHintHidden = false;

    function hideScrollHint() {
        if (!scrollHintHidden && scrollHint) {
            scrollHintHidden = true;
            scrollHint.classList.add('hidden');
        }
    }

    document.addEventListener('scroll', hideScrollHint, { once: true });
    document.addEventListener('touchmove', hideScrollHint, { once: true });
    document.addEventListener('wheel', hideScrollHint, { once: true });

    const musicPlayer = document.getElementById('musicPlayer');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');

    let musicStarted = false;

    function showMusicPlayer() {
        if (musicPlayer) {
            setTimeout(() => {
                musicPlayer.classList.add('visible');
            }, 800);
        }
    }

    function toggleMusic() {
        if (!musicStarted) {
            bgMusic.play().then(() => {
                musicStarted = true;
                musicBtn.classList.add('playing');
            }).catch(() => {
                console.log('Autoplay blocked');
            });
        } else {
            if (bgMusic.paused) {
                bgMusic.play();
                musicBtn.classList.add('playing');
            } else {
                bgMusic.pause();
                musicBtn.classList.remove('playing');
            }
        }
    }

    function updateVolume() {
        bgMusic.volume = volumeSlider.value / 100;
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }

    if (volumeSlider) {
        volumeSlider.addEventListener('input', updateVolume);
        bgMusic.volume = 0.5;
    }

    const originalClosePopup = closePopup;
    closePopup = function() {
        originalClosePopup();
        showMusicPlayer();
    };

    const weddingDate = new Date('September 26, 2026 15:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;

                    if (target.id === 'invitationSection') {
                        animateInvitationSection();
                    } else {
                        target.classList.add('visible');
                    }

                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        const invitationSection = document.getElementById('invitationSection');
        const fadeElements = document.querySelectorAll('.fade-in');

        if (invitationSection) observer.observe(invitationSection);
        fadeElements.forEach(el => observer.observe(el));
    }

    function animateInvitationSection() {
        const text1 = document.getElementById('invitationText1');
        const text2 = document.getElementById('invitationText2');
        const text3 = document.getElementById('invitationText3');
        const calendar = document.getElementById('calendar');
        const countdownText = document.getElementById('countdownText');
        const countdown = document.getElementById('countdown');

        if (text1) text1.classList.add('visible');

        setTimeout(() => {
            if (text2) text2.classList.add('visible');
        }, 1000);

        setTimeout(() => {
            if (text3) text3.classList.add('visible');
        }, 2000);

        setTimeout(() => {
            if (calendar) calendar.classList.add('visible');
        }, 2500);

        setTimeout(() => {
            if (countdownText) countdownText.classList.add('visible');
        }, 3500);

        setTimeout(() => {
            if (countdown) countdown.classList.add('visible');
        }, 4000);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const BOT_TOKEN = '8868304668:AAE0ajl3mM5KdRZfYGAJWXnHjAUwYOZJJVE';
    const CHAT_IDS = ['1453758150', '982518689'];
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    const surveyForm = document.getElementById('surveyForm');
    const surveyMessage = document.getElementById('surveyMessage');
    const surveyBtn = surveyForm ? surveyForm.querySelector('.survey-btn') : null;

    if (surveyForm) {
        surveyForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = surveyForm.querySelector('#guestName').value.trim();
            const attendance = surveyForm.querySelector('input[name="attendance"]:checked');
            const alcohol = surveyForm.querySelector('input[name="alcohol"]:checked');

            if (name && attendance && alcohol) {
                if (surveyBtn) {
                    surveyBtn.disabled = true;
                    surveyBtn.textContent = 'Отправка...';
                }

                const attendanceText = attendance.value === 'yes' ? 'Да, придёт' : 'Нет, не сможет';
                const alcoholNames = {
                    'vodka': 'Водка',
                    'wine': 'Вино',
                    'champagne': 'Шампанское',
                    'whiskey': 'Виски',
                    'cognac': 'Коньяк',
                    'tequila': 'Текила',
                    'samogon': 'Самогон',
                    'none': 'Не будет пить'
                };
                const alcoholText = alcoholNames[alcohol.value] || alcohol.value;

                const message = `💒 Новый ответ на анкету\n\n👤 Имя: ${name}\n📅 Присутствие: ${attendanceText}\n🍷 Алкоголь: ${alcoholText}`;

                try {
                    await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: name,
                            attendance: attendance.value,
                            alcohol: alcohol.value
                        })
                    });

                    const sendPromises = CHAT_IDS.map(chatId =>
                        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                chat_id: chatId,
                                text: message
                            })
                        })
                    );

                    const results = await Promise.all(sendPromises);
                    const allOk = results.every(r => r.ok);

                    if (allOk) {
                        surveyForm.style.display = 'none';
                        surveyMessage.classList.add('visible');
                    } else {
                        throw new Error('Telegram API error');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    if (surveyBtn) {
                        surveyBtn.disabled = false;
                        surveyBtn.textContent = 'Отправить';
                    }
                    alert('Ошибка отправки. Попробуйте ещё раз.');
                }
            }
        });
    }

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            document.body.style.height = window.innerHeight + 'px';
        }, 250);
    });
});
