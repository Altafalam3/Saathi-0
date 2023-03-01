import React, { useContext } from "react";
import "./postflat.css";
import { useState } from "react";
import { db, storage } from "../../firebase";
import {
   ref,
   uploadBytes,
   getDownloadURL,
   uploadBytesResumable,
} from "firebase/storage";
import { doc, addDoc, setDoc, updateDoc, collection } from "firebase/firestore";
import { v4 } from 'uuid';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const PostFlat = () => {
   const [rent, setRent] = useState("");
   const [area, setArea] = useState("");
   const [minstay, setMinstay] = useState("");
   const [ageRange, setAgeRange] = useState({ min: 15, max: 80 });
   const [city, setCity] = useState("");
   const [address, setAddress] = useState("");
   const [phonenum, setPhonenum] = useState("");


   function handleAgeRangeChange(value) {
      setAgeRange(value);
   }

   return (
      <div className="postflat-container">
         <form className="postflat-form">
            <div class="flat-group">
               <p class="font-weight-bold">Property type</p>
               <fieldset>
                  <input name="propertyType" type="radio" id="flat" value="flat" className="input-hide" />
                  <label htmlFor="flat" className="label-pop">Flat</label>
                  <input name="propertyType" type="radio" id="house" value="house" className="input-hide" />
                  <label htmlFor="house" className="label-pop">House</label>
                  <input name="propertyType" type="radio" id="dorm" value="dorm" className="input-hide" />
                  <label htmlFor="dorm" className="label-pop">Dorm</label>
               </fieldset>
            </div>

            <div className="flat-group">
               <p className="font-weight-bold">Room type</p>
               <fieldset>
                  <input name="roomType" type="radio" id="private_room" value="private_room" className="input-hide" />
                  <label htmlFor="private_room" className="label-pop">Private Room</label>
                  <input name="roomType" type="radio" id="shared_room" value="shared_room" className="input-hide" />
                  <label htmlFor="shared_room" className="label-pop">Shared Room</label>
               </fieldset>
            </div>

            <div className="flat-group">
               <p className="font-weight-bold">Prefered Gender</p>
               <fieldset>
                  <input name="preferGender" type="radio" id="male" value="male" className="input-hide" />
                  <label htmlFor="male" className="label-pop">Male</label>
                  <input name="preferGender" type="radio" id="female" value="female" className="input-hide" />
                  <label htmlFor="female" className="label-pop">Female</label>
                  <input name="preferGender" type="radio" id="anygender" value="anygender" className="input-hide" />
                  <label htmlFor="anygender" className="label-pop">Doesn't Matter</label>
               </fieldset>
            </div>
            <div className="flat-group">
               <p className="font-weight-bold">Prefered Occupation</p>
               <fieldset>
                  <input name="preferOccupation" type="radio" id="student" value="student" className="input-hide" />
                  <label htmlFor="student" className="label-pop">Student</label>
                  <input name="preferOccupation" type="radio" id="professional" value="professional" className="input-hide" />
                  <label htmlFor="professional" className="label-pop">Professional</label>
                  <input name="preferOccupation" type="radio" id="anyoccupation" value="anyoccupation" className="input-hide" />
                  <label htmlFor="anyoccupation" className="label-pop">Doesn't Matter</label>
               </fieldset>
            </div>
            <div className="flat-group">
               <p className="font-weight-bold">Total no of Bedrooms</p>
               <fieldset>
                  <input name="availableBeds" type="radio" id="1availableBeds" value="1" className="input-hide" />
                  <label htmlFor="1availableBeds" className="label-pop">1</label>
                  <input name="availableBeds" type="radio" id="2availableBeds" value="2" className="input-hide" />
                  <label htmlFor="2availableBeds" className="label-pop">2</label>
                  <input name="availableBeds" type="radio" id="3availableBeds" value="3" className="input-hide" />
                  <label htmlFor="3availableBeds" className="label-pop">3</label>
                  <input name="availableBeds" type="radio" id="3+availableBeds" value="3+" className="input-hide" />
                  <label htmlFor="3+availableBeds" className="label-pop">3+</label>
               </fieldset>
            </div>

            <div className="flat-group">
               <p className="font-weight-bold">Rent</p>
               <fieldset>
                  <input
                     name="rent"
                     type="number"
                     id="rent"
                     value={rent}
                     onChange={(e) => setRent(e.target.value)}
                     placeholder='Enter rent in rupees'
                     className="input-ok"
                  />
               </fieldset>
            </div>

            <div className="flat-group">
               <p className="font-weight-bold">Room Area(sq.ft)</p>
               <fieldset>
                  <input
                     name="area"
                     type="number"
                     id="area"
                     value={area}
                     onChange={(e) => setArea(e.target.value)}
                     placeholder='Enter area in sqft'
                     className="input-ok"
                  />
               </fieldset>
            </div>

            <div className="flat-group">
               <p className="font-weight-bold">Minimum Stay(in Months)</p>
               <fieldset>
                  <input
                     name="minstay"
                     type="number"
                     id="minstay"
                     value={minstay}
                     onChange={(e) => setMinstay(e.target.value)}
                     placeholder='Enter minimum stay in months'
                     className="input-ok"
                  />
               </fieldset>
            </div>

            <div className="flat-group">
               <p className="font-weight-bold">Preferred Age</p>
               <fieldset>
                  <InputRange
                     minValue={15}
                     maxValue={80}
                     value={ageRange}
                     onChange={handleAgeRangeChange}
                  />
               </fieldset>
               <p className="age-p">Age selected is {ageRange.min} - {ageRange.max}</p>
            </div>

            <div className="flat-group">
               <p className="font-weight-bold">City</p>
               <fieldset>
                  <input
                     name="city"
                     type="text"
                     id="city"
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     placeholder='Enter name of city'
                     className="input-ok"
                  />
               </fieldset>
            </div>

            <div className="flat-group">
               <p className="font-weight-bold">Address</p>
               <fieldset>
                  <textarea
                     name="address"
                     id="address"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     placeholder='Enter address'
                     className="input-ok"
                  ></textarea>
               </fieldset>
            </div>

            <div className="flat-group">
               <p className="font-weight-bold">Phone Number</p>
               <fieldset>
                  <input
                     name="phonenum"
                     type="number"
                     id="phonenum"
                     value={phonenum}
                     onChange={(e) => setPhonenum(e.target.value)}
                     placeholder='Enter Phone Number'
                     className="input-ok"
                  />
               </fieldset>
            </div>

            <div className="flat-group">
               <p className="font-weight-bold">Property Images</p>
               <fieldset>
                  <input
                     className="input-ok"
                     type="file"
                     multiple
                     name="propertyimg"
                     id="propertyimg"
                  />
               </fieldset>
            </div>

            <div className="flat-group">
               <p className="font-weight-bold"></p>
               <fieldset>
               <button type="submit" className="flat-but">Submit Flat</button>
               </fieldset>
            </div>
         </form>
      </div>
   );
};

export default PostFlat;