from flask import Flask, jsonify, render_template
import pandas as pd

app = Flask(__name__)

df = pd.read_csv("Doctors_dbb.csv")
df.columns = df.columns.str.strip()  # Trim any leading or trailing whitespace
df['Consultation Fees(in Rs)'] = df['Consultation Fees(in Rs)'].str.replace(',', '').astype(float) 

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/specialization/<specialization>')
def get_specialization(specialization):
    filtered_df = df[df['Specialization'] == specialization]
    return jsonify(filtered_df.to_dict(orient='records'))

if __name__ == "__main__":
    app.run(debug=True)


# @app.route('/hospital_management')
# def hospital_management():
#     return render_template('hospital.html')

# @app.route('/speciality')
# def speciality():
#     return render_template('speciality.html')

# @app.route('/patient_demo')
# def patient_demo():
#     return render_template('patient_demo.html')

# @app.route('/finances')
# def finances():
#     return render_template('finances.html')

# @app.route('/doctors')
# def doctors():
#     return render_template('doctors.html')