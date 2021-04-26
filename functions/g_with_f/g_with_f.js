const dotenv = require('dotenv')
const fauna = require("faunadb")
const {gql,ApolloServer} = require("apollo-server-lambda")

dotenv.config();
q = fauna.query;


const typeDefs = gql`
type data {
  id : ID!
  todo : String
  done : Boolean
}


type Query {
  message : [data]
}

type Mutation {
  delete_todo(id:ID!) : data
  add_todo(todo:String!,done:Boolean!) : String
  update_todo(id:ID!,todo:String!,done:Boolean!) : data
}

`;

const resolvers = {
 Query : {
    message : async(parent, args, context)=>{
      try {
        var client = new fauna.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
        let result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection('Todos'))),
            q.Lambda(x => q.Get(x))
          ));
           
         const allData = result.data.map((d)=>{
           return({
            id: d.ref.id,
            todo: d.data.todo,
            done: d.data.done,
           })
         })
        console.log("Results form server are here =",allData)
        return allData;
      } catch (err) {
        return ("Error is",err.toString());
      }
    },},
    Mutation:{
      delete_todo : async(_,{id})=>{
      try {
        var client = new fauna.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
        console.log("id from server =",id)
        let result = await client.query(
          q.Delete(
            q.Ref(
              q.Collection("Todos"), 
              id)
              )
          );    
        console.log("Results form server are here =",result)
        return `${result}`;
      } catch (err) {
        return ("Error is",err.toString());
      }
      }  
    
      ,    
      update_todo : async(_,{id,todo,done})=>{
        try {
          var client = new fauna.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
          console.log("id from server =",id)
          let result = await client.query(
            q.Update(
             q.Ref( q.Collection("Todos"),id),
             {data:{todo:todo,done:done}}
            )
            );
             
          console.log("Results form server are here =",result)
          return {
            id: result.ref.id,
            todo: result.data.todo,
            done: result.data.done,
           };
        } catch (err) {
          return ("Error is",err.toString());
        }
      },   
      add_todo : async(_,{todo,done})=>{
        try {
          var client = new fauna.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
          let result = await client.query(
            q.Create(
            q.Collection("Todos"),
             {data:{todo:todo,done:done}})
            );
             
          console.log("Results form server are here =",result)
          return("Done");
        } catch (err) {
          return ("Error is",err.toString());
        }
      },    
    }}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground:true,
  introspection:true
});
 
exports.handler = server.createHandler();

