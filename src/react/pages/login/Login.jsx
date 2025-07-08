import { useState } from "react";
import styles from './Login.module.css';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ login: '', password: '' });

    const handleLogin = () => {
        const newErrors = { login: '', password: '' };
        if (!login.trim()) newErrors.login = 'Введите логин';
        if (!password.trim()) newErrors.password = 'Введите пароль';
        setErrors(newErrors);

        if (!newErrors.login && !newErrors.password) {
            // TODO: авторизация
            alert("Вход выполнен!");
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
                                className={`${styles.input} ${errors.login ? styles.input_error : ''}`}
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                            />
                            {errors.login && <div className={styles.input_comment}>{errors.login}</div>}
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
