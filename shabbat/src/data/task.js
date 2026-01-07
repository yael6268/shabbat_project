const tasksForShabbat = [
    {
        id: 1,
        title: " לנקות את הבית",
        status: "pending",
        time: 90,
        place: "basic"
    },
    {
        id: 3,
        title: "לצחצח נעליים",
        status: "pending",
        time: 15,
        place: "basic"
    },
    {
        id: 4,
        title: " לפתוח בקבוקים",
        status: "pending",
        time: 5,
        place: "atHome"
    },
    {
        id: 5,
        title: "לערוך את השולחן",
        status: "pending",
        time: 20,
        place: "atHome"
    },
    {
        id: 6,
        title: "לכבס בגדים",
        status: "pending",
        time: 60,
        place: "basic"

    },
    {
        id: 7,
        title: "לסדר את החדרים",
        status: "pending",
        time: 60,
        place: "basic"

    },
    {
        id: 8,
        title: "לנקות חלונות",
        status: "pending",
        time: 25,
        place: "hospitality"
    },
    {
        id: 9,
        title: "לשטוף כלים",
        status: "pending",
        time: 30,
        place: "basic"

    },
    {
        id: 10,
        title: "לקרוא פרשת השבוע",
        status: "pending",
        time: 20,
        place: "basic"

    },
    {
        id: 12,
        title: "לארגן מיטות לאורחים",
        status: "pending",
        time: 10,
        place: "hospitality"

    },
    {
        id: 13,
        title: "לארוז מזוודה",
        status: "pending",
        time: 15,
        place: "traveling"

    },
    {
        id: 14,
        title: "לזרוק את האשפה",
        status: "pending",
        time: 10,
        place: "basic"

    },
    {
        id: 18,
        title: "להתפלל מנחה",
        status: "pending",
        time: 15,
        place: "basic"

    },
    {
        id: 19,
        title: "לכוון שעון שבת",
        status: "pending",
        time: 10,
        place: "atHome"

    },
    {
        id: 20,
        title: "לארגן פלטה לסירים",
        status: "pending",
        time: 15,
        place: "atHome"

    }, 
    {
        id: 21,
        title: "להעביר לגנרטור",
        status: "pending",
        time: 10,
        place: "atHome"

    },
     {
        id: 22,
        title: "לכבות טלפונים",
        status: "pending",
        time: 5,
        place: "basic"

    },
    {
        id: 23,
        title: "להכין קידוש",
        status: "pending",
        time: 15,
        place: "atHome"

    },
     {
        id: 24,
        title: "להדליק נרות שבת",
        status: "pending",
        time: 5,
        place: "basic"

    }
]; 
export const getAllTasks = () => {
    return tasksForShabbat;
}
// export const getHospitalityTasks = () => {
//     return tasksForShabbat.filter(task => task.place === "hospitality");
// }
// export const getTravelingTasks = () => {
//     return tasksForShabbat.filter(task => task.place === "traveling");
// }
// export const getAtHomeTasks = () => {
//     return tasksForShabbat.filter(task => task.place === "atHome");
// }
// export const getBasicTasks = () => {
//     return tasksForShabbat.filter(task => task.place === "basic");
// }