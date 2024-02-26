import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Link } from "react-router-dom";
import { Button, InputAdornment, OutlinedInput } from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


export default function RecipeReviewCard({ userName, userId, refreshPost }) {
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [isSent, setIsSent] = React.useState(false);


  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    marginLeft: '10px'
  };

  const savePost = () => {
    fetch("/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          userId: userId,
          text: text,
        }),
      })
      .then((res) => res.json())
      .catch((err) => console.log("error"))
  }

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPost();
  }

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  }

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  }


  return (

    <Card sx={{ maxWidth: 800, margin: '0 auto', marginBottom: 6, textAlign: "left" }}>
      <CardHeader
        avatar={
          <Link to={{ pathname: '/users/' + userId }} style={linkStyle}>
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe" style={{ cursor: 'pointer' }}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={<OutlinedInput
          id='outlined-adornment-amount'
          multiline
          placeholder='title'
          inputProps={{ maxLength: 25 }}
          fullWidth
          value={title}
          onChange={(i) => handleTitle(i.target.value)}
        >
        </OutlinedInput>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {<OutlinedInput
            id='outlined-adornment-amount'
            multiline
            placeholder='text'
            inputProps={{ maxLength: 250 }}
            fullWidth
            value={text}
            onChange={(i) => handleText(i.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <Button
                  variant='contained'
                  onClick={handleSubmit}>Post</Button>
              </InputAdornment>
            }
          >
          </OutlinedInput>}
        </Typography>
      </CardContent>

    </Card>
  );

}
