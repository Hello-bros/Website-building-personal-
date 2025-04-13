/**
 * Mobile menu functionality with dropdown support
 * Includes accessibility features like keyboard navigation
 */

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');

  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('active');
    
    // Toggle body scroll
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navList.contains(e.target) && e.target !== mobileMenuToggle) {
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Keyboard navigation for menu
  navList.addEventListener('keydown', function(e) {
    const menuItems = Array.from(this.querySelectorAll('.nav-link'));
    const currentIndex = menuItems.indexOf(document.activeElement);
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % menuItems.length;
      menuItems[nextIndex].focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      menuItems[prevIndex].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      menuItems[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      menuItems[menuItems.length - 1].focus();
    } else if (e.key === 'Escape') {
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('active');
      mobileMenuToggle.focus();
      document.body.style.overflow = '';
    }
  });

  // Search suggestions
  const searchInput = document.getElementById('search-input');
  const searchSuggestions = document.getElementById('search-suggestions');

  if (searchInput && searchSuggestions) {
    searchInput.addEventListener('input', function() {
      const query = this.value.trim();
      
      if (query.length > 2) {
        // In a real app, you would fetch suggestions from an API
        const mockSuggestions = [
          'Smartphones',
          'Laptops',
          'Headphones',
          'Smart Watches',
          'Cameras'
        ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
        
        if (mockSuggestions.length > 0) {
          searchSuggestions.innerHTML = mockSuggestions
            .map(item => <div class="suggestion-item">${item}</div>)
            .join('');
          searchSuggestions.classList.add('active');
        } else {
          searchSuggestions.classList.remove('active');
        }
      } else {
        searchSuggestions.classList.remove('active');
      }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
      if (e.target !== searchInput) {
        searchSuggestions.classList.remove('active');
      }
    });

    // Keyboard navigation for suggestions
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown' && searchSuggestions.classList.contains('active')) {
        e.preventDefault();
        const firstSuggestion = searchSuggestions.querySelector('.suggestion-item');
        if (firstSuggestion) firstSuggestion.focus();
      }
    });

    searchSuggestions.addEventListener('keydown', function(e) {
      const suggestions = Array.from(this.querySelectorAll('.suggestion-item'));
      const currentIndex = suggestions.indexOf(document.activeElement);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % suggestions.length;
        suggestions[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex === 0) {
          searchInput.focus();
        } else {
          const prevIndex = (currentIndex - 1 + suggestions.length) % suggestions.length;
          suggestions[prevIndex].focus();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (document.activeElement.classList.contains('suggestion-item')) {
          searchInput.value = document.activeElement.textContent;
          searchInput.focus();
          searchSuggestions.classList.remove('active');
        }
      } else if (e.key === 'Escape') {
        searchInput.focus();
        searchSuggestions.classList.remove('active');
      }
    });
  }
});