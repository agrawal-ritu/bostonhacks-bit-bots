# -- REST API FOR BOSE SOUNDTOUCH AI --
PLAY = "play"
PAUSE = "pause"
NEXT = "next"
BACK = "back"
SAD = "sad"
HAPPY = "happy"
MAD = "mad"

from libsoundtouch import discover_devices
from libsoundtouch import soundtouch_device
from libsoundtouch.utils import Source, Type

devices = discover_devices(timeout=2)
STdevice = soundtouch_device('192.168.1.14')
STdevice.power_on()

# Status object
# device.status() will do an HTTP request. Try to cache this value if needed.
status = STdevice.status()

# Test the following commands
STdevice.pause()
#STdevice.play()
#STdevice.next_track()
#STdevice.previous_track()
#STdevice.set_volume(device.volume() + 10)
#STdevice.set_volume(device.volume() - 10)
#device.play_media(Source.SPOTIFY, 'spotify:track:5J59VOgvclrhLDYUoH5OaW', 'moyoonthego')
#device.play_url('https://www.youtube.com/watch?v=886A2ErYpQk')

def button_response(input_val):
    if (input_val == HAPPY):
        device.play_media(Source.SPOTIFY, 'spotify:track:5J59VOgvclrhLDYUoH5OaW', 'moyoonthego')
    elif (input_val == SAD):
        device.play_url('https://www.youtube.com/watch?v=886A2ErYpQk')
    elif (input_val == MAD):
        device.play_url('https://www.youtube.com/watch?v=886A2ErYpQk')
    elif (input_val == BACK):
        STdevice.previous_track()
    elif (input_val == NEXT):
        STdevice.next_track()
    elif (input_val == PLAY):
        STdevice.play()
    elif (input_val == PAUSE):
        STdevice.pause()


if __name__ == '__main__':
    pass

