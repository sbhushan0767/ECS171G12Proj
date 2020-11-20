from app import app

@app.route('/predict')
def predict():
    # Call model predict function here and return the result back
    return "Hello, World!"