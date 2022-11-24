import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import LoadingScreen from './loadingScreen/index';
import img from './store/img.jpg'


const App = () => {

  const [roll, setRoll] = useState(-99999)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")

  const [social, setSocial] = useState(-99999)
  const [english, setEnglish] = useState(-99999)
  const [physics, setPhysics] = useState(-99999)
  const [chemistry, setChemistry] = useState(-99999)
  const [math, setMath] = useState(-99999)

  const [loading, setloading] = useState(true);
  const [loadingAll, setloadingAll] = useState(true);
  const [loadingEach, setloadingEach] = useState(true);
  const [all, setAll] = useState([])
  const [infoEach, setInfoEach] = useState([])
  const [screen, setScreen] = useState({
    add: "flex",
    view: "none",
    viewEach:"none"

  });



  function getter() {
    Axios.get('http://localhost:3001/getter-all',
      {

      }).then((res) => {
        setAll(res.data)
        setloading(false);
        setloadingAll(false)
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
          setScreen({add:"none",view:"none",viewEach:"flex"});
          setloadingEach(false)
        }

      })

  }



  

  function changeGet()
  {
    setScreen({add:"none",view:"flex",viewEach:"none"});
    setloadingAll(true);
    getter();
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
              <div style={{fontSize:"30px",fontWeight:"800",textAlign:"center"}}>
                MENU
              </div>
              <div className='side_list_div' onClick={()=>{setScreen({add:"flex",view:"none",viewEach:"none"})}}>
                ADD USER
              </div>
              <div className='side_list_div' onClick={()=>{changeGet()}}>
                VIEW ALL
              </div>
            </div>
          </div>
          <div className='inner__right'>
            <div className='info_page' style={{display:screen.add}}>


              <div className='body_left'>

              </div>
              <div className="body__right" >
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


            <div className='view_profile' style={{display:screen.view}}>

                  {
                    loadingAll?(
                      <LoadingScreen/>
                    ):
                    (
                    all.map((ele)=>{
                      
                      return(
                      <div className="cart-card" onClick={()=>{getInfo(ele.rollno)}}>
                        <div className="cart-card-price" style={{width:"60px"}}>
                            {ele.rollno}
                        </div>
                        <div className="cart-card-image-out">
                            <img src={img} className="cart-card-image" alt=""/>
                        </div>
                        <div className="cart-card-title">
                        {ele.name}
                        </div>
                        <div className="cart-card-price">
                            Avg:{ele.avg}
                        </div>
                        <div className="cart-card-price">
                            Total:{ele.total}
                        </div>
                        <div className="cart-card-reviews">
                            Grade:{ele.grade}
                        </div>
                    </div>
                      )
                    })
                    )
                  }
                  
            </div>
            <div className='view_profile' style={{display:screen.viewEach,overflowY:"hidden"}}>
                {
                loadingEach?(
                  <LoadingScreen/>
                ):
                (
                  <>
                  <div className='each_name'>
                    {infoEach.name}
                </div>
                <div className='inner__info__inner__top'>
                  <div className='inner__each__info'>
                    <div className='inner__each__info__name'>
                      Roll No. : {infoEach.rollno}
                    </div>
                    <div className='inner__each__info__name' style={{fontSize:"18px"}}>
                      Address : {infoEach.address}
                    </div>
                    <div className='inner__each__info__name' style={{fontSize:"18px"}}>
                      Avg : {infoEach.avg}
                    </div>
                    <div className='inner__each__info__name' style={{fontSize:"18px",fontWeight:"800"}}>
                      Grade : {infoEach.grade}
                    </div>
                  </div>
                  <div className='inner__image'>
                    <img src={img} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
                  </div>
                </div>

                <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SOCIAL</td>
                    <td>{infoEach.social}/100</td>
                  </tr>
                  <tr>
                    <td>ENGLISH</td>
                    <td>{infoEach.english}/100</td>
                  </tr>
                  <tr>
                    <td>PHYSICS</td>
                    <td>{infoEach.physics}/100</td>
                  </tr>
                  <tr>
                    <td>CHEMISTRY</td>
                    <td>{infoEach.chemistry}/100</td>
                  </tr>
                  <tr>
                    <td>MATH</td>
                    <td>{infoEach.math}/100</td>
                  </tr>
                </tbody>
              </table>
              </>
                )
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
