import { useState } from 'react'
import {db} from './firebaseConnection'
import './styles.css'
import { collection, addDoc, getDocs} from 'firebase/firestore'



function App() {


  const [posts, setPosts] = useState([])

  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')


async function handleAdd(){

  // setDoc não gera os ID dinamicaente
// await setDoc(doc(db, 'posts', '123456'), {
//   titulo: titulo,
//   autor: autor
// }).then(()=> {
//   console.log('cadastrado com sucesso')

// }).catch((error=> {
//   console.log(error)
// }))


// addDoc gera os ID dinamicaente
await addDoc(collection(db, 'posts'), {
  titulo: titulo,
  autor: autor
}).then(()=> {
  console.log('cadastrado com sucesso')
  setAutor('')
  setTitulo('')

}).catch((error)=> {
  console.log(error)
})
}


// BUSCAR POR UNICO ====================
// async function buscarPost(){
//   const postRef = doc(db, 'posts', '2')
//   await getDoc(postRef)
//   .then((spanpshot)=> {

//     setTitulo(spanpshot.data().titulo)
//     setAutor(spanpshot.data().autor)
//        console.log('encontrado com sucesso!')

//   }).catch((error) => {
//     console.log(error)
//   })

// }


//=======================================

//BUSCA VARIOS POSTS
async function buscarPosts(){
  const postRef = collection(db, 'posts')
  await getDocs(postRef)
  .then((snapshot)=> {


    let lista = []

    snapshot.forEach((doc)=> {
      lista.push({
        id: doc.id,
        titulo: doc.data().titulo,
        autor: doc.data().autor
      })
      setPosts(lista)      
    })

       console.log('posts encontrados com sucesso!')

  }).catch((error) => {
    console.log(error)
  })

}





  return (
    <div className='container'>

<label>Titulo</label>
<input 
type='text' 
placeholder='digite o titulo'
value={titulo}
onChange={(e) => setTitulo(e.target.value)}
/>


<label>Autor</label>
<input 
type='text' 
placeholder='digite o autor'
value={autor}
onChange={(e)=> setAutor(e.target.value)}
/>


<button onClick={handleAdd}>CADASTRAR</button>

<button onClick={buscarPosts}>BUSCAR POST</button>

<ul>
  {posts.map((post) => {
    return(
      <li>
       <h2> {post.titulo}</h2>
       <p> {post.autor}</p>    
      </li>
    )
  })}
</ul>

    </div>
  );
}

export default App;
