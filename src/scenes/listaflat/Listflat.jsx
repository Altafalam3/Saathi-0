import React, { useContext } from "react";
import "./listflat.css";
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


const Listflat = () => {
  const [loc, setLoc] = useState("");
  const [rent, setRent] = useState("");
  const [phone, setPhone] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [gender, setGender] = useState("Choose...");
  //   const [url, setUrl] = useState("");
  const date = new Date().getTime();
  //   const storageRef = ref(storage, `${date}`); 

  async function handleSubmit(e) {
    e.preventDefault();

    const file = e.target[3].files[0];
    console.log(file);
    let url;
    try {
      const id = v4();
      const storageRef = ref(storage, `flat-${id}`);
      await uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {

          await addDoc(collection(db, "flats"), {
            loc,
            rent,
            phone,
            file: downloadUrl,
            occupancy,
            gender,
          });

        });
      });



    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="App">
        <div className="auth-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="calling">
              <label>
                Where is your flat located
                <input
                  className="my-input"
                  type="text"
                  placeholder="Enter your flat's city"
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                />
              </label>
            </div>
            <div className="calling">
              <label>
                Rent
                <input
                  className="my-input"
                  placeholder="Rent Per Head"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                />
              </label>
            </div>
            <div className="calling">
              <label>
                Contact number
                <input
                  className="my-input"
                  type="text"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </div>

            <div>
              <input
                className="login-input"
                type="file"
                multiple
                name="file"
                id="file"
              />
              <label>Choose a file</label>
            </div>
            <div>
              <div className="occupancy-div">
                <label>Occupancy: </label>
                <select
                  className="occupancy-select"
                  onChange={(e) => setOccupancy(e.target.value)}
                >
                  <option>Shared</option>
                  <option>Single</option>

                  <option value="mercedes">Any</option>
                </select>
              </div>
              <div>
                <label>Gender Specific: </label>
                <select
                  className="occupancy-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="volvo">Male</option>
                  <option value="saab">Female</option>
                  <option value="mercedes">Any</option>
                </select>
              </div>
            </div>
            <button className="button-28">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Listflat;

