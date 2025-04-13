/**
 * Theme toggle functionality with localStorage persistence
 * Supports system preference detection
 */

document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    html.setAttribute('data-theme', 'dark');
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update ARIA label
    this.setAttribute('aria-label', Switch to ${currentTheme} mode);
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

  // Initialize ARIA label
  const currentTheme = html.getAttribute('data-theme');
  themeToggle.setAttribute('aria-label', Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode);
});