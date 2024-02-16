import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { reducer } from '../modules/redux/reciepeRedux'

const store = configureStore({
    reducer: reducer
})

export const persistor = persistStore(store) // persistor to persist the store on local storage
export default store