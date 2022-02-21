import React from 'react'
import {map, isEmpty} from "lodash";
import User from "./User";

import "./ListUsers.scss";

export default function ListUsers(props) {
    const {users} = props;

    if(isEmpty(users)){
        return <h2>No se han encontrado resultados</h2>
    }

  return (
    <ul className='list-users'>
        {map(users, (user) =>(
            <User key={user.id} user={user}/>
        ))}
    </ul>
  )
}
