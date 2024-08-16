import { useState, useEffect } from 'react'
import {db, auth} from './firebaseConnection'
import './styles.css'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, onSnapshot} from 'firebase/firestore'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'


function AppBkp() {

  const [posts, setPosts] = useState([])
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [idPost, setIdPost] = useState('')


  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()

const [user, setUser] = useState(false)
  const [userDetail, setUserDetail] = useState(false)


  useEffect(() => {
    async function loadingPosts() {
      const unsub = onSnapshot(collection(db, 'posts'), (snapshot) => {
        let listaPost = [];
  
        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          });
        });
  
        setPosts(listaPost);
      });
  
      return () => unsub(); // Para cancelar a assinatura quando o componente desmontar
    }
    
    loadingPosts();
  }, []);

  //====================

  useEffect(()=> {
    async function checkLogin(params) {
      onAuthStateChanged(auth, (user)=> {
        if (user){
         // console.log(user)

         setUser(true)
         setUserDetail({
          uid: user.uid,
          email: user.email
         })

        } else {
          setUser(false)
          setUserDetail({})
        }
      })

    }
    checkLogin()

  }, [])



  


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

async function atualizarPost(){
  const docRef = doc(db, 'posts', idPost)
  await updateDoc(docRef, {
    titulo: titulo,
    autor: autor
  }).then(()=> {
    console.log('atualizado com sucesso!')
    setIdPost('')
    setTitulo('')
    setAutor('')
  }).catch(()=> {
    console.log('erro ao atualizar!')
  })
  
}


async function deletarPost(id){
 //console.log(id)
 const docRef = doc(db, 'posts', id)
 await deleteDoc(docRef)
 .then(()=> {
  console.log('post deletado com sucesso!')

  }).catch((error)=> {
    console.log(error)
    })
    }


async function novoUsuario(){
await createUserWithEmailAndPassword(auth, email, senha)
.then(()=> {
//  console.log('usuário criado com sucesso!')
  setSenha('')
  setEmail('')
 
}).catch((error)=> {
  console.log(`Erro ao cadastrar usuário - ${error}`)
})

 
}


async function logarUsuario(){

  await signInWithEmailAndPassword(auth, email, senha)
  .then((value)=> {
    console.log('usuário logado com sucesso!')
    setEmail('')
    setSenha('')
//=============
setUserDetail({
  uid: value.user.uid,
  email: value.user.email
})
setUser(true)
//================
//setUserDetail(true)
setEmail('')
setSenha('')

  }).catch(()=> {
    console.log('erro ao logar!')
  })

}



async function fazerLogout(){
  await signOut(auth)
  setUser(false)
  setUserDetail({})

}





  return (
<>


<div className='container'>

<h2>Usuário:</h2>


{
  user && (
    <ul className=''>
 <li>
 <h2>Usuário logado:</h2>
      <p>ID: {userDetail.uid}</p>
      <p>Email: {userDetail.email}</p>
 </li>
    </ul>
  )
}


<label>Email:</label>
<input 
type='email' 
placeholder='digite o seu email'
value={email}
onChange={(e) => setEmail(e.target.value)}
/>


<label>Senha:</label>
<input 
type='password' 
placeholder='digite o seu email'
value={senha}
onChange={(e) => setSenha(e.target.value)}
/>

<button onClick={novoUsuario}>CADASTRAR USUÁRIO</button>
<button onClick={logarUsuario}>LOGAR USUÁRIO</button>

<button onClick={fazerLogout}>SAIR DA CONTA</button>


</div>







<div className='container'>
<h2>Posts:</h2>

<label>ID Post:</label>
<input 
type='text' 
placeholder='digite o ID'
value={idPost}
onChange={(e) => setIdPost(e.target.value)}
/>

<br/>


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


<button onClick={atualizarPost}>EDITAR POST</button>


<ul>
  {posts.map((post) => {
    return(
      <li>
        <strong>{post.id}</strong>
       <h2> {post.titulo}</h2>
       <p> {post.autor}</p>  

       <button onClick={() => deletarPost(post.id)}>DELETAR</button>  
      </li>
    )
  })}
</ul>

    </div>
    </>
  );
}

export default AppBkp;
