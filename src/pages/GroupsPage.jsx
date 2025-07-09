import { useEffect, useState } from "react";
import "./ClubsPage.css";
import ClubCreatorModal from "../components/ClubsComponents/ClubCreator";
import ClubEditorModal from "../components/ClubsComponents/ClubEditor";
import GroupDeleteModal from "../components/GroupsComponents/GroupDelete";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const cachedGroups = localStorage.getItem("groups");
    if (cachedGroups) {
      const data = JSON.parse(cachedGroups);
      setGroups(data);
      setSelectedId(data[0]?.id);
    } else {
      fetch("/groups.json")
        .then((res) => res.json())
        .then((data) => {
          setGroups(data);
          setSelectedId(data[0]?.id);
          localStorage.setItem("groups", JSON.stringify(data));
        });
    }
    // fetch("http://158.160.168.25:5000/api/club/get/list")
    //   .then((res) => res.json())
    //   .then((data) => {
    //       console.log(data);
    //     });
  }, []);

  // const openCreator = () => setIsCreatorOpen(true);
  // const closeCreator = () => setIsCreatorOpen(false);
  const openDelete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);
  // const openEditor = () => setIsEditorOpen(true);
  // const closeEditor = () => setIsEditorOpen(false);

  if (!groups.length) return <div className="load">Загрузка...</div>;
  const selectedGroup = groups.find((group) => group.id === selectedId);

  // const onCreateButtonClick = async (evt) => {
  //   evt.preventDefault();

  //   let clubInfo = {};

  //   new FormData(evt.target).forEach((value, key) => {
  //     clubInfo[key] = value;
  //   });

  //   const newClub = {
  //     id: clubs.length + 1,
  //     name: clubInfo.name,
  //     city: clubInfo.city,
  //     address: clubInfo.address,
  //     groups: [
  //       {
  //         trainer: {
  //           name: "",
  //           degree: "",
  //           phone: "",
  //         },
  //         groupName: "",
  //         schedule: {},
  //       },
  //     ],
  //   };

  //   const updatedClubs = [...clubs, newClub];
  //   localStorage.setItem("clubs", JSON.stringify(updatedClubs));
  //   window.location.reload();
  // };

  const onDeleteButtonClick = (id) => {
    const updatedGroups = groups.filter((group) => group.id !== id);
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setSelectedId(updatedGroups[0]?.id || null);
    closeDelete();
  };

  // const onSaveButtonClick = (updatedClub) => {
  //   const updatedClubs = clubs.map((club) =>
  //     club.id === updatedClub.id ? updatedClub : club
  //   );
  //   setClubs(updatedClubs);
  //   localStorage.setItem("clubs", JSON.stringify(updatedClubs));
  // };

  return (
    <>
      {/* {isCreatorOpen && (
        <ClubCreatorModal
          closeModal={closeCreator}
          handleCreateSubmit={onCreateButtonClick}
        />
      )} */}
      {isDeleteOpen && (
        <GroupDeleteModal
          closeModal={closeDelete}
          onDeleteClick={() => onDeleteButtonClick(selectedId)}
        />
      )}
      {/* {isEditorOpen && (
        <ClubEditorModal
          closeModal={closeEditor}
          clubData={clubs.filter((club) => club.id === selectedId)[0]}
          onSaveClick={onSaveButtonClick}
        />
      )} */}

      <div className="container">
        <div className="clubs__container">
          <h1 className="clubs__title">Группы</h1>
          <button className="clubs__button">+ Создать</button>
        </div>
        <div className="columns">
          <div className="left_block">
            <ul className="left_block_ul">
              {groups.map((group) => (
                <li
                  key={group.id}
                  className={`left_block_li ${
                    selectedId === group.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedId(group.id)}
                >
                  <h3 className="left_block_name">{group.name}</h3>
                  <span className="left_block_city">{group.ageGroup}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mid_block">
            <h4 className="mid_block_name">{selectedGroup.name}</h4>
            <div className="club__button edit">
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
              <p className="mid_block_tags" style={{marginTop: 24}}>Участники группы:</p>
              {selectedGroup.groupMembers.map((member) => (
                <div key={member.id}>
                  <div>
                    <p>{member.id}. {member.member}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right__block">
            <h4 className="mid_block_name">Информация</h4>
            <div className="right__block__part">
              <span className="right__block__tag">Тренер</span>
              <p className="right__block__text">{selectedGroup.coachName}</p>
            </div>
            <div className="right__block__part">
              <span className="right__block__tag">Возрастная группа</span>
              <p className="right__block__text">{selectedGroup.ageGroup}</p>
            </div>
            <div className="right__block__part">
              <span className="right__block__tag">Клуб</span>
              <p className="right__block__text">{selectedGroup.club.name}</p>
            </div>
            <div className="right__block__part">
              <span className="right__block__tag">Расписание</span>
              {Object.entries(selectedGroup.club.schedule).map(([day, time]) => (
                <p className="right__block__text" key={day}>
                  {day}: {time}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Groups;
