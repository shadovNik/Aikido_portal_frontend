import { useEffect, useState } from "react";
import "./ClubsPage.css";
import ClubCreatorModal from "../components/ClubsComponents/ClubCreator";
import ClubDeleteModal from "../components/ClubsComponents/ClubDelete";
import ClubEditorModal from "../components/ClubsComponents/ClubEditor";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const cachedClubs = localStorage.getItem("clubs");
    if (cachedClubs) {
      const data = JSON.parse(cachedClubs);
      setClubs(data);
      setSelectedId(data[0]?.id);
    } else {
      fetch("/clubs.json")
        .then((res) => res.json())
        .then((data) => {
          setClubs(data);
          setSelectedId(data[0]?.id);
          localStorage.setItem("clubs", JSON.stringify(data));
        });
    }
    // fetch("http://158.160.168.25:5000/api/club/get/list")
    //   .then((res) => res.json())
    //   .then((data) => {
    //       console.log(data);
    //     });
  }, []);

  const openCreator = () => setIsCreatorOpen(true);
  const closeCreator = () => setIsCreatorOpen(false);
  const openDelete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);
  const openEditor = () => setIsEditorOpen(true);
  const closeEditor = () => setIsEditorOpen(false);

  if (!clubs.length) return <div className="load">Загрузка...</div>;
  const selectedClub = clubs.find((club) => club.id === selectedId);

  const onCreateButtonClick = async (evt) => {
    evt.preventDefault();

    let clubInfo = {};

    new FormData(evt.target).forEach((value, key) => {
      clubInfo[key] = value;
    });

    const newClub = {
      id: clubs.length + 1,
      name: clubInfo.name,
      city: clubInfo.city,
      address: clubInfo.address,
      groups: [
        {
          trainer: {
            name: "",
            degree: "",
            phone: "",
          },
          groupName: "",
          schedule: {},
        },
      ],
    };

    const updatedClubs = [...clubs, newClub];
    localStorage.setItem("clubs", JSON.stringify(updatedClubs));
    window.location.reload();
  };

  const onDeleteButtonClick = (id) => {
    console.log(id);
    const updatedClubs = clubs.filter((club) => club.id !== id);
    setClubs(updatedClubs);
    localStorage.setItem("clubs", JSON.stringify(updatedClubs));
    setSelectedId(updatedClubs[0]?.id || null);
    closeDelete();
  };

  const onSaveButtonClick = (updatedClub) => {
    const updatedClubs = clubs.map((club) =>
      club.id === updatedClub.id ? updatedClub : club
    );
    setClubs(updatedClubs);
    localStorage.setItem("clubs", JSON.stringify(updatedClubs));
  };

  return (
    <>
      {isCreatorOpen && (
        <ClubCreatorModal
          closeModal={closeCreator}
          handleCreateSubmit={onCreateButtonClick}
        />
      )}
      {isDeleteOpen && (
        <ClubDeleteModal
          closeModal={closeDelete}
          onDeleteClick={() => onDeleteButtonClick(selectedId)}
          clubName={selectedClub.name}
        />
      )}
      {isEditorOpen && (
        <ClubEditorModal
          closeModal={closeEditor}
          clubData={clubs.filter((club) => club.id === selectedId)[0]}
          onSaveClick={onSaveButtonClick}
        />
      )}

      <div className="container">
        <div className="clubs__container">
          <h1 className="clubs__title">Клубы</h1>
          <button className="clubs__button" onClick={openCreator}>
            + Создать
          </button>
        </div>
        <div className="columns">
          <div className="left_block">
            <ul className="left_block_ul">
              {clubs.map((club) => (
                <li
                  key={club.id}
                  className={`left_block_li ${
                    selectedId === club.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedId(club.id)}
                >
                  <h3 className="left_block_name">{club.name}</h3>
                  <span className="left_block_city">{club.city}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mid_block">
            <h4 className="mid_block_name">{selectedClub.name}</h4>
            <div className="club__button edit" onClick={openEditor}>
              <img
                className="club__button__img"
                src="../src/assets/clubs/edit.svg"
                alt="Изменить"
              ></img>
            </div>
            <div className="club__button delete" onClick={openDelete}>
              <img
                className="club__button__img"
                src="../src/assets/clubs/delete.svg"
                alt="Удалить"
              ></img>
            </div>
            <div className="mid_block_content">
              {selectedClub.groups.map((group, index) => (
                <div key={index} style={{ marginTop: 24 }}>
                  <p className="mid_block_tags">Тренер:</p>
                  <div>
                    <p>{group.trainer.name}</p>
                    <p>{group.trainer.degree}</p>
                    <p>{group.trainer.phone}</p>
                  </div>
                  <p className="mid_block_tags">Группа:</p>
                  <div>
                    <span>{group.groupName}</span>
                  </div>
                  <p className="mid_block_tags">Расписание:</p>
                  <div>
                    {Object.entries(group.schedule).map(([day, time]) => (
                      <p key={day}>
                        {day}: {time}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right__block">
            <h4 className="mid_block_name">Информация</h4>
            <div className="right__block__part">
              <span className="right__block__tag">Создатель</span>
              <p className="right__block__text">Смирнов Денис</p>
            </div>
            <div className="right__block__part">
              <span className="right__block__tag">Город</span>
              <p className="right__block__text">{selectedClub.city}</p>
            </div>
            <div className="right__block__part">
              <span className="right__block__tag">Адрес клуба</span>
              <p className="right__block__text">{selectedClub.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Clubs;
