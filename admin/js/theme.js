const ThemeManager = {
    THEME_KEY: 'nongzhitong-admin-theme',
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
        const btn = document.getElementById('theme-toggle') || document.getElementById('theme-toggle-btn');
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
        if (document.getElementById('theme-toggle') || document.getElementById('theme-toggle-btn')) {
            const btn = document.getElementById('theme-toggle') || document.getElementById('theme-toggle-btn');
            btn.onclick = () => this.toggle();
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
                width: 48px;
                height: 48px;
                border-radius: 50%;
                border: 1rpx solid var(--border-subtle);
                background: var(--bg-card);
                color: var(--text-primary);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                padding: 0;
                margin-left: 16rpx;
            }
            .theme-toggle-btn:hover {
                background: var(--primary-subtle);
                border-color: var(--border-active);
            }
            .theme-toggle-btn svg {
                width: 20px;
                height: 20px;
            }
        `;
        document.head.appendChild(style);
        header.appendChild(btn);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});