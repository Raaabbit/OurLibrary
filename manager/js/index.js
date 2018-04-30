window.addEventListener('load', (e) => {
    // 初始化当前用户
    window.Person = window.Person || {};
    document.getElementById('exit').onclick = (event)=>{
        event.preventDefault();
        window.Person = {};
        location.reload();
    };
    // 为侧栏菜单绑定事件
    let current = 0,last = 0;
    let funcs = document.querySelectorAll(".u-menu>li");
    let parts = document.querySelectorAll(".m-main>div");
    funcs[current].classList.add("z-active");
    parts[current].classList.add("z-active");
    funcs.forEach((ele, index) => {
        ele.addEventListener('click', (event) => {
            event.preventDefault();
            if (window.Person.status == 200) {
                last = current;
                funcs[last].classList.remove("z-active");
                parts[last].classList.remove("z-active");
                current = index;
                funcs[current].classList.add("z-active");
                parts[current].classList.add("z-active");
            }else{
                if(index != 0){
                    alert("登陆后才可以进行这样的操作哦～");
                }
            }
        });
    });

});