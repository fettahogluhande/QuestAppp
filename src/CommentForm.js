import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import { InputAdornment, OutlinedInput, Avatar, Button, Container } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link } from "react-router-dom";


function CommentForm(props) {
    const { userId, userName, postId } = props;
    const [text, setText] = useState("");

    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        marginLeft: '10px'
    };

    const saveComment = () => {
        fetch("/comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                    text: text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
    }
    const handleChange = (value) => {
        setText(value);
    }

    return (
        <Container>
            <CardContent>
            <OutlinedInput
                id='outlined-adornment-amount'
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position='start'>
                        <Link to={{ pathname: '/users/' + userId }} style={linkStyle}>
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe" style={{ cursor: 'pointer' }}>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position='end'>
                        <Button
                            variant='contained'
                            onClick={handleSubmit}>Comment</Button>
                    </InputAdornment>
                }
                value={text}></OutlinedInput>
                </CardContent>
        </Container>
    )
}
export default CommentForm;