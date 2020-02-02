import * as TYPES from './types';

export const initialState = {
  filter: {},
  user: {},
  adverts: [],
  ui: {
    isFetching: false,
    error: null,
  },
  currentAdvert: null,
  currentPage: 1,
}

export const user = (state = initialState.user, action) => {
  switch(action.type) {
    case TYPES.SET_USER:
      return action.user;
    default: 
      return state;
  }
};

export const currentPage = (state = initialState.currentPage, action) => {
  switch(action.type) {
    case TYPES.SET_CURRENT_PAGE:
      return action.currentPage;
    default: 
      return state;
  }
};

export const filter = (state = initialState.filter, action) => {
  switch(action.type) {
    case TYPES.SET_FILTER:
      return action.filter;
    default: 
      return state;
  }
};

export const adverts = (state = initialState.adverts, action) => {
  switch(action.type) {
    case TYPES.FETCH_ADVERTS_SUCCESS:
      return action.adverts;
    default: 
      return state;
  }
}

export const currentAdvert = (state = initialState.currentAdvert, action) => {
  switch(action.type) {
    case TYPES.FETCH_SINGLE_ADVERT_SUCCESS:
    case TYPES.CREATE_ADVERT_SUCCESS:
    case TYPES.EDIT_ADVERT_SUCCESS:
      return action.currentAdvert;
    default:
      return state;
  }
}

export const ui = (state = initialState.ui, action) => {  
  switch(action.type) {
    case TYPES.FETCH_ADVERTS_REQUEST:
    case TYPES.FETCH_SINGLE_ADVERT_REQUEST:
    case TYPES.CREATE_ADVERT_REQUEST:
    case TYPES.EDIT_ADVERT_REQUEST:
    case TYPES.CREATE_USER_REQUEST:
      return { ...state, isFetching: true, error: null };
    case TYPES.FETCH_ADVERTS_FAILURE:
    case TYPES.FETCH_SINGLE_ADVERT_FAILURE:
    case TYPES.CREATE_ADVERT_FAILURE:
    case TYPES.EDIT_ADVERT_FAILURE:
    case TYPES.CREATE_USER_FAILURE:
      return { ...state, isFetching: false, error: action.error }
    case TYPES.FETCH_ADVERTS_SUCCESS:
    case TYPES.FETCH_SINGLE_ADVERT_SUCCESS:
    case TYPES.CREATE_ADVERT_SUCCESS:
    case TYPES.EDIT_ADVERT_SUCCESS:
    case TYPES.CREATE_USER_SUCCESS:
      return { ...state, isFetching: false, error: null }
    default: 
      return state;
  }
}