import {movies$} from '../assets/movies'
import { NotificationManager } from 'react-notifications';
import { 
    FETCH_MOVIES_SUCCESS, 
    UPDATE_MOVIES_SUCCESS, 
} from '../constants';

export const getMovies = () => async(dispatch) => {
    try {
        const movies = await movies$;
        dispatch({ type: FETCH_MOVIES_SUCCESS, payload: movies });
    } catch (error) {
    // dispatch({ type: FETCH_MOVIES_FAILURE, payload: error }); // if we had a backend  
      NotificationManager.error('an error occured')
    }
};

// if we were calling an endpoint to delete a movie we would just pass the id of the 
// movie that we want to delete

export const updateMovies = (movies) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_MOVIES_SUCCESS, payload: movies });
        NotificationManager.success('movie deleted successfully')

    } catch (error) {
    // dispatch({ type: UPDATE_MOVIES_FAILURE, payload: error }); // if we had a backend  
        NotificationManager.error('an error occured')
    }
}

// if we had a backend we would have two actions : 
// likeAction that calls an endpoint to like a movie and pass the movie id as a parameter
// dislikeAction that calls an endpoint to dislike a movie and pass the movie id as a parameter

export const likeDislikeMovie = (movies) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_MOVIES_SUCCESS, payload: movies });
    } catch (error) {
    // dispatch({ type: UPDATE_MOVIES_FAILURE, payload: error }); // if we had a backend  
        NotificationManager.error('an error occured')
    }
}