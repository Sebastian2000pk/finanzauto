import { useEffect, useState } from "react";
import "./usersPage.css";
import TextInput from "../../components/textInput";

// Modals
import ModalDetailsUser from "./components/ModalDetailsUser";
import ModalEditUser from "./components/ModalEditUser";
import ModalConfirm from "../../components/modalConfirm/ModalConfirm";

// Interfaces
import { IUser } from "../../interfaces/IUser";

const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersFixed, setUsersFixed] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [userIdSelected, setUserIdSelected] = useState<string>();
  const [isOpenModalDetails, setIsOpenModalDetails] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, [page]);

  const getUsers = () => {
    fetch(`https://dummyapi.io/data/v1/user?page=${page}&limit=6`, {
      headers: {
        "app-id": "63473330c1927d386ca6a3a5",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data?.data);
        setUsersFixed(data?.data);
        setLimit(data?.limit);
        setTotalPages(Math.round(data?.total / limit));
      });
  };

  const handleSearch = (e: any) => {
    const { value } = e.target;
    setSearch(value);
    const filteredUsers = usersFixed.filter((user) => {
      return user.id.includes(value);
    });
    setUsers(filteredUsers);
  };

  const handleChangePage = (pageNumber: number) => {
    if (pageNumber < 1) {
      return;
    }
    if (pageNumber > totalPages) {
      return;
    }
    setPage(pageNumber);
  };

  const openModalDetails = (userId: string) => {
    setUserIdSelected(userId);
    setIsOpenModalDetails(true);
  };

  const openModalEdit = (userId: string) => {
    setUserIdSelected(userId);
    setIsOpenModalEdit(true);
  };

  const hanldeClickDeleteUser = (userId: string) => {
    setUserIdSelected(userId);
    setIsOpenModalConfirm(true);
  };

  const handleDeleteUser = () => {
    fetch(`https://dummyapi.io/data/v1/user/${userIdSelected}`, {
      headers: {
        "app-id": "63473330c1927d386ca6a3a5",
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        getUsers();
        setIsOpenModalConfirm(false);
      })
      .catch((error) => {
        console.error(error);
        setIsOpenModalConfirm(false);
      });

    setUserIdSelected("");
  };

  const modalCreateUser = () => {
    setUserIdSelected("");
    setIsOpenModalEdit(true);
  };

  const onSucessEditUser = () => {
    getUsers();
    setIsOpenModalEdit(false);
  };

  return (
    <div className="users__container">
      <div className="users__container__header">
        <div className="search__container">
          <TextInput
            placeholder="Id a buscar.."
            onChange={handleSearch}
            value={search}
          />
        </div>
        <button className="btn btn-primary" onClick={modalCreateUser}>
          Crear usuario
        </button>
      </div>

      <div className="userlist">
        {users.map((user, index) => (
          <div className="user" key={index}>
            <div className="user__img">
              <img
                src={user.picture}
                alt="user profile image"
                className="users__table__img"
              />
            </div>

            <div className="user__information">
              <div className="user__name">
                {user.firstName} {user.lastName}
              </div>
              <div className="user__id">{user.id}</div>
            </div>

            <div>
              <button
                className="users__table__btn"
                onClick={() => hanldeClickDeleteUser(user.id)}
              >
                <i className="bx bx-trash"></i>
              </button>
              <button
                className="users__table__btn"
                onClick={() => openModalEdit(user.id)}
              >
                <i className="bx bxs-edit"></i>
              </button>
              <button
                className="users__table__btn"
                onClick={() => openModalDetails(user.id)}
              >
                <i className="bx bx-file"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="pagination__container">
        <button
          className="pagination__button pagination__button--arrow"
          onClick={() => handleChangePage(page - 1)}
        >
          <i className="bx bx-chevron-left"></i>
        </button>

        {Array.from(Array(totalPages).keys()).map((item, index) => (
          <button
            className={`pagination__button ${page === item + 1 && "active"}`}
            onClick={() => handleChangePage(item + 1)}
            key={index}
          >
            {item + 1}
          </button>
        ))}

        <button
          className="pagination__button pagination__button--arrow"
          onClick={() => handleChangePage(page + 1)}
        >
          <i className="bx bx-chevron-right"></i>
        </button>
      </section>

      {isOpenModalDetails && (
        <ModalDetailsUser
          onClose={() => setIsOpenModalDetails(false)}
          userId={userIdSelected}
        />
      )}

      {isOpenModalEdit && (
        <ModalEditUser
          onClose={() => setIsOpenModalEdit(false)}
          userId={userIdSelected}
          onSucess={onSucessEditUser}
        />
      )}

      {isOpenModalConfirm && (
        <ModalConfirm
          onClose={() => setIsOpenModalConfirm(false)}
          text="¿Estas seguro de eliminar este usuario?"
          onConfirm={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default UsersPage;
