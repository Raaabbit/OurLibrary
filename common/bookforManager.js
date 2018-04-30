class BookforManager{
    // container是容器，card msg是书籍信息
    constructor(container, msg) {
        this.container = container;
        this.msg = msg;
        this.detailBtn = this.container.querySelector('.control>p');
        this.create();
        this.init();
    }
    create() {
        let template = `<p class="bookID">${this.msg.bookID}</p>
                        <p class="bookName">${this.msg.bookName}</p>
                        <div class="control">
                            <p>详情</p>
                        </div>`;
        this.container.innerHTML = template;
    }
    init() {
        this.detailBtn.addEventListener('click', (event) => {
            let detailMsg = document.getElementsByClassName('detail')[0];
            let template = `<p>书号：
                                <span>${this.msg.bookID}</span>
                            </p>
                            <p>书名:
                                <span>《${this.msg.bookName}》</span>
                            </p>
                            <p>出版社：
                                <span>${this.msg.publisher}</span>
                            </p>
                            <p>出版时间：
                                <span>${this.msg.time}</span>
                            </p>
                            <p>作者：
                                <span>${this.msg.author}</span>
                            </p>
                            <p>译者：
                                <span>${this.msg.translator}</span>
                            </p>
                            <p>是否可借：
                                <span>${this.msg.status}</span>
                            </p>
                            <p>数量:
                                <span>${this.msg.count}</span>
                            </p>
                            <div class="control">
                                <p>返回</p>
                            </div>`;
            detailMsg.innerHTML = template;
            detailMsg.classList.remove('none');
            let returnBtn = document.querySelector('.detail>.control>p');
            returnBtn.addEventListener('click',()=>{
                document.querySelector('.detail').innerHTML = '';
                document.querySelector('.g-mask').classList.add('none');
                document.querySelector('.detail').classList.add('none');
            });
        });
    }
}