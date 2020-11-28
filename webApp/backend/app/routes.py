from app import app
from flask import request
from sklearn import preprocessing
from .utils import processRawData
import numpy as np
import pandas as pd
import pickle

linearModel = pickle.load(open('./app/models/linearModel.pkl', 'rb'))
logisticModel = pickle.load(open('./app/models/logisticModel.pkl', 'rb'))

'''
We need to open the model.pkl file using this:
model = pickle.load(open("model.pkl",'rb'))

make sure that model pickle file is created in modeling.ipynb 
if not then use this to create one in modeling.ipynb file:
    pickle.dump(name_of_model, open('model.pkl','wb'))
'''


@app.route('/predict', methods=["POST"])
def predict():
    # Call model predict function here and return the result back
    # data var has all the submitted data
    maxScore = 751
    minScore = 585
    data = request.get_json()
    processedData = processRawData(data)
    linearPrediction = linearModel.predict(processedData)
    linearCreditScore = (linearPrediction * (maxScore - minScore)) + minScore

    logisticPrediction = logisticModel.predict(processedData)
    logisticCreditScore = (logisticPrediction *
                           (maxScore - minScore)) + minScore
    # print(creditScore)

    return {'linearCreditScore': int(linearCreditScore), 'logisticCreditScore': int(logisticCreditScore)}
