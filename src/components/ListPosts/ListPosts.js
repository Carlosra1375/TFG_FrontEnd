import React, {useState, useEffect} from 'react'
import {Image} from "react-bootstrap";
import {map} from "lodash";
import moment from "moment";
import {getUserApi} from "../../api/user";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";

import {API_HOST} from "../../utils/constant";
import {replaceURLWithHTMLLinks} from "../../utils/functions";

import "./ListPosts.scss";
import ReactPlayer from 'react-player';

export default function ListPosts(props) {
  const {posts} = props;
  
    return (
    <div className='list-posts'>
        {map(posts, (post, index) => (
            <Post key={index} post={post}/>
        ))}
    </div>
  )
}


function Post(props){
    const {post} = props;
    const [userInfo, setUserInfo] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [mediaUrl, setMediaUrl] = useState(null);
    let video = true;
    useEffect(() =>{
      getUserApi(post.usuarioid).then(response =>{
        setUserInfo(response);
        setAvatarUrl(
          response?.avatar ? `${API_HOST}/obtenerAvatar?id=${response.id}` : AvatarNotFound
        );
        
        setMediaUrl(
          post?.media ? `${API_HOST}/obtenerMedia?id=${post.media.split(".")[0]}` : null
        );
      });
    },[post]);

    return(
      <div className='post'>
        <Image className='avatar' src={avatarUrl}></Image>
        <div>
          <div className='name'>
            {userInfo?.nombre} {userInfo?.apellidos}
            <span>{moment(post.fecha).calendar()}</span>
          </div>
          
          <div dangerouslySetInnerHTML={{__html:replaceURLWithHTMLLinks(post.mensaje)}}/>
          {mediaUrl && ((post.media.split(".")[1]!="mp4") ?
          (<Image className='media' src={mediaUrl}/>
          ):(
            <ReactPlayer className="media" url={mediaUrl} controls></ReactPlayer>
          ))
          }
        </div>
      </div>
    );
}