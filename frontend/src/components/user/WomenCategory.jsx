import React,{useEffect,useState} from 'react'
import { instanceAdmin } from '../../axios/axios'
import Navbar from './Navbar'
import './WomenCategory.css'
import {Card,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function WomenCategory(){
    const [women, setwomen] = useState([])
    const [presentwomen, setpresentwomen] = useState(false)
    const getWomen=async()=>{
        const response=await instanceAdmin.get('/getwomen')
        console.log()
        setwomen(response.data)
        setpresentwomen(true)
    }
    useEffect(() => {
       getWomen()
       
    }, [])
    return (
        <div className="get_women_head">
            <div className="navbar">
                <Navbar women={presentwomen}/>
            </div>
            <div className="body">

                {women.map((data)=>{
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

export default WomenCategory
