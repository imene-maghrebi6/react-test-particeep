import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TablePagination from '@material-ui/core/TablePagination';
import {MovieCard, CategoriesSelect} from '../components'
import {
  getMovies, 
  updateMovies, 
  likeDislikeMovie
} from '../actions/movies'

const useStyles = makeStyles(() => ({
 
  root: {
    flexGrow: 1,
    paddingTop: 60,
    maxWidth: '100vw',
  },
  select: {
    paddingTop: 60,
    display:"flex",
    justifyContent:"center"
  },
}));

const Movies = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { movies } = useSelector((state) => state.moviesReducer);

    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4); 
    
    useEffect(() => {
      dispatch(getMovies());
      setFilteredMovies(movies)
    }, []);

    useEffect(() => {
      const filteredCategories = []
      movies.map(movie => { 
        if(filteredCategories.includes(movie.category) === false) {
          filteredCategories.push(movie.category)
        }
      })
      setCategories(filteredCategories);
      selectedCategories.length === 0 ? setFilteredMovies(movies) :filterMoviesByCategories()
      if(movies.length > 0 && page!==0 && movies.length < rowsPerPage*(page)+1){
        setPage(page-1)
      }
    }, [movies, page]);

    useEffect(() => {
      selectedCategories.length === 0 ? setFilteredMovies(movies) :filterMoviesByCategories()
    }, [selectedCategories]);

    useEffect(() => {
      const remainingSelectedCategories = selectedCategories.filter(selectedCategorie =>(
           categories.includes(selectedCategorie)
      ))
      setSelectedCategories(remainingSelectedCategories)
    }, [categories])

    const deleteFilm = (id) => {
      const remainingMovies = movies.filter(film => film.id !== id);
      dispatch(updateMovies(remainingMovies));
    }

    const filterMoviesByCategories = () => {
      const TempMovies = []
      selectedCategories.map(category =>(
        movies.map(movie =>{
          if(movie.category === category){
            TempMovies.push(movie)
          }
        }))
      )
      setFilteredMovies(TempMovies)
    }

    const handleCategoryChange = (event) => { 
      setSelectedCategories(event.target.value)
      setPage(0)
    }

    const handleLikeDislike = (id, likes, dislikes) => {
      const toggledMovies = movies.map(movie => { 
        if(movie.id === id){
          movie.likes = likes
          movie.dislikes = dislikes
        }
        return movie
      })
      dispatch(likeDislikeMovie(toggledMovies))
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);      
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 12));
      setPage(0);
    };

  return (
    <div page={classes.page}>
      <div className={classes.select}>
        <CategoriesSelect 
          handleCategoryChange={handleCategoryChange} 
          selectedCategories={selectedCategories} 
          categories={categories}
        />
      </div>
      <Grid container justify="center" spacing={10} className={classes.root}>
        {filteredMovies.slice(rowsPerPage*page,rowsPerPage*(page+1)).map((value) => (
          <Grid key={value} item>
            <MovieCard 
              movieDetails={value} 
              deleteFilm={deleteFilm}
              callback={handleLikeDislike}/>
          </Grid>
        ))}
      </Grid>
      <TablePagination
        count={filteredMovies.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[4, 8, 12]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default Movies