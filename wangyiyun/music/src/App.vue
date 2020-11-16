<template>
	<div id="app">
		<div class="header" v-show="this.$store.state.setHomeFlag">
			<van-nav-bar @click-right="setSearch">
				<template #left>
					<h2>Hi 音乐</h2>
				</template>
				<template #right>
					<van-icon name="search" size="26" />
				</template>
			</van-nav-bar>
		</div>

		<div class="tab" v-show="this.$store.state.setFlag">
			<keep-alive>
				<router-link to="/song">新歌</router-link>
			</keep-alive>
			<keep-alive>
				<router-link to="/rank">精品</router-link>
			</keep-alive>
			<keep-alive>
				<router-link to="/plist">歌手</router-link>
			</keep-alive>
		</div>
		<router-view />
		<myPlayer v-show="$store.state.flag"/>
	</div>
</template>

<script>
	import myPlayer from "./components/plarer";
	export default {
		data() {
			return {
				play: false,
			};
		},
		created() {},
		components: {
			myPlayer,
		},
		methods: {
			setSearch() {
				// console.log(1111111)
				this.$router.push("/search");
			},
		},
	};
</script>
<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.active-action {
		border-bottom: 4px solid #33a3f5;
	}

	.header {
		width: 100vw;
		height: 58px;
		background: #2ca2f9;

		.van-nav-bar {
			width: 100%;
			height: 100%;
			color: white;
			background: none;

			.van-icon {
				color: white;
			}
		}
	}

	.tab {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100vw;
		height: 57px;
		font-size: 20px;
		box-shadow: 0 0.1785rem 0.1785rem 0 #f4f4f4;

		a {
			display: block;
			width: 80%;
			height: 100%;
			text-align: center;
			line-height: 57px;
			color: #333;
		}
	}
</style>