import { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";

// interfaces
import { IUserDetail } from "../../../interfaces/IUserDetail";

interface ModalEditUserProps {
  onClose: () => void;
  userId?: string;
  onSucess: () => void;
}

const ModalEditUser = ({ onClose, userId, onSucess }: ModalEditUserProps) => {
  const [user, setUser] = useState<IUserDetail>();

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, []);

  const getUser = () => {
    fetch(`https://dummyapi.io/data/v1/user/${userId}`, {
      headers: {
        "app-id": "63473330c1927d386ca6a3a5",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  };

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    const newValues: any = { ...user, [name]: value };
    setUser(newValues);
  };

  const handleSave = async () => {
    try {
      if (userId) {
        await update();
      } else {
        await save();
      }
      onSucess();
    } catch (error) {
      console.log(error);
    }
  };

  const save = () => {
    return fetch(`https://dummyapi.io/data/v1/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "app-id": "63473330c1927d386ca6a3a5",
      },
      body: JSON.stringify(user),
    });
  };

  const update = () => {
    return fetch(`https://dummyapi.io/data/v1/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "app-id": "63473330c1927d386ca6a3a5",
      },
      body: JSON.stringify(user),
    });
  };

  return (
    <Modal onClose={onClose}>
      <header style={styles.header}>
        <h4>Crear usuario</h4>
      </header>
      <div className="modal-details__content" style={styles.itemsList}>
        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Titulo
          </div>
          <select
            className="details__input"
            style={styles.input}
            name="title"
            onChange={handleChange}
            value={user?.title}
          >
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
          </select>
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Nombres
          </div>
          <input
            className="details__input"
            type="text"
            style={styles.input}
            name="firstName"
            onChange={handleChange}
            value={user?.firstName}
          />
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Apellidos
          </div>
          <input
            style={styles.input}
            name="lastName"
            onChange={handleChange}
            type="text"
            value={user?.lastName}
          />
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Genero
          </div>
          <select
            style={styles.input}
            name="gender"
            onChange={handleChange}
            value={user?.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Imagen
          </div>
          <input
            style={styles.input}
            name="picture"
            onChange={handleChange}
            type="text"
            value={user?.picture}
          />
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Correo
          </div>
          <input
            style={styles.input}
            name="email"
            type="email"
            onChange={handleChange}
            value={user?.email}
          />
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Fecha de nacimiento
          </div>
          <input
            style={styles.input}
            name="registerDate"
            type="date"
            onChange={handleChange}
            value={user?.registerDate}
          />
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Telefono
          </div>
          <input
            style={styles.input}
            name="phone"
            type="text"
            onChange={handleChange}
            minLength={5}
            value={user?.phone}
          />
        </div>
      </div>

      <div className="modal-details__footer" style={styles.footer}>
        <button className="btn" onClick={onClose}>
          Cancelar
        </button>
        <button className="btn btn--primary" onClick={handleSave}>
          Guardar
        </button>
      </div>
    </Modal>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "center",
    color: "var(--color-text-2)",
  },
  itemsList: {
    display: "flex",
    // flexDirection: "column",
    gap: "1rem",
    paddingBottom: "1rem",
  },
  title: {
    color: "var(--color-text-2)",
  },
  profileImageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  itemName: {
    color: "var(--color-text-1)",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "1px solid var(--color-text-2)",
    outline: "none",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
  },
};

export default ModalEditUser;
