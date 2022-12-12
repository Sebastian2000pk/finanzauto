import { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";

// interfaces
import { IUserDetail } from "../../../interfaces/IUserDetail";

interface ModalEditUserProps {
  onClose: () => void;
  userId?: string;
}

const ModalDetailsUser = ({ onClose, userId }: ModalEditUserProps) => {
  const [user, setUser] = useState<IUserDetail>();

  useEffect(() => {
    getUser();
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

  return (
    <Modal onClose={onClose}>
      <div className="modal-details__content" style={styles.itemsList}>
        <div
          className="profile-image__container"
          style={styles.profileImageContainer}
        >
          <div className="profile-image" style={styles.profileImage}>
            <img src={user?.picture} alt="profile" style={styles.image} />
          </div>
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Id
          </div>
          <div className="details__item__value">{user?.id}</div>
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Titulo
          </div>
          <div className="details__item__value">{user?.title}</div>
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Nombres
          </div>
          <div className="details__item__value">{user?.firstName}</div>
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Apellidos
          </div>
          <div className="details__item__value">{user?.lastName}</div>
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Genero
          </div>
          <div className="details__item__value">{user?.gender}</div>
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Correo
          </div>
          <div className="details__item__value">{user?.email}</div>
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Fecha de nacimiento
          </div>
          <div className="details__item__value">{user?.registerDate}</div>
        </div>

        <div className="details__item">
          <div className="details__item__title" style={styles.itemName}>
            Telefono
          </div>
          <div className="details__item__value">{user?.phone}</div>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
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
  itemValue: {
    color: "var(---color-text-2)",
  },
};

export default ModalDetailsUser;
