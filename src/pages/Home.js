import {useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../firebaseConnection'
import {signInWithEmailAndPassword} from 'firebase/auth'

import {useNavigate} from 'react-router-dom'

export default function Home() {


  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')




 async function handleLogin(e){
    e.preventDefault()

if(email !== '' && password !== ''){

await signInWithEmailAndPassword(auth, email, password)
.then(()=> {
  navigate('/admin', {
    replace: true
  })

}).catch((err) => {
  console.log(err)
})

  alert('logou!')
} else {
  alert('PRENCHA TODOS OS CAMPOS!')
}




  }
  return (
    <div className='container'>
    <div className='mb'>
    <h1>Lista de Tarefas</h1>
    <p>Gerencia de tarefas</p> 
    </div>
     

      <form className='form' onSubmit={handleLogin}>
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


        <button className='button' type='submit'>ACESSAR</button>
        <Link to='/register'>NÃO TENHO CONTA</Link>
      </form>
 
    </div>
  )
}
