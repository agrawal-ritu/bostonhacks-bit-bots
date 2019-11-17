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
SAD = "sad"
HAPPY = "happy"
MAD = "mad"
SURPRISED = "surprised"
app = Flask(__name__)


@app.route('/picture', methods=['POST'])
def play_based_on_feeling():
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
        button_response(strongest_emotion)
        return '{"message": "Chosen emotion: ' + strongest_emotion + '"}'
    else:
        print("No emotion chosen!")
        return '{"message": "No emotion chosen!"}'


@app.route('/play', methods=['POST'])
def play_song():
    print("Playing Song!")
    STdevice.play()
    return '{"message": "Success!"}'

@app.route('/pause', methods=['POST'])
def pause_song():
    print("Pausing Song!")
    STdevice.pause()
    return '{"message": "Success!"}'

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
    response.headers.add(
        'Access-Control-Allow-Headers', 'X-Requested-With')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                             'GET, POST, OPTIONS, PUT, DELETE')
    return response


def button_response(emotion):
    try:
        if (emotion == HAPPY):
            STdevice.play_media(
                Source.SPOTIFY, 'spotify:track:60nZcImufyMA1MKQY3dcCH', os.environ['SPOTIFY_API_KEY'])
        elif (emotion == SAD):
            STdevice.play_media(
                Source.SPOTIFY, 'spotify:track:5y788ya4NvwhBznoDIcXwK', os.environ['SPOTIFY_API_KEY'])
        elif (emotion == MAD):
            STdevice.play_media(
                Source.SPOTIFY, 'spotify:track:3Q8HNCQq4NU8dd7qBv6m13', os.environ['SPOTIFY_API_KEY'])
        elif (emotion == SURPRISED):
            STdevice.play_media(
                Source.SPOTIFY, 'spotify:track:4uLU6hMCjMI75M1A2tKUQC', os.environ['SPOTIFY_API_KEY'])
        elif (emotion == PLAY):
            STdevice.play()
        elif (emotion == PAUSE):
            STdevice.pause()
        else:
            return json.dumps({"status": "404", "message": "Desired action could not be found"})
    except:
        return "Error occured during operation"


if __name__ == '__main__':
    # Status object
    # device.status() will do an HTTP request. Try to cache this value if needed.

    STdevice = soundtouch_device(os.environ['BOSE_IP'])
    # STdevice.power_on()
    status = STdevice.status()

    # app.run(debug=True)
    app.run()
