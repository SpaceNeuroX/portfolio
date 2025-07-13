// Глобальные переменные
let currentSection = 'about';
let isAnimating = false;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initParticles();
    initTypeWriter();
    initSkillsAnimation();
    initProjectsHover();
    initContactInteraction();
    createFloatingElements();
});

// Навигация между секциями
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (isAnimating) return;
            
            const targetSection = this.dataset.section;
            if (targetSection === currentSection) return;

            switchSection(targetSection);
            updateActiveNav(this);
        });
    });

    // Инициализация первой активной секции
    updateActiveNav(document.querySelector('.nav-item[data-section="about"]'));
}

function switchSection(targetSection) {
    isAnimating = true;
    
    const currentSectionEl = document.getElementById(currentSection);
    const targetSectionEl = document.getElementById(targetSection);

    // Анимация исчезновения текущей секции
    currentSectionEl.style.animation = 'slideOut 0.3s ease-in forwards';
    
    setTimeout(() => {
        currentSectionEl.classList.remove('active');
        targetSectionEl.classList.add('active');
        currentSection = targetSection;
        
        // Анимация появления новой секции
        targetSectionEl.style.animation = 'slideIn 0.5s ease-out forwards';
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }, 300);
}

function updateActiveNav(activeItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');
}

// Анимации CSS
function initAnimations() {
    // Добавляем дополнительные CSS анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-50px); }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Система частиц
function initParticles() {
    createFireParticles();
    createStarField();
}

function createFireParticles() {
    const fireContainer = document.querySelector('.fire-particles');
    
    setInterval(() => {
        if (Math.random() > 0.6) {
            const particle = document.createElement('div');
            particle.className = 'minecraft-fire-particle';
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: ${Math.random() > 0.5 ? '#ffaa00' : '#ff8c42'};
                left: ${Math.random() * 100}%;
                top: ${80 + Math.random() * 20}%;
                pointer-events: none;
                animation: minecraftFireRise 4s ease-out forwards;
                box-shadow: 
                    inset 2px 2px 0 rgba(255, 255, 255, 0.3),
                    inset -2px -2px 0 rgba(0, 0, 0, 0.3),
                    0 0 8px currentColor;
                image-rendering: pixelated;
            `;
            
            fireContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 4000);
        }
    }, 400);
    
    // Добавляем анимацию подъема пиксельного огня
    const fireStyle = document.createElement('style');
    fireStyle.textContent = `
        @keyframes minecraftFireRise {
            0% { 
                transform: translateY(0) scale(1);
                opacity: 0.9;
                background: #ffaa00;
            }
            25% {
                transform: translateY(-30px) scale(1.1);
                opacity: 1;
                background: #ff8c42;
            }
            50% { 
                transform: translateY(-60px) scale(1.2);
                opacity: 1;
                background: #ffd60a;
            }
            75% {
                transform: translateY(-90px) scale(1.1);
                opacity: 0.8;
                background: #ff8c42;
            }
            100% { 
                transform: translateY(-120px) scale(0.8);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(fireStyle);
}

function createStarField() {
    const container = document.querySelector('.game-container');
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: white;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${2 + Math.random() * 3}s infinite;
            z-index: -1;
        `;
        container.appendChild(star);
    }
    
    const starStyle = document.createElement('style');
    starStyle.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(starStyle);
}

// Печатающий текст
function initTypeWriter() {
    const typeText = document.querySelector('.type-text');
    const text = typeText.textContent;
    typeText.textContent = '';
    typeText.style.whiteSpace = 'nowrap';
    typeText.style.overflow = 'hidden';
    typeText.style.borderRight = '2px solid var(--accent-purple)';
    
    let i = 0;
    function typeChar() {
        if (i < text.length) {
            typeText.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, 50);
        } else {
            // Эффект мигания курсора
            setInterval(() => {
                typeText.style.borderColor = 
                    typeText.style.borderColor === 'transparent' 
                        ? 'var(--accent-purple)' 
                        : 'transparent';
            }, 1000);
        }
    }
    
    setTimeout(typeChar, 1000);
}

// Анимация навыков
function initSkillsAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBlocks = entry.target.querySelectorAll('.skill-block');
                skillBlocks.forEach((block, index) => {
                    setTimeout(() => {
                        block.style.animation = 'bounceIn 0.6s ease-out forwards';
                    }, index * 100);
                });
            }
        });
    });
    
    const skillsSection = document.querySelector('.skills-tetris');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Интерактивность проектов
function initProjectsHover() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
            createSparkles(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
        });
        
        // Эффект клика
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.3s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}

function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${Math.random() > 0.5 ? '#ff9500' : '#ffb347'};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: sparkle 1s ease-out forwards;
            pointer-events: none;
            z-index: 10;
            box-shadow: 0 0 6px currentColor;
        `;
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Интерактивность контактов
function initContactInteraction() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactType = this.dataset.contact;
            
            // Создаем действия для разных типов контактов
            switch(contactType) {
                case 'email':
                    window.open('mailto:totoshkus@gmail.com', '_blank');
                    showNotification('📧 Открываю почтовый клиент...');
                    break;
                case 'telegram':
                    window.open('https://t.me/device_api', '_blank');
                    showNotification('💬 Открываю Telegram...');
                    break;
                case 'channel':
                    window.open('https://t.me/AntiSpam_moder', '_blank');
                    showNotification('📢 Открываю Telegram канал...');
                    break;
                case 'github':
                    showNotification('🐙 Добавьте ссылку на GitHub!');
                    break;
                default:
                    showNotification('🔗 Контакт скопирован!');
            }
            
            // Эффект волны
            createRipple(this, event);
        });
    });
    
    // Анимация сердечка
    const heart = document.querySelector('.pixel-heart');
    if (heart) {
        heart.addEventListener('click', function() {
            this.style.animation = 'heartbeat 0.5s ease-out 3';
            createHeartParticles(this);
        });
    }
}

function createRipple(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 149, 0, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    setTimeout(() => ripple.remove(), 600);
}

function createHeartParticles(element) {
    const hearts = ['💜', '💖', '💕', '💗'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            font-size: 20px;
            pointer-events: none;
            z-index: 1000;
            left: 50%;
            top: 50%;
            animation: heartFloat ${1 + Math.random()}s ease-out forwards;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
    }
    
    const heartFloatStyle = document.createElement('style');
    heartFloatStyle.textContent = `
        @keyframes heartFloat {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${-50 + (Math.random() - 0.5) * 200}%, ${-50 - Math.random() * 100}%) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(heartFloatStyle);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-orange);
        color: white;
        padding: 15px 20px;
        font-family: 'Press Start 2P', cursive;
        font-size: 10px;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        border: 2px solid var(--warm-amber);
        box-shadow: 0 5px 15px rgba(255, 149, 0, 0.5);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(notificationStyle);
}

// Плавающие элементы
function createFloatingElements() {
    const container = document.querySelector('.game-container');
    
    // Создаем плавающие тетрис блоки
    setInterval(() => {
        if (Math.random() > 0.8) {
            const block = document.createElement('div');
            const blockTypes = ['i-block', 'o-block', 't-block'];
            const randomType = blockTypes[Math.floor(Math.random() * blockTypes.length)];
            
            block.className = `tetris-block mini ${randomType}`;
            block.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -60px;
                animation: floatDown 8s linear forwards;
                z-index: -1;
                pointer-events: none;
            `;
            
            container.appendChild(block);
            
            setTimeout(() => block.remove(), 8000);
        }
    }, 2000);
    
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes floatDown {
            from { 
                transform: translateY(-60px) rotate(0deg);
                opacity: 0.3;
            }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            to { 
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(floatStyle);
}

// Обработка клавиатуры для навигации
document.addEventListener('keydown', function(e) {
    if (isAnimating) return;
    
    const sections = ['about', 'skills', 'projects', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            if (currentIndex > 0) {
                const prevSection = sections[currentIndex - 1];
                switchSection(prevSection);
                updateActiveNav(document.querySelector(`[data-section="${prevSection}"]`));
            }
            break;
            
        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault();
            if (currentIndex < sections.length - 1) {
                const nextSection = sections[currentIndex + 1];
                switchSection(nextSection);
                updateActiveNav(document.querySelector(`[data-section="${nextSection}"]`));
            }
            break;
    }
});

// Дополнительные эффекты при прокрутке
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.tetris-block');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index % 3) * 0.2;
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Изменение темы при определенных действиях
function changeTheme() {
    const root = document.documentElement;
    const themes = [
        {
            primary: '#1a1a2e',
            secondary: '#16213e',
            accent: '#9d4edd'
        },
        {
            primary: '#0f0f23',
            secondary: '#1a1a3a',
            accent: '#ff6b35'
        },
        {
            primary: '#2d1b69',
            secondary: '#11052c',
            accent: '#06ffa5'
        }
    ];
    
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    root.style.setProperty('--primary-bg', randomTheme.primary);
    root.style.setProperty('--secondary-bg', randomTheme.secondary);
    root.style.setProperty('--accent-purple', randomTheme.accent);
}

// Пасхальное яйцо - код Konami
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateSecretMode();
        konamiCode = [];
    }
});

