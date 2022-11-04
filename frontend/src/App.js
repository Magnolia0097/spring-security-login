import './App.css';
import Todo from './Todo';
import React, { useEffect, useState } from "react";
import { AppBar, Button, Container, Grid, List, Paper, Toolbar, Typography } from "@mui/material";
import AddTodo from './AddTodo';
import { call, signout } from "./service/ApiService";





function App() {

  const [items, setItems]=useState([]);
  const [loading, setLoading] = useState(true);



  // 위의 코드에서 call 함수를 이용해 업데이트한 새로운 코드
  useEffect(() => {
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  },[]);



  const addItem = (item) => {
    call("/todo", "POST", item).then((response) => setItems(response.data));
  };


  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };


  const editItem = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };
 
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

  // navigationBar 추가
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  //로딩중이 아닐 때 렌더링 할 부분
  let todoListPage = (
    <div>
      {navigationBar} {/*네비게이션 바 렌더링 */}
      <Container maxWidth="md">
        {/* AddTodo로부터 addItem을 받아오는 것*/}
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  );

  // 로딩중일 때 렌더링 할 부분
  let loadingPage = <h1> 로딩중 ^ ^</h1>;
  let content = loadingPage;

  if(!loading) {
    // 로딩중이 아니면 todoListPage 선택
    content = todoListPage;
  }
  
  return <div className="App">{content}</div>;
  
}

export default App;
