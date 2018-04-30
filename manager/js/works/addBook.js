let addBookBtn = document.getElementById('addBtn');
let addBookForm = document.getElementById('addBookForm');
addBookBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    let bookID = document.getElementById('addBookID').value,
        bookName = document.getElementById('addBookName').value,
        publisher = document.getElementById('addBookPub').value,
        time = document.getElementById('addBookTime').value,
        author = document.getElementById('addBookAut').value,
        translator = document.getElementById('addBookTra').value,
        status = document.getElementById('addBookSta').value,
        count = document.getElementById('addBookCount').value;
        $.ajax({
        url:'http://localhost:8080/',
        type:"POST",
        data: JSON.stringify({
            "bookID":bookID,
            "bookName":bookName,
            "publisher":publisher,
            "time":time,
            "author":author,
            "translator":translator,
            "status":status,
            "count":count
        }),
        contentType:'application/json',
        dataType: "json",
        success: function (response) {
            console.log(response);
            if(response.status == 200){
                alert("图书入库成功")
            }else{
                alert("图书入库失败,请稍后重试~");
            }
            addBookForm.reset();
        },
        error: function (error) {
            console.log(error);
            alert("图书入库失败,请稍后重试~");
            addBookForm.reset();
        }
    });
});