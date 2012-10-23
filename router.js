function route(handle, pathname, db, params, request, response) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](request,response,db,params);
  } else {
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;