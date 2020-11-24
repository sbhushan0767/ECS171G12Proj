from app import app
from flask import request
from sklearn import preprocessing
import numpy as np
import pandas as pd
import random
import pickle

linearModel = pickle.load(open('./app/models/linearModel.pkl', 'rb'))

'''
We need to open the model.pkl file using this:
model = pickle.load(open("model.pkl",'rb'))

make sure that model pickle file is created in modeling.ipynb 
if not then use this to create one in modeling.ipynb file:
    pickle.dump(name_of_model, open('model.pkl','wb'))
'''


def processRawData(inputData):
    for data in inputData:
        inputData[data] = [inputData[data]]

    df = pd.DataFrame(inputData)
    numeric = df.select_dtypes('number')
    nums = np.array(numeric.values)
    newNums = np.swapaxes(nums,0,1)
    transformer = preprocessing.MinMaxScaler()
    numericNormalized = transformer.fit_transform(newNums)

    df['loan'] = numericNormalized[0]
    df['income'] = numericNormalized[1]
    df['years'] = numericNormalized[2]
    df['debt'] = numericNormalized[3]
    df['creditHistory'] = numericNormalized[4]
    df['lastDelinquent'] = numericNormalized[5]
    df['openAccounts'] = numericNormalized[6]
    df['creditProblems'] = numericNormalized[7]
    df['creditBalance'] = numericNormalized[8]
    df['maxCredit'] = numericNormalized[9]

    categoricalData = df[["homeOwnership",
                          "purpose",
                          "loanStatus",
                          "term"]]

    le = preprocessing.LabelEncoder()
    categNormalized = le.fit_transform(np.asarray(list(categoricalData)))
    df['homeOwnership'] = categNormalized[0]
    df['purpose'] = categNormalized[1]
    df['loanStatus'] = categNormalized[2]
    df['term'] = categNormalized[3]

    print(df)

    return df


@app.route('/predict', methods=["POST"])
def predict():
    # Call model predict function here and return the result back
    # data var has all the submitted data
    data = request.get_json()
    # prediction = linearModel.predict([np.array(list(data.values()))])
    processedData = processRawData(data)
    prediction = linearModel.predict(processedData)
    print(prediction)
    creditScore = random.randint(350, 850)

    return {'creditScore': creditScore}
