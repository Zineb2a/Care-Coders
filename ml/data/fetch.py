import pandas as pd
import aiohttp
import asyncio
import random
import logging
import argparse

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# API base URL
BASE_URL = "http://127.0.0.1:3000/api/v1"

# Asynchronous API fetcher
async def fetch_data(session, endpoint):
    """
    Fetch data from a specific endpoint asynchronously.
    """
    try:
        async with session.get(f"{BASE_URL}{endpoint}") as response:
            response.raise_for_status()
            return await response.json()
    except Exception as e:
        logging.error(f"Error fetching {endpoint}: {e}")
        return None

async def fetch_data_batch(batch_size=50, delay=1):
    """
    Asynchronously fetch a batch of data from the API and process it.
    """
    all_data = []
    try:
        async with aiohttp.ClientSession() as session:
            for i in range(batch_size):
                logging.info(f"Fetching batch {i + 1}/{batch_size}")

                # Fetch queue and stats data
                queue_data = await fetch_data(session, "/queue")
                stats_data = await fetch_data(session, "/stats/current")

                # Skip if any fetch fails
                if not queue_data or not stats_data:
                    logging.error("Skipping batch due to missing data.")
                    continue

                # Process each patient
                for patient in queue_data["patients"]:
                    try:
                        triage_category = int(patient["triage_category"])
                        avg_wait_time = stats_data["averageWaitTimes"].get(str(triage_category), 0)
                        workload = sum(int(k) * int(v) for k, v in stats_data["categoryBreakdown"].items())
                        time_elapsed = int(patient["time_elapsed"])
                        total_wait_time = avg_wait_time - time_elapsed

                        # Check for 'investigations' field
                        investigations = patient["status"].get("investigations", {})
                        imaging_status = investigations.get("imaging", "none")
                        labs_status = investigations.get("labs", "none")

                        # Add randomness to simulate variability
                        time_elapsed += random.randint(-2, 2)
                        total_wait_time += random.randint(-5, 5)

                        # Append processed data
                        all_data.append({
                            "id": patient["id"],
                            "triage_category": triage_category,
                            "queue_position": patient["queue_position"]["category"],
                            "time_elapsed": max(0, time_elapsed),
                            "avg_wait_time": avg_wait_time,
                            "workload": workload,
                            "total_wait_time": max(0, total_wait_time),
                            "arrival_time": patient["arrival_time"],
                            "current_phase": patient["status"]["current_phase"],
                            "imaging_status": imaging_status,
                            "labs_status": labs_status,
                        })
                    except Exception as e:
                        logging.error(f"Error processing patient data: {e}")

                # Delay between API calls
                await asyncio.sleep(delay)

        return pd.DataFrame(all_data)
    except Exception as e:
        logging.error(f"Error during batch fetching: {e}")
        return pd.DataFrame()


# Save data to a CSV file
def save_data_to_csv(df, filename="fetched_data.csv"):
    """
    Save the DataFrame to a CSV file in append mode.
    """
    try:
        # Append to file, adding headers only if the file is new
        df.to_csv(filename, mode="a", header=not pd.io.common.file_exists(filename), index=False)
        logging.info(f"Data saved to {filename}")
    except Exception as e:
        logging.error(f"Error saving data to CSV: {e}")

# Main function for fetching, processing, and saving data
async def main(batch_size, delay, output_file):
    """
    Fetch, process, and save data from the API in batches.
    """
    data = await fetch_data_batch(batch_size=batch_size, delay=delay)
    if not data.empty:
        save_data_to_csv(data, output_file)
    else:
        logging.error("No data fetched. Skipping save.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch_size", type=int, default=50, help="Number of API fetch calls per batch")
    parser.add_argument("--delay", type=float, default=1, help="Delay between API calls (seconds)")
    parser.add_argument("--output_file", type=str, default="fetched_data.csv", help="Output CSV file")
    args = parser.parse_args()

    # Run the main function
    asyncio.run(main(args.batch_size, args.delay, args.output_file))
