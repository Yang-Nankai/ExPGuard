let UUID;
document.addEventListener('DOMContentLoaded', function() {
    getUUID()
}, false);


const getUUID = async () => {
    try {
        await chrome.runtime.sendMessage({ type: 'getUUID' }, function (result) {
            UUID = result;
            if(UUID) {
                document.querySelector('#FRAME').innerHTML = `<iframe style="height:100%;width:100%" src="https://peanuts.pro/dashboard/${UUID}?ext_id=${chrome.runtime.id}" frameborder="0"></iframe>`
            }
            if (chrome.runtime.lastError) { getUUID() }
        });
    } catch (error) {
        getUUID()
    }
}