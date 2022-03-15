import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setDel } from '../../redux/userInfo/action';


const navbarStyle = {
  position: 'absolute',
  top: '0', 
  width: '100%', 
  minWidth: '100vh',
  zIndex:'99',
  padding: '10px 20px 10px 20px'
};


const LogoutButton = styled.button`
  border-radius: 10px;
  border: none;
  background-color: rgb(54, 59, 65);
  color: white;
  padding: 7px;
  &:hover { background-color: rgb(93, 101, 112)}
`;


const Header = ({authLogic}) => {

  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={{width: '100%'}}>
      <Navbar style={navbarStyle} bg="dark" variant="dark" >
        <Container fluid style={{color: 'white'}}>
          <LinkContainer to="/">
            <Navbar.Brand>EggTap</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/game">
                <Link className="nav-link" to="/game" >게임</Link>
              </LinkContainer>
              <NavDropdown title="게시판" id="collasible-nav-dropdown" >
                <LinkContainer to="/" /* to="/MyWeb/board/list?id=notice" */>
                  <NavDropdown.Item >공지</NavDropdown.Item>
                </LinkContainer>  
                <LinkContainer to="/" /* to="/MyWeb/board/list?id=free" */>
                  <NavDropdown.Item>자유게시판</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/" /* to="/MyWeb/board/list?id=write" */>
                  <NavDropdown.Item>글작성</NavDropdown.Item>
                </LinkContainer>  
              </NavDropdown>
            </Nav>
            <Nav>
              { userInfo.uid 
                ? 
                <>
                  { 
                    userInfo.name ?
                      <LinkContainer to="/member/myInfo">
                        <Link className="nav-link" to="/member/myInfo">{userInfo.nickname}님</Link>
                      </LinkContainer>
                      : <></>
                  }
                    <LogoutButton 
                      onClick={()=> {dispatch(setDel()); authLogic.logout(); navigate('/'); window.location.reload();}}>
                      로그아웃
                    </LogoutButton>
                  </>
                :
                  <LinkContainer to="/member/login">
                    <Link className="nav-link" to="/member/login">로그인</Link>
                  </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};



export default Header;