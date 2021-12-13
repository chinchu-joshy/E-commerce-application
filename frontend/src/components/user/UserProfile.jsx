import "./UserProfile.css";
import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import OrderView from "./OrderView";
import { Link } from "react-router-dom";
import AdressBook from "./AdressBook";
import Details from "./Details";
import { instance } from "../../axios/axios";
import swal from "sweetalert";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import AuthUserContext from "../../context/UserContext";
import ReactCrop from "react-image-crop";
import AddIcon from '@material-ui/icons/Add';
import Wallet from "./Wallet";
import Coupen from "./Coupen";


function UserProfile() {
  const [showimg, setshowimg] = useState(false)
  const [url, seturl] = useState("")
  const [image, setimage] = useState("");
  const [cropdata, setcropdata] = useState({ aspect: 9 / 10 });
  const [completed, setcompleted] = useState(null);
  const [adress, setadress] = useState(false);
  const [order, setorder] = useState(false);
  const [password, setpassword] = useState(false);
  const [newpasserr, setnewpasserr] = useState("");
  const [newpassword, setnewpassword] = useState({ pass1: "", pass2: "" });
  const [userpassword, setuserpassword] = useState("");
  const [crop, setcrop] = useState("");
  const [detail, setdetail] = useState(true);
  const [err, seterr] = useState("");
  const [wallet, setwallet] = useState(false)
  const [confirmerr, setconfirmerr] = useState("");
  const [coupen, setcoupen] = useState(false)
  const inputEl = useRef(null);
  const ref = useRef();
  const canvasref = useRef();
  const [changepassword, setchangepassword] = useState(false);
  const {getUserLoggedIn, username } = useContext(AuthUserContext);
  const handleClose = () => setpassword(false);
  const handleSubmit = () => setchangepassword(false);
  const handleCloseImg=()=>setshowimg(false)
  const checkPassword = (e) => {
    e.preventDefault();
    try {
      const data = {
        passworduser: userpassword,
      };
      instance.post("/checkpassword", data).then((response) => {
        if (response.data.status) {
          setpassword(false);
          setchangepassword(true);
        } else {
          seterr("Invalid password");
        }
      });
    } catch (err) {}
  };
  function validatePassword(password) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password.match(passw)) {
      return true;
    } else {
      return false;
    }
  }
  const addNewPassword = (e) => {
    console.log(newpassword.pass1);
    const data = {
      password: newpassword.pass1,
    };
    e.preventDefault();
    try {
      console.log(validatePassword(newpassword.pass1));
      if (!validatePassword(newpassword.pass1)) {
        console.log("not strong");
        setnewpasserr("Enter strong password");
      } else {
        if (newpassword.pass1 !== newpassword.pass2) {
          console.log("no match");
          setconfirmerr("Not matching");
        } else {
          instance.post("/addnewpassword", data).then((response) => {
            if (response) {
              setchangepassword(false);
              swal("Password changed successfully");
            } else {
              swal("Password coudn't update");
            }
          });
        }
      }
    } catch (err) {}
  };
  const uploadProfilepic = (e) => {
    const data = e.target.files;
    // const  {files}=e.target
    // if(files && files.length>0){
    //   const reader=FileReader()
    //   reader.readasDataURL(files[0])
    //   reader.addEventListener("load",()=>{
    //     setimage(reader.result)
    //   })
    // }
    setimage(URL.createObjectURL(e.target.files[0]));

    // cropImage(URL.createObjectURL(e.target.files[0]))
    //       const reader=FileReader()
    // cropImage(e.target.files[0])

    // const cropper =new Cropper(e.target.files[0],{
    //   zoomable:false,
    //   scalable:false,
    //   aspectRatio:1,
    //   crop:()=>{
    //     const canvas=cropper.getCroppedCanvas()
    //     setcrop(canvas.toDataURL('image/png'))
    //   }

    // })
    // instance.post('/uploadimage',data).then((response)=>{
    //   if(response){

    //   }
    // })
  };
  //     const cropImage=(image)=>{
  // console.log(inputEl.current)
  //            const cropper =new Cropper(inputEl.current,{
  //         zoomable:false,
  //         scalable:false,
  //         aspectRatio:1,

  //         crop:(e)=>{
  //   console.log(e.detail.x);
  //   console.log(e.detail.y);
  //  console.log(inputEl)

  //       const canvas=cropper.getCroppedCanvas()
  //       console.log(canvas)
  //       console.log(canvas.toDataURL('image/png'))

  //       setcrop(canvas.toDataURL('image/png'))
  //     }

  //   })
  // }
  const handleOnload = useCallback((img) => {
    ref.current = img;
  }, []);
  useEffect(() => {
    if (!completed || !ref) {
      return null;
    }
    const rc_image = ref.current;
    const canvas = canvasref.current;

    const crop = completed;
    const scaleX = rc_image.naturalWidth / rc_image.width;
    const scaleY = rc_image.naturalHeight / rc_image.height;
    const pixelRatio = window.devicePixelRatio;
    const destwidth = crop.width * scaleX;
    const destheight = crop.height * scaleY;
    canvas.width = destwidth * pixelRatio;
    canvas.height = destheight * pixelRatio;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "large";
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(
      rc_image,
      crop.x * scaleX,
      crop.y * scaleY,
      destwidth,
      destheight,
      0,
      0,
      destwidth,
      destheight
    );
  }, [completed]);
  const cropImage = () => {
    if (!completed || !canvasref.current) {
      return;
    }
    const imgUrl = canvasref.current.toDataURL("image/jpeg");
    console.log(imgUrl);
    const data={url:imgUrl}
    instance.post('/uploadimage',data).then((response)=>{
        if(response){
          getUserLoggedIn()
          swal("Uploaded successfully")
          setshowimg(false)

  
        }
      })
  };
  return (
    <>
      <Container className="mt-3">
        <Row className="profile__top__row">
          <Col md={4} className="mt-2">
            <Card>
              <Card.Body>Hi {username.username}</Card.Body>
            </Card>
          </Col>
          <Col md={8} className="d-flex right__top__profile">
           <Image className="profile__pic" src={username.image} roundedCircle/>
           <AddIcon onClick={()=>{
            setshowimg(true)
          }}/>
         
          <h2>My account</h2>
           
          </Col>
        </Row>
        <Row>
          <Col md={4} className="side__nav">
            <ListGroup variant="flush">
              <ListGroup.Item
                onClick={() => {
                  setadress(false);
                  setorder(false);
                  setdetail(true);
                  setpassword(false);
                  setwallet(false)
                  setcoupen(false)
                }}
              >
                My details
              </ListGroup.Item>
              <ListGroup.Item>
                <p
                  onClick={() => {
                    setadress(true);
                    setorder(false);
                    setdetail(false);
                    setpassword(false);
                    setwallet(false)
                    setcoupen(false)
                  }}
                >
                  Adress Book
                </p>
              </ListGroup.Item>
              <ListGroup.Item
                onClick={() => {
                  setpassword(true);
                }}
              >
                Reset Password
              </ListGroup.Item>

              <ListGroup.Item
                onClick={() => {
                  setadress(false);
                  setdetail(false);
                  setorder(true);
                  setpassword(false);
                  setwallet(false)
                  setcoupen(false)
                }}
              >
                My orders
              </ListGroup.Item>
              <ListGroup.Item  onClick={() => {
                  setadress(false);
                  setdetail(false);
                  setorder(false);
                  setpassword(false);
                  setwallet(false)
                  setcoupen(true)
                }}>Coupens</ListGroup.Item>
              <ListGroup.Item  onClick={() => {
                  setadress(false);
                  setdetail(false);
                  setorder(false);
                  setpassword(false);
                  setwallet(true)
                  setcoupen(false)
                }}>Wallet</ListGroup.Item>
              <ListGroup.Item>Wishlist</ListGroup.Item>
              <ListGroup.Item>View your reviews</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={8}>
            <Container>
              <div className="show__selected__details">
                {order && <OrderView />}
                {adress && <AdressBook />}
                {detail && <Details />}
                {wallet && <Wallet value={username.referal} wallet={username.wallet}/>}
                {coupen &&<Coupen/>}
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
      <div>
        <Modal
          show={password}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Please enter your password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={checkPassword}>
              <Form.Control
                type="password"
                placeholder="Enter the password"
                onChange={(e) => {
                  setuserpassword(e.target.value);
                }}
              ></Form.Control>
              <Button className="mt-3" variant="secondary" type="submit">
                Confirm
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>{err && <p>{err}</p>}</Modal.Footer>
        </Modal>
      </div>

      <div>
        <Modal
          show={changepassword}
          onHide={setchangepassword}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter new password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={addNewPassword}>
              <Form.Control
                type="password"
                placeholder="eg: Abc@123"
                onChange={(e) => {
                  setnewpassword((prev) => ({
                    ...prev,
                    pass1: e.target.value,
                  }));
                  setnewpasserr("");
                }}
              ></Form.Control>

              <Form.Label>Confirm password</Form.Label>
              {confirmerr && <p>{confirmerr}</p>}
              <Form.Control
                type="password"
                placeholder="confirm password"
                onChange={(e) => {
                  setnewpassword((prev) => ({
                    ...prev,
                    pass2: e.target.value,
                  }));
                }}
              ></Form.Control>
              <Button className="mt-3" variant="secondary" type="submit">
                Change
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>{newpasserr && <p>{newpasserr}</p>}</Modal.Footer>
        </Modal>












        <Modal
        show={showimg}
        onHide={handleCloseImg}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input
              onChange={uploadProfilepic}
              type="file"
              id="filefield"
              name="file"
              accept="image/*"
            />
            {/* <Button onClick={()=>{
  inputEl.current.click()
  console.log(inputEl.current.click())
}}>Add</Button> */}

            {/* <img className="image__preview" src={crop}  /> */}
            <div className="cropper">
              {image && (
                <ReactCrop
                  src={image}
                  crop={crop}
                  onChange={(c) => {
                    setcrop(c);
                  }}
                  onComplete={(e) => setcompleted(e)}
                  onImageLoaded={handleOnload}
                />
              )}
            </div>
            {/* <h2>My account</h2> */}
            <canvas ref={canvasref}></canvas>
            <Button
              onClick={() => {
                cropImage();
              }}
            >
              upload
            </Button>
        
        </Modal.Body>
      </Modal>
    




















      </div>
    </>
  );
}

export default UserProfile;
