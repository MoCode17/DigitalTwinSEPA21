import json
import numpy as np
import pandas as pa
import datetime as dt
from scipy import stats
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split


def prediction(target, month):
    # Load database from csv, (file currently in directory, if not specify location)
    # df is of type Pandas DataFrame, this type allows easy manipulation for machine learning
    df = pa.read_csv(target, parse_dates=True)

    ###################
    #   Simple Linear Regression Model for all data, y = mx + C
    ###################

    # Create new column to index the values, for e.g. [0, 1, 2, 3, ..., n-1]
    df['timeIndex'] = np.arange(len(df.index))
    #print("Original data frame: \n", df)

    # Define our X and y
    # X is simply the timeIndex, which mirrors the temperature id
    X = df.loc[:, ['timeIndex']]
    # y is the actual temperature values
    y = df.loc[:, 'reading_value']

    # A common practice in machine learning is to split the data into a training set and test set.
    # This also prevents the common issue of overfitting the model
    # The below assigns train and test values for X and y using a sklearn module
    # test_size=0.2 assigns the ratio of test/train set, for e.g. split as 20% test data and 80% train data
    # random_state is used to seed the random order, the train and test sets are split randomly, this keeps the same random order each time
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Create the Linear Regression Model
    model = LinearRegression()
    # Fit the data, comparing the index over time to the temperature values
    model.fit(X_train, y_train)
    # Create a Pandas Series to store the prection values, this series is indexed with date/time values from the dataframe
    y_pred = pa.Series(model.predict(X), index=df['reading_time'])

    ###################
    #   Cyclical encoding, sin/cosine transformation for all data
    ###################
    # https://www.kaggle.com/code/avanwyk/encoding-cyclical-features-for-deep-learning
    # https://developer.nvidia.com/blog/three-approaches-to-encoding-time-information-as-features-for-ml-models/

    # New X dataframe to manipulate
    X_2 = df.copy()
    # Convert reading time str values to type datetime
    X_2["reading_time"] = pa.to_datetime(X_2["reading_time"], format="%Y-%m-%d %H:%M:%S")
    # Create a new column, storing the current hour of the reading, [0:25]
    X_2['hour'] = X_2['reading_time'].dt.hour

    # Create a sin and cosine column to store the relative transformation of the reading
    # Both sin and cosine are used to cycle through data
    X_2['hour_sin'] = np.sin(2 * np.pi * X_2['hour'] / 24.0)
    X_2['hour_cos'] = np.cos(2 * np.pi * X_2['hour'] / 24.0)

    #X_2[['hour_sin', 'hour_cos']].plot()

    # Store the hourly sin and cosine data columns
    X_2_daily = X_2[['hour_sin', 'hour_cos']]

    ###################
    #   Fitting and predicting the model
    ###################

    # Fit the data comparing sin and cosine to match the y/actual values
    model_2 = LinearRegression().fit(X_2_daily.iloc[:len(X_train)],
                                     y.iloc[:len(y_train)])

    y_pred_2 = pa.Series(model_2.predict(X_2_daily), index=df['reading_time'])

    ###################
    #   Monthly model Function
    ###################
    # These two columns are used to locate data based on matching either he date, or month
    X_2['date_index'] = X_2['reading_time'].dt.date
    X_2['month_index'] = X_2['reading_time'].dt.month

    # X_2 is now indexed with date/time values, straightforward to plot and access
    X_2.set_index('reading_time', inplace=True)

    # Define a new dataframe including only the specified month data
    # This is done by locating(.loc) the matching month_index data set
    new_X = X_2.loc[lambda X_2: X_2['month_index'] == month]

    # Use the previous sin/cosin transformation array but with the same size as new_X
    # The index size must all be equal for the model
    new_X_daily = X_2_daily[:len(new_X)]

    # Create a new y of reading values from the current sliced dataframe
    new_y = new_X.loc[:, 'reading_value']

    actual_frame = pa.DataFrame(new_y ).reset_index()
    actual_frame.columns = ['time', 'readingValue']

    # Create the model and fit the sin/cosine values to the reading values
    model_x = LinearRegression().fit(new_X_daily, new_y)

    # Create a series object storing the predicted values, this is indexed with our date values from X
    y_pred_x = pa.Series(model_x.predict(new_X_daily), index=new_X.index)

    cyclic_frame = pa.DataFrame(y_pred_x).reset_index()
    cyclic_frame.columns = ['time', 'correctedValue']

    actual_x = []
    actual_y = []
    cyclic_x = []
    cyclic_y = []

    for ind in actual_frame.index:
        actual_y.append(actual_frame['readingValue'][ind])
        actual_x.append(str(actual_frame['time'][ind]))

    for ind in cyclic_frame.index:
        cyclic_y.append(cyclic_frame['correctedValue'][ind])
        cyclic_x.append(str(cyclic_frame['time'][ind]))

    actual_dict = {'x': actual_x, 'y': actual_y}
    cyclic_dict = {'x': cyclic_x, 'y': cyclic_y}

    if month > 10:
            month_str = '0' + str(month)
    else:
        month_str = str(month)

    datetime_str = '2023-' + month_str + '-01 '
    # How temperature is accessed from array
    time_array = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
                '17', '18', '19', '20', '21', '22', '23']

    predicted_array = ['<b>Value (Celsius)</b>']

    for time in time_array:
        predicted_array.append("%.1f" % y_pred_x[datetime_str + time].values[0])

    graph_dict = {'actual': actual_dict, 'cyclic': cyclic_dict, 'predicted': predicted_array}

    # How temperature is accessed from array
    #print("temp on 2023-05-01: \n", y_pred_x['2023-05-01'])
    #print("temp on 2023-05-01 at 2 AM: \n", y_pred_x['2023-05-01 02'])

    return graph_dict