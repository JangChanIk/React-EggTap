export const SET_UID = 'USER_INFO/SET_UID'
export const SET_EMAIL = 'USER_INFO/SET_EMAIL'
export const SET_NAME = 'USER_INFO/SET_NAME'
export const SET_BIRTHDAY = 'USER_INFO/SET_BIRTHDAY'
export const SET_HP = 'USER_INFO/SET_HP'
export const SET_NICKNAME = 'USER_INFO/SET_NICKNAME'
export const SET_LV = 'USER_INFO/SET_LV'
export const SET_EXP = 'USER_INFO/SET_EXP'
export const SET_ALL = 'USER_INFO/SET_ALL'
export const SET_DEL = 'USER_INFO/SET_DEL'
export const SET_EMAILVERIFIED = 'USER_INFO/SET_EMAILVERIFIED'


export function setUid(uid) {
  return {
      type : SET_UID,
      uid : uid
  };
}

export function setEmail(email) {
  return {
      type : SET_EMAIL,
      email : email
  };
}

export function setName(name) {
  return {
      type : SET_NAME,
      name : name
  };
}

export function setBirthday(birthday) {
  return {
      type : SET_BIRTHDAY,
      birthday : birthday
  };
}

export function setHp(hp) {
  return {
      type : SET_HP,
      hp : hp
  };
}

export function setNickName(nickname) {
  return {
      type : SET_NICKNAME,
      nickname : nickname
  };
}

export function setLv(lv) {
  return {
      type : SET_LV,
      lv : lv
  };
}

export function setExp(exp) {
  return {
      type : SET_EXP,
      exp : exp
  };
}

export function setEmailVerified(emailVerified, uid) {
  return {
      type : SET_EMAILVERIFIED,
      emailVerified : emailVerified,
      uid: uid
  };
}



export function setAll(userInfo) {
  return {
      type : SET_ALL,
      uid: userInfo.MEM_UID,
      email: userInfo.MEM_EMAIL,
      name: userInfo.MEM_NAME,
      birthday: userInfo.MEM_BIRTHDAY,
      hp: userInfo.MEM_HP,
      nickname: userInfo.MEM_NICKNAME,
      lv: userInfo.MEM_LV,
      exp: userInfo.MEM_EXP,
  };
}


export function setDel() {
  return {
      type : SET_DEL,
      uid: '',
      email: '',
      name: '',
      birthday: '',
      hp: '',
      nickname: '',
      lv: '',
      exp: ''
  };
}

