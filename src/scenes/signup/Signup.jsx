import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db , storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import './signup.css'

import {
   ref,
   uploadBytes,
   getDownloadURL,
   uploadBytesResumable,
 } from "firebase/storage";
 import { addDoc,  updateDoc, collection } from "firebase/firestore";
 import { v4 } from 'uuid';

const SignupPage = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [age, setAge] = useState("");
   const [gender, setGender] = useState("Choose...");
   const [occupation, setOccupation] = useState("Choose...");
   const [loc, setLoc] = useState("");
   const [isSmoker, setIsSmoker] = useState(false);
   const [isAlcoholic, setIsAlcoholic] = useState(false);
   const [foodPreference, setFoodPreference] = useState("");
   const [hobbies, setHobbies] = useState("");

   const navigate = useNavigate();

   const handleSubmit = async (event) => {
      event.preventDefault();
      const file = event.target[11].files[0];
      console.log(file);
      let url;
      try {
         const res = await createUserWithEmailAndPassword(auth, email, password);
         // console.log(res);
         const id = v4();
         const storageRef = ref(storage, `user-${id}`);
         await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadUrl) => {
               await setDoc(doc(db, "users", res.user.uid), {
                  name,
                  email,
                  password,
                  age,
                  gender,
                  occupation,
                  loc,
                  isSmoker,
                  isAlcoholic,
                  foodPreference,
                  hobbies,
                  file: downloadUrl
               });
            });
         });
         navigate("/login");
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className="signup-page">
         <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="form-group">
               <label>Name</label>
               <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
               />
            </div>
            <div className="form-group">
               <label>Email</label>
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
               />
            </div>
            <div className="form-group">
               <label>Password</label>
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
               />
            </div>
            <div className="form-group">
               <label>Age</label>
               <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
               />
            </div>
            <div className="form-group">
               <label>Gender</label>
               <select
                  className="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
               >
                  <option value="Choose..." disabled>
                     Choose...
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
               </select>
            </div>
            <div className="form-group">
               <label>Occupation</label>
               <input
                  type="text"
                  value={occupation}
                  placeholder="occupation"
                  onChange={(event) => setOccupation(event.target.value)}
               />
            </div>
            <div className="form-group">
               <label>Location</label>
               <input
                  type="text"
                  className="date-1"
                  value={loc}
                  placeholder="location"
                  onChange={(event) => setLoc(event.target.value)}
               />
            </div>
            <div className="form-group">
               <label >Are you a smoker?
                  <input
                     type="checkbox"
                     checked={isSmoker}
                     onChange={(event) => setIsSmoker(event.target.value)}
                  /></label>
            </div>
            <div className="form-group">
               <label>Are you a alcoholic?
                  <input
                     type="checkbox"
                     checked={isAlcoholic}
                     onChange={(event) => setIsAlcoholic(event.target.value)}
                  /></label>
            </div>
            <div className="form-group">
               <label>Food Preferences</label>
               <input
                  type="text"
                  value={foodPreference}
                  placeholder="Food Preferences"
                  onChange={(event) => setFoodPreference(event.target.value)}
               />
            </div>
            <div className="form-group">
               <label>Hobbies</label>
               <input
                  type="text"
                  value={hobbies}
                  placeholder="Hobbies"
                  onChange={(event) => setHobbies(event.target.value)}
               />
            </div>
            <div className="form-group">
               <label>Upload Profile Photo</label>
               <input
                  type="file"
                  multiple
                  name="file"
                  id="file"
               />
            </div>
            <button type="submit">Sign Up</button>
         </form>
      </div>
   );
};

export default SignupPage;
