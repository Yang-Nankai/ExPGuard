
/**
 * @description: 动态更新请求头规则
 * @param {*} message
 * @param {*} resolve
 * @return {*}
 */
export async function updateRules(message, resolve) {
    console.log('updateRules=>', message.data)
    const addRules = message.data;
    const rules = await chrome.declarativeNetRequest.getDynamicRules()

    const setRules = async (option, type) => {
        try {
            await chrome.declarativeNetRequest.updateDynamicRules(option, () => {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError)
                } else {
                    chrome.declarativeNetRequest.getDynamicRules((rules) => console.log(rules))
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    await setRules({ removeRuleIds: rules.map((v) => v.id) })

    setRules({ addRules })
}


/**
 * @description: 添加请求头规则
 * @param {*} message
 * @param {*} resolve
 * @return {*}
 */
export function addRules(message, resolve) {

}


/**
 * @description: 删除请求头规则
 * @param {*} message
 * @param {*} resolve
 * @return {*}
 */
export function removeRules(message, resolve) {

}

/**
 * @description: 获取当前标签页信息
 * @param {*} message
 * @param {*} resolve
 * @return {*}
 */
export function getParentUrl(message, resolve) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        resolve(tabs)
    })
}


