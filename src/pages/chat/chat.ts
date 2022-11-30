import ChatTemplate from './chat.hbs';
import {DOCUMENT} from "../../helpers/helpers";

function renderHbs() {
	const data = {
		title: 'по идее это бокпанель',
		list: [
			{name: 'Твой друг', status: 'online', amount_message: 2, me: 'Оля', date: Date},
		]
	};
	DOCUMENT.querySelector('#output')!.innerHTML = ChatTemplate(data);
}
renderHbs();
