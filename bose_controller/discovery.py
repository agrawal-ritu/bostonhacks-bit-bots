from libsoundtouch import discover_devices

devices = discover_devices(timeout=2)


for device in devices:
    print(device.config.name + " - " + device.config.type)
