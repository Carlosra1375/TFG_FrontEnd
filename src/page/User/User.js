import React, {useState, useEffect} from 'react'
import {Button, Spinner} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import {toast} from "react-toastify";
import useAuth from "../../hooks/useAuth";
import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from '../../components/User/BannerAvatar';
import InfoUser from '../../components/User/InfoUser';
import ListPosts from '../../components/ListPosts';
import {getUserApi} from "../../api/user";
import {getUserPostsApi} from "../../api/Post";

import "./User.scss";
import { dom } from '@fortawesome/fontawesome-svg-core';

function User(props) {
    const {match, setRefreshCheckLogin} = props;
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(false);
    const [page, setPage] = useState(1);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const {params} = match;
    const loggedUser = useAuth();

    useEffect(() => {
        getUserApi(params.id)
          .then((response) => {
            if (!response) toast.error("El usuario que has visitado no existe");
            setUser(response);
          })
          .catch(() => {
            toast.error("El usuario que has visitado no existe");
          });
      }, [params]);

    useEffect(() =>{
      getUserPostsApi(params.id,1)
      .then(response =>{
        setPosts(response);
      })
      .catch(() =>{
        setPosts([]);
      })
    }, [params]);

    const moreData = () =>{
      const pageTemp = page+1;
      setLoadingPosts(true);

      getUserPostsApi(params.id, pageTemp).then((response) =>{
        if(!response){
          setLoadingPosts(0);
        }else{
          setPosts([...posts, ...response]);
          setPage(pageTemp);
          setLoadingPosts(false);
        }
      })
    }

    return (
        <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className='user__title'>
                <h2>{user ? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"}</h2>
            </div>
            <BannerAvatar user={user} loggedUser={loggedUser}/>
            <InfoUser user={user}/>
            <div className='user__posts'>
              <h3>Publicaciones</h3>
                {posts && <ListPosts posts={posts}/>}
                <Button onClick={moreData}>
                  {!loadingPosts ? (
                    (loadingPosts!==0) && 'Ver más'
                  ):(
                  <Spinner as="span" 
                  animation="grow" 
                  size="sm"  
                  role="status"
                  arian-hidden="true"/>
                  )}
                </Button>
            </div>
        </BasicLayout>
    );
}

export default withRouter(User);