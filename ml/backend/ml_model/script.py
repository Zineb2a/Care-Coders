import pandas as pd
import numpy as np
import logging
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from joblib import dump

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Load the data
def load_data(file_path):
    """Load and return the dataset."""
    return pd.read_csv(file_path)

# Preprocess data
def preprocess_data(df):
    """Preprocess the data for training."""
    df = df.dropna()
    df = df[(df["time_elapsed"] >= 0) & (df["avg_wait_time"] >= 0)]
    df["elapsed_ratio"] = df["time_elapsed"] / (df["avg_wait_time"] + 1e-5)
    return df

# Visualize the data
def visualize_data(df):
    """Create visualizations for the dataset."""
    # Distribution of triage categories
    plt.figure(figsize=(8, 5))
    df["triage_category"].value_counts().sort_index().plot(kind="bar", color="skyblue")
    plt.title("Distribution of Triage Categories")
    plt.xlabel("Triage Category")
    plt.ylabel("Number of Patients")
    plt.grid(axis="y", linestyle="--")
    plt.show()

    # Relationship between avg_wait_time and total_wait_time
    plt.figure(figsize=(8, 5))
    plt.scatter(df["avg_wait_time"], df["total_wait_time"], alpha=0.7, color="purple")
    plt.title("Average Wait Time vs. Total Wait Time")
    plt.xlabel("Average Wait Time")
    plt.ylabel("Total Wait Time")
    plt.grid()
    plt.show()

    # Distribution of total_wait_time
    plt.figure(figsize=(8, 5))
    df["total_wait_time"].plot(kind="hist", bins=20, color="orange", alpha=0.7)
    plt.title("Distribution of Total Wait Time")
    plt.xlabel("Total Wait Time")
    plt.ylabel("Frequency")
    plt.grid(axis="y", linestyle="--")
    plt.show()

# Create pipeline
def create_pipeline():
    """Create a pipeline with preprocessing and a RandomForestRegressor."""
    numeric_features = ["queue_position", "time_elapsed", "avg_wait_time", "workload", "elapsed_ratio"]
    categorical_features = ["triage_category"]

    numeric_transformer = Pipeline(steps=[("scaler", StandardScaler())])
    categorical_transformer = Pipeline(steps=[("onehot", OneHotEncoder(handle_unknown="ignore"))])

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, numeric_features),
            ("cat", categorical_transformer, categorical_features),
        ]
    )

    pipeline = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("model", RandomForestRegressor(random_state=42))
    ])
    return pipeline

# Train model
def train_model(df):
    """Train the RandomForest model and log its performance."""
    data = preprocess_data(df)

    # Features and target
    X = data.drop(columns=["total_wait_time", "id", "arrival_time", "current_phase", "imaging_status", "labs_status"])
    y = data["total_wait_time"]

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    pipeline = create_pipeline()

    param_grid = {
        "model__n_estimators": [100, 200],
        "model__max_depth": [10, 20, None],
        "model__min_samples_split": [2, 5, 10]
    }

    grid_search = GridSearchCV(pipeline, param_grid, cv=3, scoring="neg_mean_absolute_error", n_jobs=-1)
    grid_search.fit(X_train, y_train)

    # Best model
    best_model = grid_search.best_estimator_
    logging.info(f"Best Parameters: {grid_search.best_params_}")

    # Evaluate on the test set
    y_pred = best_model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)

    logging.info(f"Model Performance on Test Set: MAE={mae:.2f}, RMSE={rmse:.2f}, R²={r2:.2f}")

    # Save the model
    dump(best_model, "model_pipeline.joblib")
    logging.info("Model pipeline saved to 'model_pipeline.joblib'")

# Main function
if __name__ == "__main__":
    # Load data
    file_path = "fetched_data.csv"
    df = load_data(file_path)

    # Visualize data
    logging.info("Creating visualizations...")
    visualize_data(df)

    # Train model
    logging.info("Training the model...")
    train_model(df)
