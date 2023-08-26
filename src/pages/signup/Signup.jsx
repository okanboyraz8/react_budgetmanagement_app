import styles from './Signup.module.css'
//React Hooks
import { useEffect, useState } from 'react'

// useSelector: state çağırmak ve erişmek için (initialState içine erişim gibi)
// useDispatch: register çalışabilmesi için de buna ihtiyacımız var
import { useSelector, useDispatch } from 'react-redux'

// useNavigate: işlem gerçekleşirse yönlendirme yapmak için
import { useNavigate } from 'react-router-dom'

// register & reset fonksiyonlarına erişim
import { register, reset } from '../../features/auth/authSlice'

//react-toastify
import { toast } from 'react-toastify'


export default function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // (state) => state.auth => "auth" store.js içinden geliyor
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(email, password, displayName)

    const userData = {
      email,
      password,
      displayName
    }
    dispatch(register(userData))
  }

  useEffect(() => {

    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Membership Page</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Username:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <button className="btn">Sign up</button>
    </form>
  )
}