
import csv
import json
import os
 
# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
     
    # create a dictionary
    data = []
     
    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf, delimiter=',')
         
        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
             
            # Assuming a column named 'No' to
            # be the primary key
            video = {}
            video['id'] = rows['id']
            video['originalLink'] = rows['Original Link']
            video['categories'] = rows['Categories'].lower().split(',')
            video['categories'] = [item.strip() for item in video['categories']]
            
            video['tags']=[]
            for key, value in rows.items():
                if key in ['OriginalLink','Source','Categories'] or value != 'x' :
                    continue
                video['tags'].append(key.strip().lower())
            data.append(video)
    return data

def write_json(data):
    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
         
# Driver Code
 
# Decide the two file paths according to your
# computer system

def write_whole_csv(data):
    def get_tags(x):
        return x['tags']
    all_tags = list(map(get_tags,data))
    flatArray = [item for sublist in all_tags for item in sublist]
    all_tags = sorted(set(flatArray))

    with open('all_videos.csv', 'w',newline='') as f:
        writer = csv.writer(f)
        header = ['id','Original Link','Categories'] + all_tags # first row
        writer.writerow(header)
        for element in data:
            tags = ['x' if item in element['tags'] else '' for item in all_tags]
            row = [element['id'],element['originalLink'], (',').join(element['categories'])] + tags
            writer.writerow(row)
jsonFilePath = r'videos.json'
 
all_json = []
# Call the make_json function
#
for file in os.listdir("./csv"):
    if file.startswith('caro masterarbeit'):
        csvFilePath = f'./csv/{file}'
        all_json = all_json + make_json(csvFilePath, jsonFilePath)
write_json(all_json)
write_whole_csv(all_json)
