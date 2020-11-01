import json

data = {}
currentData = {}

def updateOrInsert(array, record):
    try:
        for index, item in enumerate(array):
            if (item["id"] == record["id"]):
                array.pop(index)
                array.insert(0, record)
                return array
            array.insert(0, record)
            return array
    except KeyError:
        return array
    except TypeError:
        return array

with open('_input.json') as inputFile:
    inputData = json.load(inputFile)
    data = inputData["results"];

with open('_target.json') as targetFile:
    targetData = json.load(targetFile)
    # currentData = targetData["hodan"]
    # if (len(currentData) == 0):
    #     currentData = data
    # else:
    #     while len(data) > 0:
    #         currentData = updateOrInsert(currentData, data.pop())
    #         pass
    targetData["hodan"] = data;

# data["features"].sort(key=extract_case, reverse=True)
with open('_output.json', 'w') as outputFile:
    json.dump(targetData, outputFile)
