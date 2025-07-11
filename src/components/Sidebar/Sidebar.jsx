import { useState } from 'react'
import viteLogo from '/vite.svg'
import '/src/App.css'
import './Sidebar.css'
import { NavLink } from 'react-router-dom';


function Sidebar() {
    const pages = [
        { to: '/profile', label: 'Профиль', icon: 'profile.svg' },
        { to: '/events', label: 'Мероприятия', icon: 'events.svg' },
        { to: '/techniques', label: 'Приемы', icon: 'techniques.svg' },
        { to: '/clubs', label: 'Клубы', icon: 'clubs.svg' },
        { to: '/groups', label: 'Группы', icon: 'groups.svg' },
        { to: '/log', label: 'Журнал', icon: 'log.svg' },
        { to: '/members', label: 'Участники', icon: 'members.svg' },
        { to: '/seminars', label: 'Семинары', icon: 'seminars.svg' },
        { to: '/statistics', label: 'Статистика', icon: 'statistics.svg' },
    ];


    return (
        <div className='sidebar'>
            <img className='sidebar__logo' src="./src/assets/logo.svg" alt="федерация айкидо" />
            <ul className='sidebar__list'>
                {pages.map(({ to, label, icon }) => (
                    <li key={to} className='sidebar__item--wrapper'>
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'
                            }
                        >
                            <img className='sidebar__item__image' src={`../src/assets/sidebar/${icon}`} alt={label} />
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
