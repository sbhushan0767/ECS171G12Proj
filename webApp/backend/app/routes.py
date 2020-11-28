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
    # Call model predict function here and return the result back
    # data var has all the submitted data
    maxScore = 751
    minScore = 585
    data = request.get_json()
    processedData = processRawData(data)
    linearPrediction = linearModel.predict(processedData)
    linearCreditScore = (linearPrediction * (maxScore - minScore)) + minScore

    svrPrediction = svrModel.predict(processedData)
    svrCreditScore = (svrPrediction * (maxScore - minScore)) + minScore

    logisticPrediction = logisticModel.predict(processedData)
    logisticCreditScore = scoreRanges[logisticPrediction[0]]

    randomForestPrediction = randomForestModel.predict(processedData)
    randomForestCreditScore = (
        randomForestPrediction * (maxScore - minScore)) + minScore

    print(linearPrediction, svrPrediction,
          logisticPrediction, randomForestPrediction)

    results = {'linearCreditScore': int(linearCreditScore), 'svrCreditScore': int(svrCreditScore), 'logisticCreditScore':
               logisticCreditScore, 'randomForestCreditScore': int(randomForestCreditScore)}

    return results
