import { setCurrentPage, setFilter, fetchAdverts } from './actions';
import { SET_CURRENT_PAGE, SET_FILTER, FETCH_ADVERTS_REQUEST, FETCH_ADVERTS_SUCCESS, FETCH_ADVERTS_FAILURE } from './types';

describe('actions', () => {
  describe('setCurrentPage', () => {
    it('should create a SET_CURRENT_PAGE', () => {
      const currentPage = 1;
      const expectedAction = {
        type: SET_CURRENT_PAGE,
        currentPage,
      }
      expect(setCurrentPage(currentPage)).toEqual(expectedAction);
    });
  });
  describe('setFilter', () => {
    it('should create a SET_FILTER', () => {
      const filter = {};
      const expectedAction = {
        type: SET_FILTER,
        filter,
      }
      expect(setFilter(filter)).toEqual(expectedAction);
    });
  });

  describe('fetchAdverts', () => {
    beforeEach(() => {
      dispatch.mockClear();
    });
    const adverts = [1,2,3];
    const dispatch = jest.fn();
    const getState = () => ({filter: {}, currentPage: 1});
    const getAdverts = jest.fn();
    getAdverts
      .mockResolvedValueOnce({ results: adverts })
      .mockRejectedValueOnce('Error fetching adverts');
    describe('When getAdverts resolves ok', () => {
      it('should dispatch a FETCH_ADVERTS_REQUEST and a FETCH_ADVERTS_SUCCESS action', async () => {
        await fetchAdverts()(dispatch, getState, { services: { getAdverts } });
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: FETCH_ADVERTS_REQUEST});
        expect(getAdverts).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(2, {type: FETCH_ADVERTS_SUCCESS, adverts });
      });
      describe('When getAdverts reject error', () => {
        it('should dispatch a a FETCH_ADVERTS_REQUEST and a FETCH_ADVERTS_FAILURE action', async () => {
          await fetchAdverts()(dispatch, getState, { services: { getAdverts } });
          expect(dispatch).toHaveBeenNthCalledWith(1, {type: FETCH_ADVERTS_REQUEST});
          expect(dispatch).toHaveBeenNthCalledWith(2, {type: FETCH_ADVERTS_FAILURE, error: 'Error fetching adverts' });
        });
      });
    });
  });
});