from flask import Flask, render_template, request

app = Flask(__name__)

# Define a dictionary to store appointment availability
appointments = {
    "2024-04-25": ["10:00", "11:00", "15:00"],
    "2024-04-26": ["14:00", "16:00"],
    "2024-04-27": ["09:00", "13:00", "16:30"],
    "2024-04-28": ["11:30", "14:00", "15:30"],
    "2024-04-29": ["09:00", "11:00", "14:30"],
    "2024-04-30": ["10:00", "12:00", "15:00"],
    "2024-05-01": ["13:00", "15:00", "17:00"],
    "2024-05-02": ["11:00", "14:00", "16:30"],
    "2024-05-03": ["10:00", "12:00", "15:30"],
    "2024-05-04": ["09:00", "12:00", "14:30"],
    "2024-05-05": ["10:00", "13:00", "16:00"],
    # Add more dates and available times as needed
}

def check_appointment_availability(date, time):
    if date in appointments and time in appointments[date]:
        return True
    else:
        return False

@app.route("/", methods=["GET", "POST"])
def index():
    message = ""
    if request.method == "POST":
        name = request.form["name"]
        contact_info = request.form["contact_info"]
        date = request.form["date"]
        time = request.form["time"]
        if check_appointment_availability(date, time):
            message = "Congratulations, an appointment is available,booked your appointment!"
        else:
            message = "Sorry, no appointment available at the specified date and time."
    return render_template("index.html", message=message)

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5001)     # Change the port number as needed





