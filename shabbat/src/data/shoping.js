const ShopingForShabbat = [
    {
        id: 1,
        name: "לחם",
        type:"basic"

    },
    {
        id: 2,
        name: "חלב",
        type:"basic"

    },
    {
        id: 3,
        name: "ביצים",
        type:"basic"


    },
    {
        id: 4,
        name: "ירקות",
        type:"basic"
    },
    {

        id: 5,
        name: "פירות",
        type:"basic"
    },
    {
        id: 6,
        name: "בשר",
        type:"basic"
    },
    {
        id: 7,
        name: "עוף",
        type:"basic"
    },
    {
        id: 8,
        name: "דגים",
        type:"basic"
    },
    {
        id: 9,
        name: "תבלינים",
        type:"basic"
    },
    {
        id: 10,
        name: "שמן זית",
        type:"basic"
    },
    {
        id: 11,
        name: "קמח",
        type:"basic"
    },
    {
        id: 12,
        name: "סוכר",
        type:"basic"
    },
    {
        id: 13,
        name: "שמן קנולה",
        type:"basic"
    },
    {
        id: 14,
        name: "יין",
        type:"guest"
    },
    {
        id: 15,
        name: "קינוח",
        type:"guest"
    },
    {
        id: 16,
        name: "מיץ",
        type:"guest"
    },
    {
        id: 17,
        name: "חטיפים",
        type:"guest"
    },
    {
        id: 18,
        name: "פיצוחים",
        type:"guest"
    },
    {
        id: 19,
        name: "בירה",
        type:"guest"
    },
    {
        id: 20,
        name: "מתנות",
        type:"stay"
    },
    {
        id: 21,
        name: "פרחים",
        type:"stay"
    },
    {
        id: 22,
        name: "קישוטים לשולחן",
        type:"stay"
    },
    {
        id: 23,
        name: "שניצל",
        type:"first"
    },
    {
        id: 24,
        name: "תפוחי אדמה",
        type:"first"
    },
    {
        id: 25,
        name: "ירקות לבישול",
        type:"first"
    },
    {
        id: 26,
        name: "ירקות למרק",
        type:"first"
    },
    {
        id: 27,
        name: "אטריות",
        type:"first"
    },
    {
        id: 28,
        name: "דגים",
        type:"first"
    },
    {
        id: 29,
        name: "כבד קצוץ",
        type:"second"
    },
    {
        id: 30,
        name: "שעועית",
        type:"second"
    },
    {
        id: 31,
        name: "בשר לטשולנט",
        type:"second"
    },
    {
        id: 32,
        name: "חסה ",
        type:"second"
    },
    {
        id: 33,
        name: " גלידה קרה",
        type:"second"
    },
    {
        id: 34,
        name: "טונה בשימורים",
        type:"third"
    },
    {
        id: 35,
        name: "פשטידת ירקות",
        type:"third"
    },
    {
        id: 36,
        name: "פרות העונה",
        type:"third"
    },
    {
        id: 37,
        name: "גבינת שמנת",
        type:"third"
    },
    {
        id: 38,
        name: "עוגיות",
        type:"third"
    }
];
// export { basicShoping };
// export const getAllShoping=()=>{
//     return new Promise((resolve,reject) => {
//         resolve(ShopingForShabbat);
//     });
// }
export function getAllShoping() {
    return ShopingForShabbat;
}
// export function getShopingForStayWithFamily() {
//     return shopingForStayWithFamily;
// }
// export function getShopingForFirstMeal() {
//     return shopingForFirstMeal;
// }
// export function getShopingForSecondMeal() {
//     return shopingForSecondMeal;
// }
// export function getShopingForThirdMeal() {
//     return shopingForThirdMeal;
// }
// export function getFullShopingList() {
//     return basicShoping.concat(shopingForGuests, shopingForStayWithFamily, shopingForFirstMeal, shopingForSecondMeal, shopingForThirdMeal);
// }
// export const addNewproduct = (p) => {
//     basicShoping.push(p);
//     return Promise.resolve([...basicShoping]);
// }
// export const addNewproduct1 = (p) => {
//     shopingForFirstMeal.push(p);
//     return Promise.resolve([...shopingForFirstMeal]);
// }
// export const addNewproduct2 = (p) => {
//     shopingForSecondMeal.push(p);
//     return Promise.resolve([...shopingForSecondMeal]);
// }
// export const addNewproduct3 = (p) => {
//     shopingForThirdMeal.push(p);
//     return Promise.resolve([...shopingForThirdMeal]);
// }
// export const addNewproduct4 = (p) => {
//     shopingForStayWithFamily.push(p);
//     return Promise.resolve([...shopingForStayWithFamily]);
// }
// export const addNewproduct5 = (p) => {
//     shopingForGuests.push(p);
//     return Promise.resolve([...shopingForGuests]);
// }


 
//  const deleteProduct = (id) => setBasicShoping(prev => prev.filter(p => p.id !== id));
//  const deleteProduct1 = (id) => setShopingForFirstMeal(prev => prev.filter(p => p.id !== id));
//  const deleteProduct2 = (id) => setShopingForSecondMeal(prev => prev.filter(p => p.id !== id));
//  const deleteProduct3 = (id) => setShopingForThirdMeal(prev => prev.filter(p => p.id !== id));
//  const deleteProduct4 = (id) => setShopingForStayWithFamily(prev => prev.filter(p => p.id !== id));
//  const deleteProduct5 = (id) => setShopingForGuests(prev => prev.filter(p => p.id !== id));