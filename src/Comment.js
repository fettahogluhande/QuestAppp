import React from 'react';
import CardContent from '@mui/material/CardContent';
import { InputAdornment, OutlinedInput, Avatar } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link } from "react-router-dom";


function Comment(props) {
    const { text, userId, userName } = props;

    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        marginLeft: '10px'
    };

    return (
        <CardContent>
            <OutlinedInput
                disabled
                id='outlined-adornment-amount'
                multiline
                inputProps={{ maxLength: 25 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position='start'>
                        <Link to={{ pathname: '/users/' + userId }} style={linkStyle}>
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe" style={{ cursor: 'pointer' }}>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }>

            </OutlinedInput>
        </CardContent>
    )
}
export default Comment;