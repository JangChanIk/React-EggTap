import React,{useEffect, useState} from 'react';

import { Link, useNavigate } from 'react-router-dom';
import ModalResetpw from '../../components/member/ModalResetpw';
import { DividerDiv, GoogleButton, LoginForm, MyH1, DividerHr, 
  MyInput, MyLabel, MyP, DividerSpan, SubmitButton, PwEye} from '../../styles/FromStyle';





const LoginPage = ({authLogic}) => {


  
  const navigate = useNavigate();

  const[submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: '#decdff',
    hover: false
  });


  const [tempUser, setTempUser] = useState({
    email: '',
    password: ''
  });


  const [passwordType, setPasswordType] = useState([
    {
      type:'password',
      visible:false
    },
    {
      type:'password',
      visible:false
    }
  ]);

  const [modalShow, setModalShow] = useState(false);

  useEffect(()=> {
    if(tempUser.email!==""&&tempUser.password!==""){ 
      setSubmitBtn({disabled:false, bgColor: '#7e44eb'});
    } else {
      setSubmitBtn({disabled:true, bgColor: '#decdff'});
    }
  },[tempUser]);


  const changeUser = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setTempUser({...tempUser, [id]: value});
  };


  const passwordView = (e) => {
    const id = e.currentTarget.id;
    if(id==="password") {
      if(!passwordType[0].visible) {
        setPasswordType([{type: 'text', visible: true},passwordType[1]]);
      } else {
        setPasswordType([{type: 'password', visible: false},passwordType[1]]);
      }
    } else if(id==="password2") {
      if(!passwordType[1].visible) {
        setPasswordType([passwordType[0],{type: 'text', visible: true}]);
      } else {
        setPasswordType([passwordType[0],{type: 'password', visible: false}]);
      }
    }
  };


  const toggleHover = () => {
    if(submitBtn.hover){
      setSubmitBtn({...submitBtn, hover: false, bgColor: '#7e44eb'});
    } else {
      setSubmitBtn({...submitBtn, hover: true, bgColor: '#632dc7'});
    }
  }


  const loginEmail = async() => {
    const result = await authLogic.loginEmail(tempUser);
    console.log(result);
    navigate('/');
  }

  const loginGoogle = async() => {
    const result = await authLogic.loginGoogle();
    console.log(result);
    navigate('/');
  }

  return (
    <>
      <div style={{paddingTop: '200px'}}>
        <LoginForm>
          <MyH1>로그인</MyH1>
          <MyLabel htmlFor="email"> 이메일     
            <MyInput type="email" id="email" name="mem_email" placeholder="이메일를 입력해주세요." 
              onChange={(e)=>changeUser(e)}/>   
          </MyLabel>
          <MyLabel htmlFor="password"> 비밀번호
            <MyInput type={passwordType[0].type} id="password" name="mem_password" placeholder="비밀번호를 입력해주세요."
              onChange={(e)=>changeUser(e)}/>
            <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[0].visible?"gray":"lightgray"}`}}>
              <PwEye className="fa fa-eye fa-lg"></PwEye>
            </div>
          </MyLabel>
          <SubmitButton type="button"  disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor}}  
            onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={()=>{loginEmail()}}>
            로그인
          </SubmitButton>
          <DividerDiv>
            <DividerHr />
            <DividerSpan>또는</DividerSpan>
          </DividerDiv>
          <GoogleButton type="button" onClick={()=>{loginGoogle();}}>
            <i className= "fab fa-google-plus-g" style={{color: "red", fontSize: "18px"}}></i>&nbsp;&nbsp;Google 로그인
          </GoogleButton>
          <GoogleButton type="button" onClick={()=>{alert("서비스준비중");}}>
            <i className= "fas fa-user" style={{color: "red"}}></i>&nbsp;&nbsp;Guest 로그인
          </GoogleButton>
          <MyP>신규 사용자이신가요?&nbsp;<Link to="/member/signup" className="text-decoration-none" style={{color: "blue"}}>계정 만들기</Link></MyP>
          <MyP>비밀번호를 잊으셨나요?&nbsp; 
            <span onClick={()=>{setModalShow(true)}} className="text-decoration-none" style={{cursor:"pointer", color: "blue"}}>
              비밀번호 변경
            </span>
          </MyP>
        </LoginForm>
      </div>
      <ModalResetpw show={modalShow} onHide={() => setModalShow(false)} authLogic={authLogic} />
    </>
    
  );
};

export default LoginPage;