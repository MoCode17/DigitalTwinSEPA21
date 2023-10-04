# import matplotlib.pyplot as plt
from datetime import datetime
from scipy import stats
import plotly
import plotly.graph_objects as go
import numpy as np
import pandas as pa
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

def prepareTimestamp(df, pd):
    newData = []
    dateTime = []
    date_format = '%Y-%m-%d %H-%M-%S'
    for ind in df.index:
        newData.append(df['correctedValue'][ind])
        date_object = datetime.strptime(pd['time'][ind], date_format)
        dateTime.append(date_object)
    pd['correctedValue'] = newData
    pd['dateTime'] = dateTime
    return pd

def updateGraph(fig):
    fig.update_layout(
        title='Trend for May 2023',
        font_size=20,
        title_font_family="Circular STD Medium",
        xaxis_tickformat='%d %B<br>%H:%M',
    )
    fig.update_xaxes(nticks=11)
    return fig

def addTrace(fig, pd, df):
    fig.add_scatter(x=pd['dateTime'], y=pd['readingValue'], name='Temperature Readings')
    fig.add_scatter(x=pd['dateTime'], y=df['correctedValue'], name='Sine/Cosine Transformation')
    return fig

def monthlyPrediction(target):
    pd = pa.read_csv(target, parse_dates=True)
    pd['timeIndex'] = np.arange(len(pd.index))
    X = pd.loc[:, ['timeIndex']]
    y = pd.loc[:, 'readingValue']
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    X_2 = pd.copy()
    X_2["time"] = pa.to_datetime(X_2["time"], format="%Y-%m-%d %H-%M-%S")
    X_2['hour'] = X_2['time'].dt.hour
    X_2['hour_sin'] = np.sin(2 * np.pi * X_2['hour'] / 24.0)
    X_2['hour_cos'] = np.cos(2 * np.pi * X_2['hour'] / 24.0)
    X_2_daily = X_2[['hour_sin', 'hour_cos']]
    model_2 = LinearRegression().fit(X_2_daily.iloc[:len(X_train)],
                                     y.iloc[:len(y_train)])
    y_pred_2 = pa.Series(model_2.predict(X_2_daily), index=pd['time'])
    y_pred_2 = pa.Series(model_2.predict(X_2_daily), index=pd['time'])

    df = pa.DataFrame(y_pred_2).reset_index()
    df.columns = ['time', 'correctedValue']

    pd = prepareTimestamp(df, pd)

    fig = go.Figure()
    fig = updateGraph(fig)
    fig = addTrace(fig, pd, df)

    print(pd['readingValue'])

    return plotly.offline.plot(fig, include_plotlyjs=False, output_type='div')