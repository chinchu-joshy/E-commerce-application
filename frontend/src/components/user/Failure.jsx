import './Failure.css'
import React from 'react'
import {Container,Row,Col,Button,} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function Failure() {
    return (
        <div>
             <Container >
            <Row className="main__failure_page">
                <Col className="main__failure_page_col">
                <div className="order__failure">
                   <h1> Transaction Failed</h1>
                </div>
               <Link to="/"> <Button>Go to home</Button></Link>
               <Link to="/cart"> <Button>Go to cart</Button></Link>
               
                </Col>
            </Row>
        
        </Container>
        </div>
    )
}

export default Failure
