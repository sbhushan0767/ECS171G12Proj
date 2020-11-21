from app import app
import random
import pickle

'''
We need to open the model.pkl file using this:
model = pickle.load(open("model.pkl",'rb'))

make sure that model pickle file is created in modeling.ipynb 
if not then use this to create one in modeling.ipynb file:
    pickle.dump(name_of_model, open('model.pkl','wb'))
'''

@app.route('/predict')
def predict():
    # Call model predict function here and return the result back
    creditScore = random.randint(350, 850)

    return {'creditScore': creditScore}
