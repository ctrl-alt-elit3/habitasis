import time
import pandas as pd
import json
import openai
import os
import re
import inflect
from collections import defaultdict
from decimal import Decimal
from typing import Dict, List, Tuple, Union
from flask import Flask, request, jsonify
from flask_cors import CORS

# Setup
app = Flask(__name__)
CORS(app)


@app.route("/test", methods=["POST"])
def get_info_api():
    data = request.get_json()
    postcode = data.get("input")
    print("Input: ", postcode)
    response = {
        "breakdown": {
            "fuelPrice": {
                "fromPostcode": 159.6,
                "average": 184.68709873957664,
                "weightedPostcode": 0.86,
            },
            "vehicleRego": {
                "fromPostcode": 14316.0,
                "average": 22365.727422003285,
                "weightedPostcode": 0.64,
            },
            "rentValue": {
                "fromPostcode": 76.0,
                "average": 676.2095440161105,
                "weightedPostcode": 0.11,
            },
        },
        "postcode": "2040",
        "score": 0.54,
    }
    # Return the JSON response object
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
