import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false
};

const userSlice = createSlice({                     //createSlice is a function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
    name: 'user',                                   //The name option is optional but highly recommended, as it is included in the generated action types and can be used in debugging.
    initialState,                                   
    reducers: {                                     //reducers are functions that take the current state and an action as arguments, and return a new state result. In other words, (state, action) => newState.
        signInStart: (state) => {                   //state is the current state of the reducer
            state.loading = true;
        },
        signInSuccess: (state, action) => {         
            state.currentUser = action.payload;    //payload is the data that is passed along with the action, i.e all other data other than action-type
            state.loading = false;  
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signoutUserStart: (state) => {
            state.loading = true;
        },
        signoutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signoutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutUserStart, signoutUserSuccess, signoutUserFailure } = userSlice.actions;

export default userSlice.reducer;