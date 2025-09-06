// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initHeaderScroll();
    initScrollAnimations();
    initCharts();
    initParticleSystem();
    initSmoothScrolling();
    initHoverEffects();
    initTypingEffect();
    initMobileMenu();
    initCardHighlighting(); // Call the new function here
});

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on nav links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('feature-grid') || 
                    entry.target.classList.contains('architecture-grid') ||
                    entry.target.classList.contains('use-cases-grid') ||
                    entry.target.classList.contains('team-grid')) {
                    const items = entry.target.querySelectorAll('.feature-card, .architecture-card, .use-case-card, .team-card');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe grid containers
    document.querySelectorAll('.feature-grid, .architecture-grid, .use-cases-grid, .team-grid').forEach(grid => {
        grid.classList.add('fade-in');
        observer.observe(grid);
        
        // Initialize grid items
        const items = grid.querySelectorAll('.feature-card, .architecture-card, .use-case-card, .team-card');
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
        });
    });
}

// Initialize charts (Energy Chart for both mobile and desktop)
function initCharts() {
    // Desktop Energy Chart
    const energyCtx = document.getElementById('energyChart');
    if (energyCtx) {
        new Chart(energyCtx, {
            type: 'doughnut',
            data: {
                labels: ['Message Tx', 'Discovery', 'Maintenance', 'Idle'],
                datasets: [{
                    data: [2.0, 1.2, 0.8, 0.1],
                    backgroundColor: [
                        'rgba(0, 212, 255, 0.8)',
                        'rgba(0, 153, 204, 0.8)',
                        'rgba(0, 255, 136, 0.8)',
                        'rgba(139, 92, 246, 0.8)'
                    ],
                    borderColor: [
                        'rgba(0, 212, 255, 1)',
                        'rgba(0, 153, 204, 1)',
                        'rgba(0, 255, 136, 1)',
                        'rgba(139, 92, 246, 1)'
                    ],
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                cutout: '60%'
            }
        });
    }
    
    // Mobile Energy Chart
    const energyCtxMobile = document.getElementById('energyChartMobile');
    if (energyCtxMobile) {
        new Chart(energyCtxMobile, {
            type: 'doughnut',
            data: {
                labels: ['Message Tx', 'Discovery', 'Maintenance', 'Idle'],
                datasets: [{
                    data: [2.0, 1.2, 0.8, 0.1],
                    backgroundColor: [
                        'rgba(0, 212, 255, 0.8)',
                        'rgba(0, 153, 204, 0.8)',
                        'rgba(0, 255, 136, 0.8)',
                        'rgba(139, 92, 246, 0.8)'
                    ],
                    borderColor: [
                        'rgba(0, 212, 255, 1)',
                        'rgba(0, 153, 204, 1)',
                        'rgba(0, 255, 136, 1)',
                        'rgba(139, 92, 246, 1)'
                    ],
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                cutout: '60%'
            }
        });
    }
    
    // Energy Consumption Chart
    const energyConsumptionCtx = document.getElementById('energyConsumptionChart');
    if (energyConsumptionCtx) {
        new Chart(energyConsumptionCtx, {
            type: 'bar',
            data: {
                labels: ['Low Density', 'Medium Density', 'High Density', 'Extreme Density', 'Temporary High', 'Disaster Scenario'],
                datasets: [{
                    label: 'Energy Consumption (mAh)',
                    data: [7.25, 37.25, 57.85, 57.2, 46.4, 44.9],
                    backgroundColor: [
                        'rgba(0, 212, 255, 0.8)',
                        'rgba(0, 153, 204, 0.8)',
                        'rgba(0, 255, 136, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(255, 87, 34, 0.8)',
                        'rgba(156, 39, 176, 0.8)'
                    ],
                    borderColor: [
                        'rgba(0, 212, 255, 1)',
                        'rgba(0, 153, 204, 1)',
                        'rgba(0, 255, 136, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(255, 87, 34, 1)',
                        'rgba(156, 39, 176, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 17, 31, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#b0b0b0',
                        borderColor: 'rgba(0, 212, 255, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return context.parsed.y + ' mAh';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 212, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return value + ' mAh';
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
    
    // Mean Localization Error Chart
    const meanLocalizationCtx = document.getElementById('meanLocalizationChart');
    if (meanLocalizationCtx) {
        new Chart(meanLocalizationCtx, {
            type: 'bar',
            data: {
                labels: ['Low Density', 'Medium Density', 'High Density', 'Extreme Density', 'Temporary High', 'Disaster Scenario'],
                datasets: [{
                    label: 'Mean Localization Error (m)',
                    data: [1.79, 1.5, 1.62, 1.66, 1.69, 1.59],
                    backgroundColor: [
                        'rgba(0, 212, 255, 0.8)',
                        'rgba(0, 153, 204, 0.8)',
                        'rgba(0, 255, 136, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(255, 87, 34, 0.8)',
                        'rgba(156, 39, 176, 0.8)'
                    ],
                    borderColor: [
                        'rgba(0, 212, 255, 1)',
                        'rgba(0, 153, 204, 1)',
                        'rgba(0, 255, 136, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(255, 87, 34, 1)',
                        'rgba(156, 39, 176, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 17, 31, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#b0b0b0',
                        borderColor: 'rgba(0, 212, 255, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return context.parsed.y + ' m';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 2,
                        grid: {
                            color: 'rgba(0, 212, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return value + ' m';
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Latency (Time Steps) Chart
    const latencyTimeStepsCtx = document.getElementById('latencyTimeStepsChart');
    if (latencyTimeStepsCtx) {
        new Chart(latencyTimeStepsCtx, {
            type: 'bar',
            data: {
                labels: ['Low Density', 'Medium Density', 'High Density', 'Extreme Density', 'Temporary High', 'Disaster Scenario'],
                datasets: [{
                    label: 'Latency (Time Steps)',
                    data: [1418, 1655, 1068, 787, 1330, 1436],
                    backgroundColor: [
                        'rgba(0, 212, 255, 0.8)',
                        'rgba(0, 255, 136, 0.8)',
                        'rgba(0, 153, 204, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(255, 87, 34, 0.8)',
                        'rgba(156, 39, 176, 0.8)'
                    ],
                    borderColor: [
                        'rgba(0, 212, 255, 1)',
                        'rgba(0, 255, 136, 1)',
                        'rgba(0, 153, 204, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(255, 87, 34, 1)',
                        'rgba(156, 39, 176, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 17, 31, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#b0b0b0',
                        borderColor: 'rgba(0, 212, 255, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return context.parsed.y + ' steps';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 212, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return value;
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Coverage Rate Chart
    const coverageRateCtx = document.getElementById('coverageRateChart');
    if (coverageRateCtx) {
        new Chart(coverageRateCtx, {
            type: 'bar',
            data: {
                labels: ['Low Density', 'Medium Density', 'High Density', 'Extreme Density', 'Temporary High', 'Disaster Scenario'],
                datasets: [{
                    label: 'Coverage Rate (%)',
                    data: [96.67, 99.33, 94.84, 93.77, 92.8, 99.78],
                    backgroundColor: [
                        'rgba(0, 212, 255, 0.8)',
                        'rgba(0, 255, 136, 0.8)',
                        'rgba(0, 153, 204, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(255, 87, 34, 0.8)',
                        'rgba(156, 39, 176, 0.8)'
                    ],
                    borderColor: [
                        'rgba(0, 212, 255, 1)',
                        'rgba(0, 255, 136, 1)',
                        'rgba(0, 153, 204, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(255, 87, 34, 1)',
                        'rgba(156, 39, 176, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 17, 31, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#b0b0b0',
                        borderColor: 'rgba(0, 212, 255, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: false,
                        min: 90,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 212, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#b0b0b0',
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
}

// Particle system for background
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles');
    
    // Create additional floating particles
    for (let i = 0; i < 15; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.3});
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: floatParticle ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

// Add CSS for particles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-40px) translateX(-5px) scale(0.8);
            opacity: 0.5;
        }
        75% {
            transform: translateY(-20px) translateX(-15px) scale(1.1);
            opacity: 0.7;
        }
    }

    // Mean Localization Error Chart
    const meanLocalizationCtx = document.getElementById('meanLocalizationChart');
    if (meanLocalizationCtx) {
        new Chart(meanLocalizationCtx, {
            type: 'line',
            data: {
                labels: ['Low Density', 'Medium Density', 'High Density', 'Extreme Density', 'Temporary High', 'Disaster Scenario'],
                datasets: [{
                    label: 'Mean Localization Error (m)',
                    data: [1.79, 1.5, 1.62, 1.66, 1.69, 1.59],
                    borderColor: 'rgba(0, 212, 255, 1)',
                    backgroundColor: 'rgba(0, 212, 255, 0.12)',
                    pointBackgroundColor: 'rgba(0, 212, 255, 1)',
                    pointBorderColor: '#0b1220',
                    pointRadius: 5,
                    tension: 0.25,
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(17, 17, 31, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#b0b0b0',
                        borderColor: 'rgba(0, 212, 255, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            title: function(context) { return context[0].label; },
                            label: function(context) { return context.parsed.y + ' m'; }
                        }
                    }
                },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#b0b0b0' } },
                    y: {
                        beginAtZero: false,
                        suggestedMin: 1.4,
                        suggestedMax: 2.0,
                        grid: { color: 'rgba(0, 212, 255, 0.06)', drawBorder: false },
                        ticks: { color: '#b0b0b0', callback: function(value){ return value + ' m'; } }
                    }
                },
                animation: { duration: 1400, easing: 'easeOutQuart' },
                interaction: { intersect: false, mode: 'index' }
            }
        });
    }
`;
document.head.appendChild(particleStyles);

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// Enhanced hover effects
function initHoverEffects() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            createRipple(e, this);
        });
    });

    // Cards are now static - no tilt effect
}

// Create ripple effect
function createRipple(event, element) {
    const ripple = document.createElement('span');
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
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Typing effect removed - title is now static
function initTypingEffect() {
    // No typing animation
}

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.particles, .mesh-lines');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add floating mesh nodes dynamically
function addFloatingNodes() {
    const floatingNodes = document.querySelector('.floating-nodes');
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const node = document.createElement('div');
            const size = Math.random() * 6 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            node.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: floatNode 8s ease-in-out forwards;
                pointer-events: none;
            `;
            
            floatingNodes.appendChild(node);
            
            setTimeout(() => {
                node.remove();
            }, 8000);
        }
    }, 2000);
}

// Add floating node animation CSS
const floatingNodeStyles = document.createElement('style');
floatingNodeStyles.textContent = `
    @keyframes floatNode {
        0% {
            transform: translateY(0px) scale(0);
            opacity: 0;
        }
        20% {
            transform: translateY(-10px) scale(1);
            opacity: 0.8;
        }
        80% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatingNodeStyles);

// Start floating nodes
setTimeout(addFloatingNodes, 3000);

// Add glow effect to buttons only (not cards)
document.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll('.btn');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            element.style.boxShadow = `0 0 30px rgba(0, 212, 255, 0.4), 0 0 60px rgba(0, 212, 255, 0.2)`;
        } else {
            element.style.boxShadow = '';
        }
    });
});

// Page load event - no loading animation
window.addEventListener('load', () => {
    // Page is loaded
});

// Easing function removed - no longer needed

// Loading styles removed - content is always visible

// KPI cards are now static - no animations

// Add floating action button for scroll to top
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        scrollToTopBtn.style.transform = 'translateY(20px)';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
    this.style.boxShadow = '0 8px 30px rgba(0, 212, 255, 0.5)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.3)';
});

// Card highlighting functionality
function initCardHighlighting() {
    // Get all cards
    const cards = document.querySelectorAll('.feature-card, .architecture-card, .use-case-card, .team-card, .energy-breakdown');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If the click is on a link, don't highlight the card
            if (e.target.closest('a')) {
                return;
            }
            
            // Remove highlight from all cards
            cards.forEach(c => c.classList.remove('highlighted'));
            
            // Add highlight to clicked card
            this.classList.add('highlighted');
        });
    });

    // Prevent card click when clicking on social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

