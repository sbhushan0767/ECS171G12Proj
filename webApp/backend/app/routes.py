from app import app
from flask import request
from sklearn import preprocessing
from .utils import processRawData
import numpy as np
import pandas as pd
import pickle

# Opens up the model files
linearModel = pickle.load(open('./app/models/linearModel.pkl', 'rb'))
svrModel = pickle.load(open('./app/models/svrModel.pkl', 'rb'))
logisticModel = pickle.load(open('./app/models/logisticModel.pkl', 'rb'))
randomForestModel = pickle.load(
    open('./app/models/randomForestModel.pkl', 'rb'))

scoreRanges = [[585, 602], [602, 618], [618, 635], [635, 651], [
    651, 668], [668, 685], [685, 701], [701, 718], [718, 734], [734, 751]]


@app.route('/predict', methods=["POST"])
def predict():
    maxScore = 751
    minScore = 585
    # Process data from frontend.
    data = request.get_json()
    processedData = processRawData(data)
    
    # Using Linear Model
    linearPrediction = linearModel.predict(processedData)
    linearCreditScore = linearPrediction * (maxScore - minScore) + minScore

    # Using SVR Model
    svrPrediction = svrModel.predict(processedData)
    svrCreditScore = svrPrediction * (maxScore - minScore) + minScore

    # Using Logistic Model
    logisticPrediction = logisticModel.predict(processedData)
    logisticCreditScore = scoreRanges[logisticPrediction[0]]

    # Using Random Forest Model
    randomForestPrediction = randomForestModel.predict(processedData)
    randomForestCreditScore = scoreRanges[randomForestPrediction[0]]

    results = {'linearCreditScore': int(linearCreditScore), 'svrCreditScore': int(svrCreditScore), 'logisticCreditScore':
               logisticCreditScore, 'randomForestCreditScore': randomForestCreditScore}

    return results
