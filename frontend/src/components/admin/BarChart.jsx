import React,{useState,useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import { instanceAdmin } from '../../axios/axios' 

function BarChart() {
    const label=[]
    const val=[]
   const [day, setday] = useState([])
   const [count, setcount] = useState([])
    const activeUserFind=async()=>{
       const result=await instanceAdmin.get('/monthlyorder')
       setday(result.data.day)
       setcount(result.data.count)

    }
    useEffect(() => {
        activeUserFind()
       
        
    }, [])
    const data={
                labels:day,
                datasets:[{
                    data:count,
                    backgroundColor:["blue","blue","blue","blue","blue","blue"]
                }],
              
        
            }
            const options={
                
                scales:{
                    yAxes:[{
                        ticks:{
                            beginAtZero:true,

                        },
                        
                    },
                ],
                },
            }
    return (
        <div>
              <div className="barchart">
             <Bar data={data} options={options}/>
            
        </div>
        </div>
    )
}

export default BarChart
