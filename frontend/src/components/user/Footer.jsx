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

        
        <h5>About</h5>
        <hr class="color-primary mb-4 mt-0 d-inline-block mx-auto w-60"/>

        <ul class="list-unstyled">
          <li>
            <a href="#!">Contact Us</a>
          </li>
          <li>
            <a href="#!">About Us</a>
          </li>
          <li>
            <a href="#!">Press</a>
          </li>
          <li>
            <a href="#!">Corporate</a>
          </li>
        </ul>

      </div>
     

      <hr class="clearfix w-100 d-md-none"/>

    
      <div class="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

       
        <h5>Help</h5>
        <hr class="color-primary mb-4 mt-0 d-inline-block mx-auto w-60"/>

        <ul class="list-unstyled">
          <li>
            <a href="#!">Payments</a>
          </li>
          <li>
            <a href="#!">Shipping</a>
          </li>
          <li>
            <a href="#!">Cancellation</a>
          </li>
          <li>
            <a href="#!">Privacy</a>
          </li>
        </ul>
        
        

      </div>
    

      <hr class="clearfix w-100 d-md-none"/>

      
      <div class="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

      
        <h5>Useful links</h5>
        <hr class="color-primary mb-4 mt-0 d-inline-block mx-auto w-60"/>

        <ul class="list-unstyled">
          <li>
            <a href="#!">Contact Us</a>
          </li>
          <li>
            <a href="#!">Terms of use</a>
          </li>
          <li>
            <a href="#!">Shipping</a>
          </li>
          <li>
            <a href="#!">Blog</a>
          </li>
        </ul>

      </div>
     

      <hr class="clearfix w-100 d-md-none"/>

     
      <div class="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

      <h5>Mail Us</h5>
        <hr class="color-primary mb-4 mt-0 d-inline-block mx-auto w-60"/>

        <ul class="list-unstyled">
          <li className="mail__content__footer">
           Shoppy Privet limited,BUildings Alyass,Begonia & Clove Embassy Tech Village,
           Outer Ring Rpad,Devarabesseri Village,Bengaluru,Karnataka,India
          </li>
         
        </ul>
        
       

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
