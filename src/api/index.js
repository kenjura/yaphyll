require('dotenv').config({ path:'/etc/yaphyll.env' });

// require('./version-check');
// require('./validate-env');

const api = require('./controllers');
const auth = require('./helper/addAuth');
const express = require('express');
const fallback = require('express-history-api-fallback')
const path = require('path');

const app = express();
const port = process.env.PORT || 3011;
const fileRoot = process.env.STATICFILE_ROOT || path.resolve(__dirname, '../public');
console.log({fileRoot});

// general express middleware
app.use(require('body-parser').json());

// auth time!
auth(app);

// api server
app.use('/api', api);

// view engine
// htmlEngine(app);
// app.get('/', (req, res) => {
// 	res.render('forumList', {});
// });
// app.get('/forum/:fid', (req, res) => {
// 	res.render('forumDetail', {});
// });
// app.get('/forum/:fid/thread/:tid', (req, res) => {
// 	res.render('threadDetail', {});
// });

// last-ditch error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})



// bundler
if (!process.env.NO_PARCEL) {
	const Bundler = require('parcel-bundler');
	console.log(__dirname);
	const file = path.join(__dirname,'../client/index.html'); // Pass an absolute path to the entrypoint here
	console.log({ file });
	const options = {}; // See options section of api docs, for the possibilities

	// Initialize a new bundler using a file and options
	const bundler = new Bundler(file, options);

	// Let express use the bundler middleware, this will let Parcel handle every request over your express server
	app.use(bundler.middleware());
}




// static file server for the app itself
app.use(express.static(fileRoot));
app.use(fallback('index.html', { root:fileRoot }))

// set up SSL
const https = require('https');
const fs = require('fs');
const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

// finally ready to serve
// app.listen(port, () => console.log(`API listening on port ${port}`));
https.createServer({key, cert}, app).listen('3011', () => {
  console.log('Listening on https://localhost:3011');
});

