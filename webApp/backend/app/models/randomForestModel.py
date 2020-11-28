import numpy as np
import pandas as pd
import pickle

from collections import Counter
from sklearn import svm
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, PolynomialFeatures
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import RandomOverSampler
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import GridSearchCV

# Read in processed data
df = pd.read_csv('../../../../datasets/credit.csv')
le = LabelEncoder()
df[["Credit Score Range"]] = df[["Credit Score Range"]].apply(le.fit_transform)

#oversampling
df['Credit Score Range'].value_counts().plot(kind='bar',figsize=(15,5))
to_drop = ["Credit Score", "Credit Score Range"]
X = df.drop(to_drop, axis = 1)
y = df["Credit Score"]
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)


grid_1 = {'n_estimators': [2, 5,10,15],
          'max_depth': [30,40,45, 50]}

rf = RandomForestRegressor(random_state=1, verbose=1,n_jobs =6)
#The parameters of the estimator used to apply these methods are optimized by cross-validated grid-search over a parameter grid.
grid_rf = GridSearchCV(rf, grid_1, cv=3)
grid_rf.fit(X_train, y_train)

rf_best = grid_rf.best_estimator_
rf_best.fit(X_train, y_train)
pred_rf_test = rf_best.predict(X_test)

pickle.dump(rf_best, open('randomForestModel.pkl', 'wb'))
randomForestModel = pickle.load(open('randomForest.pkl', 'rb'))
