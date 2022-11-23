import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import LoadingScreen from './loadingScreen/index';
import img1 from "./store/face1.jpg";
import img2 from "./store/face2.jpg";
import img3 from "./store/face3.jpg";
import img4 from "./store/face4.jpg";



const App = () => {

  const [roll, setRoll] = useState(-99999)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")

  const [social, setSocial] = useState(-99999)
  const [english, setEnglish] = useState(-99999)
  const [physics, setPhysics] = useState(-99999)
  const [chemistry, setChemistry] = useState(-99999)
  const [math, setMath] = useState(-99999)

  const [loading, setloading] = useState(true)
  const [all, setAll] = useState([])
  const [infoEach, setInfoEach] = useState([])
  const [screen, setScreen] = useState({
    info: "none",
    all: "flex"
  });



  function getter() {
    Axios.get('http://localhost:3001/getter-all',
      {

      }).then((res) => {
        setAll(res.data)
        setloading(false);
      })

  }

  useEffect(() => {
    getter()
  }, []);


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }




  function submit_clicked() {
    if (roll === -99999) {
      alert("Roll No. Not filled correctly");
      return;
    }


    let flagname = /^[A-Z a-z]+$/;
    if (flagname.test(name) === false) {
      alert("Name Not filled correctly");
      return;
    }
    if (name.length === 0 || name.length > 30) {
      alert("Name Not filled correctly");
      return;
    }

    var check = /^[#.0-9a-zA-Z\s,-]+$/;
    if (check.test(address) === false) {
      alert("Fill address field properly");
      return;
    }

    var social1 = parseInt(social)
    var english1 = parseInt(english)
    var chemistry1 = parseInt(chemistry)
    var physics1 = parseInt(physics)
    var math1 = parseInt(math)



    if (social1 === -99999 || (social1 < 0 || social1 > 100)) {
      alert("Social marks Not filled correctly");
      return;
    }
    if (english1 === -99999 || (english1 < 0 || english1 > 100)) {
      alert("English marks Not filled correctly");
      return;
    }
    if (chemistry1 === -99999 || (chemistry1 < 0 || chemistry1 > 100)) {
      alert("Chemistry marks Not filled correctly");
      return;
    }
    if (physics1 === -99999 || (physics1 < 0 || physics1 > 100)) {
      alert("physics marks Not filled correctly");
      return;
    }
    if (math1 === -99999 || (math1 < 0 || math1 > 100)) {
      alert("Math marks Not filled correctly");
      return;
    }

    Axios.get('http://localhost:3001/get-each',
      {
        params: {
          roll: roll,
        }

      }).then((res) => {
        if (res.data === "exist") {
          alert("Already exist");
          return;
        }
        else {
          var imgVal = getRandomInt(4)
          var li = [img1, img2, img3, img4]
          var imgGo = li[imgVal];
          var avg = (social1 + english1 + chemistry1 + physics1 + math1) / 5;
          var grade = "F"
          if (avg > 90) {
            grade = "A";
          }
          else if (avg <= 90 && avg >= 80) {
            grade = "B";
          }
          else if (avg <= 79 && avg >= 70) {
            grade = "C";
          }
          else if (avg <= 69 && avg >= 60) {
            grade = "D";
          }
          else if (avg <= 59 && avg >= 50) {
            grade = "E";
          }
          else if (avg <= 49 && avg >= 33) {
            grade = "E-";
          }
          else {
            grade = "F";
          }
          var total = (social1 + english1 + chemistry1 + physics1 + math1)
          Axios.post('http://localhost:3001/post-data',
            {
              roll: parseInt(roll),
              name: name,
              address: address,
              social: social1,
              english: english1,
              chemistry: chemistry1,
              physics: physics1,
              math: math1,
              avg: avg,
              total: total,
              img: imgGo,
              grade: grade
            }).then((res) => {
              if (res.data === true) {
                alert("Data updated successfully!!");
                getter();
                return;
              }
              else {
                alert("Failed to upload!!");
                return;
              }
            });
        }
      });



  }





  function getInfo(x) {
    console.log(x)
    Axios.get('http://localhost:3001/get-each-info',
      {
        params: {
          roll: x,
        }
      }).then((res) => {
        if (res.data === "") {
          alert("not present");
        }
        else {
          setInfoEach(res.data)
          setScreen({ info: "flex", all: "none" });
        }

      })

  }



  return (
    <div className='outer'>
      <div className='inner'>
        <div className='inner__sec1'>
          WELCOME USER
        </div>
        <div className='inner__sec2'>
          <div className='inner__left'>
            <div className='side_list'>
              <div>
                MENU
              </div>
              <div>
                ADD USER
              </div>
              <div>
                VIEW ALL
              </div>
            </div>
          </div>
          <div className='inner__right'>
            <div className='body_left'>

            </div>
            <div className="body__right">
              <div className="name-outer" style={{ marginTop: "1.8rem" }}>
                <div className="name-label">
                  Roll No.{'\u00A0'}<i style={{ color: "#EF4B4D", width: "10px", height: "10px" }} class="far fa-address-book"></i>
                </div>
                <input onChange={(e) => { setRoll(e.target.value) }} type="number" placeholder={"Roll No"} className="name-field" required='required' />
              </div>
              <div className="name-outer" style={{ marginTop: "0.5rem" }}>
                <div className="name-label">
                  Name{'\u00A0'}<i style={{ color: "#EF4B4D", width: "10px", height: "10px" }} class="far fa-address-book"></i>
                </div>
                <input onChange={(e) => { setName(e.target.value) }} type="text" placeholder={"Name"} className="name-field" required='required' />
              </div>
              <div className="name-outer" style={{ marginTop: "0.5rem" }}>
                <div className="name-label">
                  Address{'\u00A0'}<i style={{ color: "#EF4B4D", width: "10px", height: "10px" }} class="far fa-address-book"></i>
                </div>
                <input onChange={(e) => { setAddress(e.target.value) }} type="text" placeholder={"Address"} className="name-field" required='required' />
              </div>
              <div className='name-outer-outer'>
                <div className="name-outer2" style={{ marginTop: "0.5rem" }}>
                  <div className="name-label">
                    Social{'\u00A0'}<i style={{ color: "#EF4B4D", width: "10px", height: "10px" }} class="far fa-address-book"></i>
                  </div>
                  <input min="0" onChange={(e) => { setSocial(e.target.value) }} type="number" placeholder={"social/100"} className="name-field" required='required' />
                </div>
                <div className="name-outer2" style={{ marginTop: "0.5rem" }}>
                  <div className="name-label">
                    English{'\u00A0'}<i style={{ color: "#EF4B4D", width: "10px", height: "10px" }} class="far fa-address-book"></i>
                  </div>
                  <input min="0" onChange={(e) => { setEnglish(e.target.value) }} type="number" placeholder={"english/100"} className="name-field" required='required' />
                </div>
              </div>
              <div className='name-outer-outer'>
                <div className="name-outer2" style={{ marginTop: "0.5rem" }}>
                  <div className="name-label">
                    Chemistry{'\u00A0'}<i style={{ color: "#EF4B4D", width: "10px", height: "10px" }} class="far fa-address-book"></i>
                  </div>
                  <input min="0" onChange={(e) => { setChemistry(e.target.value) }} type="number" placeholder={"chemistry/100"} className="name-field" required='required' />
                </div>
                <div className="name-outer2" style={{ marginTop: "0.5rem" }}>
                  <div className="name-label">
                    Physics{'\u00A0'}<i style={{ color: "#EF4B4D", width: "10px", height: "10px" }} class="far fa-address-book"></i>
                  </div>
                  <input min="0" onChange={(e) => { setPhysics(e.target.value) }} type="number" placeholder={"physics/100"} className="name-field" required='required' />
                </div>
              </div>
              <div className='name-outer-outer'>
                <div className="name-outer2" style={{ marginTop: "0.5rem" }}>
                  <div className="name-label">
                    Maths{'\u00A0'}<i style={{ color: "#EF4B4D", width: "10px", height: "10px" }} class="far fa-address-book"></i>
                  </div>
                  <input min="0" onChange={(e) => { setMath(e.target.value) }} type="number" placeholder={"maths/100"} className="name-field" required='required' />
                </div>
              </div>
              <div className='name-outer-outer'>
                <div className='button' onClick={() => { submit_clicked() }}>
                  SUBMIT
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
