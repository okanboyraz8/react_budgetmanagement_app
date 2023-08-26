import { db } from '../../firebase/config'
import { collection, getDocs, orderBy, query, addDoc, serverTimestamp, limit, where, Timestamp } from 'firebase/firestore'
//serverTimestamp: addProcess içine fonskiyonu ekledik ve çalıştırdık, ancak bu fonksiyon sadece firestore ile
//etkileşim olduğunda çalışıyor. Yani, addDoc diyerek serverTimestamp görebiliriz. Belge eklenirken
//firestore'un tarihini "zaman damgalı bir şekilde" alıyor.

const getMonths = async () => {

    const colRef = collection(db, 'Months');

    //sıralama ekleme işlemi için: (küçükten büyüğe sıralama için)
    //rank: Firestore'da bu isimle bir index eklemesi yapıldı!
    const q = query(colRef, orderBy('rank'))

    const docSnap = await getDocs(q)
    let array = [];
    docSnap.forEach(doc => {
        let datas = { ...doc.data(), id: doc.id }
        array.push(datas);
    })

    return array;

}

const getYears = async () => {

    const colRef = collection(db, 'Years');

    //sıralama ekleme işlemi için: (küçükten büyüğe sıralama için)
    const q = query(colRef, orderBy('name'))

    const docSnap = await getDocs(q)
    let array = [];
    docSnap.forEach(doc => {
        let datas = { ...doc.data(), id: doc.id }
        array.push(datas);
    })

    return array;

}

const addProcess = async (data) => {

    const colRef = collection(db, 'Process');

    const docRef = await addDoc(colRef, { ...data, date: serverTimestamp() });

    return { ...data, date: Timestamp.now(), id: docRef.id };

}

const last10GetProcess = async (email) => {

    const colRef = collection(db, 'Process');
    const q = query(colRef, where("email", "==", email), orderBy('date', 'desc'), limit(10)); //desc: ters sıralama

    const querySnapshot = await getDocs(q);
    let array = []

    querySnapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id })
    });

    return array;

}

const processService = {
    getMonths,
    getYears,
    addProcess,
    last10GetProcess
}

export default processService;