# csgo-vlc-volume
Adjusts your VLC (https://github.com/videolan/vlc) playback volume depending on if you are alive or not in Counter-Strike: Global Offensive

### Required setup
#### CS:GO

Copy the `gamestate_integration_vlc.cfg` file to the following directory, where %STEAMAPPS% is the directory to the Steam Library that contains CS:GO (Default directory on Windows is `/Program Files (x86)/Steam/steamapps/`)

```
%STEAMAPPS%/common/Counter-Strike Global Offensive/csgo/cfg/
```

#### VLC
Now you have to configure the VLC web interface. To do this, go to the Preferences menu (under Tools) and select `All` under `Show settings` in the bottom left. Scroll to Interface and click on Main interfaces. Check the Web interface to enable it. Now expand the Main interfaces category and choose Lua. Set the password under `Lua HTTP`.

#### This Application

Clone this repo:
```
git clone https://github.com:Pigpog/csgo-vlc-volume.git
```
Assuming you have NodeJS and NPM installed, run this in its directory:
```
npm install
```
### IMPORTANT
Edit the `config.js` to match your setup.

## Run server.js with node and enjoy!
Your volume should lower when you are alive and should up when you die.
