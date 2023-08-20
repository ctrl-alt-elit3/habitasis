#!/usr/bin/env python3

from data import Data
from config import Config
import json

class Scores:

    def calculate(self, postcode):
        self.data_object = Data()
        self.data_object.load_data()
        self.response = {}
        self.data_definitions = Config.get()["dataPoints"]
        self.postcode = postcode
        self.response["breakdown"] = {}
        for key, _ in self.data_definitions.items():
            from_postcode = self.data_object.get_data(key, postcode)
            average = self.data_object.get_average(key)
            if from_postcode is None:
                incomplete = True
                from_postcode = average
            else:
                incomplete = False
            weighted_postcode = round(from_postcode / average, 2)
            self.response["breakdown"][key] = {}
            self.response["breakdown"][key]["fromPostcode"] = from_postcode
            self.response["breakdown"][key]["estimatedData"] = incomplete
            self.response["breakdown"][key]["average"] = average
            self.response["breakdown"][key]["weightedPostcode"] = weighted_postcode
        self.response["postcode"] = postcode
        self.response["score"] = self.calculate_score()

    def calculate_score(self):
        output = []
        for key, _ in self.data_definitions.items():
            output.append(self.response["breakdown"][key]["weightedPostcode"])
        return min(100, int(sum(output) / len(output) * 100))

    def getResponse(self):
        return json.dumps(self.response, indent=2)

if __name__ == "__main__":
    scores = Scores()
    scores.calculate("2040")
    print(scores.getResponse())