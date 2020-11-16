import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    setFlag: true,
    setHomeFlag: true,
    musicId: '',
    musicImg: '',
    musicName: '',
    musicSinger: '',
    musicUrl: '',
    switchs: true,
    controls: false, //启动音频控件,
    data: '',
    flag: false,
    musicIndex: '',
    musicData: ''
  },
  mutations: {
    setState(state,opt){
      for(let [key,val] of Object.entries(opt)){
        state[key] = val 
      }
    },
    changeData(state, obj) {
      state.switchs = true;
      state.musicId = obj.id;
      state.musicImg = obj.img;
      state.musicName = obj.name;
      state.musicUrl = obj.url;
      state.musicSinger = obj.song;
    },

    changeDataIndex(state,obj){
      state.flag = true;
      state.musicIndex = obj.index;
      state.musicData = obj.data;
    }

  },
  actions: {},
  modules: {}
})