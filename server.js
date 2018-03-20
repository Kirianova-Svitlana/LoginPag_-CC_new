/* global define */
(function() {
	'use strict';

	var host = 'localhost',
		port = '9000';

	console.log('Server running on: '+ host + ':' + port);

	var http = require('http'),
		url = require('url'),
		path = require('path'),
		fs = require('fs') ;
	var mimeTypes = {
        'html': 'text/html',
        'css': 'text/css',
        'js': 'text/javascript',
        'htc': 'text/x-component',
        'txt': 'text/plain',
        'ejs': 'text/html',
        'json': 'application/json',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'ico': 'image/gif',
        'png': 'image/png',
        'gif': 'image/gif',
        'mp3': 'audio/mpeg',
        'mp4': 'video/mp4',
        'ogg': 'audio/ogg',
        'wav': 'audio/wav',
        'woff':'application/font-woff',
        'ttf':'application/x-font-truetype',
        'otf':'application/x-font-opentype',
        'eot':'application/vnd.ms-fontobject',
        'svg': 'image/svg+xml',
        'swf': 'application/x-shockwave-flash',
        'pdf': 'application/pdf'};

	http.createServer(function(req, res) {
		var statusCode = 200;
		var header = {'Content-Type': 'text/plain'};
		var uri = url.parse(req.url).pathname;
		uri = uri.substr(0,5) === '/html'? uri.slice(5) : uri;
        if (uri === '/') {
            uri = '/index.html';
        }
        var filename = path.join(process.cwd(), uri);
        var EXT = path.extname(filename).split('.')[1];
        var mimeType = mimeTypes[EXT];
        fs.exists(filename, function(exists) {
        	if (exists) {
        		header = {'Content-Type':mimeType};
        	}
        	res.writeHead(200, header);
        	var fileStream = fs.createReadStream(filename);
            if (filename.split('.')[1] !== 'ico') {
                console.log('Reading ...'+ filename);
            }
            fileStream.on('data', function (data) {
                res.write(data);
            });
            fileStream.on('end', function() {
                res.end();
            });
        });
	}).listen(port, host)
}());
