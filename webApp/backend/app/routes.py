from app import app
import random


@app.route('/predict')
def predict():
    # Call model predict function here and return the result back
    creditScore = random.randint(350, 850)

    return {'creditScore': creditScore}
