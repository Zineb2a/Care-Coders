from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import pandas as pd
import logging
import os
import requests
from io import BytesIO

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Add CORS support if needed

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Google Cloud Storage model URL
MODEL_URL = "https://storage.googleapis.com/ml-1234/model_pipeline.joblib"


# Load the trained model dynamically from GCS
def load_model_from_gcs():
    try:
        logging.info(f"Attempting to fetch model from: {MODEL_URL}")
        response = requests.get(MODEL_URL)
        response.raise_for_status()  # Ensure the request was successful
        model = load(BytesIO(response.content))
        logging.info("Model loaded successfully from GCS.")
        return model
    except requests.exceptions.RequestException as req_error:
        logging.error(f"Request error while fetching model: {req_error}")
    except Exception as e:
        logging.error(f"Unexpected error while loading model: {e}")
    return None


# Load model on app start
model = load_model_from_gcs()

# Define a default route
@app.route("/", methods=["GET"])
def home():
    logging.info("Received request on '/' route.")
    return jsonify({"message": "Welcome to the Prediction API!", "status": "API is running"}), 200

# Define a health check endpoint
@app.route("/health", methods=["GET"])
def health_check():
    logging.info("Health check endpoint accessed.")
    if model:
        return jsonify({"status": "API is running", "model_status": "LOADED"}), 200
    return jsonify({"status": "API is running", "model_status": "NOT LOADED"}), 500

# Define a prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    if not model:
        logging.error("Model is not loaded. Cannot make predictions.")
        return jsonify({"error": "Model not loaded. Check server logs for details."}), 500

    try:
        # Get JSON input
        input_data = request.get_json()
        logging.info(f"Received prediction request: {input_data}")
        
        if not input_data:
            raise ValueError("No input data provided.")

        # Convert input to DataFrame
        df = pd.DataFrame([input_data])

        # Validate required columns
        required_columns = ["queue_position", "triage_category", "time_elapsed", "avg_wait_time", "workload", "elapsed_ratio"]
        if not all(col in df.columns for col in required_columns):
            missing_cols = list(set(required_columns) - set(df.columns))
            raise ValueError(f"Missing required input fields: {missing_cols}")

        # Make prediction
        prediction = model.predict(df)[0]
        logging.info(f"Prediction successful: {prediction}")
        return jsonify({"predicted_wait_time": prediction}), 200
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    # Use dynamic port for deployment; default to 1234 for local testing
    port = int(os.environ.get("PORT", 1234))
    app.run(host="0.0.0.0", port=port, debug=True)
