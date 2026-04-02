from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os
import gdown

app = Flask(__name__)
CORS(app)

def download_models():
    if not os.path.exists('movies.pkl'):
        print("Downloading movies.pkl...")
        gdown.download(
            'https://drive.google.com/uc?id=1cmVfq8RT02n3GLxyYTgze8gNINCo_N_3',
            'movies.pkl', quiet=False
        )
    if not os.path.exists('similarity.pkl'):
        print("Downloading similarity.pkl...")
        gdown.download(
            'https://drive.google.com/uc?id=1_okpQwMEjll81oH58wLYAKbeN6rUuRlL',
            'similarity.pkl', quiet=False
        )

download_models()

movies = pickle.load(open('movies.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))

@app.route('/recommend', methods=['GET'])
def recommend():
    movie = request.args.get('movie')
    try:
        movie_index = movies[movies['title'] == movie].index[0]
        distances = similarity[movie_index]
        movie_list = sorted(
            list(enumerate(distances)),
            reverse=True,
            key=lambda x: x[1]
        )[1:6]
        recommended = []
        for i in movie_list:
            recommended.append({
                'id': int(movies.iloc[i[0]].movie_id),
                'title': movies.iloc[i[0]].title
            })
        return jsonify({'recommendations': recommended})
    except:
        return jsonify({'error': 'Movie not found'}), 404

@app.route('/movies', methods=['GET'])
def get_movies():
    movie_list = movies['title'].tolist()
    return jsonify({'movies': movie_list})

if __name__ == '__main__':
    app.run(port=5001, debug=True)