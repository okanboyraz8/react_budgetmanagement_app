import styles from './Navbar.module.css'
import { Link, useNavigate } from "react-router-dom"
import { FaSignOutAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

export default function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)

    const onLogout = async () => {
        await dispatch(logout())
        await dispatch(reset())
        navigate('/login')
    }

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}><Link to="/">Budget Management</Link></li>
                {!user ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                ) : (
                    <>
                        <li>
                            <span>Hello {user.displayName}</span>
                        </li>
                        <li>
                            <button className={styles.btn} onClick={onLogout}><FaSignOutAlt />Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
