import pytest
from app.roman_numerals import parse

@pytest.mark.parametrize("test_input,expected", [("IX", 9), ("XI",	11), ("XIV",	14),
("XIX",	19),("XX",	20),("XXXIV",	34),("XLI",	41),("L",	50),("XCIX",	99),("C",	100),
("CCCXXXIII",	333),("DLV",	555),("CDXLIX",	449),("MCMLXXII",	1972)])
    
def test_roman_numeral_parser(test_input, expected):
    
    result = parse(test_input)
    
    assert result == expected