// Dark mode toggle script
(function() {
  var storageKey = 'theme';

  function updateToggle(theme) {
    var button = document.getElementById('theme-toggle');
    if (!button) return;

    var isDark = theme === 'dark';
    var label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
  }

  function readSavedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  var savedTheme = readSavedTheme();
  var systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var initialTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);
  document.documentElement.style.colorScheme = initialTheme;

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      // Theme switching still works when browser storage is unavailable.
    }
    updateToggle(theme);
  }

  function bindThemeToggle() {
    var button = document.getElementById('theme-toggle');
    if (!button || button.getAttribute('data-theme-bound') === 'true') return;

    button.setAttribute('data-theme-bound', 'true');
    updateToggle(document.documentElement.getAttribute('data-theme'));
    button.addEventListener('click', function() {
      var nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindThemeToggle);
  } else {
    bindThemeToggle();
  }

  window.toggleTheme = function() {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  };
})();
