/**
 * 登录以及登录成功后初始化info信息
 */

// window.addEventListener('load', (event) => {
//     event.preventDefault();
    let mask = document.getElementsByClassName("g-mask")[0];
    let loginMsg = mask.getElementsByClassName('loginMsg')[0];
    // 绑定登录事件
    let loginReq = document.getElementsByClassName("loginReq")[0];
    loginReq.addEventListener('click', (event) => {
        event.preventDefault();
        mask.classList.remove('none');
        loginMsg.classList.remove('none');
    });

    let loginControl = document.querySelector('.loginMsg>.control');
    let loginBtn = loginControl.getElementsByTagName('p')[0];
    let cancelBtn = loginControl.getElementsByTagName('p')[1];
    let userInfo = document.getElementsByClassName('u-info')[0];

    
    loginBtn.addEventListener('click',event =>{
        event.preventDefault();
        let id = document.getElementById('studentID').value;
        let psd = document.getElementById('password').value;
        $.ajax({
            url:'http://localhost:8080/',
            type:"POST",
            data: JSON.stringify({
                "studentID":id,      // 用户名，如学号/一卡通
                "password":psd        // 密码
            }),
            contentType:'application/json',
            dataType: "json",
            success: function (response) {
                console.log(response);
                if(response.status == 200){
                    window.Person = window.Person||{};
                    for (const key in object) {
                        window.Person[key] = response[key];
                    }
                    loginReq.classList.add('none');
                    userInfo.classList.remove('none');
                    let userMsg = userInfo.querySelectorAll('p>span');
                    userMsg[0].innerHTML = window.Person.name;
                    userMsg[1].innerHTML = window.Person.balance;

                    mask.classList.add('none');
                    loginMsg.classList.add('none');
                }else{
                    alert("登录失败，请检查账号密码信息，或者人工服务");
                }
            },
            error: function (error) {
                console.log(error);
                alert("登录失败，请检查账号密码信息，或者人工服务");
            }
        });
    });

    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        mask.classList.add('none');
        loginMsg.classList.add('none');
    });

// })