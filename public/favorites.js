(function () {
  const STORAGE_KEY = 'charmel_favorites';

  function getFavorites() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    updateFavoritesCount();
    window.dispatchEvent(new CustomEvent('favorites:updated'));
  }

  function isFavorite(id) {
    return getFavorites().some((f) => f.id === id);
  }

  function addFavorite(item) {
    const favorites = getFavorites();
    if (!favorites.some((f) => f.id === item.id)) {
      favorites.push(item);
      saveFavorites(favorites);
    }
  }

  function removeFavorite(id) {
    const favorites = getFavorites().filter((f) => f.id !== id);
    saveFavorites(favorites);
  }

  function toggleFavorite(item) {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
      return false;
    }
    addFavorite(item);
    return true;
  }

  function updateFavoritesCount() {
    const count = getFavorites().length;
    document.querySelectorAll('[data-favorites-count]').forEach((el) => {
      el.textContent = count;
    });
  }

  window.CharmelFavorites = {
    getFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };

  document.addEventListener('DOMContentLoaded', updateFavoritesCount);
})();