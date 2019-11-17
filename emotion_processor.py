import os, base64, json, io, google.cloud
from flask import Flask, request
app = Flask(__name__)


@app.route('/', methods=['POST'])
def hello():
    encoded_string = json.loads(request.data.decode('utf-8'))['image']
    return "Success!"


if __name__ == '__main__':
    app.run(debug=True)