function activateSecretMode() {
    showNotification('🎮 СЕКРЕТНЫЙ РЕЖИМ АКТИВИРОВАН! 🎮');
    
    // Добавляем специальные эффекты
    document.body.style.animation = 'rainbow 2s infinite';
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    // Создаем взрыв частиц
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createSparkles(document.body);
        }, i * 50);
    }
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Инициализация анимации загрузки
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div class="loader-tetris">
            <div class="tetris-block i-block mini"></div>
            <div class="tetris-block o-block mini"></div>
            <div class="tetris-block t-block mini"></div>
            <div>ЗАГРУЗКА...</div>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeOut 1s ease-out 1s forwards;
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader-tetris {
            text-align: center;
            font-family: 'Press Start 2P', cursive;
            color: var(--accent-orange);
            animation: pulse 1s infinite;
        }
        .loader-tetris .tetris-block {
            display: inline-block;
            margin: 0 10px 20px;
            animation: bounce 0.5s infinite alternate;
        }
        .loader-tetris .tetris-block:nth-child(2) {
            animation-delay: 0.2s;
        }
        .loader-tetris .tetris-block:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes bounce {
            from { transform: translateY(0); }
            to { transform: translateY(-10px); }
        }
        @keyframes fadeOut {
            to { opacity: 0; pointer-events: none; }
        }
    `;
    document.head.appendChild(loaderStyle);
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 2000);
});
