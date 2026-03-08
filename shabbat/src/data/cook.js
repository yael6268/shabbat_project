const BasicCooking = [{
    id: 1000,
    name: "חלות",
    PreparationTime: '02:00',
    status: 'start',
    type: "BasicCooking"
}, {
    id: 1001,
    name: "סלט חצילים אדומים",
    PreparationTime: '00:20',
    status: 'start',
    type: "BasicCooking"
}, {
    id: 1002,
    name: "סלט זיתים מרוסק",
    PreparationTime: '00:03',
    status: 'start',
    type: "BasicCooking"
}, {
    id: 1003,
    name: "סלט תירס",
    PreparationTime: '00:04',
    status: 'start',
    type: "BasicCooking"
}, {
    id: 1004,
    name: "סלט חסה",
    PreparationTime: '00:10',
    status: 'start',
    type: "BasicCooking"
}, {
    id: 1005,
    name: "סלט כרוב",
    PreparationTime: '00:10',
    status: 'start',
    type: "BasicCooking"
}, {
    id: 1006,
    name: "חומוס",
    PreparationTime: '00:10',
    status: 'start',
    type: "BasicCooking"
}, {
    id: 1007,
    name: "טחינה",
    PreparationTime: '00:07',
    status: 'start',
    type: "BasicCooking"
}, {
    id: 1008,
    name: "מנה אחרונה",
    PreparationTime: '00:30',
    status: 'start',
    type: "BasicCooking"
}, {
    id: 1009,
    name: "עוגה",
    PreparationTime: '00:10',
    status: 'start',
    type: "BasicCooking"
}];

const firstMeal = [{
    id: 1010,
    name: "דגים",
    PreparationTime: '00:15',
    status: 'start',
    type: "FirstMeal"
}, {
    id: 1011,
    name: "מרק",
    PreparationTime: '00:05',
    status: 'start',
    type: "FirstMeal"
}, {
    id: 1012,
    name: "עוף",
    PreparationTime: '00:10',
    status: 'start',
    type: "FirstMeal"
}, {
    id: 1013,
    name: "ירקות מוקפצים",
    PreparationTime: '00:20',
    status: 'start',
    type: "FirstMeal"
}, {
    id: 1014,
    name: "קוגל תפוחי אדמה",
    PreparationTime: '00:40',
    status: 'start',
    type: "FirstMeal"
}, {
    id: 1015,
    name: "מנה אחרונה",
    PreparationTime: '00:30',
    status: 'start',
    type: "FirstMeal"
}];

const secondMeal = [{
    id: 1016,
    name: "ביצים",
    PreparationTime: '00:15',
    status: 'start',
    type: "SecondMeal"
}, {
    id: 1017,
    name: "כבד",
    PreparationTime: '00:05',
    status: 'start',
    type: "SecondMeal"
}, {
    id: 1018,
    name: "טשולנט",
    PreparationTime: '00:10',
    status: 'start',
    type: "SecondMeal"
}, {
    id: 1019,
    name: "מנה אחרונה",
    PreparationTime: '00:20',
    status: 'start',
    type: "SecondMeal"
}];

const thirdMeal = [{
    id: 1020,
    name: "טונה",
    PreparationTime: '00:06',
    status: 'start',
    type: "ThirdMeal"
}, {
    id: 1021,
    name: "פשטידה",
    PreparationTime: '00:45',
    status: 'start',
    type: "ThirdMeal"
}, {
    id: 1022,
    name: "רוטב פיצה",
    PreparationTime: '00:15',
    status: 'start',
    type: "ThirdMeal"
}, {
    id: 1023,
    name: "מנה אחרונה",
    PreparationTime: '00:20',
    status: 'start',
    type: "ThirdMeal"
}];

const DinnerWithGuests = [{
    id: 1024,
    name: "סלט חצילים עם בטטה",
    PreparationTime: '00:20',
    status: 'start',
    type: "DinnerWithGuests"
}, {
    id: 1025,
    name: "דג סלומון",
    PreparationTime: '00:20',
    status: 'start',
    type: "DinnerWithGuests"
}, {
    id: 1026,
    name: "בשר",
    PreparationTime: '00:20',
    status: 'start',
    type: "DinnerWithGuests"
}, {
    id: 1027,
    name: "סלט תפוא",
    PreparationTime: '00:30',
    status: 'start',
    type: "DinnerWithGuests"
}, {
    id: 1028,
    name: "הרינג",
    PreparationTime: '00:25',
    status: 'start',
    type: "DinnerWithGuests"
}];

export const getBasicCooking = () => BasicCooking;
export const getFirstMeal = () => firstMeal;
export const getSecondMeal = () => secondMeal;
export const getThirdMeal = () => thirdMeal;
export const getDinnerWithGuests = () => DinnerWithGuests;
