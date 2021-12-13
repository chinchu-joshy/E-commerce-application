import React,{useState,useEffect} from "react";
import "./UserProfile.css";
import { Row, Col, Container,Button ,Modal} from "react-bootstrap";
import ContentCopyIcon from '@material-ui/icons/FileCopy';
import copy from "copy-to-clipboard"; 
import {
    EmailShareButton,
    FacebookShareButton,
    TelegramIcon,
    InstapaperShareButton,
    LineShareButton,
    InstapaperIcon,
    EmailIcon,
    TelegramShareButton,
    WhatsappIcon,
    WhatsappShareButton,
  } from "react-share";

function Wallet(props) {
    const [copied, setCopied] = useState(false)
    const [icon, setIcon] = useState(false)
    const [show, setshow] = useState(false)
    const url=`http://localhost:3000/register?name=${props.value}`
   
    const handleCopy=()=>{
        copy(url)
        setCopied(true)
    }
    const handleClose=()=>{
        setshow(false)
    }
  
    
    useEffect(() => {
        console.log(props)
       
    }, [])
  return (
    <div>
      <Container>
        <Row className="row__wallet">
          <Col md={12}>
              <div className="main__wallet__box">
               <h6>Invite your friend and earn a reward of Rs.50</h6>
               <div className="content__wallet">
                  
                   <p id="link">{url}  <ContentCopyIcon className="copy" onClick={handleCopy}/></p>

                 
                   
                   <p className="display__copy">{!copied ? null : "Copied!"}</p>
                   
                   <Button className="wallet__invite_btn" onClick={()=>{
                       setIcon(true)
                       setshow(true)
                   }}>Invite</Button>
                  
                  
                   

               </div>
              </div>
          </Col>
          <Col>
          <h5>You have {props.wallet} rupee in your Wallet </h5>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Invite friends</Modal.Title>
        </Modal.Header>
        <Modal.Body> <div className="all__icons">
                   {icon && 
                   <div className="arrayicon">
                       
                       <WhatsappShareButton id="icon" url={url} > <WhatsappIcon size={32} round onClick={()=>{
                       setshow(false)
                   }}/></WhatsappShareButton>
                   <TelegramShareButton id="icon" url={url}>
                   <TelegramIcon size={32} round onClick={()=>{
                       setshow(false)
                   }}/>

                   </TelegramShareButton>
                   <EmailShareButton id="icon" url={url}>
                   <EmailIcon size={32} round onClick={()=>{
                       setshow(false)
                   }}/>

                   </EmailShareButton>
                   <InstapaperShareButton id="icon" url={url}>
                   <InstapaperIcon size={32} round onClick={()=>{
                       setshow(false)
                   }}/>

                   </InstapaperShareButton>


                   </div>
                   
                   }

                   </div> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Wallet;
