<template>
    <div class="search">
        <van-nav-bar title="搜索" left-arrow @click-left="goHome" />

        <!-- 搜收框 -->
        <div class="search-box">
            <van-search v-model="text" @focus='setText' @blur='getText' placeholder="歌名/拼音" />

            <button :class="{action:val}" @click="onSearch">搜索</button>
        </div>

        <!-- 标题 -->
        <div class="hot-topic">
            最近热门
        </div>

        <div class="search-loading" v-show="false">
            <van-loading type="spinner" size="24px" color=" #062b4e" />
        </div>

        <ul class="search-content">
            <li v-for="(item,i) in data" :key="i"
                @click="onSetMusicUrl(item.id,item.artists[0].img1v1Url,item.name,item.artists[0].name,i)">
                <van-icon name="search" si ze="18px" />
                <span>{{item.name}}</span>
                <span>{{item.artists[0].name}}</span>
            </li>
        </ul>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                text: '',
                val: false,
                data: '',
                
            }
        },
        created() {
            
        },
         mounted(){
            // this.$store.state.setFlag = false;
            this.$store.commit('setState',{setFlag:false})
        },
        methods: {
            goHome() {
                this.$router.go(-1)
            },

            setText() {
                this.val = true
            },

            getText() {
                this.val = false
            },

            onSearch() {

                this.axios({
                    method: 'GET',
                    url: '/search?keywords=' + this.text
                }).then(res => {
                    if (res.data.code == 200) {
                        this.data = res.data.result.songs
                        console.log("搜索",this.data)
                        // console.log(res)
                    }
                })
            },

            onSetMusicUrl(i, images, name, singer,index) {
               
                console.log(index);
                // this.$store.commit('changeDataIndex',{index,data:this.data})
                this.$store.commit('setState',{flag:true})
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
        },

        beforeDestroy() {
            
            this.$store.commit('setState',{setFlag:true})

        }
    }
</script>

<style lang="scss" scoped>
    .search {
        width: 100vw;
        height: 55px;
        box-shadow: 0 0.1785rem 0.1785rem 0 #f4f4f4;

        ::v-deep .van-nav-bar__left .van-icon {
            font-size: 35px;
            margin-left: -10px;
            margin-top: 5px;
            color: #bdbdbd;
        }

        ::v-deep .van-nav-bar__title {
            font-size: 18px;
            margin-top: 5px;
        }

        .search-box {
            display: flex;
            margin-top: 15px;
            padding: 7px 7px 7px 0;
            background: #fff;

            .van-search {
                height: 37px;
                border: 1px solid #e5e5e5;
                border-radius: 5px;
                margin: 0 10px 0 15px;
                padding-left: 0;


                ::v-deep .van-icon {
                    font-size: 24px;
                    color: #b8b8b8;
                }

                .van-search__content {
                    background: none;
                }
            }

            .van-cell {
                background: none;
            }

            ::v-deep .van-field__control {
                background: none;
                font-size: 18px;
            }

            button {
                width: 60px;
                height: 37px;
                outline: none;
                border: none;
                font-size: 18px;
                border-radius: 5px;
                color: #9b9b9b;
                background: #e5e5e5;
            }

            button.action {
                color: #fff;
                background: #2ba2fa;
            }
        }

        .hot-topic {
            width: 100vw;
            height: 52px;
            font-size: 16px;
            color: #35a7f5;
            text-indent: 15px;
            line-height: 52px;
            margin-top: 10px;
            border-bottom: 1px solid #ccc;
        }

        .search-loading {
            display: flex;
            justify-content: center;
            width: 100vw;
            margin-top: 100px;

        }

        .search-content {
            width: 100%;

            li {
                display: flex;
                align-items: center;
                width: 100%;
                height: 45px;

                .van-icon {
                    margin: 0 15px;
                }

                span {
                    font-size: 16px;
                    color: #333;
                    margin-right: 15px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

        }
    }
</style>