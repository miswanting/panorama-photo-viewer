import os

import socketio
from flask import Flask

sio = socketio.Server(async_mode='threading')
@sio.event
def connect(sid, environ):
    print('connect:', sid)


@sio.event
def disconnect(sid):
    print('disconnect:', sid)


@sio.event
def pkg(sid, data):
    # handle the message
    if data['cmd'] == 'get':
        new_pkg = {
            'cmd': 'res_list',
            'data': []
        }
        for root, dirs, files in os.walk('../res/'):
            for each in files:
                new_item = {
                    'name': each,
                    'des': '',
                    'vipath': '',
                    'path': root+each
                }
                new_pkg['data'].append(new_item)
        sio.emit('pkg', new_pkg)
    return "OK", sid, data


static_files = {
    '/': '../F/dist/index.html',
    '/index.js': '../F/dist/index.js',
    '/res/test.jpg': '../res/test.jpg'
}

if __name__ == '__main__':
    app = Flask(__name__)
    app.wsgi_app = socketio.WSGIApp(
        sio,
        app.wsgi_app,
        static_files=static_files)
    app.run(host='0.0.0.0', threaded=True)
