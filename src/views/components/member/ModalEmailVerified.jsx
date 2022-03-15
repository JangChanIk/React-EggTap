import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDel } from '../../../redux/userInfo/action';

const ModalEmailVerified = ({authLogic}) => {


  const [show,setShow] = useState(false); 

  const userInfo = useSelector(state => state.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(()=> {
    if(userInfo.uid){
      if(userInfo.emailVerified){
        setShow(false); 
      } else {
        setShow(true);
      }
    } else {
      setShow(false); 
    }
  },[userInfo]);


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
            이메일 인증 안내
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>회원님의 이메일을 아직 사용할 수 없습니다.</h4>
          <p>
            해당 이메일함에서 인증 메일을 확인해주세요.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{ authLogic.sendEmail(authLogic.auth.currentUser); }} variant="secondary">이메일 재전송</Button>
          <Button onClick={()=>{ window.location.reload(); }} variant="secondary">완료</Button>
          <Button onClick={()=>{ dispatch(setDel()); authLogic.logout(); navigate('/'); window.location.reload();}} variant="secondary">로그아웃</Button>
        </Modal.Footer>
      </Modal>
    );

}


export default ModalEmailVerified;