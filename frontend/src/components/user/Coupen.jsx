import React,{useState,useEffect} from 'react'
import { Container, Row ,Col, Image} from 'react-bootstrap';
import { instance } from "../../axios/axios";

function Coupen() {
    const [coupen, setcoupen] = useState([])
    const getCoupen=async()=>{
        try{
const coupens=await instance.get('/showcoupen')
if(coupen){
    setcoupen(coupens.data)
    console.log(coupens)
}
        }catch(err){
        }
    }
    useEffect(() => {
       
        getCoupen()
    }, [])
    return (
        <div className="main__coupen">
            <Container>
                {coupen.map((data)=>{
                    return(
                        <Row className="img__coupen__row mt-2">
                    <Col md={4}>

<div className="image__coupen">
    <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlu_naf7x-WrK0zOtVqO80EYF2dMwWY5kElg&usqp=CAU"></img>
    <p style={{color:"green"}}>Secret code : {data.coupencode}</p>

</div>
                    </Col>
                    <Col md={8} className="bottom__coupen">
                        <strong>{data.coupenname}</strong>
                        <ul>
                            <li>Offer :{data.offer}% discound on purchase above {data.limit}</li>
                           
                            <li>Start date:{data.startdate}</li>
                            <li>End Date:{data.enddate}</li>
                        </ul>
                    </Col>
                </Row>
                    )
                })}
                
            </Container>
         
        </div>
    )
}

export default Coupen
