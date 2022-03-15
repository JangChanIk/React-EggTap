import styled from 'styled-components';

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 360px;
  padding: 40px;
  border-radius: 10px;
  border: 1px solid grey;
`;

export const SignupForm = styled(LoginForm)`
  width :800px;
`;

  
export const MyH1 = styled.h1`
  font-size: 38px;
  margin-bottom:40px;
  font-weight: 20px;
  text-align: center;
`;
  
  /* 3번의 하위태그에 대한 설정 */
export const MyP = styled.p`
  font-size: 13px;
`; 
  

export const PwEye = styled.i`
    position: absolute;
    margin-left: 240px;
    margin-top: -25px;
    cursor: pointer;
    &:hover { 
      color: #808080;
    };
`;
  
export const MyLabel = styled.label`
  font-size: 14px;
  color: #414149;
  display: block;
  margin-bottom: 40px;
`; 

export const MyLabelAb = styled(MyLabel)`
  position:absolute;
  color: #85858b;
  font-size: 11px;
`;

export const MyInput = styled.input`
  width: 275px;
  display: block;
  height: 32px;
  border: none;
  border-bottom: 1px solid #dddddd;
  font-size: 15px;
  &:focus, &:hover {
    border-bottom: 2px solid #004fff;
    outline: none;
  } 
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
        -webkit-appearance: none;
  }
  &::placeholder {
    color: lightgray;
    font-size: 13px;
  }
`;
  

export const SubmitButton = styled.button`
  margin-top: 20px;
  width: 275px;
  height: 40px;
  font-size: 16px;
  border-radius: 24px;
  margin-bottom: 20px;
  border: 1px solid #7e44eb;
  color: white;
`;

export const GoogleButton = styled(SubmitButton)`
  margin-top: 0px;
  background-color: white;
  font-weight: bold;
  border: 1px solid #dddddd;
  color: black;
  &:hover { background-color: lightgray }
`; 

export const MyButton = styled.button`
  margin-top:10px;
  margin-bottom: 40px; 
  background-color: white; 
  color: black;
  border-radius: 15px;
  font-size: 14px;
  border: 1px solid lightgray;

  &:hover { background-color: lightgray }
`;
  
  /* submit버튼에 float를 주면 밀리는데 clear:both로 해결 */
export const DividerDiv = styled.div`
  position: relative;/* hr선이 화면 안으로 들어옴 */
  clear: both;
  text-align: center;/* 문자또는 문자열을 가운데 정렬 */
  width: 100%;
  margin-bottom: 20px;
`; 
  
export const DividerHr = styled.hr`
  position: absolute;/* hr선이 밀려나는데 부모인 divider에 relative를 줌 */
  width: 100%;
  height: 1px;
  border: none;
  background-color: #535353;
`;
  
export const DividerSpan = styled.span`
  position: relative;
  display: inline-block;
  margin-top: 5px;
  padding: 0 10px;
  color: #4b4b4b;
  background-color: white;
`;