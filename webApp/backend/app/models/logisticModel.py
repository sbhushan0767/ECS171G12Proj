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
le = LabelEncoder()
df[["Credit Score Range"]] = df[["Credit Score Range"]].apply(le.fit_transform)

#oversampling
df['Credit Score Range'].value_counts().plot(kind='bar',figsize=(15,5))
to_drop = ["Credit Score", "Credit Score Range"]
X = df.drop(to_drop, axis = 1)
labels = df["Credit Score Range"]

X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.25, random_state=1)
X_train = X_train.to_numpy()
y_train = y_train.to_numpy()

ros = RandomOverSampler(random_state=0)
X_resampled, y_resampled = ros.fit_resample(X_train, y_train)
counted_target = Counter(y_resampled)

clf = LogisticRegression(penalty = 'l2', max_iter=1000)
clf.fit(X_resampled, y_resampled)

y_pred_train = clf.predict(X_resampled)
y_pred = clf.predict(X_test)

pickle.dump(clf, open('logisticModel.pkl', 'wb'))
logisticModel = pickle.load(open('logisticModel.pkl', 'rb'))