import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (recipe) => {
        set(state => ({ favorites: [...state.favorites, recipe] }));
      },
      removeFavorite: (idMeal) => {
        set(state => ({ favorites: state.favorites.filter(fav => fav.idMeal !== idMeal) }));
      },
      isFavorite: (idMeal) => {
        return get().favorites.some(fav => fav.idMeal === idMeal);
      }
    }),
    {
      name: 'recipe-finder-favorites',
    }
  )
);

export default useFavoritesStore;
