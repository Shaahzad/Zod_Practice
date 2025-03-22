import { useState } from 'react'
import { UserForm, UserFormError, userformschema } from './types/userform'

const Userform = () => {
    const [formData, setFormData] = useState<UserForm>({
        name: '',
        email: '',
        age: 0,
        password: '',
        confirmPassword: '',
        phone: '',
        gender: "male"
    })
    const [errors, setErrors] = useState<UserFormError>({})
    const changeInputHandler = (e:React.ChangeEvent<HTMLInputElement  | HTMLSelectElement>) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: name === "age" ? (value ? Number(value): 0) : value
        })
        setErrors((prev)=> ({...prev, [name]: undefined}))
    }
    const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = userformschema.safeParse(formData)
        if(result.success){
            setErrors({})
        }else{
            setErrors(result.error.formErrors.fieldErrors)
        }
    }
  return (
    <form onSubmit={onSubmitHandler} className='shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-[50%] mx-auto mt-10'>
        <h3 className='text-2xl text-center'>User Form</h3>
        <div className='mb-2 flex flex-col'>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" 
            onChange={changeInputHandler}
            value={formData.name} className='border border-gray-500 rounded px-2 py-1'/>
            {
                errors.name && <span className='text-red-500'>{errors.name[0]}</span>
            }
        </div>
        <div className='mb-2 flex flex-col'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" 
            onChange={changeInputHandler} value={formData.email} 
            className='border border-gray-500 rounded px-2 py-1'/>
             {
                errors.email && <span className='text-red-500'>{errors.email[0]}</span>
            }
        </div>
        <div className='mb-2 flex flex-col'>
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" 
            onChange={changeInputHandler} value={formData.age}
             className='border border-gray-500 rounded px-2 py-1'/>
              {
                errors.age && <span className='text-red-500'>{errors.age[0]}</span>
            }
        </div>
        <div className='mb-2 flex flex-col'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" 
            onChange={changeInputHandler} value={formData.password} 
            className='border border-gray-500 rounded px-2 py-1'/>
             {
                errors.password && <span className='text-red-500'>{errors.password[0]}</span>
            }
        </div>
        <div className='mb-2 flex flex-col'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword"
             onChange={changeInputHandler} value={formData.confirmPassword} 
             className='border border-gray-500 rounded px-2 py-1'/>
              {
                errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword[0]}</span>
            }
        </div>
        <div className='mb-2 flex flex-col'>
            <label htmlFor="phone">Phone</label>
            <input type="phone" id="phone" name="phone" 
            onChange={changeInputHandler} value={formData.phone} 
            className='border border-gray-500 rounded px-2 py-1'/>
             {
                errors.phone && <span className='text-red-500'>{errors.phone[0]}</span>
            }
        </div> 
        <div className='mb-2 flex flex-col'>
            <label htmlFor="gender">Gender</label>
            <select name="gender" className='border border-gray-500 rounded px-2 py-1' value={formData.gender} onChange={changeInputHandler}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            {
                errors.gender && <span className='text-red-500'>{errors.gender[0]}</span>
            }
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' type='submit'>
            Submit
        </button>
    </form>
  ) 
}

export default Userform