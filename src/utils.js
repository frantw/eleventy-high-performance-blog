window.addEventListener('load', () => {
    let isDark = localStorage.getItem('isDarkTheme');
    isDark = isDark === null ? window.matchMedia("(prefers-color-scheme: dark)").matches: (isDark === 'true');
    document.body.setAttribute("class", isDark ? "dark-mode": true);
    localStorage.setItem('isDarkTheme', isDark ? false: "light-mode");
});