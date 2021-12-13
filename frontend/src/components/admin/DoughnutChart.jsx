
import React,{useState,useEffect} from 'react'
import {Doughnut} from 'react-chartjs-2'
import { instanceAdmin } from '../../axios/axios'
function DoughnutChart() {
    const [block, setblock] = useState()
    const [blocked, setblocked] = useState()
    const activeUserFind=async()=>{
       const block=await instanceAdmin.get('/activeusers')
       if(block.data){
setblock(block.data.block)
setblocked(block.data.blocked)
       }
    }
    useEffect(() => {
        activeUserFind()
       
        
    }, [])
    const data={
                labels:["Active users","Inactive users"],
                datasets:[{
                    data:[parseInt(block),parseInt(blocked)],
                    backgroundColor:["green","red"]
                }],
              
        
            }
    return (
        <div className="round_chart">
             <Doughnut data={data}/>
            
        </div>
    )
}

export default DoughnutChart
