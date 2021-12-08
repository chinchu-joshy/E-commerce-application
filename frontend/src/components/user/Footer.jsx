import React from 'react'
import './Footer.css'
import { Container,Row,Col } from 'react-bootstrap'

function Footer() {
    return (
        <div className="footer__container">
            <Container>
                <Row>
                    <Col md={12}>
                  
<footer class="page-footer font-small elegant-color">

  
  <div class="container text-center text-md-left pt-4 pt-md-5">

  
    <div class="row mt-1 mt-md-0 mb-4 mb-md-0">

      
      <div class="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

        
        <h5>Contacts</h5>
        <hr class="color-primary mb-4 mt-0 d-inline-block mx-auto w-60"/>

        <ul class="list-unstyled">
          <li>
            <a href="#!">Very long link 1</a>
          </li>
          <li>
            <a href="#!">Very long link 2</a>
          </li>
          <li>
            <a href="#!">Very long link 3</a>
          </li>
          <li>
            <a href="#!">Very long link 4</a>
          </li>
        </ul>

      </div>
     

      <hr class="clearfix w-100 d-md-none"/>

    
      <div class="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

       
        <h5>About us</h5>
        <hr class="color-primary mb-4 mt-0 d-inline-block mx-auto w-60"/>

        <ul class="list-unstyled">
          <li>
            <a href="#!">Link 1</a>
          </li>
          <li>
            <a href="#!">Link 2</a>
          </li>
          <li>
            <a href="#!">Link 3</a>
          </li>
          <li>
            <a href="#!">Link 4</a>
          </li>
        </ul>

      </div>
    

      <hr class="clearfix w-100 d-md-none"/>

      
      <div class="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

      
        <h5>Useful links</h5>
        <hr class="color-primary mb-4 mt-0 d-inline-block mx-auto w-60"/>

        <ul class="list-unstyled">
          <li>
            <a href="#!">Link 1</a>
          </li>
          <li>
            <a href="#!">Link 2</a>
          </li>
          <li>
            <a href="#!">Link 3</a>
          </li>
          <li>
            <a href="#!">Link 4</a>
          </li>
        </ul>

      </div>
     

      <hr class="clearfix w-100 d-md-none"/>

     
      <div class="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

       
        
       

      </div>
      

    </div>
    

  </div>
  

 
  
 

</footer>

                    </Col>
                    <Col md={12} className="contact__footer">
                        <p>In case any concern please contact us : +9476857686</p>
                        <p>© 2021 www.shoppy.com. All rights reserved.</p>
                        </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
