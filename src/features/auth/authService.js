import { auth } from '../../firebase/config'

// "createUserWithEmailAndPassword" ile email ve parola kullanılarak bir kullanıcı oluşturulur,
// kullanıcıAdı yani username; kullancı içerisinde ilk oluşturulduğunda boş olarak gelir,
// bu yüzden, profilin update edilmesi gerekir. "updateProfile" kullanma sebebi budur.
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth'


const register = async (email, password, username) => {

    const userResponse = await createUserWithEmailAndPassword(auth, email, password)

    if (userResponse.user) {

        await updateProfile(userResponse.user, {
            displayName: username
        })

        localStorage.setItem('user', JSON.stringify(userResponse.user))
    }

    return userResponse.user
}

const login = async (email, password) => {

    const userResponse = await signInWithEmailAndPassword(auth, email, password)

    if (userResponse.user) {
        localStorage.setItem('user', JSON.stringify(userResponse.user))
    }

    return userResponse.user
}

const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
}

export default authService