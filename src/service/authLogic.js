import { getAuth, signInWithPopup , GoogleAuthProvider, createUserWithEmailAndPassword, 
  sendEmailVerification, signInWithEmailAndPassword, EmailAuthProvider, linkWithCredential, sendPasswordResetEmail } from 'firebase/auth';


class AuthLogic {

  
  constructor() {
    this.auth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
  }

  onAuthChange = () => {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        resolve(user); 
      });
    }); 
  }

  logout = () => {
    console.log(this.auth.currentUser);
    this.auth.signOut()
    .catch(e => alert(e+": 로그아웃 오류입니다.")); 
  }

  loginGoogle = () => {
    return new Promise((resolve) => {
      signInWithPopup(this.auth, this.googleProvider).then(
        (result) => {
          const user = result.user;
          console.log(user);
          resolve(user);
        }).catch(e => alert(e+": 로그인 오류입니다."));
    });  
  }


  loginEmail = (user) => {
    return new Promise((resolve) => {
      signInWithEmailAndPassword(this.auth, user.email, user.password).then(
        (userCredential) => {
          console.log(userCredential);
          resolve(userCredential);
        }).catch(e => alert(e+": 로그인 오류입니다."));
    });  
  }


  signupEmail = (user) => {
    return new Promise((resolve) => {
      createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then((userCredential) => {
        resolve(userCredential.user.uid);
        this.sendEmail(userCredential.user);
      }).catch(e => alert(e+": 회원가입 오류입니다."));
    });
  }  
  
  linkEmail = (user) => {
    return new Promise((resolve) => {
      const credential = EmailAuthProvider.credential(user.email, user.password);
      linkWithCredential(this.auth.currentUser, credential)
        .then((usercred) => {
          const user = usercred.user;
          console.log("Account linking success", user.uid);
          resolve(user.uid);
        }).catch(e => alert(e+": 구글회원가입 오류입니다."));
    });
  }

  sendEmail = (user) => {
    sendEmailVerification(user).then(() => {
      alert("해당 이메일에서 인증메세지를 확인 후 다시 로그인 해주세요.");
    }).catch(e => alert(e+": 인증메일 오류입니다.")); 
  }

  sendResetpwEmail = (email) => {
    return new Promise((resolve) => {
    sendPasswordResetEmail(this.auth, email)
        .then(() => {
          alert("비밀번호 변경 이메일을 보냈습니다.")
          resolve();
      }).catch(e => alert(e+": 비밀번호 변경 오류입니다."));
    });  
  }








}

export default AuthLogic;