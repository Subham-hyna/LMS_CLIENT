import  React, { useState , useEffect } from 'react'

export const DateTime = () => {

    var [date,setDate] = useState(new Date());


const month = (day) => {
    switch (day) {
      case "01":{
        return "Jan"
      }
      case "02":{
        return "Feb"
      }
      case "03":{
        return "Mar"
      }
      case "04":{
        return "Apr"
      }
      case "05":{
        return "May"
      }
      case "06":{
        return "Jun"
      }
      case "07":{
        return "Jul"
      }
      case "08":{
        return "Aug"
      }
      case "09":{
        return "Sep"
      }
      case "10":{
        return "Oct"
      }
      case "11":{
        return "Nov"
      }
      case "12":{
        return "Dec"
      }
    }
  }
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
       <>
       {date && <p>{`${month(date.toLocaleDateString().split("/")[1])} ${date.toLocaleDateString().split("/")[0]} ${date.toLocaleDateString().split("/")[2]} | ${date.toLocaleTimeString()} `}</p> } 
       </>
    )
}

export default DateTime