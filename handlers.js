var registro = require("./mongohandler");
var rtimg_gif = require('fs').readFileSync('/opt/node/rt-lacopucha/_rtlc.gif');

function servegif(response){
	response.writeHead(200, {'Content-Type': 'image/gif' });
	response.end(rtimg_gif, 'binary');
	response.end();
}

function loguser(request,response,db,params) {
	servegif(response);
	registro.users.insert(request,db,params);
}

function total(request,response,db,params) {
	registro.users.totalonline(response,db,params);
}

function page(request,response,db,params) {
	registro.users.singlepage(response,db,params);
}

function pages(request,response,db,params) {
	registro.users.totalpages(response,db,params);
}

exports.loguser = loguser;
exports.total = total;
exports.page = page;
exports.pages = pages;