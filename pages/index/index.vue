<template>
	<view class="home_container">
		<view class="venue_tag" @click="handleTag">
			<image src='../../static/icons/nav/nav.svg' class="sport_image" />
			<text>场馆导航</text>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			handleTag () {
				uni.navigateTo({
					url: '../venueNav/index'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
    .baseFlex {
        display: flex;
        align-items: center;
    }
	.home_container {
		padding: 16rpx;
        .baseFlex();
		justify-content: center;
		height: 100vh;
		.venue_tag {
			.baseFlex();
			padding: 32rpx;
			color: rgba(80, 80, 80, 1);
			background-color: rgba(214, 239, 238, 1);
			border-radius: 8px;
			font-size: 14px;
			line-height: 150%;
			text-align: center;
			.sport_image {
				width: 48rpx;
				height: 48rpx;
				margin-right: 8rpx;
			}
		}
	}
</style>
