<template>
  <div>
    <div class="player" @click="goAutoPlay">
      <audio :src="this.$store.state.musicUrl" autoplay :controls="controls" preload ref="music" v-show="false"
        @timeupdate="playing"></audio>
      <!-- <audio :src="this.$store.state.musicUrl" autoplay controls='controls' preload v-show="false"></audio> -->
      <img :src="$store.state.musicImg" alt="" />
      <div class="player-title">
        <h4>{{ this.$store.state.musicName }}</h4>
        <p>{{ this.$store.state.musicSinger }}</p>
      </div>
      <div class="player-icon">
        <span class="iconfont icon-zanting1" v-show="!this.$store.state.switchs" @click.stop="onPlay"></span>
        <span class="iconfont icon-bofang" v-show="this.$store.state.switchs" @click.stop="onPlay"></span>
        <span class="iconfont icon-xiayishou" @click.stop="nextTrack"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: "",
        controls: false, //启动音频控件,
      };
    },

    methods: {
      goAutoPlay() {
        this.$router.push({
          name: "AutoPlay"
        });
      },
      playSwitch() {
        if (this.$store.state.switchs) {
          console.log("true");
          this.$refs.music.play();
        } else {
          console.log("false");
          this.$refs.music.pause();
        }
      },
      playing(e) {
        this.$store.state.data = e;
      },
      onPlay() {
        this.$store.state.switchs = !this.$store.state.switchs;
        this.playSwitch();
      },

      nextTrack() {
        this.$store.state.musicIndex++;
        let music = this.$store.state.musicData[this.$store.state.musicIndex];
        this.axios({
          method: "GET",
          url: "/song/url",
          params: {
            id: music.id,
          },
        }).then((res) => {
          if (res.data.code == 200) {
        
            this.$store.state.switchs = true;
            // if(){

            // }else{

            // }
            let obj = {
              id: music.id,
              img: music.picUrl || music.al.picUrl,
              name:music.name || music.al.name,
              url: res.data.data[0].url,
              song: music.song ? music.song.artists[0].name : music.ar[0].name 
            }
            
            this.$store.commit('changeData', obj)
            
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .player {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 75px;
    background: #191919;
    position: fixed;
    bottom: 0;
    z-index: 999;

    &>img {
      display: block;
      width: 67px;
      height: 67px;
      border-radius: 5px;
      // background: #0fff;
    }

    .player-title {
      width: 158px;
      height: 40px;

      h4 {
        margin: 0;
        padding: 0;
        color: #ffffff;
        font-size: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p {
        margin: 0;
        padding: 0;
        color: #888;
        font-size: 12px;
      }
    }

    .player-icon {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100px;
      height: 100%;

      span {
        width: 100%;
        height: 100%;
        font-size: 0.64rem;
        text-align: center;
        line-height: 75px;
        color: #fff;
        display: block;
      }
    }
  }
</style>