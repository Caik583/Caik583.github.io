<template>
    <div class="rank">
        <ul>
            <li v-for="(item,i) in data" :key="i" @click="findSingerHotDetail(item.id,item.coverImgUrl,item.name)">
                <img :src="item.coverImgUrl">
                <div>
                    <span>{{item.name}}</span>
                    <van-icon name="arrow" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                data:'',
                
            }
        },
      
        created(){
            this.getMusicRankData();
        },
        methods:{
             getMusicRankData(){
               

                this.axios({
                    method:'GET',
                    url:'/top/playlist/highquality?before=1503639064232&limit=20'
                }).then(res=>{
                    if(res.data.code == 200){
                        this.data = res.data.playlists;
                        // console.log("获取精品歌单",this.data);
                    }
                })
            },

            findSingerHotDetail(id,img,name){
                this.axios({
                    method:'GET',
                    url:'/playlist/detail?id='+id
                }).then(res=>{
                    // console.log("精品的ID",res)
                    if(res.data.code == 200){
                        let aid = res.data.privileges;
                         this.$router.push({
                            name:'FineDetail',
                            params:{aid,img,name}
                        })
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    ul{
        li{
            display: flex;
            height: 96px;
            align-items: center;
            margin: 10px;
            border-bottom: 1px solid #e5e5e5 ;


            img{
                width: 96px;
                height: 96px;
                display: block;
                margin-right: 10px;
            }
            div{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                span{
                font-size: 19px;
                color: #333;
                }

                .van-icon{
                    font-size: 20px;
                    color: #d8d8d8;
                }
            }
        }
    }
</style>