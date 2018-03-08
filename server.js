config=require('./config.js')
http = require('http');
fs = require('fs');
var vlcService = require("droopy-vlc"),
    vlc = new vlcService("http://:"+config.VLCpassword+"@localhost:"+config.VLCport);

var currvol=0;

//https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration#Sample_HTTP_POST_Endpoint_Server

server = http.createServer( function(req, res) {
    if (req.method == 'POST') {
        console.log("Handling POST request...");
        res.writeHead(200, {'Content-Type': 'text/html'});
		
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
			if(JSON.parse(body).player){
				if(JSON.parse(body).player.state.health===0){	//if health is 0 (dead)
					if(currvol!==config.upvol){
						vlc.volume(config.upvol)
					}
				}else{
					if(currvol!==config.downvol){
						vlc.volume(config.downvol)
					}
				}
			}
        	res.end( '' );
        });
    }
    else{
        console.log("Not expecting other request types...");
        res.writeHead(200, {'Content-Type': 'text/html'});
		var html = '<html><body>HTTP Server at http://' + config.host + ':' + config.CSGOport + '</body></html>';
        res.end(html);
    }
});
 
server.listen(config.CSGOport, config.host);
console.log('Listening at http://' + config.host + ':' + config.CSGOport);