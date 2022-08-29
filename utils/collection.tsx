import { CollectionContext } from '@/pages/_app';
import { useContext } from 'react';

const collectionReducer = (
  state: { [key: string]: any[] },
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case 'getAll': {
      return JSON.parse(window.localStorage.getItem('collection') || '{}');
    }
    case 'add': {
      let newAnimeList;
      if (state[action.payload.name]) {
        newAnimeList = [...state[action.payload.name], action.payload.anime];
      } else {
        newAnimeList = [action.payload.anime];
      }
      const newCollection = {
        ...state,
        [action.payload!.name]: newAnimeList,
      };

      window.localStorage.setItem('collection', JSON.stringify(newCollection));

      return newCollection;
    }
  }
};

function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within CollectionProvider');
  }

  const [collection, dispatch] = context;

  return [collection, dispatch];
}

export { collectionReducer, useCollection };
