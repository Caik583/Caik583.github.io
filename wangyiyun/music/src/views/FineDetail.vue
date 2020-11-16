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
                <li v-for="(item,i) in newData" :key="i" @click="onSetMusicUrl(item.id,item.name,item.ar[0].name,item.al.picUrl,i)">
                    <p>{{item.name}}</p>
                    <span>{{item.ar[0].name}}</span>
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
                img:'',
                newData:'',
                name:''
            }
        },
        created(){
           
        },
        
        mounted(){
            this.img = this.$route.params.img;
           this.data = this.$route.params.aid;
           this.name = this.$route.params.name;
          
        
           this.getSingerHotSong()

            

            this.$store.commit('setState',{setFlag:false,setHomeFlag:false})
            this.newData = JSON.parse(sessionStorage.getItem('songListData'))
            
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            getSingerHotSong(){
                let arr = '';

                this.data.map(v=>{
                    
                    arr += v.id+','
                    
                })
               arr = arr.slice(0,-1)
                // console.log( arr)

                this.axios({
                    method:'GET',
                    url:'/song/detail?ids='+arr
                }).then(res=>{
                    sessionStorage.setItem('songListData',JSON.stringify(res.data.songs))

                })


            },
             onSetMusicUrl(i,name,singer,img,index){
                
                 this.$store.commit('changeDataIndex',{index,data:this.newData})
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
                            img:img,
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
            height: 30px;
            font-size: 20px;
            line-height: 30px;
            color: #fff;
            margin-left: 15px;
            position: absolute;
            bottom: 15px;
            z-index: 10;
            border-radius: 20px;
            padding: 0px 10px;
            background: rgba(155, 152, 152, 0.342);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
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
        padding: 0 15px 0 0;
        color: #888;
        margin: 0;
        border-bottom: 1px solid #f0f0f0;
        text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
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
                padding: 0 15px 0 0;
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