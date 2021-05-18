import { request, upLoad } from './request'
import { config } from '@/config.js'

// 获取执法对象数据
export const getNavList = (params) => {
	const url = `${config.host}/api/product`
	return request('GET', url, params)
}

// 获取执法对象类型数据
export const getNavTypeList = (params) => {
	const url = `${config.host}/api/product`
	return request('GET', url, params)
}