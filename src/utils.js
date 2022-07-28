let isDark = localStorage.getItem('isDarkTheme');
isDark = isDark === null ? window.matchMedia("(prefers-color-scheme: dark)").matches: (isDark === 'true');
document.body.setAttribute("class", isDark ? "dark-mode": "light-mode");
localStorage.setItem('isDarkTheme', isDark ? true: false);