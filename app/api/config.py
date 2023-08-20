
class Config:
    def get():
        return {
            "dataPoints": {
                "fuelPrice": {
                    "fileName": "fuel-check_june23_cleaned.csv",
                    "postcodeCol": "Postcode",
                    "valueCol": "Price",
                    "higherIsBetter": False
                },
                "vehicleRego": {
                    "fileName": "regvehiclesJun2022.csv",
                    "postcodeCol": "Postcode",
                    "valueCol": "All Light",
                    "higherIsBetter": False
                },
                "rentValue": {
                    "fileName": "rentsByPostcode.csv",
                    "postcodeCol": "Postcode",
                    "valueCol": "Weekly Rent",
                    "higherIsBetter": False
                }
            }
        }

