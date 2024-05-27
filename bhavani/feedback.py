from flask import Flask, render_template, request
from textblob import TextBlob

app = Flask(__name__)

def analyze_sentiment(text):
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    if polarity > 0:
        return 'Positive'
    elif polarity < 0:
        return 'Negative'
    else:
        return 'Neutral'

@app.route('/')
def home():
    return render_template('doctor.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    if request.method == 'POST':
        user_feedback = request.form['feedback']
        sentiment = analyze_sentiment(user_feedback)
        return render_template('result.html', feedback=user_feedback, sentiment=sentiment)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
