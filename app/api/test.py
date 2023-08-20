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
import json

from scores import Scores

# Setup
app = Flask(__name__)
CORS(app)


@app.route("/test", methods=["POST"])
def get_info_api():
    data = request.get_json()
    postcode = data.get("input")
    print("Input: ", postcode)

    # connecting to score logic
    scores = Scores()
    scores.calculate(postcode)
    response = scores.getResponse()
    response = json.loads(response)
#     response = {

#   "breakdown": {
#     "fuelPrice": {
#       "fromPostcode": 184.69,
#       "estimatedData": True,
#       "average": 184.69,
#       "weightedPostcode": 1.0
#     },
#     "vehicleRego": {
#       "fromPostcode": 22365.73,
#       "estimatedData": True,
#       "average": 22365.73,
#       "weightedPostcode": 1.0
#     },
#     "rentValue": {
#       "fromPostcode": 676.21,
#       "estimatedData": True,
#       "average": 676.21,
#       "weightedPostcode": 1.0
#     }
#   },
#   "postcode": "",
#   "score": 1.0
# }
    # Return the JSON response object
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
