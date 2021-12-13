import "./Dashboard.css";
import React,{useEffect,useContext,useState} from "react";
import { Container ,Spinner} from "react-bootstrap";
import { instanceAdmin } from "../../axios/axios";
import SpinContext from "../../context/spinnerContext";
import Doughnut from "./DoughnutChart";
import BarChart from "./BarChart";
import {Link} from 'react-router-dom'

function Dashboard() {
  const {spin,setspin} = useContext(SpinContext)
  const [newuser, setnewuser] = useState()
const [order, setorder] = useState()
const [productcount, setproductcount] = useState()
const [total, settotal] = useState()
const [latestorder, setlatestorder] = useState([])
const [trending, settrending] = useState([])

// =================================================CHART=======================================================


 
  const obtainData=async()=>{
    try{
     
      const info=await instanceAdmin.get("/getinfo")
      console.log("but yyyy")
      console.log(info.data)
      console.log("home testing")
    if(info.data) { 
     
      setspin(false)
     
       
       setnewuser(info.data.newuser.newuser)
       setorder(info.data.neworder.neworder)
       setproductcount(info.data.count)
       settotal(info.data.amount.total)
        }

    }catch(err){

    }

  }
  const getLatestOrder=async()=>{
    const latest=await instanceAdmin.get('/latestorders')
    if(latest){
      
      setlatestorder(latest.data)
    }
  
  }
  const getTrendingOrder=async()=>{
    const trending=await instanceAdmin.get('/trending')
    if(trending){
      console.log(trending.data[0].productdetails.url[0])
      settrending(trending.data)
    }
  }

useEffect(() => {
  getLatestOrder()
  obtainData()
  getTrendingOrder()
  
}, [])
  return (
    <>
     {spin === true ? (
        <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
      <Container>
        <section class="home-section">
          <div class="home-content">
            <div class="overview-boxes">
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">Total Orders</div>
                  <div class="number">{order}</div>
                  <div class="indicator">
                    <i class="bx bx-up-arrow-alt"></i>
                    <span class="text">Up from last week</span>
                  </div>
                </div>
                <i class="bx bx-cart-alt cart"></i>
              </div>
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">New users</div>
                  <div class="number">{newuser}</div>
                  <div class="indicator">
                    <i class="bx bx-up-arrow-alt"></i>
                    <span class="text">Up from last week</span>
                  </div>
                </div>
                <i class="bx bxs-cart-add cart two"></i>
              </div>
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">Total Products </div>
                  <div class="number">{productcount}</div>
                  <div class="indicator">
                    <i class="bx bx-up-arrow-alt"></i>
                    <span class="text">Available products  </span>
                  </div>
                </div>
                <i class="bx bx-cart cart three"></i>
              </div>
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">Total sales</div>
                  <div class="number">₹{total}</div>
                  <div class="indicator">
                    <i class="bx bx-down-arrow-alt down"></i>
                    <span class="text">Total sales</span>
                  </div>
                </div>
                <i class="bx bxs-cart-download cart four"></i>
              </div>
            </div>
            <div class="sales-boxes">
              <div class="recent-sales box">
                <div class="title">Recent Sales</div>
                <div class="sales-details">
                  <ul class="details">
                    <li class="topic">Date</li>
                    {latestorder.map((data)=>{
                      return(
                        <li>
                        <a href="#">{data.productdetails.createdAt}</a>
                      </li>
                      )
                    })}
                  </ul>
                  <ul class="details">
                    <li class="topic">Customer</li>
                    {latestorder.map((data)=>{
                      return(
                        <li>
                        <a href="#">{data.role[0].username}</a>
                      </li>
                      )
                    })}
                  </ul>
                  <ul class="details">
                    <li class="topic">Total</li>
                    {latestorder.map((data)=>{
                      return(
                        <li>
                        <a href="#">{data.products.price}</a>
                      </li>
                      )
                    })}
                   
                  </ul>
                </div>
                <div class="button">
                 <Link to="/admin/order"> <a href="">See All</a></Link>
                </div>
              </div>
              <div class="top-sales box">
                <div class="title">Top Seling Product</div>
                <ul class="top-sales-details">
                  {trending.map((data)=>{
                    return(
                      <li>
                    <a href="#">
                      <img src={data.productdetails.url[0].image1} alt="" />
                      <span class="product">{data.productdetails.productname}</span>
                    </a>
                    <span class="price">${data.productdetails.price}</span>
                  </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="bottom__content__main">
          <canvas id="myChart" width="400" height="400"></canvas>
          </div>
          <div className="graph_area">
          <Doughnut/>
       <BarChart/>
          </div>
        </section>
      </Container>
      )}
    </>
  );
}
export default Dashboard;
