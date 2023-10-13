import utils.strings as str

def test_get_single_digit_month_string():
    assert str.get_month_string(9) == '09'

def test_get_single_digit_month_string_not_unchanged():
    assert str.get_month_string(1) != '1'

def test_get_double_digit_month_string():
    assert str.get_month_string(10) == '10'