import os

import requests as requests
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__, static_url_path='', static_folder='frontend/dist')
CORS(app)

NEWSAPI_URL = "https://newsapi.org/v2/everything?"


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/news')
def fetch_news():
    query = request.args.get('query')
    language = request.args.get('language')

    request_url = NEWSAPI_URL + f"q={query}&language={language}&apiKey={os.getenv('NEWSAPI_KEY')}"
    response = requests.get(request_url)
    response_json = response.json()

    if response_json["status"] == "ok":
        return jsonify(response_json["articles"])
    else:
        print(response_json["message"])
        return jsonify([])


if __name__ == '__main__':
    app.run()
