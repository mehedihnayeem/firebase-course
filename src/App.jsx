import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
import { useEffect, useState } from "react"
import Auth from "./components/Auth"
import { auth, db, storage } from "./config/firebase"

function App() {
  const [booksList, setBooksList] = useState([])


  // add book state
  const [bookName, setBookName] = useState("")
  const [bookReleaseYear, setBookReleaseYear] = useState(0)
  const [isGetBookerPrize, setIsGetBookerPrize] = useState(false)

  // update book state
  const [updatedBookName, setUpdatedBookName] = useState("")

  // upload file state
  const [fileUpload, setFileUpload] = useState(null)
  


  const getBooksListRef = collection(db, "books")

  const getBookList = async () => {
    try {
      const data = await getDocs(getBooksListRef)
      const filteredData = data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
      }))
      setBooksList(filteredData)
    } catch (error) {
      console.error(error)
    }
  }



  const addBook = async () => {
    try{
      await addDoc(getBooksListRef, {name: bookName, isBookerPrize: isGetBookerPrize, yearOfPublish: bookReleaseYear, userId: auth?.currentUser?.uid})
      getBookList()
    }catch(err){
      console.error(err)
    }
  }

  const deleteBook = async (id) => {
    const bookDoc = doc(db, "books", id)
    await deleteDoc(bookDoc)
    getBookList()
  }

  const updateBookName = async (id) => {
    const bookDoc = doc(db, "books", id)
    await updateDoc(bookDoc, {name: updatedBookName})
    getBookList()

  }

  const uploadFIle = async () => {
    if (!fileUpload) return
    const fileFolderRef= ref(storage, `projectFiles/${fileUpload.name}`)
    try{
      await uploadBytes(fileFolderRef, fileUpload)
    }catch(err){
      console.error(err)
    }
  }
  

  useEffect(() => {
    getBookList()
  }, [])

  return (
    <>
      <div  style={{textAlign: "center"}}>
        <Auth/>
        <div>
          <input type="text" placeholder="Book Name" onChange={(e)=>setBookName(e.target.value)}/>
          <input type="text" placeholder="Year of Release" onChange={(e)=>setBookReleaseYear(Number(e.target.value))}/>
          <input type="checkbox" checked={isGetBookerPrize} onChange={(e)=> setIsGetBookerPrize(e.target.checked)} />
          <button onClick={()=> addBook()} type="submit">Submit</button>
        </div>
        <div>
          {booksList.map((book)=> {
            return <div key={book.id}>
              <h1 style={{color: book.isBookerPrize ? "green" : "red"}}>{book.name}</h1>
              <p>Year: {book.yearOfPublish}</p>

              <button onClick={()=> deleteBook(book.id)}>Delete the Book</button>
              <input type="text" placeholder="Update Book Name..." onChange={(e)=> setUpdatedBookName(e.target.value)}/>
              <button onClick={()=> updateBookName(book.id)}>Update Book Name</button>
            </div>
          })}
        </div>
        <div>
          <input type="file" onChange={(e)=> setFileUpload(e.target.files[0])} />
          <button onClick={uploadFIle}>Uplaod File</button>
        </div>
      </div>
    </>
  )
}

export default App
