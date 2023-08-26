import styles from './Home.module.css'

//LoginForm
import LoginForm from './LoginForm'

//React Hooks
import { useEffect } from 'react'

//import for navigation on login&home
import { useNavigate } from 'react-router-dom'

//State bilgisinde user & auth etkileşimi
import { useSelector, useDispatch } from 'react-redux'

import { last10GetProcess } from '../../features/process/processSlice'


//{user && <div>Budget Management Page for {user.displayName}</div>} username ekrana yazdırma!
export default function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)
  const { process } = useSelector((state) => state.process)

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }

    if (user) {
      dispatch(last10GetProcess(user.email))
    }

  }, [user, navigate])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {process && process.map(i => (
          <div key={i.id}>{i.name}</div>
        ))}
      </div>
      <div className={styles.sidebar}>
        <LoginForm />
      </div>
    </div>
  )
}