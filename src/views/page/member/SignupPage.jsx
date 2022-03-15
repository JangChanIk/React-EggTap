import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkPassword, validateBirthdate, validateEmail, validateHp, validateName, validateNickname, validatePassword } from '../../../service/validateLogic';
import { SignupForm, MyH1, MyInput, MyLabel,  MyLabelAb, SubmitButton, MyButton, PwEye} from '../../styles/FromStyle';
//import pwdEncrypt from '../../../service/pwdEncrypt';


const SignupPage = ({authLogic}) => {

  const navigate = useNavigate();

  const[submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: '#decdff',
    hover: false
  });

  const [memInfo, setMemInfo] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    birthday: "",
    hp: "",
    nickname: ""
  });

  const [comment, setComment] = useState({
    email: "이메일은 필수사항입니다.",
    password: "비밀번호는 필수사항입니다.",
    password2: "비밀번호 확인은 필수사항입니다.",
    name: "이름은 필수사항입니다.",
    birthday: "",
    hp: "",
    nickname: "닉네임은 필수사항입니다."
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


  const [googleEmail, setGoogleEmail] = useState('');


  useEffect(()=> {
    const comm = "해당 닉네임은 사용할 수 있습니다.";
    if(comment.email===""&&comment.password===""&&comment.password2===""&&
    comment.name===""&&comment.birthday===""&&comment.hp===""&&comment.nickname===comm){ 
      setSubmitBtn({disabled:false, bgColor: '#7e44eb'});
    } else {
      setSubmitBtn({disabled:true, bgColor: '#decdff'});
    }
  },[comment]);


  useEffect(()=> {
    const onAuth = async() => {
      const user = await authLogic.onAuthChange();
      if(user){
        setGoogleEmail(user.email);
        setComment({
          email: "",
          password: "비밀번호는 필수사항입니다.",
          password2: "비밀번호 확인은 필수사항입니다.",
          name: "이름은 필수사항입니다.",
          birthday: "",
          hp: "",
          nickname: "닉네임은 필수사항입니다."
        });
        setMemInfo({
          email: user.email,
          password: "",
          password2: "",
          name: "",
          birthday: "",
          hp: "",
          nickname: ""
        });
      }
    };
    onAuth();
  },[setGoogleEmail,setComment,setMemInfo]);


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
  }

  const changeMemInfo = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setMemInfo({...memInfo, [id]: value});
  }

  const doubleCheckNickname = async() => {
    try {

      if(comment.nickname!=="중복확인을 해주세요."){
        return
      }

      const response = await axios({
        method: 'get',
        url: process.env.REACT_APP_SPRING_IP+'/member/memberList',
        params: {
          mem_nickname: memInfo.nickname
        }
      });
      if(response.data===1){
        setComment({...comment, nickname:"해당 닉네임은 사용할 수 없습니다."});
      } else {
        setComment({...comment, nickname:"해당 닉네임은 사용할 수 있습니다."});        
      }
    } catch (error) {
      console.error(error);
    }
    
  } 

  const signup = async() => {

    try {

      let response = await axios({
        method: 'get',
        url: process.env.REACT_APP_SPRING_IP+'/member/memberList',
        params: {
          mem_email: memInfo.email
        }
      });

      if(response.data===1){
        return alert("해당 이메일은 이미 회원가입 되어있습니다.");
      } else if(response.data!==0) {    
        return alert("DB 오류: 관리자에게 연락바랍니다.");
      } 

      let uid;

      if(googleEmail){
        uid = await authLogic.linkEmail(memInfo);
      } else {
        uid = await authLogic.signupEmail(memInfo);
      }

      console.log(uid);
      //const pwd = pwdEncrypt(memInfo.password);
      const b = memInfo.birthday;
      let birthday = ""; 
      if(b!==""){
        birthday = b.slice(0,4) + '/' + b.slice(4, 6) + '/' + b.slice(6,8);
      }

        response = await axios({
        method: 'post',
        url: process.env.REACT_APP_SPRING_IP+'member/memberInsert',
        params: {
          mem_uid: uid,
          mem_name: memInfo.name,
          mem_email: memInfo.email,
          mem_birthday: birthday,
          mem_hp: memInfo.hp,
          mem_nickname: memInfo.nickname,
        }
      });

      if(response.data!==1) {
        return alert("DB 오류: 관리자에게 연락바랍니다.");
      }

      navigate('/MyWeb');
      
    } catch (error) {
      alert(error+" 오류: 관리자에게 연락바랍니다.");
    }

    
  }

  const toggleHover = () => {
    if(submitBtn.hover){
      setSubmitBtn({...submitBtn, hover: false, bgColor: '#7e44eb'});
    } else {
      setSubmitBtn({...submitBtn, hover: true, bgColor: '#632dc7'});
    }
  }


  return (
    <div style={{paddingTop:"200px"}}>
      <SignupForm>
        <MyH1>회원가입</MyH1>
        <div style={{display: 'flex'}}>
          <div style={{padding: '30px 30px 0px 30px'}}>
            { googleEmail
              ?
              <>
                <MyLabel> 이메일
                  <MyInput type="email" id="email" name="email" defaultValue={googleEmail} disabled={true} />
                </MyLabel>
              </>
              :
              <>
                <MyLabel> 이메일
                  <MyInput type="email" id="email" name="email" placeholder="이메일를 입력해주세요." 
                  onChange={(e)=>{changeMemInfo(e); setComment({...comment, email: validateEmail(e)});}}/>
                  <MyLabelAb>{comment.email}</MyLabelAb>
                </MyLabel>
              </>
            }
                <MyLabel> 비밀번호
                  <MyInput type={passwordType[0].type} id="password" name="password" placeholder="비밀번호를 입력해주세요." 
                  onKeyUp={(e)=>{setComment({...comment, password2: checkPassword(e.target.value,memInfo.password2)});}} 
                  onChange={(e)=>{changeMemInfo(e); setComment({...comment, password: validatePassword(e)});}}/>
                  <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[0].visible?"gray":"lightgray"}`}}>
                    <PwEye className="fa fa-eye fa-lg"></PwEye>
                  </div>
                  <MyLabelAb>{comment.password}</MyLabelAb>
                </MyLabel>
                <MyLabel> 비밀번호 확인
                  <MyInput type={passwordType[1].type} id="password2" name="password2" placeholder="비밀번호를 한번 더 입력해주세요."
                  onChange={(e)=>{changeMemInfo(e); setComment({...comment, password2: checkPassword(memInfo.password,e.target.value)});}}/>
                  <div id="password2" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[1].visible?"gray":"lightgray"}`}}>
                    <PwEye className="fa fa-eye fa-lg"></PwEye>
                  </div>
                  <MyLabelAb>{comment.password2}</MyLabelAb>
                </MyLabel> 
          </div>

          <div style={{padding: '30px 30px 0px 30px'}}>
            <MyLabel> 이름
              <MyInput type="text" id="name" name="name" placeholder="이름을 입력해주세요." 
              onChange={(e)=>{changeMemInfo(e); setComment({...comment, name: validateName(e)});}}/>
              <MyLabelAb>{comment.name}</MyLabelAb>
            </MyLabel>

            <MyLabel> 생년월일
              <MyInput type="number" id="birthday" name="birthday" placeholder="생년월일을 입력해주세요." 
              onChange={(e)=>{changeMemInfo(e); setComment({...comment, birthday: validateBirthdate(e)});}}/>
              <MyLabelAb>{comment.birthday}</MyLabelAb>
            </MyLabel>

            <MyLabel> 전화번호
              <MyInput type="number" id="hp" name="hp" placeholder="전화번호를 입력해주세요." 
              onChange={(e)=>{changeMemInfo(e); setComment({...comment, hp: validateHp(e)});}} />
              <MyLabelAb>{comment.hp}</MyLabelAb>
            </MyLabel>
          </div>
        </div>

        <div style={{display: 'flex'}}>
          <MyLabel> 닉네임
            <MyInput type="text" id="nickname" name="nickname" placeholder="닉네임을 입력해주세요." 
            onChange={(e)=>{changeMemInfo(e); setComment({...comment, nickname: validateNickname(e)});}}/>
            <MyLabelAb>{comment.nickname}</MyLabelAb>
          </MyLabel>
          <MyButton type="button" onClick={()=>{doubleCheckNickname()}}>중복확인</MyButton>
        </div>
          <SubmitButton type="button"  disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor }}
          onClick={()=>{signup()}} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            가입하기
          </SubmitButton>
      </SignupForm>
    </div>
  );
};

export default SignupPage;