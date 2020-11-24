from sklearn import preprocessing
import numpy as np
import pandas as pd


def processRawData(inputData):
    for data in inputData:
        inputData[data] = [inputData[data]]

    df = pd.DataFrame(inputData)
    numeric = df.select_dtypes('number')
    nums = np.array(numeric.values)
    newNums = np.swapaxes(nums, 0, 1)
    transformer = preprocessing.MinMaxScaler()
    numericNormalized = transformer.fit_transform(newNums)

    df['loan'] = numericNormalized[0]
    df['income'] = numericNormalized[1]
    df['years'] = numericNormalized[2]
    df['debt'] = numericNormalized[3]
    df['creditHistory'] = numericNormalized[4]
    df['lastDelinquent'] = numericNormalized[5]
    df['openAccounts'] = numericNormalized[6]
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

    return df
