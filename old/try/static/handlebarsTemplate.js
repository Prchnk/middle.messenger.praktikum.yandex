function fill_template () {
	let data = {
		title: 'auth',
		list: [
			{name: 'login'},
			{name: 'something'}
		],
		footer: 'footer'
	};
	let template = Handlebars.compile(document.querySelector("#template").innerHTML);
	let filled = template(data);
	document.querySelector("#output").innerHTML = filled;
	}

