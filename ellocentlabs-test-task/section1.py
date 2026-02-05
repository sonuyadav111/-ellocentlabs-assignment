from collections import Counter

def task_scheduling(tasks, n):
    # Count frequency of each task
    task_count = Counter(tasks)
    
    # Find most frequent task
    most_freq = max(task_count.values())
    
    # Count tasks with max frequency
    max_freq_count = list(task_count.values()).count(most_freq)
    
    # Calculate minimum time
    idle_time = (most_freq - 1) * (n + 1) + max_freq_count
    
    # Return maximum of calculated or total tasks
    return max(idle_time, len(tasks))

# Example usage
tasks = ["A", "A", "A", "B", "B", "B"]
n = 2
print(task_scheduling(tasks, n))