// 查找图书界面呈现
let hdtab = new App.Tabs({
    container: document.getElementById("hdtabs"),
    index: 0,
    data: [
        ["#", "精确查询"],
        ["#", "模糊查询"]
    ]
});
let nforms = document.getElementsByTagName("form");
nforms[hdtab.index].style.display = "flex";
// 查找方式切换
for (let i = 0; i < 2; i++) {
    hdtab.nTabs[i].addEventListener('click', (event) => {
        nforms[(i + 1) % 2].style.display = "none";
        nforms[i].style.display = "flex";
    });
}

//  查找到的书籍信息
window.SearchBooks = window.SearchBooks || {};
let exactBtn = document.getElementById("exactBtn");
let fuzzyBtn = document.getElementById("fuzzyBtn");
exactBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let myBookID = document.getElementById("bookID").value;
    $.ajax({
        url: "http://localhost:8080/search/book",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader("bookID", myBookID);
        },
        data: JSON.stringify({
            "bookID": myBookID,
        }),
        contentType: 'application/json',
        dataType: "json",
        success: function (response) {
            let listSearch = document.getElementsByClassName('listforSearch')[0];
            let card = document.createElement('li');
            card.classList.add('bookCard');
            listSearch.appendChild(card);
            let oneBook = new BookforSearch(card, response);
        },
        error: function (error) {
            console.log(error);
            alert("没有找到书哦");
        }
    });
});
fuzzyBtn.addEventListener('click', () => {
    event.preventDefault();
    let myBookName = document.getElementsById("bookName").value;
    let myPublisher = document.getElementsById("publisher").value;
    let myAuthor = document.getElementsById("author").value;
    let myTran = document.getElementsById("translator").value;

    $.ajax({
        url: "http://localhost:8080/search/book",
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify({
            "bookName": myBookName || "",
            "publisher": myPublisher || "",
            "author": myAuthor || "",
            "translator": myTran || ""
        }),
        success: function (response) {
            console.log(response);
            let num = response.bookList.length;
            window.SearchBooks = response.bookList;
            let listSearch = document.getElementsByClassName('listforSearch')[0];
            for (let i = 0; i < num; i++) {
                let card = document.createElement('li');
                card.classList.add('bookCard');
                listSearch.appendChild(card);
                let oneBook = new BookforSearch(card, response.bookList[i]);
            }
        },
        error: function (error) {
            console.log(error);
            alert("没有找到书哦");
        }

    });
});

let returnBtn = document.querySelector('.detail>.control>p');
returnBtn.addEventListener('click',()=>{
    document.querySelector('.detail').innerHTML = '';
    document.querySelector('.g-mask').classList.add('none');
    document.querySelector('.detail').classList.add('none');
});