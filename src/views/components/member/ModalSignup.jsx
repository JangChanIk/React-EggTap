import React from 'react';
import { Modal,  Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const ModalSignup = ({authLogic, show}) => {


  const navigate = useNavigate();


  return (
    <Modal
      show={show}
      backdrop='static'
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          구글 계정 회원가입 안내
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>회원님의 구글 계정을 아직 사용할 수 없습니다.</h5>
        <p>
          회원가입을 진행해주세요.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{ navigate('/member/signup'); }} variant="secondary">회원가입</Button>
        <Button onClick={()=>{ authLogic.logout(); navigate('/'); window.location.reload(); }} variant="secondary">로그아웃</Button>
      </Modal.Footer>
    </Modal>
  );

}


export default ModalSignup;