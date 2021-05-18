<template>
	<view class="venue_list_container">
        <view class="tab_list">
            <ms-tabs 
                :list="typeList" 
                v-model="tabActive"
                @selected="handleSelectTab"
            />
        </view>
		<load-refresh
            ref="loadRefresh"
            :isRefresh="false"
            refreshType="hollowDots"
            color="#04C4C4"
            heightReduce="96"
            backgroundCover="#F3F5F5"
            :currentPage="listCurrentPage"
            :totalPages="listTotalPages" 
            @loadMore="loadMore" 
            @refresh="refresh"
		 >
		  <view slot="content-list" class="list_content">
		    <view 
				v-for="(item, index) in list" 
				:key='index' 
				class="list_item"
                @click.stop="handleToMap(item)"
			>
				<view 
					:style="{backgroundImage: item.image || `url(${require('../../static/images/empty.png')})`}"
					class="image"
				/>
				<view class="message_content">
					<view class="title_status">
						<text class="title">{{item.title}}</text>
						<view 
                            class="status" 
                            :style='{
                                color: getStatusColor(item.status),
                                borderColor: getStatusColor(item.status)
                            }'
                        >
                            {{item.status}}
                        </view>
					</view>
					<view class="address">
                        <image src="../../static/icons/nav/address.svg" class="address_icon" />
                        <view class="address_text">{{item.address}}</view>
                    </view>
					<view class="phone">
                        <image src="../../static/icons/nav/phone.svg" class="phone_icon"/>
                        <view class="phone_text" @click.stop="handleCallPhone(item.phone)">{{item.phone}}</view>
                    </view>
				</view>
			</view>
		  </view>
		</load-refresh>
	</view>
</template>

<script>
    import _ from 'lodash'
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	import { getNavList, getNavTypeList } from '@/common/api.js'
    import msTab from '../../components/ms-tabs/ms-tabs.vue'
	import { getAddress } from '@/utils/tools.js'
    
    import { navTypeList } from '../testData/nav.js'
    
	export default {
		components: {
		  loadRefresh,
          msTab
		},
		data () {
			return {
				listCurrentPage: 1,
				listTotalPages: 1,
				list: [],
                typeList: [],
                tabActive: 0,
                currentType: '全部'  // 当前所选类别
			}
		},
		onLoad() {            
            this.fetchTypeList()
			this.fetchList()
		},
		methods: {
            getStatusColor (title) {
              const obj = {
                   '已检查': 'rgba(67, 207, 124, 1)',
                   '未检查': 'rgba(227, 60, 100, 1)'
              }
              return obj[title] ? obj[title] : '#333'
            },
            
            // 获取类别数据
            async fetchTypeList () {
                const res = await getNavTypeList()
                
                // ** 测试数据
                // const res = navTypeList
                // **

                if (res.code === 200) {
                    const list = _.cloneDeep(_.get(res, 'data.list', []))
                    list.unshift({ title: '全部'})
                    this.typeList = [...list]
                }
            },
            
			async fetchList (data) {
                uni.showLoading({ title: 'loading...', mask:true })
				const res = await getNavList({ 
                    size: 10, 
                    page: this.listCurrentPage,
                    ...this.currentType !== '全部' ? { type: this.currentType } : {}
                 })
                uni.hideLoading()				
				this.list = this.list.concat([..._.get(res, 'data.list', [])])
                
                //** 测试数据
                this.list.map((item, index) => {
                    if (!_.has(item, 'title')) {
                        item.title = '温泉体育馆'
                    }
                    if (!_.has(item, 'address')) {
                        item.address = '北京市通州区北京市人民政府'
                    }
                    if (!_.has(item, 'status')) {
                        item.status = '未检查'
                    }
                    if (!_.has(item, 'phone')) {
                        item.phone = '8892046  88923190'
                    }
                    if (!_.has(item, 'latitude')) {
                        item.latitude = 39.910925
                    }
                    if (!_.has(item, 'longitude')) {
                        item.longitude = 116.352963
                    }
                    if (!_.has(item, 'longitude')) {
                        item.longitude = 116.352963
                    }
                    if (!_.has(item, 'image')) {
                        item.image = ''
                    }
                })
                // **
                
				this.listCurrentPage = _.get(res, 'data.page', 1)
				this.listTotalPages = _.get(res, 'data.totalpages', 1)
                this.$refs.loadRefresh.completed()
			},
			loadMore () {
				this.listCurrentPage = this.listCurrentPage + 1
				this.fetchList()
			},
			handleToMap (item) {
				uni.showLoading({ title: '', mask: true })
				getAddress(
					{
						latitude:  _.get(item, 'latitude'), 
						longitude: _.get(item, 'longitude')
					},
					(res) => {
						console.log('localcurrent', res)
						uni.hideLoading()
						uni.openLocation({
						    latitude: item.latitude,
						    longitude: item.longitude,
							name: item.address,
						    address: _.get(res, 'address'),
						})
					}
				)
			},
            
            // 选中tab时
            handleSelectTab (e) {
                this.tabActive = e
                const type = this.typeList[e].title
                if (this.currentType === type) {
                    return
                }
				this.currentType = type
                this.listCurrentPage = 1
                this.listTotalPages = 1
				setTimeout(() => {
					this.list = []
					this.fetchList()
				}, 200)
            },
            
            // 拨打电话
            handleCallPhone (phone) {
                if (!phone) {
                    return
                }
                uni.showModal({
                    content: '是否拨打号码？',
                    success: (e) => {
                        if (e.confirm) {
                          uni.makePhoneCall({
                              phoneNumber: phone
                          })  
                        }
                    },
                })
            }
		}
	}
