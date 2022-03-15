import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './views/page/member/LoginPage';
import MainPage from './views/page/MainPage';
import SignupPage from './views/page/member/SignupPage';
import Footer from './views/components/Footer';
import Header from './views/components/Header';
import styled from 'styled-components';
import GamePage from './views/page/GamePage';
import ModalEmailVerified from './views/components/member/ModalEmailVerified';

import { memberListDB } from './service/dbLogic';
import { useDispatch, useSelector } from 'react-redux';
import { setAll, setEmailVerified } from './redux/userInfo/action';
import MyInfoPage from './views/page/member/MyInfoPage';
import ModalSignup from './views/components/member/ModalSignup';


const PageContainer = styled.div`
  position: relative;
  min-height: 100%;
  min-width: 100%;
  `;

const MyDiv = styled.div`
  min-height: 100%;
  min-width: 100%;
  padding-bottom: 164px;
  
`;



const WebApp = ({authLogic}) => {


  const pathname = useLocation().pathname;

  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();

  const [ModalSignShow,setModalSignShow] = useState(false); 

  useEffect(() => {
    console.log(pathname);

    const asyncDB = async(type) => {
      const user = await authLogic.onAuthChange();
      let member;
      console.log(user);
      setModalSignShow(false);

      if(user){
        dispatch(setEmailVerified(user.emailVerified, user.uid));
        const response = await memberListDB(user.uid, type);
        if(response.data[0]){
          member = response.data[0];
        } else {
          if(pathname!=='/member/signup') {
            setModalSignShow(true);
          }
        }
      }

      return member;
    };

    asyncDB("json")
    .then( (user) => 
      { 
        console.log(user);
        if(user){
          dispatch(setAll(user));
        }
      });
    
  }, [pathname,authLogic,dispatch,setModalSignShow]);
  

  return (
    <div style={{height: "100vh", minWidth: "100vh"}}>
        <Header authLogic={authLogic} />
        <div id="map"></div>
        <PageContainer>
            <MyDiv >
              <Routes>
                {/* localhost:3000 */}
                <Route path="/" exact={true} element={<MainPage authLogic={authLogic}/>} />
                <Route path="/game" exact={true} element={<GamePage authLogic={authLogic}/>} />
                { userInfo.name
                  ?
                    <>
                      <Route path="/member/myInfo" exact={true} element={<MyInfoPage authLogic={authLogic}/>} />
                    </>
                  :
                    <>
                      <Route path="/member/login" exact={true} element={<LoginPage authLogic={authLogic}/>} />
                      <Route path="/member/signup" exact={true} element={<SignupPage authLogic={authLogic}/>} />
                    </>
                }
              </Routes> 
            </MyDiv>
          <Footer />
          <ModalSignup show={ModalSignShow} authLogic={authLogic} />
          <ModalEmailVerified authLogic={authLogic} />
        </PageContainer>
    </div>
  );
};

export default WebApp;