<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,i) in bannerData" :key="i">
                <img :src="item.imageUrl" alt="">
            </van-swipe-item>
          
        </van-swipe>

       <ul class="panel-songslist">
           <li v-for="(item,i) in data" :key="i" @click="onSetMusicUrl(item.id,item.picUrl,item.name,item.song.artists[0].name,i)">
               <p>{{item.name}}</p>
               <van-icon name="service-o" />
           </li>
       </ul>
      
       
    </div>
</template>

<script>

    export default {
       
        data(){
            return{
                data:"",
                show:false,
                bannerData:''
            }
        },
        created(){
            this.getMusicData();
            this.setPlayListData();
        },
       mounted(){
            if(this.$store.state.musicUrl == ""){
                this.$store.commit('setState',{flag:false})
                return;
            }
       },
        methods:{
            getMusicData(){
                
                this.axios({
                    method:'GET',
                    url:'/personalized/newsong'
                }).then(res=>{
                    
                    if(res.data.code == 200){
                        this.data = res.data.result
                        // console.log("新歌",this.data);
                    }
                })
            },

            onSetMusicUrl(i,images,name,singer,index){
                this.$store.commit('changeDataIndex',{index,data:this.data})
                 this.axios({
                    method: 'GET',
                    url: '/song/url',
                    params: {
                        id: i
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                       

                        let obj = {
                            id:i,
                            img:images,
                            name,
                            url:res.data.data[0].url,
                            song:singer
                        }
                         this.$store.commit('changeData',obj)
                    }
                })
            },

            setPlayListData(){
                this.axios({
                    method:'GET',
                    url:'/banner'
                }).then(res=>{
                        this.bannerData = res.data.banners;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
audio{
    position: fixed;
    bottom: 0;

}
.van-swipe-item img{
    width: 100%;
    height: 154px;
    display: block;
}
.van-swipe{
    margin-top: 5px;
}
 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }

  .panel-songslist{
      
      li{
            display: flex;
    align-items: center;
          height: 73px;
          border-bottom: 1px solid #e5e5e5;

         p{
             width: 288px;
              font-size: 18px;
              color: #333;
              margin: 0 15px;
              float: left;
          }

          .van-icon{
              display: block;
              width: 45px;
              height: 100%;
              font-size: 30px;
              text-align: center;
              line-height: 73px;
              margin-right: 10px;
              float: right;;
          }

      }
  }
</style>