# Import libraries
import numpy as np
import pandas as pd

from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder
from sklearn import preprocessing


def processRawData(inputData):
    # Read in raw data files
    df_train = pd.read_csv('../../datasets/credit_train.csv')
    df_test = pd.read_csv('../../datasets/credit_test.csv')

    # Concatenate raw data files into one dataframe
    df = pd.concat([df_train, df_test])

    # Remove rows which are completely null from dataframe
    df = df[df.isnull().sum(axis=1) < df.shape[1]]

    # Replace invalid credit scores (above 850 with an extra 0 entered) with credit score 10X smaller
    df['Credit Score'] = np.where(
        df['Credit Score'] > 850, df['Credit Score']/10, df['Credit Score'])

    # Drop rows with contaminated credit score (invalid credit score value)
    df = df[df['Credit Score'] <= 850]
    df = df.reset_index(drop=True)

    df['Purpose'] = df['Purpose'].replace(
        {'small_business': 'Business Loan', 'other': 'Other', 'Take a Trip': 'vacation'})
    df['Purpose'].value_counts()

    # check the duplicate rows
    dup_id = df['Customer ID'].value_counts(
    )[df['Customer ID'].value_counts() > 1].index.values
    dup_df = df.loc[df['Customer ID'].isin(dup_id)]

    # fill in missing values with zero and observe distribution
    df['Months since last delinquent'] = df['Months since last delinquent'].fillna(
        0)
    df['Bankruptcies'] = df['Bankruptcies'].fillna(0)
    df['Tax Liens'] = df['Tax Liens'].fillna(0.0)

    # from the plot, we can divdie Months since last delinquent into following categories:
    # 0: no delinquent, 0~25: 2 years, 25~50: 4 years, 50 ~75: 6 years, >75: over 6 years
    df['Delinquent Time'] = 0
    df.loc[(df['Months since last delinquent'] == 0), 'Delinquent Time'] = 0
    df.loc[(df['Months since last delinquent'] > 0) & (
        df['Months since last delinquent'] <= 25), 'Delinquent Time'] = 2
    df.loc[(df['Months since last delinquent'] > 25) & (
        df['Months since last delinquent'] <= 50), 'Delinquent Time'] = 4
    df.loc[(df['Months since last delinquent'] > 50) & (
        df['Months since last delinquent'] <= 75), 'Delinquent Time'] = 6
    df.loc[(df['Months since last delinquent'] > 75), 'Delinquent Time'] = 6

    to_drop = 'Months since last delinquent'
    df = df.drop(to_drop, axis=1)

    # exclude bankrupticies, tax linens, and number of credit problems from continuous columns
    numeric = df.select_dtypes('number')
    numeric_cols = numeric.columns

    # Impute missing values for numerical data with the mean except bankruptcies and years in current job
    df[numeric.columns] = numeric.fillna(numeric.mean())

    # check missing values in categorical columns
    categoric = df.select_dtypes('object')
    categoric = categoric.drop(columns='Years in current job')

    # Impute missing values for categorical data with the mode
    df[categoric.columns] = categoric.fillna(
        categoric.agg(lambda x: x.mode().values[0]))

    # fill NaN for Years in current job with'< 1 year'
    df['Years in current job'] = df['Years in current job'].fillna('< 1 year')

    for i in range(len(df)):
        if df['Bankruptcies'].values[i] > 0:
            df['Bankruptcies'].values[i] = 1
        if df['Tax Liens'].values[i] > 0:
            df['Tax Liens'].values[i] = 1
        if df['Number of Credit Problems'].values[i] > 0:
            df['Number of Credit Problems'].values[i] = 1

    df.rename(
        columns={'Bankruptcies': 'Have had Bankruptcy before'}, inplace=True)
    df.rename(columns={'Tax Liens': 'Have had Tax Liens'}, inplace=True)
    df.rename(
        columns={'Number of Credit Problems': 'Have had Credit Problems'}, inplace=True)

    # Label encode categorical columns
    le = LabelEncoder()
    df[categoric.columns] = df[categoric.columns].apply(le.fit_transform)

    # Convert 'Years in current job' to numerical column -
    # Note: Numerical tranformation converts '< 1 year' to 0 and '10+ years' to 10 for simplicity
    df['Years in current job'] = df['Years in current job'].replace({'< 1 year': 0, '1 year': 1, '2 years': 2,
                                                                     '3 years': 3, '4 years': 4, '5 years': 5,
                                                                     '6 years': 6, '7 years': 7, '8 years': 8,
                                                                     '9 years': 9, '10+ years': 10})

    # Add 'Credit Score Range' column
    df['Credit Score Range'] = pd.cut(df['Credit Score'], 10)

    # Normalize continuous columns
    df_tmp = df.drop(columns=['Purpose', 'Loan ID',
                              'Customer ID', 'Credit Score', 'Home Ownership'])
    numeric = df_tmp.select_dtypes('number')
    transformer = preprocessing.MinMaxScaler()

    numeric_normalized = transformer.fit_transform(numeric.values)
    df[numeric.columns] = numeric_normalized

    new_inputData = [inputData['loanStatus'], inputData['loan'], inputData['term'], inputData['income'],
                     inputData['years'], inputData['homeOwnership'], inputData['purpose'], inputData['debt'],
                     inputData['creditHistory'], inputData['openAccounts'], inputData['creditProblems'], inputData['creditBalance'],
                     inputData['maxCredit'], inputData['bankruptcies'], inputData['liens'], inputData['lastDelinquent']
                     ]

    df_new = df.drop(columns=['Loan ID', 'Customer ID',
                              'Credit Score', 'Credit Score Range'])
    label = df_new.columns

    dummy_df = pd.DataFrame({
        label[0]: [new_inputData[0]],
        label[1]: [new_inputData[1]],
        label[2]: [new_inputData[2]],
        label[3]: [new_inputData[3]],
        label[4]: [new_inputData[4]],
        label[5]: [new_inputData[5]],
        label[6]: [new_inputData[6]],
        label[7]: [new_inputData[7]],
        label[8]: [new_inputData[8]],
        label[9]: [new_inputData[9]],
        label[10]: [new_inputData[10]],
        label[11]: [new_inputData[11]],
        label[12]: [new_inputData[12]],
        label[13]: [new_inputData[13]],
        label[14]: [new_inputData[14]],
        label[15]: [new_inputData[15]],
    })

    # label categorical
    dummy_df['Loan Status'] = dummy_df['Loan Status'].replace(
        {'Fully Paid': 1, 'Charged Off': 0})
    dummy_df['Purpose'] = dummy_df['Purpose'].replace({'Home Improvements': 5, 'Debt Consolidation': 3,
                                                       'Buy House': 1, 'Business Loan': 0, 'Other': 7,
                                                       'marjor_purhcase': 8, 'vacation': 11, 'Buy a Car': 2,
                                                       'Medical Bills': 6, 'wedding': 12, 'Educational Expenses': 4,
                                                       'moving': 9, 'renewable_energer': 10})
    dummy_df['Home Ownership'] = dummy_df['Home Ownership'].replace(
        {'Home Mortgage': 0, 'Own Home': 1, 'Rent': 2})

    if dummy_df['Delinquent Time'][0] == 0:
        dummy_df['Delinquent Time'][0] = 0
    elif dummy_df['Delinquent Time'][0] <= 25:
        dummy_df['Delinquent Time'][0] = 2
    elif dummy_df['Delinquent Time'][0] <= 50:
        dummy_df['Delinquent Time'][0] = 4
    elif dummy_df['Delinquent Time'][0] <= 75:
        dummy_df['Delinquent Time'][0] = 6
    else:
        dummy_df['Delinquent Time'][0] = 7

    # min-max normalize
    cate = ['Home Ownership', 'Purpose']
    dummy_df_tmp = dummy_df.drop(columns=cate)
    dummy_numeric = dummy_df_tmp.select_dtypes('number')
    dummy_numeric_normalized = transformer.transform(dummy_numeric.values)
    dummy_df[dummy_numeric.columns] = dummy_numeric_normalized

    return dummy_df
