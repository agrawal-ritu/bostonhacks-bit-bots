# -- REST API FOR BOSE SOUNDTOUCH AI --
PLAY = "play"
PAUSE = "pause"
NEXT = "next"
BACK = "back"

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
STdevice.play()
STdevice.next_track()
STdevice.previous_track()
STdevice.set_volume(device.volume() + 10)
STdevice.set_volume(device.volume() - 10)


if __name__ == '__main__':
    pass

