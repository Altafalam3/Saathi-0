import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase"
import Navbar from "../../components/navbar/Navbar";
import './MatchedUsers.css';
import SortedFlatmates from "../../components/sortedflatmates/SortedFlatmates";
import MailList   from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

function MatchedUsers() {
   const [users, setUsers] = useState([]);
   const userscollectionRef = collection(db, "users");
   const [searchin, setSearchin] = useState('');
   const sliderRef = useRef(null);
   const outputRef = useRef(null);

   const onSearch = (searchTerm) => {
      setSearchin(searchTerm);
      console.log('search', searchTerm);
   }

   useEffect(() => {
      if (sliderRef.current && outputRef.current) {
         const slider = sliderRef.current;
         const output = outputRef.current;

         output.innerHTML = slider.value;

         slider.oninput = function () {
            output.innerHTML = this.value;
         };
      }

      const getUsers = async () => {
         const data = await getDocs(userscollectionRef)
         setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }

      getUsers()
   }, [userscollectionRef])

   return (
      <>
         <div className="matchUser">
            <Navbar />
            <div className="AGDdeets">
            <div className="age">
              <input type="range" min="1" max="100" defaultValue="50" className="ageslider" ref={sliderRef} style={{ height: "25px" }} />

                <p>Value: <span ref={outputRef}></span></p>
            </div>
            <div className="gender">
               <h4>Gender</h4>
               <button type="submit">Male</button>
               <button type="submit">Female</button>
            </div>
            <div className="Occupation">
               <h4>Occupation</h4>
               <button type="submit">Male</button>
               <button type="submit">Female</button>
               </div>
            </div>
            <div className="Ldropdown">
            <h4>Location looking for</h4>
               <select
                  className="gender"
                  
               >
                  <option value="Choose..." disabled>
                     Choose...
                  </option>
                  <option value="Male">Bengaluru</option>
                  <option value="Female">Delhi</option>
                  <option value="Other">Mumbai</option>
            </select>
             <h4>Home State</h4>
               <select
                  className="gender"
                  
               >
                  <option value="Choose..." disabled>
                     Choose...
                  </option>
                  <option value="Male">Maharashtra</option>
                  <option value="Female">Delhi</option>
                  <option value="Other">Uttarakhand</option>
            </select>
             <h4>Job Category</h4>
               <select
                  className="gender"
                  
               >
                  <option value="Choose..." disabled>
                     Choose...
                  </option>
                  <option value="Male">Consulting</option>
                  <option value="Female">Finace</option>
                  <option value="Other">HR</option>
            </select>
             <h4>Education</h4>
               <select
                  className="gender"
                  
               >
                  <option value="Choose..." disabled>
                     Choose...
                  </option>
                  <option value="Male">B.E</option>
                  <option value="Female">BCA</option>
                  <option value="Other">MTech</option>
               </select>
            </div>
            <SortedFlatmates/>
            <h1>Search</h1>
            <div>
               <div>
                  <input type="text"
                     onChange={(e) => setSearchin(e.target.value)}
                     placeholder='search'
                     value={searchin}
                  />
                  <button onClick={() => onSearch(searchin)}>Search</button>
               </div>
            </div>
            <div>
               {
                  users.filter((user) => user.loc === searchin).map((user) => {
                     return (
                        <div className="workers-list">
                           <h1>Location: {user.loc}</h1>
                           <h1>Food preference: {user.foodPreference}</h1>
                           <h1>Hobbies: {user.hobbies}</h1>
                           <h1>Alcoholic? {user.isAlcoholic ? 'Yes' : 'No' }</h1>
                           <h1>Smoker? {user.isSmoker ? 'Yes' : 'No'}</h1>
                        </div>
                     )
                  })
               }
            </div>
            <MailList />
            <Footer/>
         </div>
      </>
   );
}

export default MatchedUsers;


