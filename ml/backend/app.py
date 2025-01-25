import pandas as pd
import asyncio
import aiohttp
import random
import logging
from flask import Flask, jsonify, request
from joblib import load
import threading

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Flask app setup
app = Flask(__name__)

# Global variables for data
current_data = pd.DataFrame()
model = None
lock = threading.Lock()

# API base URL
BASE_URL = "http://127.0.0.1:3000/api/v1"

# Asynchronous API fetcher
async def fetch_data(session, endpoint):
    async with session.get(f"{BASE_URL}{endpoint}") as response:
        response.raise_for_status()
        return await response.json()

async def fetch_data_bulk(iterations=1, delay=1):
    """
    Asynchronously fetch data from the API in bulk.
    """
    all_data = []
    try:
        async with aiohttp.ClientSession() as session:
            for i in range(iterations):
                queue_data = await fetch_data(session, "/queue")
                stats_data = await fetch_data(session, "/stats/current")

                # Process each patient
                for patient in queue_data["patients"]:
                    triage_category = patient["triage_category"]
                    avg_wait_time = stats_data["averageWaitTimes"][str(triage_category)]
                    workload = sum([k * v for k, v in stats_data["categoryBreakdown"].items()])
                    time_elapsed = patient["time_elapsed"]
                    total_wait_time = avg_wait_time - time_elapsed

                    # Add noise/randomness to simulate real-world variability
                    time_elapsed += random.randint(-2, 2)
                    total_wait_time += random.randint(-5, 5)

                    all_data.append({
                        "triage_category": triage_category,
                        "queue_position": patient["queue_position"]["category"],
                        "time_elapsed": max(0, time_elapsed),
                        "avg_wait_time": avg_wait_time,
                        "workload": workload,
                        "total_wait_time": max(0, total_wait_time)
                    })

                logging.info(f"Fetched iteration {i+1}/{iterations}")
                await asyncio.sleep(delay)

        return pd.DataFrame(all_data)
    except Exception as e:
        logging.error(f"Error fetching data: {e}")
        return pd.DataFrame()

# Fetch data in the background
def fetch_data_background():
    global current_data
    while True:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        data = loop.run_until_complete(fetch_data_bulk(iterations=1, delay=5))  # Fetch data every 5 seconds
        if not data.empty:
            with lock:
                current_data = pd.concat([current_data, data]).reset_index(drop=True)
                logging.info(f"Current data updated: {len(current_data)} rows")

# Load the trained model
def load_model():
    global model
    try:
        model = load("model_pipeline.joblib")
        logging.info("Model loaded successfully.")
    except Exception as e:
        logging.error(f"Failed to load model: {e}")

# Flask routes
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "API is running"}), 200

@app.route("/data", methods=["GET"])
def get_data():
    """
    Return the latest fetched data.
    """
    with lock:
        if current_data.empty:
            return jsonify({"message": "No data available"}), 404
        return current_data.tail(10).to_json(orient="records"), 200

@app.route("/predict", methods=["POST"])
def predict():
    """
    Predict wait time using the trained model.
    """
    global model
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        input_data = request.get_json()
        df = pd.DataFrame([input_data])
        prediction = model.predict(df)[0]
        return jsonify({"predicted_wait_time": prediction}), 200
    except Exception as e:
        logging.error(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500

# Main execution
if __name__ == "__main__":
    # Load the model
    load_model()

    # Start background data fetching
    data_thread = threading.Thread(target=fetch_data_background, daemon=True)
    data_thread.start()

    # Run Flask app
    app.run(debug=True, port=5000)
