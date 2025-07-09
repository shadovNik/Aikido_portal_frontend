function GroupDeleteModal({ closeModal, onDeleteClick }) {
  return (
    <>
      <div className="creator__modal">
        <div className="delete__content">
          <div className="close__button" onClick={closeModal}>
            <img
              className="close__button__img"
              src="../src/assets/profile/close.svg"
              alt="Закрыть"
            />
          </div>
          <p className="modal__header">Удалить группу</p>
          <p className="delete__message">Группа будет удалена навсегда. Вы точно хотите ее удалить?</p>
          <button className="delete__button" onClick={onDeleteClick}>Удалить</button>
        </div>
      </div>
    </>
  );
}

export default GroupDeleteModal;
