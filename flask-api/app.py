from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os
import gdown

app = Flask(__name__)
CORS(app)

def download_models():
    try:
        if not os.path.exists('movies.pkl'):
            print("Downloading movies.pkl...")
            gdown.download(
                id='1cmVfq8RT02n3GLxyYTgze8gNINCo_N_3',
                output='movies.pkl',
                quiet=False
            )
            print("movies.pkl downloaded!")

        if not os.path.exists('similarity.pkl'):
            print("Downloading similarity.pkl...")
            gdown.download(
                id='1_okpQwMEjll81oH58wLYAKbeN6rUuRlL',
                output='similarity.pkl',
                quiet=False
            )
            print("similarity.pkl downloaded!")

        print("All models ready!")

    except Exception as e:
        print(f"Download error: {e}")

download_models()

try:
    movies = pickle.load(open('movies.pkl', 'rb'))
    similarity = pickle.load(open('similarity.pkl', 'rb'))
    print("Models loaded successfully!")
except Exception as e:
    print(f"Model load error: {e}")
    movies = None
    similarity = None

@app.route('/')
def home():
    return jsonify({"message": "CineMatch ML API is running!"})

@app.route('/health')
def health():
    return jsonify({
        "status": "ok",
        "models_loaded": movies is not None and similarity is not None
    })

@app.route('/movies', methods=['GET'])
def get_movies():
    if movies is None:
        return jsonify({'error': 'Model not loaded'}), 500
    try:
        movie_list = movies['title'].tolist()
        return jsonify({'movies': movie_list})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/recommend', methods=['GET'])
def recommend():
    if movies is None or similarity is None:
        return jsonify({'error': 'Model not loaded'}), 500

    movie = request.args.get('movie')
    if not movie:
        return jsonify({'error': 'Movie name is required'}), 400

    try:
        movie = movie.lower().strip()
        matches = movies[movies['title'].str.lower().str.contains(movie)]

        if matches.empty:
            return jsonify({'error': 'Movie not found'}), 404

        movie_index = matches.index[0]
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

    except Exception as e:
        print(f"Recommend error: {e}")
        return jsonify({'error': 'Something went wrong'}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)