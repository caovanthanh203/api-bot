import json
import datetime

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

def extract_case(json):
    try:
        return json["timestamp"]
    except KeyError:
        return 0

def timestamp(string):
	timestr = string[:-6]
	try:
		datetimeObj = datetime.datetime.strptime(timestr, "%Y-%m-%dT%H:%M:%S")
		return (datetimeObj-datetime.datetime(1970,1,1)).total_seconds()
	except ValueError:
		try:
			datetimeObj = datetime.datetime.strptime(timestr, "%Y-%m-%dT%H:%M:%S.%f")
			return (datetimeObj-datetime.datetime(1970,1,1)).total_seconds()
		except ValueError:
			return 0

with open('_input.json') as inputFile:
    inputData = json.load(inputFile)
    data = inputData["results"];
    for index, item in enumerate(data):
    	item["timestamp"] = timestamp(item["update_time"])
    	data[index] = item

with open('_target.json') as targetFile:
    targetData = json.load(targetFile)
    # currentData = targetData["cuuho"]
    # if (len(currentData) == 0):
    #     currentData = data
    # else:
    #     while len(data) > 0:
    #         currentData = updateOrInsert(currentData, data.pop())
    #         pass
    targetData["cuuho"] = data;

# print(parse(data[1]["update_time"]).datetime())
targetData["cuuho"].sort(key=extract_case, reverse=True)
with open('_output.json', 'w') as outputFile:
    json.dump(targetData, outputFile)