</script>

<style lang="less" scoped>
	.venue_list_container {
		background-color: #e5e5e5;
        font-size: 24rpx;
        .tab_list {
            border-bottom: 1px solid #f2f2f2;
			font-family: Microsoft YaHei;
        }
	}
	.list_content {
		background-color: #fff;
		.list_item {
			display: flex;
			padding: 30rpx 16rpx;
			border-bottom: 1px solid #f2f2f2;
            transition: all .3s;
            line-height: 1.5;
			>.image {
				width: 248rpx;
				height: 194rpx;
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;
			}
			.message_content {
				flex: 1;
				margin-left: 28rpx;
				font-size: 28rpx;
                .title_status {
                    display: flex;
                    align-items: center;
                    .title {
                        color: rgba(80, 80, 80, 1);
                    	font-size: 32rpx;
                    	font-weight: bold;
                    	margin-right: 10rpx;
                        max-width: 70%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        // display: box;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .status {
                    	color: rgba(42, 130, 228, 1);
                    	border-radius: 20px;
                    	font-size: 16rpx;
                    	border: 1px solid rgba(42, 130, 228, 1);
                    	padding: 4rpx 12rpx;
                    	margin-left: 10rpx;
                        height: fit-content;
                        margin-top: 2rpx;
                    }
                }
				.address {
					color: rgba(80, 80, 80, 1);
					margin: 10rpx 0;
                    display: flex;
                    .address_icon {
                        width: 32rpx;
                        height: 32rpx;
                        margin-right: 10rpx;
                        transform: translate(-2rpx, 6rpx);
                    }
                    .address_text {
                        flex: 1;
                    }
				}
                .phone {
                    color: rgba(80, 80, 80, 1);
                    font-size: 24rpx;
                    display: flex;
                    .phone_icon {
                        width: 28rpx;
                        height: 28rpx;
                        margin-right: 14rpx;
                    }
                    .phone_text {
                        // flex: 1;
                        display: inline-block;
                    }
                }
			}
		}
        .list_item:active {
            background-color: #f2f2f2;
            transition: all .3s;
        }
	}
</style>
