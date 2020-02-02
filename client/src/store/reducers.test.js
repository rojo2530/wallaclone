import * as TYPES from './types';
import { currentPage } from './reducers';

describe('reducers', () => {
  const initialState = {
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
  describe('reducer currentPage', () => {
    it('should return initial state', () => {
      expect(currentPage(initialState.currentPage, {})).toEqual(initialState.currentPage);
    });
    it('should set currentPage', () => {
      const actionPage = {
        type: TYPES.SET_CURRENT_PAGE,
        currentPage: 4,
      };
      const expectedState = 4;
      expect(currentPage(initialState.currentPage, actionPage )).toEqual(expectedState)
    });
  });
});