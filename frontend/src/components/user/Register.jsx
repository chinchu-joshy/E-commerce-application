import React, { useEffect, useState } from "react";
// import {useHistory} from 'react-router-dom'
import { instance } from "../../axios/axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Register.css";
import moment from "moment";
import { Button } from "react-bootstrap";

function Register() {
  // const history=useHistory()
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [username, setusername] = useState(null);
  const [phone, setphone] = useState(null);
  const [dob, setdob] = useState("");
  const [emailerror, setemailerror] = useState("");
  const [phoneerror, setphoneerror] = useState("");
  const [error, seterror] = useState("");
  const [dateerr, setdateerr] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [passerr, setpasserr] = useState("");
  const [newpasserr, setnewpasserr] = useState("");
  const navigate = useNavigate();
  const [referal, setreferal] = useState("");
  const [referaleerror, setreferaleerror] = useState("");

  let [searchQueryParamse, setSearchParams] = useSearchParams();

  useEffect(() => {
    
    setreferal(searchQueryParamse.get("name"));
  }, []);

  const addEmail = (e) => {
    seterror("");
    setemailerror("");
    setemail(e.target.value);
  };
  const addPassword = (e) => {
    seterror("");
    setpasserr("");

    setpassword(e.target.value);
  };
  const addUsername = (e) => {
    seterror("");
    setusername(e.target.value);
  };
  const addPhone = (e) => {
    seterror("");
    setphoneerror("");
    setphone(e.target.value);
    console.log(phone);
  };
  const addDob = (e) => {
    const val = new Date();
    const val2 = new Date(e.target.value);

    const diffTime = Math.abs(val - val2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);
    if (diffDays < 4383) {
      console.log("not possible");
      setdateerr("your date is not valid");
    } else {
      setdateerr("");
    }
    // console.log(moment(newDate).format('YYYY-MM-DD'))

    setdob(e.target.value);
  };
  function validatePassword(password) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password.match(passw)) {
      return true;
    } else {
      return false;
    }
  }
  function validateConfirmPassword(password, newpassword) {
    if (password == newpassword) {
      return true;
    } else {
      return false;
    }
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const userSignup = async (e) => {
    e.preventDefault();
    if (username && dob && email && password && phone && newpassword) {
      try {
        try {
          if (!validatePassword(password)) {
            throw new Error("Enter strong password");
          }
        } catch (err) {
          setpasserr(err.message);
        }
        try {
          if (!validateConfirmPassword(password, newpassword)) {
            throw new Error("Not matching");
          }
        } catch (err) {
          setnewpasserr(err.message);
        }

        try {
          if (!validateEmail(email)) {
            throw new Error("not valid email");
          }
        } catch (err) {
          setemailerror(err.message);
        }
        try {
          if (phone.length != 10) {
            throw new Error("Invalid phone number");
          }
        } catch (err) {
          setphoneerror(err.message);
        }
        try {
          if (referal) {
            const data = {
              referal: referal,
            };
            instance.post("/validatereferal", data).then((response) => {
              if (response.status === false) {
                throw new Error("Invalid referal number");
              }
            });
          }
        } catch (err) {
          setreferaleerror(err.message);
        }

        const data = {
          username: username,
          dob: dob,
          email: email,
          password: password,
          phone: phone,
          state: true,
          referal: referal,
        };

        if (
          validateConfirmPassword(password, newpassword) &&
          validatePassword(password) &&
          validateEmail(email) &&
          phone.length === 10 &&
          dateerr === ""
        ) {
          instance.post("/register", data).then(async (response) => {
            console.log(response.data);
            if (response.data.error) seterror(response.data.error);

            if (response.data.status) {
              navigate("/login");
            }
          });
        }
      } catch (err) {
        seterror("Some unknown error occured");
      }
    } else {
      seterror("Please fill the empty field");
    }
  };
  const addReferal = (e) => {
    setreferal(e.target.value);
  };
  return (
    <div className="register_head">
      <div className="user_main_page">
        <form className="user_register_form" onSubmit={userSignup}>
          <h3>Register here</h3>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={addUsername}
          ></input>
          <input
            type="number"
            min="0"
            value={phone}
            placeholder="Phone number"
            onChange={addPhone}
          ></input>
          {phoneerror && <p className="phoneerror">{phoneerror}</p>}
          <input
            type="date"
            defaultValue={"2/2/2000"}
            value={dob}
            placeholder="Date of birth"
            onChange={addDob}
          ></input>
          {dateerr && <p>{dateerr}</p>}
          <input
            type=""
            value={email}
            placeholder="Email"
            onChange={addEmail}
          ></input>
          {emailerror && <p className="emailerror">{emailerror}</p>}
          <input
            type="string"
            value={referal}
            placeholder="Referal code"
            onChange={addReferal}
          ></input>
          {referaleerror && <p className="referalerror">{referaleerror}</p>}
          <input
            type="password"
            value={password}
            placeholder="eg: Abc@123"
            onChange={addPassword}
          ></input>

          <input
            type="password"
            value={newpassword}
            placeholder="Confirm Password"
            onChange={(e) => {
              setnewpassword(e.target.value);
              seterror("");
              setnewpasserr("");
            }}
          ></input>
          {passerr && <p>{passerr}</p>}
          <Button className="login_button" type="submit">
            Signup
          </Button>
          {newpasserr && <p>{newpasserr}</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
