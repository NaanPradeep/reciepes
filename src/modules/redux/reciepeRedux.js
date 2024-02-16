import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const actionTypes = {
    FetchReciepes: '[Fetch Reciepes] Action',
    AddFavorite: '[Add Favorite] Action',
    RemoveFavorite: '[Remove Favorite] Action'
}

const initialAuthState = {
    reciepes: [],
    favorites: {},
}

export const reducer = persistReducer(
    {storage, key: 'my-reciepe', whitelist: ['reciepes', 'favorites']},
    (state = initialAuthState, action) => {
      switch (action.type) {
        case actionTypes.FetchReciepes: {
          const reciepesAll = action.payload?.reciepes
          return {
            ...state,
            reciepes: reciepesAll
          }
        }
  
        case actionTypes.AddFavorite: {
          const selectedReciepeId = action.payload?.selectedReciepeId // name of the reciepe is used as Id
          return {...state, favorites: {...state.favorites, [selectedReciepeId] : true}} // adding reciepe to the favorites state
        }

        case actionTypes.RemoveFavorite: {
          const selectedReciepeId = action.payload?.selectedReciepeId // name of the reciepe is used as Id
          let newFavorite = {...state.favorites} // copying favorites state to the object
          if(newFavorite[selectedReciepeId]) delete newFavorite[selectedReciepeId] // removing the recipe from the object
          return {...state, favorites: newFavorite} // updating favorites state
        }
  
        default:
          return state
      }
    }
)

export const actions = {
    fetchReciepes: (reciepes) => ({
      type: actionTypes.FetchReciepes, payload: {reciepes}
    }),
    addFavorite: (selectedReciepeId) => ({
      type: actionTypes.AddFavorite,
      payload: {selectedReciepeId},
    }),
    removeFavorite: (selectedReciepeId) => ({
      type: actionTypes.RemoveFavorite,
      payload: {selectedReciepeId},
    })
}