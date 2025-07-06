import { useEffect, useState } from "react";
import "./ProfilePage.css";

function Profile() {
  //const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({});

  const profileData = {
    photo: "../assets/profile/profilePhoto.jpg",
    fullName: "Смирнов Денис",
    role: "Руководитель",
  };

  const mainInfoItems = [
    { title: "Логин", value: "smirnov" },
    { title: "Город", value: "Екатеринбург" },
    { title: "ФИО", value: "Смирнов Денис Сергеевич" },
    { title: "Пол", value: "Мужской" },
    { title: "Номер телефона", value: "+79655390067" },
    { title: "Дата рождения", value: "10.01.1979" },
  ];

  const rankInfoItems = [
    { title: "Кю / Дан", value: "1 дан" },
    { title: "Дата аттестации", value: "20.01.2021" },
  ];

  const editItemsMain = [
    { title: "Логин", value: "smirnov" },
    { title: "Пароль", value: "542709" },
    { title: "ФИО", value: "Смирнов Денис Сергеевич" },
    { title: "Город", value: "Екатеринбург" },
    { title: "Номер телефона", value: "+79655390067" },
    { title: "Дата рождения", value: "20.01.2004" },
    { title: "Пол", value: "Мужской" },
    { title: "Роль", value: "Ученик" },
  ];

  const editItemsRank = [
    { title: "Кю / Дан", value: "2 детский" },
    { title: "Дата аттестации", value: "20.01.2004" },
  ];

  // const mainInfoItems = [
  //   { title: "Логин", value: user.login },
  //   { title: "Город", value: user.city },
  //   { title: "ФИО", value: user.full_name },
  //   { title: "Пол", value: user.gender },
  //   { title: "Номер телефона", value: user.phone_number },
  //   { title: "Дата рождения", value: user.birth_date },
  // ];

  // const rankInfoItems = [
  //   { title: "Кю / Дан", value: user.kye},
  //   { title: "Дата аттестации", value: user.attestation_date},
  // ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (title, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [title]: value,
    }));
  };

  useEffect(() => {
    const initialValues = [...editItemsMain, ...editItemsRank].reduce(
      (acc, item) => {
        acc[item.title] = item.value;
        return acc;
      },
      {}
    );
    setFormValues(initialValues);
  }, [isModalOpen])

  return (
    <>
      <h1 className="profile__header">Профиль</h1>

      {isModalOpen && (
        <div className="modal__overlay">
          <div className="modal__content">
            <div className="close__button" onClick={closeModal}>
              <img
                className="close__button__img"
                src="../src/assets/profile/close.svg"
                alt="Закрыть"
              />
            </div>
            <p className="modal__header">Редактировать профиль</p>
            <div className="scrollbar__container">
              <div className="profile__photo edit">
                <img
                  className="profile__photo__img edit"
                  src="../src/assets/profile/profilePhoto.jpg"
                  alt="Фото"
                />
                <img
                  className="upload__img"
                  src="../src/assets/profile/upload.svg"
                  alt="Загрузить"
                />
              </div>
              <div className="edit__items">
                <p className="edit__items__title">Основная информация</p>
                <div className="profile__card__items edit">
                  {editItemsMain.map((item, index) => (
                    <div key={index} className="profile__card__item">
                      <p className="item__title">{item.title}</p>
                      <input className="item__content"
                        value={formValues[item.title] || ""}
                        onChange={(e) => handleInputChange(item.title, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="edit__items">
                <p className="edit__items__title">Информация о ранге</p>
                <div className="profile__card__items edit">
                  {editItemsRank.map((item, index) => (
                    <div key={index} className="profile__card__item">
                      <p className="item__title">{item.title}</p>
                      <input className="item__content"
                        value={formValues[item.title] || ""}
                        onChange={(e) => handleInputChange(item.title, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button className="save__button">Сохранить</button>
            </div>
          </div>
        </div>
      )}

      <div className="profile">
        <div className="profile__card data">
          <div className="profile__data">
            <div className="profile__photo">
              <img
                className="profile__photo__img"
                src="../src/assets/profile/profilePhoto.jpg"
                alt="Фото"
              ></img>
            </div>
            <div className="profile__nameRole">
              <p className="profile__name">{profileData.fullName}</p>
              <p className="profile__role">{profileData.role}</p>
            </div>
          </div>
          <div className="profile__edit" onClick={openModal}>
            <img
              className="profile__edit__img"
              src="../src/assets/profile/edit.svg"
            />
          </div>
        </div>
        <div className="profile__card mainInfo">
          <p className="profile__card__title">Основная информация</p>
          <div className="profile__card__items">
            {mainInfoItems.map((item, index) => (
              <div key={index} className="profile__card__item">
                <p className="item__title">{item.title}</p>
                <div className="item__content">
                  <p className="item__content-value">{item.value}</p>
                  {item.title === "Дата рождения" && (
                    <img
                      className="dateOfBirth__img"
                      src="../src/assets/profile/events.svg"
                      alt="Дата рождения"
                    />
                  )}
                  {item.title === "Город" && (
                    <img
                      className="city__img"
                      src="../src/assets/profile/location.svg"
                      alt="Город"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="profile__card rankInfo">
          <p className="profile__card__title">Информация о ранге</p>
          <div className="profile__card__items rank">
            {rankInfoItems.map((item, index) => (
              <div key={index} className="profile__card__item">
                <p className="item__title">{item.title}</p>
                <div className="item__content">
                  <p className="item__content-value">{item.value}</p>
                  {item.title === "Дата аттестации" && (
                    <img
                      className="attestationDate__img"
                      src="../src/assets/profile/events.svg"
                      alt="Дата аттестации"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
