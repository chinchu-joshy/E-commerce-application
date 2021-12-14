import React from 'react'
import './Success.css'
import {Container,Row,Col,Button,} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function Success() {
    return (
        <>
        <Container >
            <Row className="main__sucess_page">
                <Col className="main__sucess_page_col">
                <div className="order__success">
                   <h1> Order Placed succcessfully</h1>
                </div>
               <Link to="/"> <Button>Go to home</Button></Link>
                </Col>
            </Row>
        
        </Container>
        </>
    )
}

export default Success
