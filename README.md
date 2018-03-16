# csgo-vlc-volume Keyboard lights edition
### (use master branch for just volume)
Adjusts your VLC (https://github.com/videolan/vlc) playback volume and toggles your keyboard lights (using the Scroll Lock key) depending on if you are alive or not in Counter-Strike: Global Offensive, or if the round ends.

### Required setup
#### CS:GO

Copy the `gamestate_integration_vlc.cfg` file to the following directory, where %STEAMAPPS% is the directory to the Steam Library that contains CS:GO (Default directory on Windows is `/Program Files (x86)/Steam/steamapps/`)

```
%STEAMAPPS%/common/Counter-Strike Global Offensive/csgo/cfg/
```

#### VLC
Now you have to configure the VLC web interface. To do this, go to the Preferences menu (under Tools) and select `All` under `Show settings` in the bottom left. Scroll to Interface and click on Main interfaces. Check the Web interface to enable it. Now expand the Main interfaces category and choose Lua. Set the password under `Lua HTTP`.

#### Python (only for keyboard lighting)
Tested on Python 2.7. Python is needed because NodeJS cannot send key signals natively.
```
pip install keyboard
```

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
Your volume should lower when you are alive and should up when you die, or when a round ends.
