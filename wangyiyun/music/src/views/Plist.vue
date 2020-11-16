<template>
    <div>
        <ul>
            <li v-for="(item,i) in data" :key="i" @click="goSingerPage(item.id,item.name,item.img1v1Url)">
                <img :src="item.img1v1Url">
                <div>
                    <span> {{item.name}} </span>
                    <van-icon name="arrow" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: ''
            }
        },
        created() {
            this.currendHotTopic();
            
        },
        methods: {
           
            currendHotTopic(){
                this.axios({
                    method:'GET',
                    url:'/top/artists?offset=0&limit=30'
                }).then(res=>{
                    if(res.data.code == 200){
                        this.data = res.data.artists
                        // console.log("热门歌手",this.data)
                    }
                })
            },

            goSingerPage(id, name, img){
                this.$router.push({
                    name:'Singer',
                    query:{
                        id,
                        name,
                        img
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul {
        li {
            display: flex;
            height: 96px;
            align-items: center;
            margin: 10px;
            border-bottom: 1px solid #e5e5e5;


            img {
                width: 96px;
                height: 96px;
                display: block;
                margin-right: 10px;
            }

            div {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                span {
                    font-size: 19px;
                    color: #333;
                }

                .van-icon {
                    font-size: 20px;
                    color: #d8d8d8;
                }
            }
        }
    }
</style>