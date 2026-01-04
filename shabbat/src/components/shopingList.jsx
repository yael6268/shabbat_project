import { useState, useEffect } from "react";
import {
  getBasicShoping,
  getShopingForFirstMeal,
  getShopingForSecondMeal,
  getShopingForThirdMeal,
  getShopingForStayWithFamily,
  getShopingForGuests,
  addNewproduct,
  addNewproduct1,
  addNewproduct2,
  addNewproduct3,
  addNewproduct4,
  addNewproduct5,
} from "../data/shoping";

import { Shoping } from "./shoping";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

export const ShopingList = ({ showOnly }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [basicShoping, setBasicShoping] = useState([]);
  const [ShopingForFirstMeal, setShopingForFirstMeal] = useState([]);
  const [ShopingForSecondMeal, setShopingForSecondMeal] = useState([]);
  const [ShopingForThirdMeal, setShopingForThirdMeal] = useState([]);
  const [ShopingForStayWithFamily, setShopingForStayWithFamily] = useState([]);
  const [ShopingForGuests, setShopingForGuests] = useState([]);

  // איזה טופס פתוח כרגע
  const [openForm, setOpenForm] = useState(null);

  useEffect(() => {
    const loadshop = async () => {
      setLoading(true);
      try {
        setBasicShoping(await getBasicShoping());
        setShopingForFirstMeal(await getShopingForFirstMeal());
        setShopingForSecondMeal(await getShopingForSecondMeal());
        setShopingForThirdMeal(await getShopingForThirdMeal());
        setShopingForStayWithFamily(await getShopingForStayWithFamily());
        setShopingForGuests(await getShopingForGuests());
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadshop();
  }, []);

  // פונקציה כללית להוספת מוצר
  const handleAddProduct = async (event, addFunc, setFunc) => {
    event.preventDefault();

    const newProduct = {
      id: nanoid(),
      name: event.target.name.value,
    };

    event.target.reset();

    const updatedList = await addFunc(newProduct);
    setFunc(updatedList);

    setOpenForm(null);
  };

  if (loading) return <p>טוען...</p>;
  if (error) return <p>אירעה שגיאה</p>;

  return (
    <>
      <h1>רשימת הקניות לשבת</h1>

      {/* ===== קניות בסיסיות ===== */}
      <Section
        title="קניות בסיסיות"
        items={basicShoping}
        onDelete={(id) =>
          setBasicShoping((prev) => prev.filter((p) => p.id !== id))
        }
        openForm={openForm}
        setOpenForm={setOpenForm}
        formKey="basic"
        onAdd={(e) => handleAddProduct(e, addNewproduct, setBasicShoping)}
        showOnly={showOnly}
      />

      {/* ===== סעודה ראשונה ===== */}
      <Section
        title="קניות לסעודה ראשונה"
        items={ShopingForFirstMeal}
        onDelete={(id) =>
          setShopingForFirstMeal((prev) => prev.filter((p) => p.id !== id))
        }
        openForm={openForm}
        setOpenForm={setOpenForm}
        formKey="first"
        onAdd={(e) =>
          handleAddProduct(e, addNewproduct1, setShopingForFirstMeal)
        }
        showOnly={showOnly}
      />

      {/* ===== סעודה שניה ===== */}
      <Section
        title="קניות לסעודה שניה"
        items={ShopingForSecondMeal}
        onDelete={(id) =>
          setShopingForSecondMeal((prev) => prev.filter((p) => p.id !== id))
        }
        openForm={openForm}
        setOpenForm={setOpenForm}
        formKey="second"
        onAdd={(e) =>
          handleAddProduct(e, addNewproduct2, setShopingForSecondMeal)
        }
        showOnly={showOnly}
      />

      {/* ===== סעודה שלישית ===== */}
      <Section
        title="קניות לסעודה שלישית"
        items={ShopingForThirdMeal}
        onDelete={(id) =>
          setShopingForThirdMeal((prev) => prev.filter((p) => p.id !== id))
        }
        openForm={openForm}
        setOpenForm={setOpenForm}
        formKey="third"
        onAdd={(e) =>
          handleAddProduct(e, addNewproduct3, setShopingForThirdMeal)
        }
        showOnly={showOnly}
      />

      {/* ===== אירוח משפחה ===== */}
      <Section
        title="קניות לאירוח אצל משפחה"
        items={ShopingForStayWithFamily}
        onDelete={(id) =>
          setShopingForStayWithFamily((prev) =>
            prev.filter((p) => p.id !== id)
          )
        }
        openForm={openForm}
        setOpenForm={setOpenForm}
        formKey="family"
        onAdd={(e) =>
          handleAddProduct(e, addNewproduct4, setShopingForStayWithFamily)
        }
        showOnly={showOnly}
      />

      {/* ===== אורחים ===== */}
      <Section
        title="קניות לאירוח אורחים"
        items={ShopingForGuests}
        onDelete={(id) =>
          setShopingForGuests((prev) => prev.filter((p) => p.id !== id))
        }
        openForm={openForm}
        setOpenForm={setOpenForm}
        formKey="guests"
        onAdd={(e) =>
          handleAddProduct(e, addNewproduct5, setShopingForGuests)
        }
        showOnly={showOnly}
      />

      <Link to="/all-shoping">להצגת כל המוצרים</Link>
    </>
  );
};

// ================= קומפוננטת עזר =================
const Section = ({
  title,
  items,
  onDelete,
  openForm,
  setOpenForm,
  formKey,
  onAdd,
  showOnly,
}) => (
  <>
    <h3>{title}</h3>

    <ul className="shop-list centered-list">
      {items.map((s) => (
        <Shoping
          key={s.id}
          shoping={s}
          showOnly={showOnly}
          onDelete={onDelete}
        />
      ))}
    </ul>

    <button className="btn" onClick={() => setOpenForm(formKey)}>
      הוספת מוצר
    </button>

    {openForm === formKey && (
      <form className="card" onSubmit={onAdd}>
        <input
          type="text"
          name="name"
          placeholder="הכנס שם מוצר"
          required
        />
        <br />
        <br />
        <button className="btn">שמור</button>
        <button
          type="button"
          className="btn secondary"
          onClick={() => setOpenForm(null)}
        >
          ביטול
        </button>
      </form>
    )}
  </>
);
