/**
 * 电商AI应用转型报告 - 交互脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化Lucide图标
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 初始化所有模块
    initNavigation();
    initSceneTabs();
    initTierTabs();
    initBackToTop();
    initScrollAnimations();
    initMobileNav();
});

/**
 * 导航栏滚动效果
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // 添加滚动样式
        if (currentScrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // 关闭移动端菜单
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });

    // 高亮当前导航项
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 移动端导航菜单
 */
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

/**
 * 场景标签页切换
 */
function initSceneTabs() {
    const sceneTabs = document.querySelectorAll('.scene-tab');
    const sceneContents = document.querySelectorAll('.scene-content');

    sceneTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetScene = tab.getAttribute('data-scene');

            // 更新标签状态
            sceneTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 更新内容显示
            sceneContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `scene-${targetScene}`) {
                    content.classList.add('active');
                }
            });

            // 重新初始化Lucide图标（针对动态显示的内容）
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // 滚动到内容区域
            const contentArea = document.querySelector(`#scene-${targetScene}`);
            if (contentArea) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = contentArea.offsetTop - navHeight - 100;

                // 只在需要时滚动
                if (Math.abs(window.scrollY - targetPosition) > 200) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * 商家分层标签页切换
 */
function initTierTabs() {
    const tierBtns = document.querySelectorAll('.tier-btn');
    const tierContents = document.querySelectorAll('.tier-content');

    tierBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTier = btn.getAttribute('data-tier');

            // 更新按钮状态
            tierBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 更新内容显示
            tierContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tier-${targetTier}`) {
                    content.classList.add('active');
                }
            });

            // 重新初始化Lucide图标
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
}

/**
 * 返回顶部按钮
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // 监听滚动显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // 点击返回顶部
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 滚动动画效果
 */
function initScrollAnimations() {
    // 创建 Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // 可选：只触发一次
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll(
        '.insight-card, .mini-card, .pain-card, .solution-card, ' +
        '.feature-card, .case-study, .benefit-card, .workflow-step, ' +
        '.risk-card, .tools-category, .strategy-tip'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * 数字动画效果
 */
function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-number, .stat-value');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateNumber(entry.target);
            }
        });
    }, observerOptions);

    numberElements.forEach(el => observer.observe(el));
}

function animateNumber(element) {
    const text = element.textContent;
    const match = text.match(/(\d+)/);

    if (!match) return;

    const finalNumber = parseInt(match[1]);
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentNumber = Math.floor(finalNumber * easeOutQuart);

        element.textContent = text.replace(/\d+/, currentNumber);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = text;
        }
    }

    requestAnimationFrame(update);
}

/**
 * 图片占位符点击处理
 */
document.querySelectorAll('.image-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        const caseName = this.getAttribute('data-case');
        console.log(`点击了案例图片: ${caseName}`);
        // 这里可以添加图片预览或跳转逻辑
    });
});

/**
 * 工具提示
 */
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: #1f2937;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.875rem;
                z-index: 1000;
                max-width: 200px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;

            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + window.scrollY + 'px';
        });

        el.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

/**
 * 打印功能
 */
function printReport() {
    window.print();
}

/**
 * 复制链接分享
 */
function copyShareLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('链接已复制到剪贴板');
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

/**
 * 目录导航生成
 */
function generateTableOfContents() {
    const toc = document.createElement('div');
    toc.className = 'toc-sidebar';

    const sections = document.querySelectorAll('.section-header h2');
    const tocList = document.createElement('ul');

    sections.forEach((section, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const parentSection = section.closest('section');

        if (parentSection && parentSection.id) {
            a.href = `#${parentSection.id}`;
            a.textContent = section.textContent;
            li.appendChild(a);
            tocList.appendChild(li);
        }
    });

    toc.appendChild(tocList);
    return toc;
}

/**
 * 阅读进度指示器
 */
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #f59e0b);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// 初始化阅读进度
initReadingProgress();

/**
 * 键盘导航支持
 */
document.addEventListener('keydown', (e) => {
    // 按 Home 键回到顶部
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 按 End 键到底部
    if (e.key === 'End') {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }
});

/**
 * 暗色模式支持（可选功能）
 */
function initDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function updateTheme(e) {
        if (e.matches) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }

    prefersDark.addEventListener('change', updateTheme);
    updateTheme(prefersDark);
}

// 如果需要暗色模式，取消下面的注释
// initDarkMode();

/**
 * 性能优化：图片懒加载
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 初始化懒加载
initLazyLoading();

console.log('电商AI应用转型报告 - 脚本加载完成');
