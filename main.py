import tkinter as tk
from tkinter import ttk, messagebox
import random
import time
from copy import deepcopy
import matplotlib.pyplot as plt

# =============================
# Job Class
# =============================
class Job:
    def __init__(self, job_id, duration):
        self.id = job_id
        self.duration = duration


jobs = []
num_resources = 0


# =============================
# Backtracking Algorithm
# =============================
def solve_backtracking():
    best_makespan = float("inf")
    best_schedule = None

    def backtrack(i, schedule, resource_times):
        nonlocal best_makespan, best_schedule

        if i == len(jobs):
            m = max(resource_times)
            if m < best_makespan:
                best_makespan = m
                best_schedule = deepcopy(schedule)
            return

        job = jobs[i]
        for r in range(num_resources):
            start = resource_times[r]
            end = start + job.duration

            if end >= best_makespan:
                continue

            resource_times[r] += job.duration
            schedule[job.id] = (start, end, r)

            backtrack(i + 1, schedule, resource_times)

            resource_times[r] -= job.duration
            del schedule[job.id]

    t0 = time.time()
    backtrack(0, {}, [0] * num_resources)
    return best_schedule, best_makespan, time.time() - t0


# =============================
# Genetic Algorithm
# =============================
def solve_genetic():
    POP_SIZE = 25
    GENERATIONS = 30
    MUT_RATE = 0.2

    def fitness(ch):
        times = [0] * num_resources
        for j, r in enumerate(ch):
            times[r] += jobs[j].duration
        return max(times)

    population = [
        [random.randint(0, num_resources - 1) for _ in jobs]
        for _ in range(POP_SIZE)
    ]

    t0 = time.time()

    for _ in range(GENERATIONS):
        population.sort(key=fitness)
        new_pop = population[:5]

        while len(new_pop) < POP_SIZE:
            p1, p2 = random.sample(population[:10], 2)
            cut = random.randint(1, len(jobs) - 1)
            child = p1[:cut] + p2[cut:]

            if random.random() < MUT_RATE:
                i = random.randint(0, len(jobs) - 1)
                child[i] = random.randint(0, num_resources - 1)

            new_pop.append(child)

        population = new_pop

    best = min(population, key=fitness)
    best_makespan = fitness(best)

    schedule = {}
    resource_times = [0] * num_resources
    for i, r in enumerate(best):
        start = resource_times[r]
        end = start + jobs[i].duration
        schedule[jobs[i].id] = (start, end, r)
        resource_times[r] = end

    return schedule, best_makespan, time.time() - t0


# =============================
# Gantt Chart (Summer Colors)
# =============================
def draw_gantt(schedule, title):
    fig, ax = plt.subplots(figsize=(10, 5))
    colors = ["#9b59b6", "#fd79a8", "#1dd1a1", "#feca57"]

    for job_id, (start, end, res) in schedule.items():
        ax.barh(
            f"Machine {res}",
            end - start,
            left=start,
            color=colors[(job_id - 1) % len(colors)],
            edgecolor="black"
        )
        ax.text(
            start + (end - start) / 2,
            f"Machine {res}",
            f"Job {job_id}",
            ha="center",
            va="center",
            color="black",
            fontweight="bold",
            fontsize=9
        )

    ax.set_title(title, fontsize=14, fontweight="bold")
    ax.set_xlabel("Time")
    ax.set_ylabel("Machines")
    ax.grid(axis="x", linestyle="--", alpha=0.4)
    plt.tight_layout()
    plt.show()


# =============================
# GUI Setup (Summer Theme)
# =============================
root = tk.Tk()
root.title("Job Scheduling Problem Solver")
root.geometry("760x560")
root.configure(bg="#9bfdf3")

style = ttk.Style()
style.theme_use("clam")

style.configure(
    "Header.TLabel",
    font=("Segoe UI", 16, "bold"),
    background="#da7cff",
    foreground="white",
    anchor="center"
)

style.configure("TButton", font=("Segoe UI", 10), padding=6)
style.configure("Solve.TButton", background="#72ffda")
style.configure("Compare.TButton", background="#fcffba")
style.configure("TLabel", background="#D5D4D0", font=("Segoe UI", 10))


# =============================
# Header
# =============================
ttk.Label(
    root,
    text="Job Scheduling Problem Solver",
    style="Header.TLabel",
    padding=10
).pack(fill="x")


# =============================
# Resources Frame
# =============================
frame_res = ttk.LabelFrame(root, text="Resources Settings", padding=10)
frame_res.pack(fill="x", padx=20, pady=10)

ttk.Label(frame_res, text="Number of Resources:").grid(row=0, column=0, padx=5)
entry_res = ttk.Entry(frame_res, width=10)
entry_res.grid(row=0, column=1, padx=5)


def set_resources():
    global num_resources
    num_resources = int(entry_res.get())
    messagebox.showinfo("Done", "Resources set successfully")

ttk.Button(
    frame_res,
    text="Set Resources",
    style="Solve.TButton",
    command=set_resources
).grid(row=0, column=2, padx=10)


# =============================
# Jobs Frame
# =============================
frame_jobs = ttk.LabelFrame(root, text="Jobs Input", padding=10)
frame_jobs.pack(fill="x", padx=20, pady=10)

ttk.Label(frame_jobs, text="Job Duration:").grid(row=0, column=0, padx=5)
entry_duration = ttk.Entry(frame_jobs, width=10)
entry_duration.grid(row=0, column=1, padx=5)


def add_job():
    jid = len(jobs) + 1
    d = int(entry_duration.get())
    jobs.append(Job(jid, d))
    listbox.insert(tk.END, f"Job {jid}: Duration = {d}")
    entry_duration.delete(0, tk.END)

ttk.Button(
    frame_jobs,
    text="Add Job",
    style="Solve.TButton",
    command=add_job
).grid(row=0, column=2, padx=10)

listbox = tk.Listbox(frame_jobs, height=6)
listbox.grid(row=1, column=0, columnspan=3, pady=8, sticky="we")


# =============================
# Actions + Results
# =============================
frame_actions = ttk.Frame(root)
frame_actions.pack(pady=15)

result_label = tk.Label(
    root,
    text="",
    bg="#fd98e2",
    font=("Segoe UI", 10),
    relief="groove",
    padx=10,
    pady=6
)
result_label.pack(pady=10)


def run_bt():
    s, m, t = solve_backtracking()
    result_label.config(text=f"Backtracking → Makespan={m}, Time={t:.4f}s")
    draw_gantt(s, "Backtracking Gantt Chart")

def run_ga():
    s, m, t = solve_genetic()
    result_label.config(text=f"Genetic → Makespan={m}, Time={t:.4f}s")
    draw_gantt(s, "Genetic Algorithm Gantt Chart")

def compare():
    s1, m1, t1 = solve_backtracking()
    s2, m2, t2 = solve_genetic()
    result_label.config(
        text=f"Backtracking → M={m1}, T={t1:.4f}s\n"
             f"Genetic → M={m2}, T={t2:.4f}s"
    )
    draw_gantt(s1, "Backtracking")
    draw_gantt(s2, "Genetic Algorithm")


ttk.Button(frame_actions, text="Solve Backtracking",
           style="Solve.TButton", command=run_bt).grid(row=0, column=0, padx=10)

ttk.Button(frame_actions, text="Solve Genetic Algorithm",
           style="Solve.TButton", command=run_ga).grid(row=0, column=1, padx=10)

ttk.Button(frame_actions, text="Compare Both",
           style="Compare.TButton", command=compare).grid(row=0, column=2, padx=10)

root.mainloop()