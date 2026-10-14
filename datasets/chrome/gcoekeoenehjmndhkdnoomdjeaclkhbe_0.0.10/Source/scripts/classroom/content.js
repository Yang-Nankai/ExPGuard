(async () => {
	const { actionTypes } = await chrome.storage.local.get(['actionTypes'])
	const { nearpodUrl } = await chrome.storage.local.get(['nearpodUrl'])
	const { messageTypes } = await chrome.storage.local.get(['messageTypes'])

	const nearpodExtensionUrl = nearpodUrl + 'library/?extension=1'

	const closeImage = chrome.runtime.getURL('assets/close.svg')

	const nearpodIframeContainer = document.createElement("div")
	nearpodIframeContainer.innerHTML = `
		<div class="nearpod-create-assignment">
			<div class="nearpod-create-assignment-veil"></div>
			<div class="nearpod-create-assignment-container">
				<iframe src="${nearpodExtensionUrl}" class="nearpod-create-assignment-iframe"></iframe>
				<div tabindex="200" class="nearpod-create-assignment-close">
					<img src="${closeImage}">
				</div>
			</div>
		</div>
	`
	const nearpodIframe = nearpodIframeContainer.children[0]
	const nearpodCloseButton = nearpodIframe.querySelector('div.nearpod-create-assignment-close')

	const removeModalListeners = () => {
		window.removeEventListener('message', activeIframeEventHandler)
		nearpodCloseButton.removeEventListener('click', removeModalListeners)
	}

	const activeIframeEventHandler = ev => {
		if (ev.data && ev.data.type === 'nearpodMessage' && ev.data.action_type === actionTypes.MY_LIBRARY_EXTENSION_LESSON_LAUNCHED_SUCCESS) {
			chrome.runtime.sendMessage({
				type: messageTypes.CREATE_ASSIGNMENT,
				payload: {
					assignmentTitle: ev.data.payload.assignmentTitle,
					assignmentMaterial: ev.data.payload.assignmentMaterial
				}
			})
			removeModalListeners()
		}
	}

	const openNearpodModal = () => {
		window.addEventListener('message', activeIframeEventHandler)
		document.body.appendChild(nearpodIframe)
		nearpodCloseButton.addEventListener('click', () => {
			document.body.removeChild(nearpodIframe)
			removeModalListeners()
		})
	}

	const nearpodButtonCreateAssignmentListener = () => {
		const isEmailRegex = /@[\s\S]+?\./g
		const currentUserEmail = Array.from(document.getElementsByTagName('div')).filter(element => {
			return !element.children.length && element.innerText.match(isEmailRegex)
		})[0].innerText

		chrome.runtime.sendMessage(
			{
				type: messageTypes.COURSE_INIT,
				payload: {
					pathname: window.location.pathname,
					currentUserEmail
				}
			}).then(
				response => {
					console.log('response', response)
					if (response.authenticationSuccess) {
						openNearpodModal()
					} else {
						console.error(response.error)
					}
				}
			).catch(
				error => console.error(error)
			)
		document.body.click()
	}

	const calculateNearpodLabelStyle = () => {
		const menuAssigmnents = document.querySelectorAll('div[role="menu"] > div')
		const nearpodButtonIndex = Array.prototype.indexOf.call(menuAssigmnents, document.querySelector('div[role="menu"] > div[data-item-type="nearpod-assignment"]'))
		const bottomValue = 109.5 + 72*nearpodButtonIndex
		//109.5px is the bottom value for the first label and 72px is the distance between them.
		return `bottom:${bottomValue}px; right: 94px; visibility: visible; transform-origin: 100% 50% 0px; transform: translate(0px, 0px);`
	}

	const assignmentsListMutationObserver = new MutationObserver(() => {
		const nearpodLabel = document.querySelector('span[data-item-type="nearpod-assignment-label"]')
		nearpodLabel.setAttribute('style', calculateNearpodLabelStyle())
	})

	const bodyMutationObserver = new MutationObserver(() => {
		const assignmentLabels = document.querySelectorAll('li[role=menuitem]')
		if (assignmentLabels.length > 0) {
			const guidedHelpID = document.querySelectorAll('ul[aria-label="Create"]')
			for (let i = 0; i < guidedHelpID.length; i++) {
				const createAssignmentMenu = guidedHelpID[i]
				if (!createAssignmentMenu.querySelector('.nearpod-create-assignment-button')) {
					const nearpodButton = document.createElement('li')
					nearpodButton.classList.add('aqdrmf-rymPhb-ibnC6b', 'nearpod-create-assignment-button')
					nearpodButton.setAttribute('role', 'menuitem')
					nearpodButton.setAttribute('tabindex', '-1')
					nearpodButton.setAttribute('jsaction', 'click:o6ZaF(preventDefault=true); keydown:RDtNu; keyup:JdS61c; focusin:MeMJlc; focusout:bkTmIf; mousedown:teoBgf; mouseup:NZPHBc; mouseenter:SKyDAe; mouseleave:xq3APb; touchstart:jJiBRc; touchmove:kZeBdd; touchend:VfAz8; change:uOgbud')

					nearpodButton.innerHTML = `
						<span class="UTNHae"></span>
						<span class="dNKuRb aqdrmf-rymPhb-sNKcce"></span>
						<span class="aqdrmf-rymPhb-KkROqb nearpod-icon-wrapper" aria-hidden="true">
							<span class="nearpod-create-assignment-new-icon"></span>
						</span>
						<span class="aqdrmf-rymPhb-Gtdoyb">
							<span class="aqdrmf-rymPhb-fpDzbe-fmcmS">Nearpod Assignment</span>
						</span>
						<span class="aqdrmf-rymPhb-JMEf7e"></span>
						<span class="O68mGe-xl07Ob-mQXhdd"></span>
					`
					if (createAssignmentMenu.nodeName == "UL") {
						createAssignmentMenu.insertBefore(nearpodButton, createAssignmentMenu.firstChild)
						nearpodButton.addEventListener('click', nearpodButtonCreateAssignmentListener)
					}
				}
			}
		}
	})

	bodyMutationObserver.observe(document.body, { childList: true, subtree: true })
})()
