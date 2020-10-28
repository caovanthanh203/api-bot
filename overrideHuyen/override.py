import json

data = {}

# def extract_case(json):
#     try:
#         return int(json["attributes"]['Confirmed'])
#     except KeyError:
#         return 0

with open('_input.json') as inputFile:
    inputData = json.load(inputFile)
    data = inputData["results"];

with open('_target.json') as targetFile:
    targetData = json.load(targetFile)
    targetData["huyen"] = data;

# data["features"].sort(key=extract_case, reverse=True)
with open('_output.json', 'w') as outputFile:
    json.dump(targetData, outputFile)
