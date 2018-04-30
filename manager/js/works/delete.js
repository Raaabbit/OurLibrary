let delID = document.getElementById('delBookID');
let delNum = document.getElementById('delBookNum');
let delBtn = document.getElementById('delBtn');

delBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    $.ajax({
        url: 'http://localhost:8080/',
        type: "POST",
        data: JSON.stringify({
            "bookID": delID.value, // 用户名，如学号/一卡通
            "count": delNum.value       // 存款金额
        }),
        contentType: 'application/json',
        dataType: "json",
        success: function (response) {
            console.log(response);
            if(response.status == 200){
                alert('删除成功');
            }
        },
        error: function (error) {
            console.log(error);
            alert("删除失败,请直接进行数据库操作");
        }
    });
});



