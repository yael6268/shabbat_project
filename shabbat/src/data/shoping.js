const basicShoping = [
    {
        id: 1,
        name: "לחם",

    },
    {
        id: 2,
        name: "חלב",

    },
    {
        id: 3,
        name: "ביצים",

    },
    {
        id: 4,
        name: "ירקות",
    },
    {

        id: 5,
        name: "פירות",
    },
    {
        id: 6,
        name: "בשר",
    },
    {
        id: 7,
        name: "עוף",
    },
    {
        id: 8,
        name: "דגים",
    },
    {
        id: 9,
        name: "תבלינים",
    },
    {
        id: 10,
        name: "שמן זית",
    },
    {
        id: 11,
        name: "קמח",
    },
    {
        id: 12,
        name: "סוכר",
    },
    {
        id: 13,
        name: "שמן קנולה",
    }

];
const shopingForGuests = [
    {
        id: 14,
        name: "יין",
    },
    {
        id: 15,
        name: "קינוח",
    },
    {
        id: 16,
        name: "מיץ",
    },
    {
        id: 17,
        name: "חטיפים",
    },
    {
        id: 18,
        name: "פיצוחים",
    },
    {
        id: 19,
        name: "בירה",
    }
];
const shopingForStayWithFamily = [
    {
        id: 20,
        name: "מתנות",
    },
    {
        id: 21,
        name: "פרחים",
    },
    {
        id: 22,
        name: "קישוטים לשולחן",
    }
];
const shopingForFirstMeal = [
    {
        id: 23,
        name: "שניצל",
    },
    {
        id: 24,
        name: "תפוחי אדמה",
    },
    {
        id: 25,
        name: "ירקות לבישול",
    },
    {
        id: 26,
        name: "ירקות למרק",
    },
    {
        id: 27,
        name: "אטריות",
    },
    {
        id: 28,
        name: "דגים",
    },
];
const shopingForSecondMeal = [
    {
        id: 29,
        name: "כבד קצוץ",
    },
    {
        id: 30,
        name: "שעועית",
    },
    {
        id: 31,
        name: "בשר לטשולנט",
    },
    {
        id: 32,
        name: "חסה ",
    },
    {
        id: 33,
        name: " גלידה קרה",
    }

];
const shopingForThirdMeal = [
    {
        id: 34,
        name: "טונה בשימורים",
    },
    {
        id: 35,
        name: "פשטידת ירקות",
    },
    {
        id: 36,
        name: "פרות העונה",
    },
    {
        id: 37,
        name: "גבינת שמנת",
    },
    {
        id: 38,
        name: "עוגיות",
    }
];
export { basicShoping };
export const getBasicShoping=()=>{
    return new Promise((resolve,reject) => {
        resolve(basicShoping);
    });
}
export function getShopingForGuests() {
    return shopingForGuests;
}
export function getShopingForStayWithFamily() {
    return shopingForStayWithFamily;
}
export function getShopingForFirstMeal() {
    return shopingForFirstMeal;
}
export function getShopingForSecondMeal() {
    return shopingForSecondMeal;
}
export function getShopingForThirdMeal() {
    return shopingForThirdMeal;
}
// export function getFullShopingList() {
//     return basicShoping.concat(shopingForGuests, shopingForStayWithFamily, shopingForFirstMeal, shopingForSecondMeal, shopingForThirdMeal);
// }
