import numpy as np
import pandas as pd
import pickle

from collections import Counter
from sklearn import svm
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, PolynomialFeatures
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import RandomOverSampler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

# Read in processed data
df = pd.read_csv('../../../../datasets/credit.csv')
le = LabelEncoder()
df[["Credit Score Range"]] = df[["Credit Score Range"]].apply(le.fit_transform)

X = df.drop(columns=['Loan ID', 'Customer ID',
                     'Credit Score', 'Credit Score Range'])
y = df["Credit Score Range"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=1)

params = {'n_estimators': [2, 5, 10, 15]}

classifier_RF = RandomForestClassifier()
grid_rf = GridSearchCV(classifier_RF, params, cv=5)
grid_rf.fit(X_train, y_train)

pickle.dump(grid_rf, open('randomForestModel.pkl', 'wb'))
randomForestModel = pickle.load(open('randomForestModel.pkl', 'rb'))
