from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
import logging

# Initialize Flask app
app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Load the trained model
try:
    model = load("model_pipeline.joblib")
    logging.info("Model loaded successfully.")
except Exception as e:
    logging.error(f"Error loading model: {e}")
    model = None

# Define a default route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Prediction API!", "status": "API is running"}), 200

# Define a health check endpoint
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "API is running"}), 200

# Define a prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    if not model:
        logging.error("Model is not loaded. Cannot make predictions.")
        return jsonify({"error": "Model not loaded. Check server logs for details."}), 500

    try:
        # Get JSON input
        input_data = request.get_json()
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
        return jsonify({"predicted_wait_time": prediction}), 200
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=1234, debug=True)
