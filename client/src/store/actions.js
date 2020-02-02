import 
  { SET_USER, 
    SET_FILTER, 
    FETCH_ADVERTS_REQUEST,
    FETCH_ADVERTS_SUCCESS,
    FETCH_ADVERTS_FAILURE, 
    FETCH_SINGLE_ADVERT_REQUEST,
    FETCH_SINGLE_ADVERT_FAILURE,
    FETCH_SINGLE_ADVERT_SUCCESS,
    CREATE_ADVERT_REQUEST,
    CREATE_ADVERT_SUCCESS,
    CREATE_ADVERT_FAILURE,
    EDIT_ADVERT_REQUEST,
    EDIT_ADVERT_SUCCESS,
    EDIT_ADVERT_FAILURE,
    SET_CURRENT_PAGE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
  } from './types';

  import { notification } from 'antd';

  const openNotificationWarning = (message, description) => {
    notification.open({
      message,
      description,
      type: 'warning',
      style: { backgroundColor: 'yellow' }
    });
  }
  
  const openNotificationSucess = (message, description) => {
    notification.open({
      message,
      description,
      type: 'success',
      style: { backgroundColor: 'green' }
    });
  }

export const fetchAdverts = () => {
  return async function(dispatch, getState, { services: { getAdverts } }) {
    const { filter, currentPage } = getState();
    dispatch(fetchAdvertsRequest());
    try {
      const data = await getAdverts(filter, currentPage);
      dispatch(fetchAdvertsSuccess(data.results));
    } catch (error) {
      dispatch(fetchAdvertsFailure(error));
    }
  }
}

export const fecthSingleAdvert = id => {
  return async function (dispatch, getState, { services: { getAdvertDetail } } ) {
    const { currentAdvert } = getState();
    //Si el anuncio ya está en redux, no despachamos nada
    if (!currentAdvert || id !== currentAdvert._id) {
      console.log('Hace petición a la api');
      dispatch(fetchSingleAdvertRequest(id));
      try {
        const advert = await getAdvertDetail(id);
        dispatch(fetchSingleAdvertSuccess(advert));
      } catch (error) {
        dispatch(fetchSingleAdvertFailure(error));
      }
    }
  }
}

export const createUser = user => {
  return async function (dispatch, getState, { services: { registerUser } }) {
    dispatch(createUserRequest(user));
    try {
      const { result } = await registerUser(user);
      openNotificationSucess('User created with sucess',`the user ${user.email} was created correctly`);
      dispatch(createUserSuccess(result));
    } catch (error) {
      openNotificationWarning('Invalid Nickname or Email', error.response.data.error);
      dispatch(createUserFailure(error));
    }
  }
}

export const createAdvertPost = advert => {
  return async function (dispatch, getState, { services: { createAdvert } }) {
    dispatch(createAdvertRequest(advert));
    try {
      const { result } = await createAdvert(advert);
      dispatch(createAdvertSuccess(result));
    } catch (error) {
      dispatch(createAdvertFailure(error));
    }
  }
}

export const editAdvertPost = (id, advert) => {
  return async function (dispatch, getState, { services: { updateAdvert } }) {
    dispatch(editAdvertRequest(advert));
    try {
      const { data } = await updateAdvert(id, advert);
      dispatch(editAdvertSuccess(data.result));
    } catch (error) {
      dispatch(editAdvertFailure(error));
    }
  }
}

export const fetchAdvertsRequest = id => ({
  type: FETCH_ADVERTS_REQUEST,
});

export const fetchAdvertsFailure = error => ({
  type: FETCH_ADVERTS_FAILURE,
  error,
});

export const fetchAdvertsSuccess = adverts => ({
  type: FETCH_ADVERTS_SUCCESS,
  adverts,
});

export const fetchSingleAdvertRequest = id => ({
  type: FETCH_SINGLE_ADVERT_REQUEST,
});

export const fetchSingleAdvertFailure = error => ({
  type: FETCH_SINGLE_ADVERT_FAILURE,
  error,
});

export const fetchSingleAdvertSuccess = currentAdvert => ({
  type: FETCH_SINGLE_ADVERT_SUCCESS,
  currentAdvert,
})

export const createAdvertRequest = () => ({
  type: CREATE_ADVERT_REQUEST,
});

export const createAdvertFailure = error => ({
  type: CREATE_ADVERT_FAILURE,
  error,
});

export const createAdvertSuccess = currentAdvert => ({
  type: CREATE_ADVERT_SUCCESS,
  currentAdvert,
});

export const createUserRequest = () => ({
  type: CREATE_USER_REQUEST
});

export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  error,
});

export const createUserSuccess = user => ({
  type: CREATE_USER_SUCCESS,
  user,
});

export const editAdvertRequest = () => ({
  type: EDIT_ADVERT_REQUEST,
});

export const editAdvertFailure = error => ({
  type: EDIT_ADVERT_FAILURE,
  error,
});

export const editAdvertSuccess = currentAdvert => ({
  type: EDIT_ADVERT_SUCCESS,
  currentAdvert,
});

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const setFilter = filter => ({
  type: SET_FILTER,
  filter,
});

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
