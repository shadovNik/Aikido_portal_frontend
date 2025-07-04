import { useEffect, useState } from 'react'
import './ClubsPage.css';

function Clubs() {
  const [clubs, setClubs] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetch('/clubs.json')
            .then(res => res.json())
            .then(data => {
                setClubs(data);
                setSelectedId(data[0]?.id);
            });
    }, []);

    if (!clubs.length) return <div className='load'>Загрузка...</div>;
    const selectedClub = clubs.find(club => club.id === selectedId);

  return (
    <>
      <div className="container">
        <div className='clubs__container'>
          <h1 className="clubs__title">Клубы</h1>
          <button className='clubs__button'>+ Создать</button>
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
            <div className='club__button edit'>
              <img className='club__button__img' src='../src/assets/clubs/edit.svg' alt='Изменить'></img>
            </div>
            <div className='club__button delete'>
              <img className='club__button__img' src='../src/assets/clubs/delete.svg' alt='Удалить'></img>
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
                  <p className='mid_block_tags'>Группа:</p>
                  <div>
                    <span>{group.groupName}</span>
                  </div>
                  <p className='mid_block_tags'>Расписание:</p>
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
          <div className='right__block'>
            <h4 className="mid_block_name">Информация</h4>
              <div className='right__block__part'>
                <span className='right__block__tag'>Создатель</span>
                <p className='right__block__text'>Смирнов Денис</p>
              </div>
              <div className='right__block__part'>
                <span className='right__block__tag'>Город</span>
                <p className='right__block__text'>{selectedClub.city}</p>
              </div>
              <div className='right__block__part'>
                <span className='right__block__tag'>Адрес клуба</span>
                <p className='right__block__text'>{selectedClub.address}</p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Clubs
