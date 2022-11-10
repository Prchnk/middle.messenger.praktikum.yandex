const profileItemNodes = Array.from(document.querySelectorAll('[data-type=form-item]'));


function getProfileItemChildNodes(formItemNode) {
	return {
		formItemNode: formItemNode,
		formItemInfoNode: formItemNode.querySelector('[data-type=form-item-info]'),
		formItemInfoTextNode: formItemNode.querySelector('[data-type=form-item-info-text]'),
		formItemInfoBtnNode: formItemNode.querySelector('[data-type=form-item-info-btn]')
	};
}

const profileItemObjs = profileItemNodes.map(getProfileItemChildNodes);
console.log(profileItemObjs);
