import { useEffect, useState } from "react";
import "./ClubsPage.css";
import GroupDeleteModal from "../components/GroupsComponents/GroupDelete";
import GroupCreatorModal from "../components/GroupsComponents/GroupCreator";
import GroupEditorModal from "../components/GroupsComponents/GroupEditor";

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
  }, []);

  const openCreator = () => setIsCreatorOpen(true);
  const closeCreator = () => setIsCreatorOpen(false);
  const openDelete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);
  const openEditor = () => setIsEditorOpen(true);
  const closeEditor = () => setIsEditorOpen(false);

  if (!groups.length) return <div className="load">Загрузка...</div>;
  const selectedGroup = groups.find((group) => group.id === selectedId);

  const onDeleteButtonClick = (id) => {
    const updatedGroups = groups.filter((group) => group.id !== id);
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setSelectedId(updatedGroups[0]?.id || null);
    closeDelete();
  };

  const onSaveButtonClick = (updatedGroup) => {
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    );
    setGroups(updatedGroups);
    localStorage.setItem("clubs", JSON.stringify(updatedGroups));
  };

  return (
    <>
      {isCreatorOpen && (
        <GroupCreatorModal
          closeModal={closeCreator}
          groups={groups}
        />
      )}
      {isDeleteOpen && (
        <GroupDeleteModal
          closeModal={closeDelete}
          onDeleteClick={() => onDeleteButtonClick(selectedId)}
        />
      )}
      {isEditorOpen && (
        <GroupEditorModal
          closeModal={closeEditor}
          groupData={groups.filter((group) => group.id === selectedId)[0]}
          onSaveClick={onSaveButtonClick}
        />
      )}

      <div className="container">
        <div className="clubs__container">
          <h1 className="clubs__title">Группы</h1>
          <button className="clubs__button" onClick={openCreator}>+ Создать</button>
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
              <p className="right__block__text">{selectedGroup.coach}</p>
            </div>
            <div className="right__block__part">
              <span className="right__block__tag">Возрастная группа</span>
              <p className="right__block__text">{selectedGroup.ageGroup}</p>
            </div>
            <div className="right__block__part">
              <span className="right__block__tag">Клуб</span>
              <p className="right__block__text">{selectedGroup.club}</p>
            </div>
            <div className="right__block__part">
              <span className="right__block__tag">Расписание</span>
              {Object.entries(selectedGroup.schedule).map(([day, time]) => (
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
