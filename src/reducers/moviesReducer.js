import { 
  FETCH_MOVIES_SUCCESS, 
  UPDATE_MOVIES_SUCCESS, 
  FETCH_MOVIES_FAILURE,
  UPDATE_MOVIES_FAILURE
} from '../constants';

const initialState = {
    movies:[],
    error:{},
};

export default (state = initialState , { type, payload }) => {
  switch (type) {
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: payload,
      };
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        error: payload,
      };  
    case UPDATE_MOVIES_SUCCESS:
      return {
        ...state,
        movies: payload,
      }; 
    case UPDATE_MOVIES_FAILURE:
      return {
        ...state,
        error: payload,
      };   

    default:
      return state;
  }
};