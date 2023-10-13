# Formats the month as a string
def get_month_string(month):
    if int(month) < 10:
        month_str = '0' + str(month)
    else:
        month_str = str(month)
    return month_str
    