import base64

encoded_string = ""
with open("download.jpeg", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

# print(encoded_string)
with open('image_base64.txt', 'w') as text:
    text.write(encoded_string.decode("utf-8"))

imgdata = base64.b64decode(encoded_string)
filename = 'converted_image.jpg'  # I assume you have a way of picking unique filenames
with open(filename, 'wb') as picture:
    picture.write(imgdata)

