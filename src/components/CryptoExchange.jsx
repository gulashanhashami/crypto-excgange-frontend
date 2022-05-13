import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import { isDisabled } from '@testing-library/user-event/dist/utils';

const ResultDiv=styled.div`
.contain{
  width:85%;
  height:150vh;
  margin: auto;
   overflow-y:scroll;
  /* border:2px solid red; */
}


#head{
  width:80% ;
  height: 6.5vh;
  display: flex;
  margin: auto;
  font-size: 1vw;
  flex-direction: row;
  /* padding:2% ; */
  justify-content: space-between;
  border-bottom: 1px solid grey;
  
}
.count-list-3{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
  justify-content: space-between;
  width:80% ;
  height:7vh;
  /* padding-right:1% ; */
  border-bottom: 1px solid grey;
 
  
}
#coinlist{
  width: 30%;
  height: 5vh;
  display: flex;
  align-items: center;
 
  flex-direction: row;
  /* border: 1px solid red; */
  justify-content: space-between;
}
.imgbox{
  width: 20%;
  height: 4vh;
  align-items: center;
  /* border: 1px solid blue; */
}
.textbox{
  width: 76%;
  height: 4vh;
  /* border: 1px solid red; */
}


.img1{
  width:95%;
  height: 95%;
  
}
p{
  font-size:1.2vw;
  line-height:.2vh;
}
.sbox{
  width: 53%;
  height: 13vh;
  display: flex;
  margin-top: 3%;
  margin-left: 16%;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  /* border: 1px solid red; */
}
.search-input{
  width: 85.7%;
  height: 6.2vh;
 font-size: 1vw;
 padding-left: 2%;
  outline: none;
 
}
.search-button{
  width: 13.2%;

  height: 7.4vh;
  font-size:1vw;
 
  color: white;
  background-color: red;
  border: 2px solid red;
}
.search-button:hover{
  background-color: white;
  color: red;
  font-size:1vw;
  /* font-weight: bold; */
}
.btndiv{
  width: 30%;
  height: 9.5vh;
  display: flex;
  flex-direction: row;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  /* border: 2px solid red; */
}
.pagebtn{
  width: 40%;
  height: 6vh;
  /* margin-left:5vh; */
  color: white;
  font-size: 1vw;
  font-weight: bold;
  border-radius: 2vw;
  background-color: blue;
  border: 2px solid blue;
}

.pagebtn:hover{
  background-color: white;
  color: red;
}

`;
export const CryptoExchange=()=>{
  const [fdata, setData]= useState([])
  const [sdata, setSd]= useState("");
  const [page, setPage]= useState(1);
  const [fdata1, setData1]= useState([])
    useEffect(()=>{
      getdata();
    }, [])

    useEffect(()=>{
      getdata1();
    }, [])

  const getdata1=()=>{
        axios.get(`http://localhost:2345/products`).then(({data})=>{
            // console.log(data)
            setData1(data);
        })
    }

  const requestOne = axios.get("https://rest.coinapi.io/v1/exchanges?apikey=3D03B0F7-8BD6-4F3C-AE17-819CD470F359");
const requestTwo = axios.get("https://rest.coinapi.io/v1/exchanges?apikey=3D03B0F7-8BD6-4F3C-AE17-819CD470F359");
  const getdata=()=>{
    axios.all([requestOne, requestTwo]).then(axios.spread((...res)=>{
      const responseOne = res[0].data
  const responseTwo = res[1].data
  var arr3=[...responseOne, ...responseTwo]
        // console.log(arr3[1].image)
        setData(arr3);
    }))
}
//  console.log(fdata)
    const handleSearch=()=>{
      var arr=fdata.filter((value)=>{
        if(sdata===""){
          // console.log(value)
           return value;
        }
        else if(value.exchange_id.toLowerCase()===(sdata.toLocaleLowerCase())){
        
           return value;
        }
      })
      setData(arr);
     axios.post("http://localhost:2345/products", {
       name:arr[0].name,
       data_symbols_count:arr[0].data_symbols_count,
       data_start: arr[0].data_start,
       data_end: arr[0].data_end,
       volume_1hrs_usd:arr[0].volume_1hrs_usd,
       volume_1day_usd:arr[0].volume_1day_usd,
       volume_1mth_usd:arr[0].volume_1mth_usd,
       url:arr[1].url,
    }).then((res)=>{
          //  console.log(res)  
     })
      // console.log(arr)
    }
    // console.log(fdata)
    
  return (
    <ResultDiv>
      <div className='sbox'>
      <input type="text" className='search-input' onChange={(e)=>setSd(e.target.value)} placeholder='Search for exchange' />
      <button className='search-button' onClick={()=>{
        handleSearch();
       
      }
      }>Search</button>
      </div>
      <br />
      {(fdata.length===0)?(
          <h2>Loading...</h2>
       ):(
    <div className='contain'> 
    <div id='head'>
      <h2>EXCHANGES</h2>
      <h2>24H TRADE VOLUME</h2>
    </div>
    {fdata1.map((coin)=>{
      return (
        <div className='count-list-3' key={coin.id}>
           <div id='coinlist'>
           <div className='imgbox'>
             <img className='img1' src={coin.url} alt="" />
           </div>
           <div className='textbox'>
           <p >{coin.name}</p>
           </div>
           </div>
            <p>${coin.total_volume}</p>
          </div>
      )
    })}

   <div className='btndiv'>
   <button className="pagebtn"
   onClick={() => {
  setPage(page-1);
   }}
 >
   Previous
 </button>

 <button className="pagebtn"
   onClick={() => {
 setPage(page+1);

   }}
 >
   Next
 </button>
   </div>
    </div>
   
      )
  }

    </ResultDiv>
  );
}