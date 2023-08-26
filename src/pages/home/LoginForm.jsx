import { useState, useEffect } from 'react'
import { getMonths, getYears, addProcess, reset } from '../../features/process/processSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function LoginForm() {

    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [type, setType] = useState('income')
    const [selectedMonth, setSelectedMonth] = useState('January')
    const [selectedYears, setSelectedYears] = useState('2023')

    const { months, years } = useSelector((state) => state.process)
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMonths())
        dispatch(getYears())
        dispatch(reset())
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(addProcess({
            name,
            value,
            type,
            selectedMonth,
            selectedYears,
            email: user.email
        }))

        setName('')
        setValue('')

    }

    return (
        <>
            <h3>Input Process for Budget</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Process Name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>

                <label>
                    <span>Value:</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                </label>

                <label>
                    <span>Type:</span>
                    <select onChange={(e) => setType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </label>

                <label>
                    <span>Months:</span>
                    <select onChange={(e) => setSelectedMonth(e.target.value)}>
                        {months && months.map(m => (
                            <option key={m.id} value={m.name}>{m.name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    <span>Years:</span>
                    <select onChange={(e) => setSelectedYears(e.target.value)}>
                        {years && years.map(y => (
                            <option key={y.id} value={y.name}>{y.name}</option>
                        ))}
                    </select>
                </label>

                <button>Add Process</button>
            </form>
        </>
    )
}