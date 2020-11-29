import numpy as np
import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv('../../../../datasets/credit.csv')

X = df.drop(columns=['Loan ID', 'Customer ID',
                     'Credit Score', 'Credit Score Range'])
y = df['Credit Score']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=1)

SVR_model = svm.SVR(kernel='rbf')
SVR_model.fit(X_train, y_train)
y_pred_train = SVR_model.predict(X_train)
y_pred = SVR_model.predict(X_test)

pickle.dump(SVR_model, open('svrModel.pkl', 'wb'))
randomForestModel = pickle.load(open('svrModel.pkl', 'rb'))
