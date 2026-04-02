from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os
import gdown

app = Flask(__name__)
CORS(app)

# ---------------- DOWNLOAD MODELS ----------------
def download_models():
    try:
        if not os.path.exists('movies.pkl'):
            print("⬇️ Downloading movies.pkl...")
            gdown.download(
                'https://drive.google.com/uc?id=1cmVfq8RT02n3GLxyYTgze8gNINCo_N_3',
                'movies.pkl',
                quiet=False,
                fuzzy=True
            )

        if not os.path.exists('similarity.pkl'):
            print("⬇️ Downloading similarity.pkl...")
            gdown.download(
                'https://drive.google.com/uc?id=1_okpQwMEjll81oH58wLYAKbeN6rUuRlL',
                'similarity.pkl',
                quiet=False,
                fuzzy=True
            )

        print("✅ Models downloaded successfully!")

    except Exception as e:
        print("❌ Error downloading models:", e)

# ---------------- LOAD MODELS ----------------
download_models()

try:
    movies = pickle.load(open('movies.pkl', 'rb'))
    similarity = pickle.load(open('similarity.pkl', 'rb'))
    print("✅ Models loaded successfully!")
except Exception as e:
    print("❌ Error loading models:", e)
    movies = None
    similarity = None


# ---------------- ROUTES ----------------

@app.route('/')
def home():
    return jsonify({"message": "🎬 CineMatch ML API is running!"})


@app.route('/recommend', methods=['GET'])
def recommend():
    movie = request.args.get('movie')

    # ❗ Input validation
    if not movie:
        return jsonify({'error': 'Movie name is required'}), 400

    try:
        # Clean input
        movie = movie.lower().strip()

        # 🔥 Smart search (partial + case insensitive)
        matches = movies[movies['title'].str.lower().str.contains(movie)]

        if matches.empty:
            return jsonify({'error': 'Movie not found'}), 404

        # Take best match
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
        print("❌ ERROR:", e)
        return jsonify({'error': 'Something went wrong'}), 500


@app.route('/movies', methods=['GET'])
def get_movies():
    try:
        movie_list = movies['title'].tolist()
        return jsonify({'movies': movie_list})
    except Exception as e:
        print("❌ ERROR:", e)
        return jsonify({'error': 'Cannot fetch movies'}), 500


# ---------------- RUN SERVER ----------------
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)