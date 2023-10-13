import os
import utils.prediction as prediction

# Checks the predict function returns a dictionary object
def test_predict_returns_dict(app):
    target = os.path.join(app.static_folder, 'table.csv')
    assert type(prediction.predict(target, 9)) is dict

# Checks the graph_dict returned by predict has the 'actual' key
def test_graph_dict_has_actual(app):
    target = os.path.join(app.static_folder, 'table.csv')
    graph_dict = prediction.predict(target, 9)
    assert 'actual' in graph_dict

# Checks the graph_dict returned by predict has the 'cyclic' key
def test_graph_dict_has_cyclic(app):
    target = os.path.join(app.static_folder, 'table.csv')
    graph_dict = prediction.predict(target, 9)
    assert 'cyclic' in graph_dict

# Checks the actual dictionary has the 'x' key
def test_actual_dict_has_x(app):
    target = os.path.join(app.static_folder, 'table.csv')
    graph_dict = prediction.predict(target, 9)
    assert 'x' in graph_dict['actual']