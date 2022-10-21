import React, { useState } from "react";

import { Button, Grid, TextField } from "@mui/material";

const AddTodo = (props) => {
    // 사용자의 입력을 저장할 오브젝트
    const [item, setItem] = useState({title:""});
    const addItem = props.addItem;

    // onButtonClick 함수 작성
    const onButtonClick = () => {
        addItem(item); //addItem 함수 사용
        setItem({title:""});
    }

    // onInputChange 함수 작성
    // 키보드 한번 누를 때마다 데이터가 임시저장
    const onInputChange = (e) => {
        setItem({title: e.target.value});
        console.log(item);
    };

    // enterKeyEventHandler 함수
    const enterKeyEventHandler = (e) => {
        if (e.key === 'Enter'){
            onButtonClick();
        }
    };


    return (
        <Grid container style={{ marginTop:20}}>
            <Grid xs={11} md={11} item style={{paddingRight:16}}>
                <TextField placeholder="여따가 쓰십쇼" 
                    fullWidth
                    // 이벤트 핸들러 함수
                    onChange={onInputChange}
                    onKeyPress={enterKeyEventHandler}
                    value={item.title}
                />
            </Grid>
            <Grid xs={1} md={1} item>
                <Button fullWidth style={{height:'100%'}} color="secondary" variant="outlined" 
                onClick={onButtonClick}>
                    눌렁!
                </Button>
            </Grid>
        </Grid>
    )
}

export default AddTodo;