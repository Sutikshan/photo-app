import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './imageModal.styles.scss';

interface IOnCloseModal {
  (): void;
}

interface IImageModalProps {
  title: string;
  imageUrl: string;
  isOpen: boolean;
  onCloseModal: IOnCloseModal;
}

const ImageModal: React.FunctionComponent<IImageModalProps> = ({
  imageUrl,
  isOpen,
  onCloseModal,
  title,
}) => (
  <Modal show={isOpen} onHide={onCloseModal} aria-labelledby="image zoom">
    <Modal.Header closeButton>
      <Modal.Title id="title">Image Zoom</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <img src={imageUrl} alt={title} />
    </Modal.Body>
  </Modal>
);

export default ImageModal;
