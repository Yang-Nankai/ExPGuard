
import config from "../common/config.js";
import { fetchServer } from './index.js'
export default {
    getLocalData() {
        let qiuqiData = {}
        try {
            chrome.storage.sync.get(['qiuqiData'], (r) => {
                qiuqiData = r.qiuqiData || {}
                console.log('get qiuqiData === ', r)
                if (typeof qiuqiData === 'string') {
                    qiuqiData = JSON.parse(qiuqiData)
                }
            })
        } catch (e) {
            console.error(e)
        }
        return qiuqiData
    },
    updateLocalData(data) {
        //    更新
        if (typeof data !== 'string') {
            data = JSON.stringify(data)
        }
        chrome.storage.sync.set({ qiuqiData: data }, (r) => { })
    },

    getUserRfqSet(localData, callBack) {
        fetchServer(config.baseURL + '/subscribe/getsubsetting', localData).then(response => {
            callBack && callBack(response.data.data)
        }).catch(e => {
            console.info('error ', e)
        })
    },
}

