const ThemeManager = {
    THEME_KEY: 'nongzhitong-theme',
    THEME_DARK: 'dark',
    THEME_DAY: 'day',

    init() {
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        const theme = savedTheme || this.THEME_DARK;
        this.applyTheme(theme);
        this.createToggleButton();
        this.updateToggleIcon(theme);
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.THEME_KEY, theme);
    },

    toggle() {
        const currentTheme = localStorage.getItem(this.THEME_KEY) || this.THEME_DARK;
        const newTheme = currentTheme === this.THEME_DARK ? this.THEME_DAY : this.THEME_DARK;
        this.applyTheme(newTheme);
        this.updateToggleIcon(newTheme);
    },

    updateToggleIcon(theme) {
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            if (theme === this.THEME_DAY) {
                btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
                btn.title = '切换到夜间模式';
            } else {
                btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
                btn.title = '切换到日间模式';
            }
        }
    },

    createToggleButton() {
        if (document.getElementById('theme-toggle-btn')) {
            return;
        }
        const header = document.querySelector('.header');
        if (!header) {
            return;
        }

        const btn = document.createElement('button');
        btn.id = 'theme-toggle-btn';
        btn.className = 'theme-toggle-btn';
        btn.onclick = () => this.toggle();
        btn.title = '切换主题';

        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px solid var(--border-subtle);
                background: var(--bg-card);
                color: var(--text-primary);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                padding: 0;
            }
            .theme-toggle-btn:hover {
                background: var(--primary-subtle);
                border-color: var(--border-active);
                box-shadow: var(--shadow-glow);
            }
            .theme-toggle-btn svg {
                width: 20px;
                height: 20px;
            }
            [data-theme="day"] .bg-base {
                background: #f5f7fa !important;
            }
            [data-theme="day"] .bg-gradient {
                background: radial-gradient(ellipse 80% 50% at 20% 10%, rgba(0, 198, 142, 0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 90%, rgba(33, 150, 243, 0.05) 0%, transparent 50%) !important;
            }
            [data-theme="day"] .bg-metal-shine {
                background: linear-gradient(125deg, transparent 0%, rgba(0, 198, 142, 0.03) 25%, transparent 50%, rgba(0, 198, 142, 0.02) 75%, transparent 100%) !important;
                background-size: 400% 400% !important;
            }
            [data-theme="day"] .bg-grid {
                background-image: linear-gradient(rgba(0, 198, 142, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 198, 142, 0.03) 1px, transparent 1px) !important;
            }
            [data-theme="day"] .light-streams::before,
            [data-theme="day"] .light-streams::after {
                background: linear-gradient(90deg, transparent 0%, rgba(0, 198, 142, 0.2) 20%, rgba(0, 198, 142, 0.4) 50%, rgba(0, 198, 142, 0.2) 80%, transparent 100%) !important;
            }
            [data-theme="day"] .header {
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 247, 250, 0.95) 100%) !important;
                border-bottom: 1px solid var(--border-subtle) !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
            }
            [data-theme="day"] .search-section {
                background: rgba(255, 255, 255, 0.9) !important;
            }
            [data-theme="day"] .bottom-nav {
                background: rgba(255, 255, 255, 0.98) !important;
                border-top: 1px solid var(--border-subtle) !important;
            }
            [data-theme="day"] .bottom-nav-item {
                color: var(--text-muted) !important;
            }
            [data-theme="day"] .bottom-nav-item.active {
                color: var(--primary) !important;
            }
        `;
        document.head.appendChild(style);
        header.appendChild(btn);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});