import { useState } from "react";
import styles from './Login.module.css';
import {useAuth} from "../../../context/useAuth.js";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { login } = useAuth();

    const handleLogin = async () => {
        const newErrors = {};
        if (!username.trim()) newErrors.username = 'Введите логин';
        if (!password.trim()) newErrors.password = 'Введите пароль';
        setErrors(newErrors);

        if (!newErrors.username && !newErrors.password) {
            try {
                await login(username, password);
                console.log(`login: ${username}, password: ${password}`);
                alert('Успех');
            } catch (e) {
                setErrors({ password: e.message });
            }
        }
    };

    return (
        <div className="home_container">
            <h2>Авторизация</h2>
            <div className={styles.main_div}>
                <div className={styles.content_div}>
                    <h3 className={styles.content_h3}>Вход</h3>
                    <div className={styles.content_wrapper}>
                        <div className={styles.input_div}>
                            <span className={styles.input_name}>Логин</span>
                            <input
                                type="text"
                                placeholder="kosse"
                                className={`${styles.input} ${errors.username ? styles.input_error : ''}`}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            {errors.username && <div className={styles.input_comment}>{errors.username}</div>}
                        </div>
                        <div className={styles.input_div}>
                            <span className={styles.input_name}>Пароль</span>
                            <div className={styles.input_wrap}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="●●●●●●●"
                                    className={`${styles.input} ${errors.password ? styles.input_error : ''}`}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className={styles.show_password_btn}
                                    onClick={() => setShowPassword(v => !v)}
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                >
                                    <img src="/svg/view.svg" alt={showPassword ? "Скрыть пароль" : "Показать пароль"}/>
                                </button>
                            </div>
                            {errors.password && <div className={styles.input_comment}>{errors.password}</div>}
                        </div>
                    </div>
                    <div className={styles.btn_wrapper}>
                        <button type="button" className={styles.btn_password}>Забыли пароль?</button>
                    </div>
                    <div className={styles.btn_wrapper2}>
                        <button type="button" className={styles.btn_login} onClick={handleLogin}>
                            <span>Войти</span>
                            <img src={'/svg/arrow-right.svg'} alt="Войти"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
