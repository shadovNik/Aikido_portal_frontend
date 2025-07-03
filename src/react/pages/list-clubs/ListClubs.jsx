import styles from './listClubs.module.css'
import {useEffect, useState} from "react";


const ListClubs = () => {
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

    if (!clubs.length) return <div>Загрузка...</div>;
    const selectedClub = clubs.find(club => club.id === selectedId);

    return (
        <div className="home_container">
            <h2 className="home_h2">Клубы</h2>
            <div className={styles.columns}>
                <div className={styles.left_block}>
                    <ul className={styles.left_block_ul}>
                        {clubs.map(club => (
                            <li
                                key={club.id}
                                className={`${styles.left_block_li} ${selectedId === club.id ? styles.active : ''}`}
                                onClick={() => setSelectedId(club.id)}
                            >
                                <h3 className={styles.left_block_name}>{club.name}</h3>
                                <span className={styles.left_block_city}>{club.city}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.right_block}>
                    <h4 className={styles.right_block_name}>
                        {selectedClub.name}
                    </h4>
                    <div className={styles.right_block_content}>
                        {selectedClub.groups.map((group, idx) => (
                            <div key={idx} style={{marginTop: 24}}>
                                <p className={styles.right_block_tags}>Тренер:</p>
                                <div>
                                    <p>{group.trainer.name},</p>
                                    <p>{group.trainer.degree}</p>
                                    <p>{group.trainer.phone}</p>
                                </div>
                                <p className={styles.right_block_tags}>Группа:</p>
                                <div>
                                    <span>{group.groupName}</span>
                                </div>
                                <p className={styles.right_block_tags}>Расписание:</p>
                                <div>
                                    {Object.entries(group.schedule).map(([day, time]) => (
                                        <p key={day}>{day}: {time}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListClubs;