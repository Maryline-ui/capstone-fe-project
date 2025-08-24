import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (recipe) =>
        set((state) => ({ favorites: [...state.favorites, recipe] })),
      removeFavorite: (recipeId) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.idMeal !== recipeId),
        })),
      isFavorite: (recipeId) =>
        get().favorites.some((fav) => fav.idMeal === recipeId),
    }),
    {
      name: 'favorites-storage',
    }
  )
);

export default useFavoritesStore;
