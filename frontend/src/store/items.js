// import * as PokemonApiUtil from '../util/pokemon_api_util';

export const LOAD_ITEMS = 'items/LOAD_ITEMS';
export const UPDATE_ITEM = 'items/UPDATE_ITEM';
export const REMOVE_ITEM = 'items/REMOVE_ITEM';
export const ADD_ITEM = 'items/ADD_ITEM';

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId,
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item,
});

const add = (item) => ({
  type: ADD_ITEM,
  item,
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId,
});

export const fetchItems = (pokemonId) => async (dispatch) => {
  const res = await fetch(`/api/pokemon/${pokemonId}/items`);

  if (res.ok) {
    const itemData = await res.json();
    dispatch(load(itemData, pokemonId));
  }
};

export const addItem = (payload) => async (dispatch) => {
  const res = await fetch(`/api/pokemon/${payload.pokemonId}/items`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const itemData = await res.json();
    dispatch(add(itemData));
  }
};

export const editItem = (payload) => async (dispatch) => {
  const res = await fetch(`/api/items/${payload.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const itemData = await res.json();
    dispatch(update(itemData));
  }
};

export const deleteItem = (payload) => async (dispatch) => {
  debugger;
  const res = await fetch(`/api/items/${payload.id}`, {
    method: 'DELETE',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const itemData = await res.json();
    debugger;
    dispatch(remove(itemData.id, payload.pokemonId));
  }
};

const initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS:
      const newItems = {};
      action.items.forEach((item) => {
        newItems[item.id] = item;
      });
      return {
        ...state,
        ...newItems,
      };
    case REMOVE_ITEM:
      const newState = { ...state };
      debugger;
      delete newState[action.itemId.id];
      return newState;
    case ADD_ITEM:
    case UPDATE_ITEM:
      return {
        ...state,
        [action.item.id]: action.item,
      };
    default:
      return state;
  }
};

export default itemsReducer;
