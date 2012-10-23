var users = {
	insert: function(req,db,params) {
		db.collection('onlineusers',function(err,coll) {
		    if ( typeof params._rtlcs != "undefined" ) {
		        addr = req.connection.remoteAddress;
				var new_sess = {
				 "url":params._rtlcu,
				 "sess_id":params._rtlcs,
				 "ip":addr,
				 "timestamp": new Date().getTime()
				}
				var rep_sess = {
				 "url":params._rtlcu,
				 "timestamp": new Date().getTime()
				}
				var old_sess = {
				 "sess_id":params._rtlcs
				}
				var opts = {};
				
				coll.findAndModify(old_sess, 
								[['_id','asc']], 
								{$set: rep_sess},
								opts,
								function(error,doc){
									if (doc==null) {
										coll.insert(new_sess,function(){
											console.log("[ add ] "+params._rtlcs+" -> "+params._rtlcu+" -> "+req.headers['user-agent']);
										});
									} else {
										console.log("[ mod ] "+params._rtlcs+" -> "+params._rtlcu);
									}
				});
			}
		});

	},
	singlepage: function(response,db,params) {
		response.writeHead(200, {"Content-Type": "application/json"});
		db.collection('onlineusers',function(err,coll) {
			coll.find({"url":params.id}).count(function(err,count){
	        	total = {};
	        	total['totalOnline'] = count;
	        	if (params.callback==undefined)
	        		response.end(JSON.stringify(total));
	        	else
	        		response.end(params.callback+"("+JSON.stringify(total)+")");
	        });
		});
	},
	totalonline: function(response,db,params){
		response.writeHead(200, {"Content-Type": "application/json"});
		db.collection('onlineusers',function(err,coll) {
			coll.find().count(function(err,count){
	        	total = {};
	        	total['totalOnline'] = count;
	        	if (params.callback==undefined)
	        		response.end(JSON.stringify(total));
	        	else
	        		response.end(params.callback+"("+JSON.stringify(total)+")");
	        });
		});

	},
	totalpages: function(response,db,params){
		response.writeHead(200, {"Content-Type": "application/json"});
		db.collection('onlineusers',function(err,coll) {
			var reduce = function (key, value) {
			    var sum = 0;
			    value.forEach(function (v) {
			    	sum++;
			    });
			    return sum;
			}
			var map = function () {
				if (this.value>1)
			    	emit(this.url, this.value);
			    else
			    	emit(this.url, "1");
			}
			reduce.toString();
			coll.mapReduce(map,reduce,{out:{inline:0},verbose:true},function(err,data){
				if (params.callback==undefined)
	        		response.end(JSON.stringify(data));
	        	else
	        		response.end(params.callback+"("+JSON.stringify(data)+")");
			});
		});
	}
	

}

exports.users = users;