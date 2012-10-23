var server = require("./server");
var router = require("./router");
var requestHandlers = require("./handlers");

var handle = {}
handle["/_rtlc.gif"] = requestHandlers.loguser;
handle["/api/total.json"] = requestHandlers.total;
handle["/api/pages.json"] = requestHandlers.pages;
handle["/api/page.json"] = requestHandlers.page;

server.iniciar(router.route, handle);