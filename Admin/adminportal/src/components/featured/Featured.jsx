import React from 'react'
import '../featured/Featured.scss'
import { SlOptionsVertical } from "react-icons/sl";
import {CircularProgressbar  } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";


const Featured = () => {
  return (
    <div className='featured'>
        <div className="top">
            <h1 className="title">Total Revenue</h1>
            <SlOptionsVertical />
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
            </div>
            <p className="title">Total Sales made today</p>
            <p className="amount">$420</p>
            <p className="desc">Previous transactions processing. Last payments may not be included</p>
            <div className="summary">
                <div className="item">
                    <div className="itemTitle">Target</div>
                    <div className="itemResult negative" >
                        <MdKeyboardArrowDown />
                        <div className="resultAmount">$12.4K</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Week</div>
                    <div className="itemResult positive">
                        <MdKeyboardArrowUp />
                        <div className="resultAmount">$19.4K</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Month</div>
                    <div className="itemResult positive">
                        <MdKeyboardArrowUp />
                        <div className="resultAmount">$30.4K</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Featured