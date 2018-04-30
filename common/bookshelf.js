
let tempforNone = `<p>书架空空如也</p>
                   <p>去借几本书吧</p> `;
let tempforHave = `<p>你拥有的书都在这里啦</p>
                    <p>可以在这里还书哦</p>`;

let bookTips = document.querySelector(".bookshelf>.tips");
function update(books) {
    if(window.Person.books){
        bookTips.innerHTML = tempforHave;
        let listHave = document.getElementsByClassName('listforHave')[0];
        listHave.innerHTML = "";
        for (let i = 0; i < books.length; i++) {
            let card = document.createElement('li');
            let oneBook = new BookforHave(card,books[i]);
            listHave.appendChild(card);
        }
    }else{
        bookTips = tempforNone;
    }
}