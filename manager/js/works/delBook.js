let delBookBtn = document.getElementById('delBtn');
delBookBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    let bookID = document.getElementById('delBookID').value,
        count = document.getElementById('delBookCount').value;
    $.ajax({
        url:'http://localhost:8080/',
        type:"POST",
        data: JSON.stringify({
            "bookID":bookID,
            "count":count
        }),
        contentType:'application/json',
        dataType: "json",
        success: function (response) {
            console.log(response);
            if(response.status == 200){
                alert("图书出库成功")
            }else{
                alert("图书出库失败,请稍后重试~");
            }
        },
        error: function (error) {
            console.log(error);
            alert("图书出库失败,请稍后重试~");
        }
    });
});