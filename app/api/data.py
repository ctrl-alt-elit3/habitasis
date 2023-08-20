import csv
import json

import config

class Data:

    def get_relative_path(path):
        return f"./data/{path}"

    def load_data(self):
        self.data_definitions = Config.get()
        self.data = {}
        for key, val in self.data_definitions.items():
            rows = []
            with open(Data.get_relative_path(val["fileName"]), 'r') as csv_file:
                reader = csv.reader(csv_file)
                for row in reader:
                    rows.append(row)
            self.data[key] = rows

    def get_data(self, data_file, postcode):
        postcode_list = self.data[data_file]
        headers = postcode_list[0]
        postcode_idx = headers.index(self.data_definitions[data_file]["postcodeCol"])
        value_idx = headers.index(self.data_definitions[data_file]["valueCol"])
        for row in postcode_list:
            if row[postcode_idx] == postcode:
                return float(row[value_idx])
        return None

    def get_values_only(self, data_file):
        postcode_list = self.data[data_file]
        headers = postcode_list[0]
        value_idx = headers.index(self.data_definitions[data_file]["valueCol"])
        out = []
        for row in postcode_list[1:]:
            out.append(row[value_idx])
        return out

    def get_average(self, data_file):
        values = list(map(float, self.get_values_only(data_file)))
        return round(sum(values) / len(values), 2)
            
# if __name__ == "__main__":
#     data = Data()
#     data.load_data()
#     post = data.get_data("fuelPrice", "2040")
#     avg = data.get_average("fuelPrice")
#     print(post / avg)
