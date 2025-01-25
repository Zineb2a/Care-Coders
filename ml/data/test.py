import requests
from joblib import load
from io import BytesIO

MODEL_URL = "https://storage.googleapis.com/ml-1234/model_pipeline.joblib"

try:
    print(f"Attempting to fetch model from: {MODEL_URL}")
    response = requests.get(MODEL_URL)
    response.raise_for_status()
    print("Model fetched successfully!")
    model = load(BytesIO(response.content))
    print("Model loaded successfully!")
except requests.exceptions.RequestException as req_error:
    print(f"Request error while fetching model: {req_error}")
except Exception as e:
    print(f"Unexpected error while loading model: {e}")
