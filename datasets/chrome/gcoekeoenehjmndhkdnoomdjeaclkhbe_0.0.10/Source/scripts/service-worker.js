chrome.storage.local.set({
	oauthToken: '',
	courseId: '',
	currentTabId: '',
	nearpodUrl: 'https://nearpod.com/',
	googleOauthProvider: 'https://accounts.google.com/o/oauth2/auth',
	googleApiUrl: 'https://classroom.googleapis.com/v1/',
	messageTypes: {
		COURSE_INIT: 'COURSE_INIT',
		CREATE_ASSIGNMENT: 'CREATE_ASSIGNMENT'
	},
	actionTypes: {
		MY_LIBRARY_EXTENSION_LESSON_LAUNCHED_SUCCESS: 'MY_LIBRARY/EXTENSION_LESSON_LAUNCHED_SUCCESS'
	}
})

const manifest = chrome.runtime.getManifest()

chrome.action.onClicked.addListener(async () => {
	const { nearpodUrl } = await chrome.storage.local.get(['nearpodUrl'])
	const newUrl = nearpodUrl + 'account'
	chrome.tabs.create({ url: newUrl })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	( async () => {
		const { googleOauthProvider } = await chrome.storage.local.get(['googleOauthProvider'])
		const { googleApiUrl } = await chrome.storage.local.get(['googleApiUrl'])
		const { messageTypes } = await chrome.storage.local.get(['messageTypes'])

		switch (request.type) {
		case messageTypes.COURSE_INIT:
			chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
				chrome.storage.local.set({ 'currentTabId': tabs[0].id })
			})

			const clientId = encodeURIComponent(manifest.oauth2.client_id)
			const scopes = encodeURIComponent(manifest.oauth2.scopes.join(' '))
			const redirectUri = chrome.identity.getRedirectURL()

			const authUrl = googleOauthProvider + 
				'?client_id=' + clientId + 
				'&response_type=token' + 
				'&redirect_uri=' + redirectUri +
				'&scope=' + scopes +
				'&login_hint=' + request.payload.currentUserEmail

			const redirectUrl = await chrome.identity.launchWebAuthFlow({'url': authUrl, interactive: true})
			if (chrome.runtime.lastError) {
				sendResponse({
					authenticationSuccess: false,
					error: chrome.runtime.lastError.message
				})
			} else {
				sendResponse({authenticationSuccess: true})
				const redirectUrls = redirectUrl.split('#', 2)[1]
				const tokenProperties = JSON.parse('{"' + redirectUrls.replace(/&/g, "\",\"").replace(/=/g,"\":\"") + '"}')
				const oauthToken = tokenProperties.access_token
				chrome.storage.local.set({ 'oauthToken': oauthToken })
				const init = {
					method: 'GET',
					async: true,
					'contentType': 'json'
				}
				const response = await fetch(`${googleApiUrl}courses?access_token=${oauthToken}`, init)
				const data = await response.json()
				const currentCourse = await data.courses.find(course => request.payload.pathname.indexOf(course.alternateLink.split('c/')[1]) !== -1)
				chrome.storage.local.set({'courseId': currentCourse.id})
			}
			break

		case messageTypes.CREATE_ASSIGNMENT:
			const { oauthToken } = await chrome.storage.local.get(['oauthToken'])
			const { courseId } = await chrome.storage.local.get(['courseId'])
			const { currentTabId } = await chrome.storage.local.get(['currentTabId'])
			const init = {
				method: 'POST',
				async: true,
				'contentType': 'json',
				body: JSON.stringify({
					title: request.payload.assignmentTitle,
					workType: 'ASSIGNMENT',
					state: 'DRAFT',
					materials: [{
						link: {
							url: request.payload.assignmentMaterial
						}
					}]
				})
			}
			await fetch(`${googleApiUrl}courses/${courseId}/courseWork?access_token=${oauthToken}`, init)
			chrome.tabs.reload(currentTabId)
			break
		default:
			break
	}
	} )()
	return true
})