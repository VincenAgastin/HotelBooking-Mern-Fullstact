import React from 'react'
import '../widget/Widget.scss'
import { FaAngleUp } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { MdMonetizationOn } from "react-icons/md";
import { IoIosWallet } from "react-icons/io";


const Widget = ({type}) => {

    let data;

    //temporary

    const amount=100
    const diff=20

    switch(type){
        case "user":
            data={
                title:"USERS",
                isMoney:false,
                link:"See All Users",
                icon:(
                    <IoPerson className='icon' style={{color:"crimson",backgroundColor:"rgba(225,0,0,0.2)"}} />
                )
            };
            break;
        case "order":
            data={
                title:"ORDERS",
                isMoney:false,
                link:"View  All Orders",
                icon:(
                    <FaShoppingCart className='icon' style={{color:"goldenrod",backgroundColor:"rgba(218,165,32,0.2)"}} />
                )
            };
            break;
        case "earning":
            data={
                title:"EARNINGS",
                isMoney:true,
                link:"View Net Earnings",
                icon:(
                    <MdMonetizationOn className='icon' style={{color:"green",backgroundColor:"rgba(0,128,0,0.2)"}} />
                )
            };
            break;
        case "balance":
            data={
                title:"BALANCE",
                isMoney:true,
                link:"See Details ",
                icon:(
                    <IoIosWallet className='icon' style={{color:"purple",backgroundColor:"rgba(128,0,128,0.2)"}} />
                )
            };
            break;
            default :
               break;
    }




  return (
    <div className='widget'>
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney && "$"}{amount}</span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                <FaAngleUp  />
                {diff}%
            </div>
            {data.icon}

        </div>
    </div>
  )
}

export default Widget