class BookforSearch {
    // container是容器，card msg是书籍信息
    constructor(container, msg) {
        this.container = container;
        this.msg = msg;
        this.continueBtn = this.container.querySelectorAll('.control>p')[0];
        this.returnBtn = this.container.querySelectorAll('.control>p')[1];
        this.create();
        this.init();
    }
    create() {
        let template = `<li class="bookCard">
                            <p class="bookID">${this.msg.bookID}</p>
                            <p class="bookName">${this.msg.bookName}</p>
                            <p class="borrowDate"${this.msg.borrowDate}</p>
                            <div class="control">
                                <p>续借</p>
                                <p>还书</p>
                            </div>
                        </li>`;
        this.container.innerHTML = template;
    }
    init(){
        this.continueBtn.addEventListener('click',(event)=>{
            this.return();
            $.ajax({
                url:'http://localhost:8080/',
                type:"POST",
                data: JSON.stringify({
                    "studentID":window.Person.name,      // 用户名，如学号/一卡通
                    "bookID":this.msg.bookID        // 密码
                }),
                contentType:'application/json',
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if(response.status == 200 && this.msg.status == true){
                        alert('借书成功，请在书架查看～');
                        window.Person.books = response.books;                        
                    }else{
                        alert("借书失败，请检查图书是否可借，或者人工服务");
                    }
                },
                error: function (error) {
                    console.log(error);
                    alert("借书失败，请检查图书是否可借，或者人工服务");
                }
            });
        });

        this.returnBtn.addEventListener('click',(event)=>{
            this.return();
        });
    }
    return(){
        $.ajax({
            url:'http://localhost:8080/',
            type:"POST",
            data: JSON.stringify({
                "studentID":window.Person.studentID,      // 用户名，如学号/一卡通
                "bookID":this.msg.bookID        // 密码
            }),
            contentType:'application/json',
            dataType: "json",
            success: function (response) {
                console.log(response);
                if(response.overdue == 0){
                    alert("还书成功");
                }else if(response.enough){
                    alert("您的图书超期，罚金"+response.fine+"元。已经自动扣除，请下次早早还书哦")
                }else{
                    alert("您图书超期而且余额不足，请先进行充值操作。罚金"+response.fine+"元");
                }
            },
            error: function (error) {
                console.log(error);
                alert("还书失败，请前往人工服务");
            }
        });
    }
}