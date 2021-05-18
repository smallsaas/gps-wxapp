import _ from 'lodash'
import { config } from '@/config.js'
import QQMapWX from '../components/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js'

export async function getAddress ({ latitude, longitude }, callback) {
	console.log('进来了', latitude, longitude)
	if (!latitude || !longitude) {
		if (_.isFunction(callback)) {
			callback({})
		}
	}
	const qqmapsdk = new QQMapWX({
		key: config.tencenMapKey
	})
	qqmapsdk.reverseGeocoder({
		location: {
			latitude,
			longitude
		},
		success: (res) => {
			if (_.isFunction(callback)) {
				callback(_.get(res, 'result', {}))
			}
		}
	})
}