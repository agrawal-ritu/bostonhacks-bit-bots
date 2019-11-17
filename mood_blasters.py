import os
import base64
import json
import io
import google.cloud
from flask import Flask, request
from flask_cors import CORS, cross_origin
from libsoundtouch import discover_devices
from libsoundtouch import soundtouch_device
from libsoundtouch.utils import Source, Type
from google.cloud import vision
import io


# -- REST API FOR BOSE SOUNDTOUCH AI --
PLAY = "play"
PAUSE = "pause"
NEXT = "next"
BACK = "back"
SAD = "sad"
HAPPY = "happy"
MAD = "mad"
SURPRISED = "surprised"
app = Flask(__name__)


@app.route('/', methods=['POST'])
@cross_origin()
def hello():
    
    print('Decoding base64 string and storing it to local file')
    encoded_string = json.loads(request.data.decode('utf-8'))['image']
    imgdata = base64.b64decode(encoded_string)
    filename = 'converted_image.jpg'
    with open(filename, 'wb') as picture:
        picture.write(imgdata)

    print('Reading local file')
    client = vision.ImageAnnotatorClient()
    with io.open(filename, 'rb') as image_file:
        content = image_file.read()
    
    print('Calling Vision API')
    image = vision.types.Image(content=content)
    response = client.face_detection(image=image)
    faces = response.face_annotations

    likelihood_name = ('UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY',
                       'POSSIBLE', 'LIKELY', 'VERY_LIKELY')
    
    face = faces[0]
    print('Result:')
    print("Joy: " + likelihood_name[face.joy_likelihood])
    print("Sorrow: " + likelihood_name[face.sorrow_likelihood])
    print("Surprised: " + likelihood_name[face.surprise_likelihood])
    print("Anger: " + likelihood_name[face.anger_likelihood])

    vals = [face.joy_likelihood, face.sorrow_likelihood,
            face.surprise_likelihood, face.anger_likelihood]
    pairs = [[vals[0], HAPPY], [vals[1], SAD],
             [vals[2], SURPRISED], [vals[3], MAD]]

    strongest_emotion = max(pairs)[1]
    if not (max(pairs)[0] < 3):
        print("Chosen emotion: " + strongest_emotion)
        return "Chosen emotion: " + strongest_emotion
        button_response(strongest_emotion)
    else:
        print("No emotion chosen!")
        return "No emotion chosen!"
    

def button_response(input_val):
    try:
        if (input_val == HAPPY):
            STdevice.play_media(
                Source.SPOTIFY, 'spotify:track:60nZcImufyMA1MKQY3dcCH', os.environ['SPOTIFY_API_KEY'])
        elif (input_val == SAD):
            STdevice.play_media(
                Source.SPOTIFY, 'spotify:track:6ls5ulRydoPE7oWGPGBqFA', os.environ['SPOTIFY_API_KEY'])
        elif (input_val == MAD):
            STdevice.play_media(
                Source.SPOTIFY, 'spotify:track:3Q8HNCQq4NU8dd7qBv6m13', os.environ['SPOTIFY_API_KEY'])
        elif (input_val == SURPRISED):
            STdevice.play_media(
                Source.SPOTIFY, 'spotify:track:2w6zOxgxy8XZDCPcGtuYQY', os.environ['SPOTIFY_API_KEY'])
        elif (input_val == BACK):
            STdevice.previous_track()
        elif (input_val == NEXT):
            STdevice.next_track()
        elif (input_val == PLAY):
            STdevice.play()
        elif (input_val == PAUSE):
            STdevice.pause()
        else:
            return json.dumps({"status": "404", "message": "Desired action could not be found"})
        return json.dumps({"status": "200", "message": "Desired action recieved"})
    except:
        return json.dumps({"status": "400", "message": "The desired action could not be done (operation error)"})


if __name__ == '__main__':
    # Status object
    # device.status() will do an HTTP request. Try to cache this value if needed.

    # Commented until device in on network

    STdevice = soundtouch_device(os.environ['BOSE_IP'])
    #STdevice.power_on()
    status = STdevice.status()

    # app.run(debug=True)
    app.run()
