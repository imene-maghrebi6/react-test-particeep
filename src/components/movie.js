import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        minWidth: 400,
      },
      
    title: {
        fontWeight: 'bold',
    },  
    category:{
        marginRight:'10px'
    }, 
    container:{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px'
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
});

const MovieCard = ({movieDetails, deleteFilm, callback }) => {
  const classes = useStyles();
  const {category, dislikes, id, likes, title, image} = movieDetails

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const handleLike = (movieId) => {
    let tempDislikes = dislikes
    let tempLikes = likes
    if(disliked){
      setDisliked(false);
      tempDislikes --
    }
    if(liked){
      setLiked(false);
      tempLikes --
    }else {
      setLiked(true)
      tempLikes ++
    }
    callback(movieId, tempLikes, tempDislikes)
  }

  const handleDislike = (movieId) => {
    let tempDislikes = dislikes
    let tempLikes = likes
    if(liked){
      setLiked(false)
      tempLikes --
    }
    if(disliked){
      setDisliked(false);
      tempDislikes --
    } else{
      setDisliked(true)
      tempDislikes ++
    }
    callback(movieId, tempLikes, tempDislikes)

  }

  return (
    <Card className={classes.root}>
      <div className= {classes.container}>  
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
              {title}
        </Typography>
        <Typography gutterBottom variant="h6" component="h5">
                {category}
        </Typography>
      </div>
      <CardMedia
        className={classes.media}
        image={image}
        title="Paella dish"
      />
        <div className= {classes.container}>  
          <div>
            <IconButton aria-label="like" color={liked ? 'primary': 'default' } className={classes.margin} onClick={() => handleLike(id)}>
              <ThumbUpIcon />
            </IconButton>
            <span>{likes}</span>
            <IconButton aria-label="dislike"color={disliked ? 'primary': 'default' }  className={classes.margin} onClick={() => handleDislike(id)}>
              <ThumbDownIcon />
            </IconButton>
            <span>{dislikes}</span>
          </div>
          <IconButton aria-label="delete" className={classes.margin} onClick={()=>deleteFilm(id)}>
            <DeleteIcon />
          </IconButton>
        </div>
    </Card>
  );
}

export default MovieCard