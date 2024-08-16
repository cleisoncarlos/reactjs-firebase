import {useState, useEffect} from 'react'

import {signOut} from 'firebase/auth'
import {addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc} from 'firebase/firestore'
import {auth, db} from '../firebaseConnection'

export default function Admin() {
const [tarefaInput, setTarefaInput] = useState('')
const [user, setUser] = useState({})

const [tarefas, setTarefas]= useState([])
const [edit, setEdit]= useState({})


useEffect(() => {
    async function loadTarefas(){
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail))

      if(userDetail){
        const data = JSON.parse(userDetail);
        
        const tarefaRef = collection(db, "tarefas")
        const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc)=> {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })          
       //   console.log(lista);
          setTarefas(lista);
        })
      }
    }

    loadTarefas();
  }, [])


async function handleRegister(e){
    e.preventDefault()
  //  alert('teste')

  if(tarefaInput === ''){
alert('Digite sua tarefa!')
return;
  }


  // verifica se é para atualizar ou cadastrar
if(edit?.id){
  handleUpdatetarefa()
  return;
}


await addDoc(collection(db, 'tarefas'), {
    tarefa: tarefaInput,
    created: new Date(),
    userUid: user?.uid 
})
.then(()=> {
    console.log('tarefa registrada')
    setTarefaInput('')

}).catch((err)=> {
    console.log(err)
})

}

async function handleLogout(){
await signOut(auth)
}



async function deleteTarefa(id){
  await deleteDoc(doc(db, 'tarefas', id))
}


function editTarefa(item){
 // console.log(item)
 setTarefaInput(item.tarefa)
 setEdit(item)

}

async function handleUpdatetarefa(){
  // console.log(edit)
  const docRef = doc(db, 'tarefas', edit?.id)
  await updateDoc(docRef, {
    tarefa: tarefaInput,
  }).then(()=> {
    console.log('tarefa atualizada')
    setEdit({})
    setTarefaInput('')

  }).catch((err)=> {
    console.log(err)
    setTarefaInput('')
    setEdit({})
  })

}


  return (
<>
<div className='adminContainer'>
        <h1>Admin</h1>
        <form onSubmit={handleRegister} className='form'>
            <textarea
            rows='7'   
            value={tarefaInput}
            onChange={(e)=> setTarefaInput(e.target.value)}            
            />


{Object.keys(edit).length > 0 ? (

<button type='submit' className='button'>ATUALIZAR TAREFA</button>

) : (

<button type='submit' className='button'>REGISTRAR TAREFA</button>

)




}








      
      
      
        </form>


{tarefas.map((item)=> (    
    <article className='tarefa' key={item.id}>
    <h4>{item.tarefa}</h4>  
    <div>
        <button onClick={()=> editTarefa(item)}>EDITAR</button>
        <button onClick={()=> deleteTarefa(item.id)}>CONCLUIR</button>
    </div>            
    </article>
))}


    </div>
            <button type='button' onClick={handleLogout}>SAIR</button>
            </>
  )
}
