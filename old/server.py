from flask import Flask, render_template
app = Flask(__name__, static_url_path='')


@app.route('/')
def hello_world():
    return app.send_static_file('index.html')


@app.route('/view/<filename>')
def viewer(filename):
    return render_template('viewer.html')


if __name__ == '__main__':
    app.run()
