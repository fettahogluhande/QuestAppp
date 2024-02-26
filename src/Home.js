import React from "react";
import Post from './Post';
import {useState,useEffect} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import PostForm from './PostForm';

function Home(){
    const [error,setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList,setPostList] = useState([]);

    const refreshPost = () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    useEffect(() =>{
        refreshPost();
    },[postList])

    if(error) {
        return <div>Error!</div>;
    }else if(!isLoaded){
        return <div>Loading...</div>;
    }else{
        return(
            <div className="container">
                <React.Fragment>
                    <CssBaseline />
                    <div>
                        <Box style={{ backgroundColor: '#f0f5ff' }}>
                            <PostForm userId={1} userName = {"ddd"} refreshPost = {refreshPost}/>
                            {postList.map(post => (
                                <Post likes = {post.postLikes} postId={post.id} userId={post.userId} userName = {post.userName} title={post.title} text={post.text}></Post>
                            ))}
                        </Box>
                    </div>
                </React.Fragment>

            </div>
        );
    }
}
export default Home;



