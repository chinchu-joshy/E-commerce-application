import React from 'react'
import {Container,Row,Col,Button,} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function Success() {
    return (
        <>
        <Container>
            <Row>
                <Col>
                <div className="order__success">
                    Order Placed succcessfully
                </div>
               <Link to="/"> <Button>GO to home</Button></Link>
                </Col>
            </Row>
        
        </Container>
        </>
    )
}

export default Success
