import * as React from "react"
import Layout from "../components/layout"
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';


const APOLLO_QUERY = gql`
  {
    message{
      todo
      id 
      done
    }
  }
  `;
  const DELETE_TODO = gql`
  mutation delete_todo($id:ID!){
    delete_todo(id:$id){
      todo
      done
    }
  }
  `;
  const UPDATE_TODO = gql`
  mutation update_todo($id:ID!,$todo:String!,$done:Boolean!){
    update_todo(id:$id,todo:$todo,done:$done){
      todo
      done
    }
  }
  `;

  const ADD_TODO = gql`
  mutation add_todo($todo:String!,$done:Boolean!){
    add_todo(todo:$todo,done:$done){
      todo
      done
    }
  }
  `;

const IndexPage = () => {
const { loading, error, data } = useQuery(APOLLO_QUERY);  
const [delete_todo] = useMutation(DELETE_TODO);
const [update_todo] = useMutation(UPDATE_TODO);
const [add_todo] = useMutation(ADD_TODO);
const [UpdateValTodo,setUpdateValTodo] = React.useState("");
const [UpdateValUrl,setUpdateValUrl] = React.useState(false);
const [UpdateId,setUpdateId] = React.useState('');


const deleteHandler = (id) =>{
  delete_todo({
  variables:{
    id,
  },
  refetchQueries:[{query:APOLLO_QUERY}]
})
};

const updateHandler = (id,todo,done) =>{
  update_todo({
  variables:{
    id,
    todo,
    done
  },
  refetchQueries:[{query:APOLLO_QUERY}]
})
};

const addHandler = (todo,done) =>{
  add_todo({
  variables:{
    todo,
    done
  },
  refetchQueries:[{query:APOLLO_QUERY}]
})
}

if(error){
  <div>Error = {error}  </div>
}
return(
  <Layout>
    <div style={{display:"flex",justifyContent:"center"}}>
    <form style={{textAlign:"left"}} onSubmit={(e)=>{e.preventDefault();UpdateId.length ? updateHandler(UpdateId,UpdateValTodo,UpdateValUrl) : addHandler(UpdateValTodo,UpdateValUrl); setUpdateId("");setUpdateValTodo('');setUpdateValUrl(false);}}>
   <label htmlFor="todo">Text</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input className="todo" type="text" value={UpdateValTodo} onChange={(e)=>{setUpdateValTodo(e.target.value)}} /><br/><br/>
   <label htmlFor="todo">completed</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input className="done" type="checkbox" value={UpdateValUrl} checked={UpdateValUrl} onChange={()=>{setUpdateValUrl(!UpdateValUrl)}} /><br/><br/>
    <button disabled={UpdateValTodo === ""?true:false}>submit</button>
    </form>
    </div>
    {loading ?
    <div>Loading ...</div>:
    data && data.message.slice(0).reverse().map((Data,id)=>{console.log("Data",Data)
    return(
<div key={id} style={{display:"flex",justifyContent:"center",margin:"auto",width:"100%"}}>
<div style={{textAlign:"center",width:"70%"}}>
      <div style={{display:"flex",justifyContent:"space-around",margin:"20px",padding:"auto",paddingTop:"20px",border:"1px solid gray"}}>
      <h3>{Data.todo}</h3>
      <h5>{Data.done ? "Completed" : "Not Completed"}</h5>
      </div>
      
      <button onClick={(e)=>{deleteHandler(Data.id);console.log("data =",JSON.stringify(Data.id));}}>Delete</button>{"  "}
      <button onClick={()=>{setUpdateId(Data.id);setUpdateValTodo(Data.todo);setUpdateValUrl(Data.done);}}>Update</button>
 </div>
</div>
    )})
  }</Layout>
)}

export default IndexPage


