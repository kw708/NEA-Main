#from flask import Flask, request, jsonify, send_from_directory, render_template
#import os 


#app = Flask(__name__)

#UPLOAD_FOLDER = 'NOTES_FOLDER'
#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#os.makedirs(UPLOAD_FOLDER, exist_ok=True)
#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#@app.route('/')
#def notes():
   #return render_template('profile.html')

#daily target
#@app.route('/api/daily_target', methods=['GET', 'POST'])
#def daily_target():
    #if request.method == 'POST':
       # data = request.json 
        #daily_target = data('daily_target')
        #return jsonify({'message': f'Daily target set to {daily_target}'}), 200 
   # return jsonify({'daily_target'})

#weekly target
#@app.route('/api/weekly_target', methods=['GET', 'POST'])
#def weekly_target():
   # if request.method == 'POST':
    #    data = request.json 
     #   weekly_target = data('weekly_target')
      #  return jsonify({'message': f'Weekly target set to {weekly_target}'}), 200 
    #return jsonify({'weekly_target'})


# notes upload 
#@app.route('/api/upload_notes', methods=['POST'])
#def upload_notes():
   # if 'file' not in request.files:
     #   return jsonify({'message': 'No file part'}), 400
    # file = request.files['file']

    #if file.filename == '':
     #   return jsonify({'message': 'No selected file'}), 400

#check file type
#if not file.filename.endswith('.pdf'):
 #   return jsonify({'message': 'Invalid file type'}), 400

#if file.mimetype != 'application/pdf':
 #   return jsonify({'message': 'Invalid file type'}), 400

#save file

#file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
#file.save(file_path)
#return jsonify({'message': 'File uploaded successfully'}), 200




from flask import Flask, request, jsonify, send_from_directory, render_template
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'NOTES_FOLDER'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# In-memory storage for targets (replace with a database later)
daily_target = None
weekly_target = None

@app.route('/')
def notes():
   return render_template('profile.html')

# daily target
@app.route('/api/daily_target', methods=['GET', 'POST'])
def daily_target_route():
    global daily_target  # Use the global variable
    if request.method == 'POST':
        data = request.get_json()  # Use get_json() to parse JSON data
        daily_target = data.get('daily_target')  # Use .get() to access data safely
        return jsonify({'message': f'Daily target set to {daily_target}'}), 200
    return jsonify({'daily_target': daily_target})  # Return the current target

# weekly target
@app.route('/api/weekly_target', methods=['GET', 'POST'])
def weekly_target_route():
    global weekly_target  # Use the global variable
    if request.method == 'POST':
        data = request.get_json()  # Use get_json() to parse JSON data
        weekly_target = data.get('weekly_target')  # Use .get() to access data safely
        return jsonify({'message': f'Weekly target set to {weekly_target}'}), 200
    return jsonify({'weekly_target': weekly_target})  # Return the current target

# notes upload
@app.route('/api/upload_notes', methods=['POST'])
def upload_notes():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']

    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if not file.filename.endswith('.pdf'):
        return jsonify({'message': 'Invalid file type'}), 400

    if file.mimetype != 'application/pdf':
        return jsonify({'message': 'Invalid file type'}), 400

    try:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        return jsonify({'message': 'File uploaded successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error during upload: ' + str(e)}), 500