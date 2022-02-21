import React, { useState } from 'react';
import "./LeftMenu.scss";
import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faUser, faUsers, faPowerOff, faBook} from "@fortawesome/free-solid-svg-icons";
import PostModal from "../Modal/PostModal";
import {logoutApi} from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import LogoWhite from "../../assets/png/logo-white.png";


export default function LeftMenu(props) {
    const {setRefreshCheckLogin} = props;
    const [showModal, setShowModal] = useState(false);
    const user = useAuth();
    const logout = () =>{
        logoutApi();
        setRefreshCheckLogin(true);
    }

    return (
        <div className="left-menu">
            <img className="logo" src={LogoWhite} alt="redsocial"/>
            <Link to="/"><FontAwesomeIcon icon={faHome}/>Inicio</Link>
            <Link to="/users"><FontAwesomeIcon icon={faUsers}/>Usuarios</Link>
            <Link to="/paginas"><FontAwesomeIcon icon={faBook} />Páginas</Link>
            <Link to={`/${user?._id}`}><FontAwesomeIcon icon={faUser}/>Perfil</Link>
            <Link to="" onClick={logout}><FontAwesomeIcon icon={faPowerOff}/>Cerrar sesión</Link>

            <Button onClick={() => setShowModal(true)}>Subir post</Button>
            <PostModal show={showModal} setShow={setShowModal}/>
        </div>
    )
}
