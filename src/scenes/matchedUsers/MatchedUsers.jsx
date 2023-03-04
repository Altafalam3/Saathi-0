import React, { useEffect, useState, useRef } from "react";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

import { db, app } from "../../firebase"
// import Navbar from "../../components/navbar/Navbar";
import './MatchedUsers.css';
import SortedFlatmates from "../../components/sortedflatmates/SortedFlatmates";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { link } from "react-router-dom";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';


function MatchedUsers() {
   const [ageRange, setAgeRange] = useState({ min: 15, max: 80 });


   const [users, setUsers] = useState([]);
   const userscollectionRef = collection(db, "users");
   const storage = getStorage(app);
   const storageRef = ref(storage, 'users');
   const [searchin, setSearchin] = useState('');
   const sliderRef = useRef(null);
   const outputRef = useRef(null);
   // const [flatmates,setFlatmates] = useState([]);
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
         const data = await getDocs(userscollectionRef);
         const age = sliderRef.current.value;
         const usersData = data.docs.map((doc) => {
            const user = doc.data();
            return {
               ...user,
               id: doc.id,
               photoURL: '',
            };
         });

         setUsers(usersData);

         // Fetch user photos
         usersData.forEach(async (user) => {
            const photoRef = ref(storage, `users/${user.id}/photo.jpg`);

            try {
               const photoURL = await getDownloadURL(photoRef);
               setUsers((prevState) =>
                  prevState.map((prevUser) =>
                     prevUser.id === user.id ? { ...prevUser, photoURL } : prevUser
                  )
               );
            } catch (err) {
               console.error('Error fetching photo', err);
            }
         });
      };


      getUsers()
   }, [userscollectionRef])

   return (
      <>
         <div className="matchUser">
            {/* <Navbar /> */}
            <div className="matchedusersnavbar">
               <ul>
                  {/* <link to ={"./home"}> */}
                  <li>Find FlatMates</li>
                  {/* </link> */}
                  <li>Post A Property</li>
                  <li>Find Flats</li>
               </ul>
            </div>
            <div className="AGDdeets">
               <div className="flat-group">
                  <p className="font-weight-bold">Preferred Age</p>
                  <fieldset>
                     <InputRange
                        minValue={15}
                        maxValue={80}
                        value={ageRange}
                        onChange={(value) => setAgeRange(value)}
                     />
                  </fieldset>
                  <p className="age-p">Age selected is {ageRange.min} - {ageRange.max}</p>
               </div>

               <div className="flat-group">
                  <p className="font-weight-bold">Prefered Gender</p>
                  <fieldset>
                     <input name="preferGender" type="radio" id="male" value="male" className="input-hide" />
                     <label htmlFor="male" className="label-pop">Male</label>
                     <input name="preferGender" type="radio" id="female" value="female" className="input-hide" />
                     <label htmlFor="female" className="label-pop">Female</label>
                  </fieldset>
               </div>

               <div className="flat-group">
                  <p className="font-weight-bold">Prefered Occupation</p>
                  <fieldset>
                     <input name="preferOccupation" type="radio" id="student" value="student" className="input-hide" />
                     <label htmlFor="student" className="label-pop">Student</label>
                     <input name="preferOccupation" type="radio" id="professional" value="professional" className="input-hide" />
                     <label htmlFor="professional" className="label-pop">Professional</label>
                  </fieldset>
               </div>

            </div>
            <div className="Ldropdown">
               <h4>Location looking for(city)</h4>
               <select
                  className="city"
               >
                  <option value="Choose..." disabled>
                     Choose...
                  </option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
               </select>

               <h4>Home State</h4>
               <select
                  className="state"
               >
                  <option value="Choose..." disabled>
                     Choose...
                  </option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Uttarakhand">Uttarakhand</option>
               </select>

               <h4>Job Category</h4>
               <select
                  className="job"
               >
                  <option value="Choose..." disabled>
                     Choose...
                  </option>
                  <option value="Consulting">Consulting</option>
                  <option value="Finace">Finace</option>
                  <option value="HR">HR</option>
               </select>

               <h4>Education</h4>
               <select
                  className="education"
               >
                  <option value="Choose..." disabled>
                     Choose...
                  </option>
                  <option value="BE">BE</option>
                  <option value="BCA">BCA</option>
                  <option value="MTech">MTech</option>
               </select>
            </div>
            <div className="flatmate-btndiv">
               <button type="submit" className="flatmate-but">Search</button>
            </div>
            {/* <SortedFlatmates/> */}
            {/* <div>
               {
                  flatmates.length === 0 ? (
                     <p>No Articles Found!</p>
                  ) : (
                     flatmates.map((flatmate) => (
               <div >div</div>
               )
                  )
               )}
            </div> */}
            <div>
               {users.map((user) => (
                  <div key={user.id}>
                     <img src={user.file} alt={user.name} />
                     <p>{user.name}</p>
                     <p>{user.bio}</p>
                  </div>
               ))}

            </div>
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
                           <h1>Alcoholic? {user.isAlcoholic ? 'Yes' : 'No'}</h1>
                           <h1>Smoker? {user.isSmoker ? 'Yes' : 'No'}</h1>
                        </div>
                     )
                  })
               }
            </div>
            <MailList />
            <Footer />
         </div>
      </>
   );
}

export default MatchedUsers;


