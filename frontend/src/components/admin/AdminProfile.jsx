import React,{useEffect,useState,useCallback,useRef} from 'react'
import { Container ,Col,Row,Card,Image,Modal,Button,Form} from 'react-bootstrap'
import { instanceAdmin } from '../../axios/axios'
import './AdminProfile.css'
import swal from 'sweetalert'
import AddIcon from '@material-ui/icons/Add';
import ReactCrop from "react-image-crop";

function AdminProfile() {
    const [showimg, setshowimg] = useState(false)
    const [show, setshow] = useState()
    const [admin, setadmin] = useState({})
    const [image, setimage] = useState("")
    const [completed, setcompleted] = useState(null);
    const [crop, setcrop] = useState("")
    const [newpasserr, setnewpasserr] = useState()
    const [changepassword, setchangepassword] = useState()
   const [err, seterr] = useState()
    const [confirmerr, setconfirmerr] = useState()
    const [newpassword, setnewpassword] = useState({ pass1: "", pass2: "" })
    const ref = useRef();
    const canvasref = useRef();
const [adminpassword, setadminpassword] = useState()
const handleClose = () => setshow(false)

    const checkPassword = (e) => {
        e.preventDefault();
        if(!adminpassword) return seterr("Please fill the empty field")
        try {
          const data = {
            adminpassword: adminpassword,
          };
          instanceAdmin.post("/checkpasswordadmin", data).then((response) => {
            if (response.data.status) {
              setshow(false);
              setchangepassword(true);
            } else {
              seterr("Invalid password");
            }
          });
        } catch (err) {}
      };





    const handleCloseImg=()=>{
        setshowimg(false)
    }
    const getAdmin=async()=>{
        try{
const admindetail=await instanceAdmin.get('/admindetail')
if(admindetail){
    setadmin(admindetail.data)
}
        }catch(err){

        }
    }
    const uploadProfilepic = (e) => {
        
        setimage(URL.createObjectURL(e.target.files[0]));
    
       
      };
      function validatePassword(password) {
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (password.match(passw)) {
          return true;
        } else {
          return false;
        }
      }
      const addNewPassword=(e)=>{
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
              instanceAdmin.post("/addnewpasswordadmin", data).then((response) => {
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
      }
     
      const handleOnload = useCallback((img) => {
        ref.current = img;
      }, []);
    useEffect(() => {
        getAdmin()
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
        instanceAdmin.post('/uploadimageadmin',data).then((response)=>{
            if(response){
             getAdmin()
              swal("Uploaded successfully")
              setshowimg(false)
    
      
            }
          })
      };
      
    return (
        <Container>
            <div className="main__out__admin__profile">
           
            
            <div className="subdiv_admin_profile">
            <Row className="profile__top__row-admin">
          <Col md={4} className="mt-2">
            <Card>
              <Card.Body>
                  <h4>Hi {admin.username}</h4>
                  <p>{admin.email}</p>
                  <Button onClick={()=>{
                      setshow(true)
                  }}>Change Password</Button>
                  </Card.Body>
            </Card>
          </Col>
          <Col md={8} className="d-flex right__top__profile-admin">
           <Image className="profile__pic-admin" src={admin.image} roundedCircle/>
           <AddIcon onClick={()=>{
            setshowimg(true)
          }}/>
         
          <h2>My account</h2>
           
          </Col>
        </Row>

            </div>

            </div>
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
          show={show}
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
                  setadminpassword(e.target.value);
                }}
              ></Form.Control>
              <Button className="mt-3" variant="secondary" type="submit">
                Confirm
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>{err && <p>{err}</p>}</Modal.Footer>
        </Modal>

        </Container>
        
    )
}

export default AdminProfile
