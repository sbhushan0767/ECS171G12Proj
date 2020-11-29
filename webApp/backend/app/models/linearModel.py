# Import libraries
import numpy as np
import pandas as pd
import pickle

from collections import Counter
from sklearn import svm
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, PolynomialFeatures
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import RandomOverSampler

# Read in processed data
df = pd.read_csv('../../../../datasets/credit.csv')

X = df.drop(columns=['Loan ID', 'Customer ID', 'Credit Score Range',
                     'Credit Score'])

y = df['Credit Score']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=1)

LR_model = LinearRegression()
LR_model.fit(X_train, y_train)
y_pred = LR_model.predict(X_test)
y_pred_train = LR_model.predict(X_train)

pickle.dump(LR_model, open('linearModel.pkl', 'wb'))

linearModel = pickle.load(open('linearModel.pkl', 'rb'))
