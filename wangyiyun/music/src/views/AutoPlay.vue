<template>
    <div class="play">
        <van-nav-bar title="开心的一天鸭" left-arrow @click-left="goHome" />
        <div class="play-logo">
            <img :src="$store.state.musicImg" alt="" @click="playSwitch">
            <van-icon name="play-circle-o" v-show="!this.$store.state.switchs" @click="playSwitch" />
        </div>

        <div class="banner">
            <div class="baner-title">
                <p>{{this.$store.state.musicName}} - </p>
                <span>{{this.$store.state.musicSinger}}</span>
            </div>
            <ul>
                <transition-group name="fade">
                    <li v-for="(item,i) in lyricArr" :key="i" :class="{action:i==currentIndex}"
                        v-show="i == currentIndex">{{item.lyc}}</li>
                </transition-group>
            </ul>

        </div>
       
    </div>
</template>

<script>
    export default {
        data() {
            return {
                controls: false, //启动音频控件,
                lyric: '',
                currentIndex: 0,
            }
        },
        created() {
         
            if(this.$store.state.musicUrl == ""){
               
                // this.$router.push('/song')
                this.$router.go(-1)
                return;
            }
            this.getmusicLyrice();
            
        },
        mounted(){
             this.$store.state.setFlag = false;
            this.$store.state.setHomeFlag = false;
            this.$store.state.flag = false;
             
        },
        computed: {
            lyricArr() {
                let arr = this.lyric.split(/\n/)
                // 正则组匹配
                return arr.map(l => {
                    // "[01:00.125] 歌词"
                    // 正则小括号组匹配,如果正则与字符串匹配成功
                    // RegExp就可以通过$n属性,获取正则表达式中对应组匹配的文本
                    /\[(\d+):(\d+\.\d+)\](.+)/.test(l)
                    // console.log(RegExp.$1, RegExp.$2, RegExp.$3)
                    return {
                        time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
                        lyc: RegExp.$3
                    }

                })

            },
             
        },
        watch:{
            '$store.state.data':function(newVal){
                // console.log(newVal)

                 // console.log(e.target.currentTime, 'playing')
                // 根据event事件对象获取 audio元素, 在通过currentTime属性获取audio的播放时间
                let now = newVal.target.currentTime
                // 遍历所有的歌词与当前播放时间进行一一比较,
                // 当前媒体播放时间大于等于本条歌词播放时间, 并且小于下一条歌词的播放时间
                // 本条歌词就是当前播放歌词
                for (let i = 0; i < this.lyricArr.length; i++) {
                    // 如果已经遍历最后,直接让高亮歌词为最后一句
                    if (i === this.lyricArr.length - 1) {
                        this.currentIndex = i
                        break
                    }
                    // 获取当前遍历项歌词的播放时间
                    let lrcTime = this.lyricArr[i].time
                    // 获取下一条歌词的播放时间
                    let nextLrcTime = this.lyricArr[i + 1].time
                    // 当前媒体播放时间大于等于本条歌词播放时间, 并且小于下一条歌词的播放时间
                    if (now >= lrcTime && now < nextLrcTime) {
                        this.currentIndex = i
                        break
                    }
                }
            }
        },
        methods: {
            goHome() {
                this.$router.go(-1)
            },
          
            playSwitch() {

                this.$store.state.switchs = !this.$store.state.switchs;

                // if (this.$store.state.switchs) {
                //     this.$refs.music.play()

                // } else {
                //     this.$refs.music.pause();
                // }
            },

          

            getmusicLyrice() {
                this.axios({
                    method: 'GET',
                    url: '/lyric',
                    params: {
                        id: this.$store.state.musicId
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.lyric = res.data.lrc.lyric;
                        // console.log("歌曲的歌词", this.lyric);
                    }
                })
            },

           

        },
        beforeDestroy() {
            this.$store.state.setFlag = true;
            this.$store.state.setHomeFlag = true;
            this.$store.state.flag = true;
        }
    }
</script>

<style lang="scss" scoped>
    .play {
        width: 100%;
        height: 100vh;
        background: #333;


        .van-nav-bar {
            height: 45px;
            background: none;


            ::v-deep .van-icon {
                font-size: 25px;
                color: #fff;
            }

            ::v-deep .van-nav-bar__title {
                font-size: 20px;
                line-height: 20px;
                color: #fff;
            }
        }

        .van-hairline--bottom::after {
            border-bottom: none;
        }

        .play-logo {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 296px;
            height: 296px;
            margin: 50px auto;
            position: relative;
            background-image: url(http://s3.music.126.net/mobile-new/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48=);
            background-size: cover;

            img {
                display: block;
                width: 180px;
                height: 180px;
                border-radius: 50%;
                background: pink;
            }

            .van-icon {
                width: 56px;
                height: 56px;
                font-size: 50px;
                color: rgba(255, 255, 255, .8);
                position: absolute;
            }
        }

        .banner {
            width: 100vw;
            height: 83px;
            overflow: hidden;

            .baner-title {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 22px;

                p {
                    // width: 150px;
                    font-size: 18px;
                    color: #fefefe;
                    margin-right: 5px;
                    // text-align: right;
                     text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }

                span {
                    font-size: 16px;
                    color: rgba(255, 255, 255, .6);
                }
            }

            ul {
                width: 100%;
                position: relative;


                li {
                    width: 100%;
                    font-size: 16px;
                    color: rgba(255, 255, 255, .6);
                    text-align: center;
                    margin-top: 8px;
                    position: absolute;
                     text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }

                li.action {

                    color: #fff;
                }
            }
        }
    }

    .fade-enter{
        transform: translateY(100%);

    }

    .fade-enter-active,
    .fade-leave-active {
      
        transition: all .5s linear;
    }

    .fade-enter-to,
    .fade-leave {
        transform: translateY(0);
       
    }
    .fade-leave-to{
        transform: translateY(-50%);
    }
</style>