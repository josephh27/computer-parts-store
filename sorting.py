def bubble_sorting(array):
    n = len(array)
    for i in range(n):
        already_sorted = True

        for j in range(n-i-1):
           if array[j] > array[j+1]:
               array[j], array[j+1] = array[j+1], array[j]
               already_sorted = False
        if already_sorted:
            break
        
    return array

def selection_sort(array):
    n = len(array)
    for i in range(n):
        min_idx = i 
        for j in range(i+1, n):
            if array[min_idx] > array[j]:
                min_idx = j
        array[i], array[min_idx] = array[min_idx], array[i]
    return array

def insertion_sort(array):
    n = len(array)
    for i in range(1, n):
        key_item = array[i]
        j = i - 1
        while j >= 0 and array[j] > key_item:
            array[j+1] = array[j]
            j -= 1
        array[j+1] = key_item
    return array

print(insertion_sort([2,1,5,43,5342,12,46,72]))


























# def insertion_sort(arr):
#     n = len(arr)
#     for i in range(1, n):
#         key_idx = arr[n]
#         j = i - 1
#         if j >= 0 and arr[j] > key_idx:
#             arr[j+1] = arr[j]
#             j -= 1
#         arr[j+1] = key_idx
#     return arr
