let searchStuBtn = document.getElementById('searchStuBtn');
searchStuBtn.addEventListener('click',()=>{
    event.preventDefault();
    $.ajax({
        url:'http://localhost:8080/',
        type:"POST",
        data: JSON.stringify({
            "studentID":document.getElementById('searchStuID').value,      // 用户名
        }),
        contentType:'application/json',
        dataType: "json",
        success: function (response) {
            console.log(response);
                let detailMsg = document.getElementsByClassName('detail')[0];
                let template = `<p>姓名：
                                <span>${response.name}</span>
                            </p>
                            <p>余额:
                                <span>${response.balance}</span>
                            </p>
                            <p>借书数量:<span>${response.books.length}</span></p>
                            <div class="control">
                                <p>返回</p>
                            </div>`;
                detailMsg.innerHTML = template;
                detailMsg.classList.remove('none');

        },
        error: function (error) {
            console.log(error);
            alert("登录失败，请检查账号密码信息，或者人工服务");
        }
    });
});