import './App.css';
import Todo from './Todo';
import React, { useEffect, useState } from "react";
import { Container, List, Paper } from "@mui/material";
import AddTodo from './AddTodo';
import { call } from "./service/ApiService";





function App() {

  

  const [items, setItems]=useState([
  // {
  //   id:"0",
  //   title:"hello 1st",
  //   done:true,
  // },
  // {
  //   id:"1",
  //   title:"bye",
  //   done:true,
  // },
  // {
  //   id:"2",
  //   title:"hi",
  //   done:true,
  // },
]);

// // 서비스 통합 관련 Api 를 이용한 리스트 초기화, fetch()까지만 포함
// useEffect(() => { //무한 루프를 막고 처음 리스트를 구현 
// const requestOptions = {
//   method: "GET",
//   headers:{"Content-Type": "application/json"},
// };

// fetch("http://localhost:8080/todo", requestOptions)
//   .then((response) => response.json())
//   .then(
//     (response) => {
//       setItems(response.data);
//     },
//     (error) => {
      
//     }
//   );
// },[]);


// 위의 코드에서 call 함수를 이용해 업데이트한 새로운 코드
useEffect(() => {
  call("/todo", "GET", null)
  .then((response) => setItems(response.data));
},[]);



// const addItem = (item) => {
//   item.id = "ID-" + items.length; //key를 위한 id
//   item.done = false; //done 초기화
//   // 업데이트는 반드시 setItems로 하고 새 배열을 만든다
//   setItems([...items, item]);
//   console.log("items : ", items);
// }



// 위의 코드에서 call 함수를 이용해 업데이트한 새로운 코드
const addItem = (item) => {
  call("/todo", "POST", item)
  .then((response) => setItems(response.data));
};





// const deleteItem = (item) => {
//   // 삭제할 아이템을 찾는다.
//   const newitems = items.filter(e => e.id !== item.id);
//   //삭제할 템 제외한 아이템을 다시 배열에 저장함
//   setItems([...newitems]);
// }

// 위의 코드에서 call 함수를 이용해 업데이트한 새로운 코드
const deleteItem = (item) => {
  call("/todo", "DELETE", item)
  .then((response) => setItems(response.data));
};


// editltem 함수 
const editItem = () => {
  setItems([...items]);
};




  
  // items.length > 0 &&() 이건 왜 들어가있는 것이지?
  // 값이 없을경우 쪼가리가 남는데 이걸 제거하기 위함
  let todoItems = items.length > 0 && (
      <Paper style={{ margin:16 }}>
        <List>
          {/* 위의 형태로 정리된걸 map()안에 넣고 ((())) 안에 
          Todo.js 에서 props로 받아서 쓸 변수를 지정해줌 */}
          {items.map((item) => (
            <Todo 
            item={item} 
            key={item.id}
            editItem={editItem}
            deleteItem={deleteItem}/>
          ))}
        </List>
      </Paper>
      );
  return (
    <div className='App'>
      <Container maxWidth="md">
        {/* AddTodo로부터 addItem을 받아오는 것*/}
        <AddTodo addItem={addItem}/>
        <div className='TodoList'>{todoItems}</div>
      </Container>
    
    </div>
  );
}

export default App;
