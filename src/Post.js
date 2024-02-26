import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Comment from './Comment';
import CommentForm from './CommentForm';



export default function RecipeReviewCard({ title, text, userName, userId, postId}) {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike = () => {
    setLiked(!liked);
  }

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshComments();
  }, [commentList])

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    marginLeft: '10px'
  };

  return (
    <Card sx={{ maxWidth: 800, margin: '0 auto', marginBottom: 6, textAlign: "left" }}>
    <CardHeader
              avatar={
                <Link to={{ pathname: '/users/' + userId }} style={linkStyle}>
                  <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe" style={{ cursor: 'pointer' }}>
                    {userName && userName.charAt(0).toUpperCase()}
                  </Avatar>
                </Link>
              }
        title={title}
        />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <div>
          <IconButton
            onClick={handleLike}
            aria-label="add to favorites">
            <FavoriteIcon style={liked ? { color: "red" } : null} />
          </IconButton>
        </div>
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container>
          {error ? "error" :
            isLoaded ? commentList.map(comment => (
              <Comment userId={1} userName={"USER"} text={comment.text}></Comment>
            )) : "Loading"}
          <CommentForm userId={1} userName={"USER"} postId={postId}></CommentForm>
        </Container>
      </Collapse>
    </Card>

  );

}
