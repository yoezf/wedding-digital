from flask import Flask

app = Flask(__name__)

@app.route("/index.html")
def home():
    return "Halo dari Flask!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)