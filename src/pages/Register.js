import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

import { auth } from '../firebaseConnection'
import {createUserWithEmailAndPassword} from 'firebase/auth'


export default function Register() {


    const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')




 async function handleRegister(e){
    e.preventDefault()

if(email !== '' && password !== ''){
  //alert('logou!')
await createUserWithEmailAndPassword(auth, email, password)
.then(()=> {

navigate('/', {replace: true})

}).catch((err)=> {
    console.log(err)
})


} else {
  alert('PRENCHA TODOS OS CAMPOS!')
}


  }
  return (
    <div className='container'>
    <div className='mb'>
    <h1>Registrar</h1>
    <p>Gerencia de tarefas</p> 
    </div>
     

      <form className='form' onSubmit={handleRegister}>
        <input
        className='input'
        type='text'
        placeholder='Digite seu email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

      <input
        type='password'
         className='input'
        placeholder='******'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className='button' type='submit'>CADASTRAR USUÁRIO</button>
        <Link to='/'>JÁ POSSUO UMA CONTA</Link>
      
      </form>
 
    </div>
  )
}
