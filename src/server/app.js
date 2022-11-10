const path = require('path');
const express = require('express')
// // const handlebars = require("express-handlebars");
const app = express()
const port = 3000;


// app.set('view engine', 'pages');
// app.set('views', path.resolve(__dirname, '../views'))
// app.engine('pages', handlebars.engine({
// 	layoutsDir: `${__dirname}/../views/layouts`,
// 	extname: 'pages',
// 	// defaultLayout: 'index',
// 	partialsDir: `${__dirname}/../views/partials`
// }));

app.use(express.static(path.resolve(__dirname, '../../dist')));

// app.get('/', (req, res) => {
// 	res.render('pages/main', {layout: 'index'})
// });

// app.get('/auth', (req, res) => {
// 	res.render('pages/main', {layout: 'auth'})
// });

// app.get('/registration', (req, res) => {
// 	res.render('pages/main', {layout: 'registration'})
// });

// app.get('/chat', (req, res) => {
// 	res.render('pages/main', {layout: 'chat'})
// });

app.listen(port, () => {
	console.log(`server listening on http://localhost:${port}`)
})

