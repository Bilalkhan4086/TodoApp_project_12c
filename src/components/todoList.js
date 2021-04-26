import React from 'react'

const todoList = ({data}) => {
    return (
       <div style={{textAlign:"center",justifyContent:"center"}}>
            <div style={{display:"flex",justifyContent:"space-around",width:"60%",margin:"20px",padding:"auto",paddingTop:"20px",border:"1px solid gray"}}>
            <h3>{data.todo}</h3>
            <h5>{data.done ? "Completed" : "Not Completed"}</h5>
            </div>
            <button>Delete</button>
       </div>
    )
}

export default todoList
