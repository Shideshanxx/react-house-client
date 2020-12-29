import { getLists } from '@/services/search';

export default {
  namespace: 'search',
  state: {
    text: 'dva',
    lists: []
  },
  // 同步方法获取数据
  reducers: {
    // 这里的state就是上面的state
    getLists(state, action) {
      return {
        ...state,
        // lists: Array(20).fill(action.payload)
        lists: action.payload
      }
    }
  },
  // 异步方法获取数据（generater语法）
  effects: {
    // call和put都是函数，call用来调用异步函数(如数据获取)，put用来做事件派发(reducers里面的方法)
    *getListsAsync({ payload, callback }, { call, put }) {
      // 这里的getLists是从services里引入的
      const res = yield call(getLists, payload)
      yield put({
        // type指reducers里的方法名
        type: 'getLists',
        payload: res.lists
      })
    }
  }
}