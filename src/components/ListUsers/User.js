import React, {useState, useEffect} from 'react'
import {Media, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {API_HOST} from "../../utils/constant"; 
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import {getUserApi} from "../../api/user";

export default function User(props) {
    const {user} = props;
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
      getUserApi(user.id).then(response =>{
        setUserInfo(response);
      });
    
    }, [user]);
    

  return (
    <div  className="list-users__user">
        <Link to={`/${user.id}`}>
        <Image width={64} height={64} roundedCircle className='mr-3' 
        src ={
            userInfo?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}`
            : AvatarNotFound
        }
        alt={`${user.nombre} ${user.apellidos}`}
        />
        <nav>
            <h5>{user.nombre} {user.apellidos}</h5>
        </nav>
        <p>{userInfo?.biografia}</p>
        </Link>
    </div>
  )
}
