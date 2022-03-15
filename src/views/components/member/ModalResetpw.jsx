import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { validateEmail } from '../../../service/validateLogic';
import { MyInput, MyLabel, MyLabelAb } from '../../styles/FromStyle';

const ModalResetpw = (props) => {

  const {authLogic, show ,onHide} = props;

  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("이메일를 입력해주세요.");

  const sendEmail = async() => { 
    if(!comment){
      console.log(email);
      await authLogic.sendResetpwEmail(email);
      window.location.reload();
    }
  };



  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          비밀번호 변경
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
          <MyLabel htmlFor="email"> 이메일
            <MyInput type="email" id="email" name="mem_email" placeholder="이메일를 입력해주세요."
              onChange={(e)=>{setEmail(e.target.value); setComment(validateEmail(e));}}/>
            <MyLabelAb>{comment}</MyLabelAb>
          </MyLabel>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" onClick={ ()=>{sendEmail();} } variant="secondary">보내기</Button>
        <Button onClick={onHide} variant="secondary">닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalResetpw;