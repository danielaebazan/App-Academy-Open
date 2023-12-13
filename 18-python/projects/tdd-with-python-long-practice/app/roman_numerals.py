def parse(s):
    # if value == 'I': return 1
    # elif value == 'II': return 2
    # elif value == 'III': return 3
    # elif value == 'IV': return 4
    # elif value == 'V': return 5
    # elif value == 'VI': return 6
    # elif value == 'VII': return 7
    # elif value == 'VIII': return 8    
    special = {'IV': 4, 'IX': 9, 'XL':40, 'XC':90, 'CD':400, 'CM':900}
    usual = {'I': 1, 'V': 5, 'X': 10, 'L':50, 'C':100, 'D':500, 'M': 1000}
    res = 0
    i = 0
        
    while i < len(s):
        print(i)
        if s[i:i+2] in special:
            print ('---sp')
            res += special[s[i:i+2]]
            i += 2
        elif s[i] in usual:
            res += usual[s[i]]
            i += 1
        else:
            raise Exception('Symbol {s[i]} at {i} position is not Roman')
    return res



# print(parse('IX'))

