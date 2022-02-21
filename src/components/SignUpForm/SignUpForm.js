import React ,{useState} from 'react'
import {Row, Col, Form, Button, Spinner} from "react-bootstrap";
import{values, size} from "lodash";
import {toast} from "react-toastify";
import {isEmailValid} from "../../utils/validations";
import {signUpApi} from "../../api/auth";
import "./SignUpForm.scss";


export default function SignUpForm(props) {
    const{setShowModal} = props;
    const[formData, setFormData] = useState(initialFormValue);
    const[signUpLoading, setSignUpLoading] = useState(false);

    const onSubmit = e =>{
        e.preventDefault();

        let validCount = 0;
        values(formData).some(value =>{
            value&&validCount++
            return null
        });
        console.log(size(formData));

        if(validCount !== size(formData)){
            toast.warning("Complete todos los campos del formulario")
        }else{
            if(!isEmailValid(formData.email)){
                toast.warning("Email inválido")
            }else if(formData.password !== formData.repeatPassword){
                toast.warning("Las contraseñas tienen que ser iguales")
            }else if(size(formData.password)<6){
                toast.warning("La contraseña tiene que tener al menos 6 caracteres")
            }else{
                setSignUpLoading(true);
               
                signUpApi(formData).then(response =>{
                    if(response.code){
                        toast.warning(response.message);
                    }else{
                        toast.success("Formulario completado con éxito");
                        setShowModal(false);
                        setFormData(initialFormValue());
                    }
                }).catch(() =>{
                    toast.error("Error del servidor, inténtelo más tarde");
                }).finally(() => {
                    setSignUpLoading(false);
                })
            }
        }

    };


    const onChange = e =>{//esto solo sirve pq son inputs
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="sign-up-form">
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Nombre" name="nombre" defaultValue={formData.nombre}/>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Apellidos" name="apellidos"  defaultValue={formData.apellidos}/>
                        </Col>
                    </Row>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Control type="email" placeholder="Correo electrónico" name="email"  defaultValue={formData.email}/>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="password" placeholder="Contraseña" name="password"  defaultValue={formData.password}/>
                        </Col>
                        <Col>
                            <Form.Control type="password" placeholder="Repita Contraseña" name="repeatPassword"  defaultValue={formData.repeatPassword}/>
                        </Col>
                    </Row>
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit"> 
                {!signUpLoading ? "Registrarse" : <Spinner animation="border"/>}
                </Button>
            </Form>
        </div>
    );
}


function initialFormValue(){
    return {
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        repeatPassword: ""
    };
}