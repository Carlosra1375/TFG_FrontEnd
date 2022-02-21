import React, {useState, useEffect} from 'react';
import BasicLayout from '../../layout/BasicLayout';
import {getPostsFollowersApi} from "../../api/Post";
import ListPosts from '../../components/ListPosts';
import "./Home.scss";
import { Button, Spinner } from 'react-bootstrap';
import { forEach } from 'lodash';


// eslint-disable-next-line import/no-anonymous-default-export
export default function(props) {
    const {setRefreshCheckLogin} = props;
    const [posts, setPosts] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingPosts, setLoadingPosts] = useState(false);

    useEffect(() => {
        getPostsFollowersApi(page)
          .then((response) => {
            if (!posts && response) {
              setPosts(formatModel(response));
            } else {
              if (!response) {
                setLoadingPosts(0);
              } else {
                const data = formatModel(response);
                setPosts([...posts, ...data]);
                setLoadingPosts(false);
              }
            }
          })
          .catch(() => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [page]);
    
    const moreData = () =>{
        setLoadingPosts(true);
        setPage(page+1);
    }

    return (
        <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className='home__title'>
                <h2>Inicio</h2>
            </div>
            {posts && <ListPosts posts={posts}/>}

            <Button onClick={moreData} className="load-more">
                {!loadingPosts ? (
                    loadingPosts!==0  ? "Ver más" : "No hay más Posts."
                ):(
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                )}
            </Button>
        </BasicLayout>
    );
}


function formatModel(posts){
    const postsTemp = [];
    posts.forEach(post =>{
        postsTemp.push({
            _id: post._id,
            usuarioid: post.usuariorelacionid,
            mensaje: post.Post.mensaje,
            media: post.Post.media,
            fecha: post.Post.fecha
        })
    });
    return postsTemp;
}