import React, {useState, useCallback} from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import {Close} from "../../../utils/Icons";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { addPostApi, addPostApiMedia } from "../../../api/Post";
import classNames from "classnames";
import ImageNotFound from "../../../assets/png/ImageNotFound.png";

import "./PostModal.scss";

export default function PostModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");
  const [existMedia, setExistMedia] = useState(false);

  const maxLength = 280;

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(existMedia);

    if (message.length > 0 && message.length <= maxLength) {
        existMedia ? addPostApi(message) : addPostApiMedia(message, document.getElementById("media"))
        .then((response) => {
          console.log(response);
          if (response?.code >= 200 && response?.code < 300) {
            toast.success(response.message);
            setShow(false);
            window.location.reload();
          }
        })
        .catch(() => {
          toast.warning("Error al enviar el Post, inténtelo más tarde.");
        });
    }
  };
  return (
    <Modal className='post-modal' show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)} />
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea"
            rows="10"
            placeholder="¿Qué está pasando?"
            onChange={(e) => setMessage(e.target.value)}
          />
          <span
            className={classNames("count", {
              error: message.length > maxLength,
            })}
          >
            {maxLength-message.length}
          </span>
          <input type="file" id="media" className='media'></input>
          <Button
            type="submit"
            disabled={message.length > maxLength || message.length < 1}
          >
            Postear
          </Button>
        </Form>
        </Modal.Body>
    </Modal>
  )
}
