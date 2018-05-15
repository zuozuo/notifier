a = [10, 9, 1, 4, 6, 8, 2]
m = 10

def find(a, m):
    sorted_a = sorted(a)
    len_a = len(sorted_a)
    head, tail = 0, len_a - 1
    while head < tail:
        left = sorted_a[head]
        right = sorted_a[tail]
        if left + right == m:
            return left, right
        elif left + right > m:
            tail -= 1
        else:
            head += 1
    return None, None

print(find(a, m))
