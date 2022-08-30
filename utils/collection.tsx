import { CollectionContext } from '@/pages/_app';
import { useContext, useState } from 'react';
import { Anime } from 'types/anime';

interface Collection {
  [key: string]: Anime[];
}

const collectionReducer = (
  state: Collection,
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
        newAnimeList = action.payload.anime ? [action.payload.anime] : [];
      }
      const newCollection = {
        ...state,
        [action.payload.name]: newAnimeList,
      };

      window.localStorage.setItem('collection', JSON.stringify(newCollection));

      return newCollection;
    }
    case 'delete': {
      const newCollection = { ...state };
      delete newCollection[action.payload];

      window.localStorage.setItem('collection', JSON.stringify(newCollection));

      return newCollection;
    }
    case 'deleteAnime': {
      const newCollection = { ...state };
      newCollection[action.payload.name] = newCollection[
        action.payload.name
      ].filter((anime) => anime.id !== action.payload.animeId);

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

  // @ts-ignore
  const [collection, dispatch] = context;

  return [collection, dispatch];
}

function useNewCollection() {
  const [collectionName, setCollectionName] = useState('Collection name');
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function validate(collection: Collection, name?: string) {
    if (!collectionName) return;
    if (Object.keys(collection).includes(name ?? collectionName)) {
      setErrorMsg('Name already used!');
      setShowError(true);
      return false;
    }
    for (const c of name ?? collectionName) {
      if (
        ('a'.charCodeAt(0) <= c.charCodeAt(0) &&
          c.charCodeAt(0) <= 'z'.charCodeAt(0)) ||
        ('A'.charCodeAt(0) <= c.charCodeAt(0) &&
          c.charCodeAt(0) <= 'Z'.charCodeAt(0))
      ) {
        continue;
      }
      setErrorMsg('Cannot use special characters');
      setShowError(true);
      return false;
    }

    return true;
  }

  return {
    collectionName,
    setCollectionName,
    showError,
    setShowError,
    errorMsg,
    validate,
  };
}

export { collectionReducer, useCollection, useNewCollection };
