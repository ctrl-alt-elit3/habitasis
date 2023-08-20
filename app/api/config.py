
class Config:
    def get():
        return {
            "dataPoints": {
                "fuelPrice": {
                    "fileName": "fuel-check_june23_cleaned.csv",
                    "postcodeCol": "Postcode",
                    "valueCol": "Price",
                    "higherIsBetter": false
                },
                "vehicleRego": {
                    "fileName": "regvehiclesJun2022.csv",
                    "postcodeCol": "Postcode",
                    "valueCol": "All Light",
                    "higherIsBetter": false
                },
                "rentValue": {
                    "fileName": "rentsByPostcode.csv",
                    "postcodeCol": "Postcode",
                    "valueCol": "Weekly Rent",
                    "higherIsBetter": false
                }
            }
        }

