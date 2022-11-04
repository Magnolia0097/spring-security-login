import { API_BASE_URL } from "../api-config";


// 접근 거부시 /login 페이지로 돌아감 
// 로그인 하지 않은 경우
// 
export function call(api, method, request){
    let headers = new Headers({
        "Content-Type":"application/json"
    });

    //로컬 스토리지에서 ACCESS TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if ( accessToken && accessToken!==null){
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,//new Headers({
            //"Content-Type":"application/json",
        //}),
        url: API_BASE_URL + api,
        method: method,
    };

    if(request){
        // GET method
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if(response.status === 403){
            window.location.href = "/login"; //redirect
        } else {
            // Promise.reject(response);
            // throw Error(response);
            new Error(response);
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
    });





}

// 백엔드의 UserController와 연관된 signin 함수
// export function signin(userDTO) {
//     return call("/auth/signin","POST",userDTO)
//         .then((response) => {
//             console.log("받았슴당 : ", response);
//             alert("로그인 토큰임당: " + response.token);
//         })
// }

export function signin(userDTO) {
    return call("/auth/signin","POST", userDTO)
        .then((response) => {
            if(response.token){
                // 로컬 스트리지에 토큰 저장
                localStorage.setItem("ACCESS_TOKEN", response.token);
                
                //token 이 존재하는 경우 Todo 화면으로 리더렉트
                window.location.href = "/";
            }
        });
}

export function signout() {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login";
}

export function signup(userDTO) {
    return call("/auth/signup","POST", userDTO);
}