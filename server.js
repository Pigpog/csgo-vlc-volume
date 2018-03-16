config=require('./config.js')
http = require('http');
fs = require('fs');
var vlcService = require("droopy-vlc"),
    vlc = new vlcService("http://:"+config.VLCpassword+"@localhost:"+config.VLCport);
var spawn = require("child_process").spawn
var currvol=0;
let lightsOn=false;

//https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration#Sample_HTTP_POST_Endpoint_Server
function toggleLights(alive){
	if(alive && !lightsOn){
		spawn('python',["toggle.py"]);
		lightsOn=true
	}else if(!alive && lightsOn){
		spawn('python',["toggle.py"]);
		lightsOn=false
	}
}
function toggleVolume(up){
	if(up && currvol!==config.upvol){
		vlc.volume(config.upvol)
		currvol=config.upvol
	}else if(!up && currvol!==config.downvol){
		vlc.volume(config.downvol)
		currvol=config.downvol
	}
}
server = http.createServer( function(req, res) {
    if (req.method == 'POST') {
        console.log("Handling POST request...");
        res.writeHead(200, {'Content-Type': 'text/html'});
		
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
			bodyParsed=JSON.parse(body);
			if(bodyParsed.player){
					console.log("youre playing")
					if(bodyParsed.player.state.health===0){	//if health is 0 (dead)
						if(currvol!==config.upvol){
							toggleVolume(true)
							toggleLights(false)
						}
					}else{
						if(currvol!==config.downvol){
							toggleVolume(false)
							toggleLights(true)
						}
					}
			}
			if(bodyParsed.round){
				if(bodyParsed.round.phase==="over"){
					vlc.volume(config.upvol)
					toggleLights(false)
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
