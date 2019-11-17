import os, base64, json, io, google.cloud
from flask import Flask, request
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
def hello():
    encoded_string = json.loads(request.data.decode('utf-8'))['image']
    client = vision.ImageAnnotatorClient()

    imgdata = base64.b64decode(encoded_string)
    filename = 'converted_image.jpg'
    with open(filename, 'wb') as picture:
        picture.write(imgdata)

    client = vision.ImageAnnotatorClient()

    with io.open(filename, 'rb') as image_file:
            content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.face_detection(image=image)
    faces = response.face_annotations

    likelihood_name = ('UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE', 'LIKELY', 'VERY_LIKELY')
    print(type(faces))
    # print('Faces:')
    # for face in faces:
    #     print('anger: {}'.format(likelihood_name[face.anger_likelihood]))
    #     print('joy: {}'.format(likelihood_name[face.joy_likelihood]))
    #     print('surprise: {}'.format(likelihood_name[face.surprise_likelihood]))

    #     vertices = (['({},{})'.format(vertex.x, vertex.y)
    #                 for vertex in face.bounding_poly.vertices])

    #     print('face bounds: {}'.format(','.join(vertices)))

    return "Success!"


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




if __name__ == '__main__':
    # Status object
    # device.status() will do an HTTP request. Try to cache this value if needed.

    # Commented until device in on network

    # STdevice = soundtouch_device('192.168.1.14')
    # STdevice.power_on()
    # status = STdevice.status()
    # button_response(MAD)
    
    # app.run(debug=True)
    app.run()