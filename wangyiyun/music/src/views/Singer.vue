<template>
    <div class="singer">
        <div class="singer-img">
            <img :src="img" alt="">
            <van-icon name="arrow-left" class="singer-log" @click="goBack"/>

             <p>{{name}}</p>
        </div>

        <div class="singer-list">
            <p>快看,共{{data.length}}首热曲</p>
            <ul>
                <li v-for="(item,i) in data" :key="i" @click="onSetMusicUrl(item.id,item.name,item.ar[0].name,i)">
                    <p>{{item.name}}</p>
                    <span>{{name}}</span>
                </li>
                
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                data:'',
                id:'',
                name:'',
                img:''
            }
        },
        created(){
            this.id = this.$route.query.id;
            this.name = this.$route.query.name;
            this.img = this.$route.query.img;
            
            this.getSingerHotSong();
        },
        
        mounted(){
            this.$store.commit('setState',{setFlag:false,setHomeFlag:false})
                if(this.$store.state.musicUrl == ""){
                    this.$store.commit('setState',{flag:false})
                    return;
                }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            getSingerHotSong(){
                this.axios({
                    method:'GET',
                    url:'/artist/top/song?id='+this.id
                }).then(res=>{
                    if(res.data.code == 200){
                        this.data = res.data.songs
                    
                    }
                })
            },
             onSetMusicUrl(i,name,singer,index){
               
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
                            img:this.img,
                            name,
                            url:res.data.data[0].url,
                            song:singer
                        }
                         this.$store.commit('changeData',obj)
                        
                    }
                })
            },
        },
        beforeDestroy() {
            this.$store.commit('setState',{setFlag:true,setHomeFlag:true})
        }
    }
</script>

<style lang="scss" scoped>
.singer-img{
    width: 100vw;
    height: 218px;
    position: relative;
    background: pink;
    z-index: 10;

    img{
        width: 100%;
        height: 100%;
        display: block;
        z-index: 1;
        position: absolute;
    }

    .singer-log{
        font-size: 30px;
        margin: 10px 15px;
        color: #bdbdbd;
        z-index: 10;
    }

        p{
            display: block;
            height: 40px;
            font-size: 28px;
            line-height: 40px;
            color: #fff;
            margin-left: 15px;
            position: absolute;
            bottom: 15px;
            z-index: 10;
            border-radius: 20px;
            padding: 0px 10px;
            background: rgba(155, 152, 152, 0.342);
        }

      
   
}
.singer-list{
    width: 100vw;
    border-radius: 10px;
    margin-top: -10px;
    z-index: 100;
    position: relative;
    background: #fff;

    p{
        text-indent: 15px;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        color: #888;
        margin: 0;
        border-bottom: 1px solid #f0f0f0;
    }

    ul{

        li{
            text-indent: 15px;
            font-size: 16px;
            height: 50px;
            line-height: 50px;
            margin-top: 10px;

            p{
                margin: 0;
                padding: 0;
                height: 20px;
                line-height: 20px;
                color: #000;
                border: none;
            }

            span{
                display: block;
                margin: 0;
                padding: 0;
                font-size: 12px;
                height: 18px;
                line-height: 18px;
                color: #888;
            }
        }
    }
}
</style>