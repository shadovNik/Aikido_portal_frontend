import './Sidebar.css';
import {useState} from "react";
import {NavLink} from "react-router-dom";

const menuItems = [
    {label: 'Главная', href: '/'},
    {label: 'Клубы', href: '/clubs'},
    {label: 'Авторизация', href: '/login'},
];

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="main_div">
                <div className="logo_div">
                    <NavLink to="/">
                        <img className="logo_img" src="/svg/logo.svg" alt="Logo" />
                    </NavLink>
                </div>
                <div className="stepper_div">
                    <h1 className="sidebar_title">
                        Портал айкидо
                    </h1>
                    <nav className="menu_div">
                        <ul className="menu_ul">
                            {menuItems.map((item) => (
                                <li className="menu_li" key={item.href}>
                                    <NavLink
                                        to={item.href}
                                        className={({ isActive }) => isActive ? "menu_link active" : "menu_link"}
                                        end
                                    >
                                        <span className="custom-checkbox" />
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;