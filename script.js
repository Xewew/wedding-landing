document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    const heroTitle = document.getElementById('heroTitle');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupBtn = document.getElementById('popupBtn');
    const musicPlayer = document.getElementById('musicPlayer');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeSlider');

    let welcomeDismissed = false;

    function dismissWelcome() {
        if (welcomeDismissed) return;
        welcomeDismissed = true;

        welcomeScreen.classList.add('hidden');

        setTimeout(function() {
            popupOverlay.classList.add('visible');
        }, 500);
    }

    function closePopup() {
        popupOverlay.classList.remove('visible');
        mainContent.classList.add('visible');

        setTimeout(function() {
            heroTitle.style.animation = 'heroTitleAppear 2s ease forwards';
        }, 300);

        setTimeout(function() {
            initScrollAnimations();
        }, 600);

        showMusicPlayer();
        initMusicPlayer();
        startMusic();
    }

    function startMusic() {
        if (bgMusic) {
            bgMusic.play().then(function() {
                if (musicBtn) {
                    musicBtn.classList.add('playing');
                }
            }).catch(function(err) {
                console.log('Autoplay blocked:', err);
            });
        }
    }

    function showMusicPlayer() {
        if (musicPlayer) {
            setTimeout(function() {
                musicPlayer.classList.add('visible');
            }, 800);
        }
    }

    function initMusicPlayer() {
        if (musicBtn) {
            musicBtn.addEventListener('click', toggleMusic);
        }
        if (volumeSlider) {
            volumeSlider.addEventListener('input', updateVolume);
            bgMusic.volume = 0.5;
        }
    }

    function toggleMusic() {
        if (bgMusic.paused) {
            bgMusic.play().then(function() {
                musicBtn.classList.add('playing');
            }).catch(function(err) {
                console.log('Playback error:', err);
                musicBtn.style.opacity = '0.5';
            });
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        }
    }

    function updateVolume() {
        if (volumeSlider && bgMusic) {
            bgMusic.volume = volumeSlider.value / 100;
        }
    }

    welcomeScreen.addEventListener('click', function() {
        dismissWelcome();
    });
    welcomeScreen.addEventListener('touchstart', function(e) {
        e.preventDefault();
        dismissWelcome();
    });

    if (popupBtn) {
        popupBtn.addEventListener('click', closePopup);
    }
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
    }

    var weddingDate = new Date('September 26, 2026 15:00:00').getTime();

    function updateCountdown() {
        var now = new Date().getTime();
        var distance = weddingDate - now;

        if (distance > 0) {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

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
        var observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var target = entry.target;

                    if (target.id === 'invitationSection') {
                        animateInvitationSection();
                    } else {
                        target.classList.add('visible');
                    }

                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        var invitationSection = document.getElementById('invitationSection');
        var fadeElements = document.querySelectorAll('.fade-in');

        if (invitationSection) observer.observe(invitationSection);
        fadeElements.forEach(function(el) { observer.observe(el); });
    }

    function animateInvitationSection() {
        var text1 = document.getElementById('invitationText1');
        var text2 = document.getElementById('invitationText2');
        var text3 = document.getElementById('invitationText3');
        var calendar = document.getElementById('calendar');
        var countdownText = document.getElementById('countdownText');
        var countdown = document.getElementById('countdown');

        if (text1) text1.classList.add('visible');

        setTimeout(function() {
            if (text2) text2.classList.add('visible');
        }, 1000);

        setTimeout(function() {
            if (text3) text3.classList.add('visible');
        }, 2000);

        setTimeout(function() {
            if (calendar) calendar.classList.add('visible');
        }, 2500);

        setTimeout(function() {
            if (countdownText) countdownText.classList.add('visible');
        }, 3500);

        setTimeout(function() {
            if (countdown) countdown.classList.add('visible');
        }, 4000);
    }

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    var BOT_TOKEN = '8868304668:AAE0ajl3mM5KdRZfYGAJWXnHjAUwYOZJJVE';
    var CHAT_IDS = ['1453758150', '982518689'];
    var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    var surveyForm = document.getElementById('surveyForm');
    var surveyMessage = document.getElementById('surveyMessage');
    var surveyBtn = surveyForm ? surveyForm.querySelector('.survey-btn') : null;

    if (surveyForm) {
        surveyForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            var name = surveyForm.querySelector('#guestName').value.trim();
            var attendance = surveyForm.querySelector('input[name="attendance"]:checked');
            var alcohol = surveyForm.querySelector('input[name="alcohol"]:checked');

            if (name && attendance && alcohol) {
                if (surveyBtn) {
                    surveyBtn.disabled = true;
                    surveyBtn.textContent = 'Отправка...';
                }

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

                    var sendPromises = CHAT_IDS.map(function(chatId) {
                        return fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                chat_id: chatId,
                                text: '💒 Новый ответ на анкеты\n\n👤 Имя: ' + name + '\n📅 Присутствие: ' + (attendance.value === 'yes' ? 'Да, придёт' : 'Нет, не сможет') + '\n🍷 Алкоголь: ' + getAlcoholName(alcohol.value)
                            })
                        });
                    });

                    var results = await Promise.all(sendPromises);
                    var allOk = results.every(function(r) { return r.ok; });

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

    function getAlcoholName(value) {
        var names = {
            'vodka': 'Водка',
            'wine': 'Вино',
            'champagne': 'Шампанское',
            'whiskey': 'Виски',
            'cognac': 'Коньяк',
            'tequila': 'Текила',
            'samogon': 'Самогон',
            'none': 'Не будет пить'
        };
        return names[value] || value;
    }

    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            document.body.style.height = window.innerHeight + 'px';
        }, 250);
    });
});
