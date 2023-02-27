
import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase"


function MatchedUsers() {
   const [users, setUsers] = useState([])
       const userscollectionRef = collection(db, "users")
       const [searchin, setSearchin] = useState('');
      

   const onSearch = (searchTerm) => {
      setSearchin(searchTerm);
      console.log('search', searchTerm);
   }
   useEffect(() => {
      const getUsers = async () => {
         const data = await getDocs(userscollectionRef)
         // console.log(data)
         setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
         // console.log(...data.docs)
      }

      getUsers()
   }, [])

  
   return (
      <>
         <h1>Search</h1>
         <div>
            <div style={{ "display": "flex", "margin-left": "2rem" }}>
               <input type="text"
                  onChange={(e) => setSearchin(e.target.value)}
                  placeholder='search'
                  value={searchin}
                  style={{ "width": "50%" }}
               />
               <button onClick={() => onSearch(searchin)}>Search</button>
            </div>
         </div>
         <div className='worker-filter'>
            {
               users.filter((user) => user.loc === searchin).map((user) => {
                  return (
                     <div className="workers-list">

                        <h1>Location:{user.loc}</h1>
                        <h1>Food preference:{user.
foodPreference}</h1>
                        <h1>
hobbies:{user.
hobbies}</h1>
       
                        <h1>Alcoholic?{user.isAlcoholic ? 'Yes' : 'No' }</h1>
                        <h1>Smoker?{user.isSmoker ? 'Yes' : 'No'}</h1>
                     </div>
                  )

               })
            }
         </div>
      </>

   );
}

export default MatchedUsers