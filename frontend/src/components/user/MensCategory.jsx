import React,{useEffect,useState} from 'react'
import { instanceAdmin } from '../../axios/axios'
import './MensCategory.css'
import Navbar from './Navbar'
import {Card,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function MensCategory() {
    const [men, setmen] = useState([])
    const [presentmen, setpresentmen] = useState(false)
    const getMen=async()=>{
        const response=await instanceAdmin.get('/getmen')
        console.log()
        setmen(response.data)
        setpresentmen(true)
    }
    useEffect(() => {
       getMen()
       
    }, [])
    return (
        <div className="get_women_head">
            <div className="navbar">
                <Navbar women={presentmen}/>
            </div>
            <div className="body">

                {men.map((data)=>{
                    return(
                        <Link style={{textDecoration:"none"}} to={`/viewproduct/${data._id}`}>
                      <Card className="card" style={{ width: '18rem' }}>
                          
                      <Card.Img className="image" variant="top" src={data.url[0].image1}/>
                      <Card.Body>
                        <Card.Title>{data.productname}</Card.Title>
                        <Card.Text>
                          {data.description}
                        </Card.Text>
                        <Button variant="primary">{data.price}</Button>
                      </Card.Body>
                    </Card>
                    </Link>
                    )
                
                })}
            
            </div>
           
            
        </div>
    )
}

export default MensCategory
