var http = require("http");
var url = require("url");
var mongo = require("mongodb");
var conn = new mongo.Server("localhost", 27017, {});
var	db =  new mongo.Db('lacopucha', conn, {});

function getParams(url){
	var vars = {};
	var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function wipeout() {
	db.collection('onlineusers',function(err,coll) {
		coll.find(function(err, cursor) {
			cursor.each(function(err, doc) {
				if (doc!=null) { 
					at = new Date().getTime();
					diff = (new Date().getTime() - doc.timestamp)/1000;
					if (diff > 290){
						coll.remove(doc);
						console.log("[ del ] "+doc.sess_id);
					}
					
				}
			});                    
		});	
	});
}

db.open(function(){
	var t = setInterval(wipeout,10000);	
});


function iniciar(route,handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var params = getParams(request.url);
		route(handle,pathname,db,params,request,response);
	}
	http.createServer(onRequest).listen(8080);
	console.log(new Date()+" Servidor Iniciado.");
}

exports.iniciar = iniciar;