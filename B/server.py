import os

# import socketio
from flask import Flask, make_response, send_file
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'test'
sio = SocketIO(app)

# sio = socketio.Server(async_mode='threading')


@app.route('/')
def index():
    return make_response(send_file('../F/dist/index.html'))


@app.route('/index.js')
def main():
    return make_response(send_file('../F/dist/index.js'))


@app.route('/res/<filepath>')
def get_res_files(filepath):
    """
    # 返回资源文件
    """
    f = open('../res/{}'.format(filepath), 'rb')
    # with open('../res/{}'.format(filepath), 'rb') as f:
    res = make_response(send_file(f, mimetype='image/jpg'))
    return res


@sio.on('connect')
def connect():
    """
    # 默认事件
    """
    print('connect:')


@sio.on('disconnect')
def disconnect():
    """
    # 默认事件
    """
    print('disconnect:')


# @sio.event
@sio.on('pkg')
def pkg(data):
    # handle the message
    if data['cmd'] == 'get':
        # 获取res文件列表
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
    return "OK", data


static_files = {
    '/': '../F/dist/index.html',
    '/index.js': '../F/dist/index.js'
}

if __name__ == '__main__':
    sio.run(app)
    # app.wsgi_app = socketio.WSGIApp(
    #     sio,
    #     app.wsgi_app,
    #     static_files=static_files)
    # app.run(host='0.0.0.0', threaded=True)
