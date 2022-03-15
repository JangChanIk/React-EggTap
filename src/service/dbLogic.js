import axios from "axios";



export const memberEmailvrUpdate = (user) => {
  const response = axios({
    method: 'get',
    url: process.env.REACT_APP_SPRING_IP+'member/memberUpdate.egg',
    params: {
      mem_uid: user.uid,
      mem_emailVerified: user.emailVerified
    }
  });

  return response;
}; 



export const memberListDB = (uid, type) => {
  return new Promise((resolve) => {
    const response = axios({
      method: 'get',
      url: process.env.REACT_APP_SPRING_IP+'member/memberList.egg',
      params: {
        mem_uid: uid,
        type: type,
      }
    });
    console.log(response);
    resolve(response);
  })
}