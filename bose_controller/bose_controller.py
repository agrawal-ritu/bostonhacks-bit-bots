# -- REST API FOR BOSE SOUNDTOUCH AI --
PLAY = "play"
PAUSE = "pause"
NEXT = "next"
BACK = "back"
SAD = "sad"
HAPPY = "happy"
MAD = "mad"
SURPRISED = "surprised"

import json
from libsoundtouch import discover_devices
from libsoundtouch import soundtouch_device
from libsoundtouch.utils import Source, Type

STdevice = soundtouch_device('192.168.1.14')
STdevice.power_on()

# Status object
# device.status() will do an HTTP request. Try to cache this value if needed.
status = STdevice.status()

def button_response(input_val):
    try:
        if (input_val == HAPPY):
            STdevice.play_media(Source.SPOTIFY, 'spotify:track:60nZcImufyMA1MKQY3dcCH', '31dlcuwpfbvet7ykhvmsdjytuhou')
        elif (input_val == SAD):
            STdevice.play_media(Source.SPOTIFY, 'spotify:track:6ls5ulRydoPE7oWGPGBqFA', '31dlcuwpfbvet7ykhvmsdjytuhou')
        elif (input_val == MAD):
            STdevice.play_media(Source.SPOTIFY, 'spotify:track:6RRNNciQGZEXnqk8SQ9yv5', '31dlcuwpfbvet7ykhvmsdjytuhou')
        elif (input_val == SURPRISED):
            STdevice.play_media(Source.SPOTIFY, 'spotify:track:2w6zOxgxy8XZDCPcGtuYQY', '31dlcuwpfbvet7ykhvmsdjytuhou')
        elif (input_val == BACK):
            STdevice.previous_track()
        elif (input_val == NEXT):
            STdevice.next_track()
        elif (input_val == PLAY):
            STdevice.play()
        elif (input_val == PAUSE):
            STdevice.pause()
        else:
            return json.dumps({"status":"404", "message":"Desired action could not be found"})
        return json.dumps({"status":"200", "message":"Desired action recieved"})
    except:
        return json.dumps({"status":"400", "message":"The desired action could not be done (operation error)"})

button_response(MAD)