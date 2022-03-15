import { SET_ALL, SET_BIRTHDAY, SET_DEL, SET_EMAIL, SET_EMAILVERIFIED, SET_EXP, SET_HP, SET_LV, SET_NAME, SET_NICKNAME, SET_UID } from './action'
import { userState } from './state'

export default function userInfo(state = userState, action) {

  switch (action.type) {
    case SET_UID:
      return {
        ...state,
        uid: action.uid,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case SET_BIRTHDAY:
      return {
        ...state,
        birthday: action.birthday,
      };
    case SET_HP:
      return {
        ...state,
        hp: action.hp,
      };
    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.nickname,
      };
    case SET_LV:
      return {
        ...state,
        lv: action.lv,
      };
    case SET_EXP:
      return {
        ...state,
        exp: action.exp,
      };
    case SET_EMAILVERIFIED:
      return {
        ...state,
        emailVerified: action.emailVerified,
        uid: action.uid
      };
    case SET_ALL: 
      return {
        ...state,
        uid: action.uid,
        email: action.email,
        name: action.name,
        birthday: action.birthday,
        hp: action.hp,
        nickname: action.nickname,
        lv: action.lv,
        exp: action.exp
      }
    case SET_DEL: 
      return {
        ...state,
        uid: action.uid,
        email: action.email,
        name: action.name,
        birthday: action.birthday,
        hp: action.hp,
        nickname: action.nickname,
        lv: action.lv,
        exp: action.exp,
        emailVerified: action.emailVerified
      }
    default: 
      return state;
  }
  
}
