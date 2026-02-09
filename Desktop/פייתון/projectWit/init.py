import os

directory=".wit"


if not os.path.exists(directory):
    # יצירת תיקיה ראשית
    os.makedirs(directory)
    print(f"תיקיה ראשית '{directory}' נוצרה!")

    # יצירת שתי תיקיות בתוך התיקיה הראשית
    os.makedirs(os.path.join(directory, "staging"))
    os.makedirs(os.path.join(directory, "commits"))

    # יצירת שני קבצים בתוך התיקיה הראשית
    with open(os.path.join(directory, "head.txt"), "w") as file:
        file.write("תוכן  הראשון.")
    with open(os.path.join(directory, ".witignore.txt"), "w") as file:
        file.write("תוכן .")
