window.App = window.App||{};

//在命名空间App中加入 Tab 组件
(function (App) {
    //Tabs组件，导航条，options包含container（容器），index（当前选中的index），data（导航的各个数据）
    function Tabs(options) {
        //初始化
        for (const name in options) {
            this[name] = options[name];
        }
        this.index = this.index || 0;
        //动态构建滑动条
        this.createTabs();
        //缓存节点
        this.nTab = this.container.getElementsByTagName('ul')[0];
        this.nTabs = this.nTab.children;
        this.nThumb = this.container.getElementsByClassName("tabs_thumb")[0];
        //初始化
        this.init();
    }

    // 根据传入的对象创建DOM节点
    Tabs.prototype.createTabs = function () {
        // 要创建的列表
        let headTabs = '<ul>';
        // 根据传入的 data 进行添加列表项 li
        for (let index = 0; index < this.data.length; index++) {
            headTabs += '<li><a href="' + this.data[index][0] + '">' + this.data[index][1] + '</a></li>';
        }
        headTabs += '</ul > <div class="tabs_track"><div class="tabs_thumb"></div></div>';
        //将内容加入到页面中
        this.container.innerHTML = headTabs;
    };

    //初始化，给所有节点绑定事件
    Tabs.prototype.init = function () {
        //绑定事件
        for (let i = 0; i < this.nTabs.length; i++) {
            this.nTabs[i].addEventListener('mouseenter', function (index) {
                this.highlight(index);
            }.bind(this, i));
            this.nTabs[i].addEventListener('click', function (index) {
                this.setCurrent(index);
            }.bind(this, i));
        }
        this.nTab.addEventListener('mouseleave', function () {
            this.highlight(this.index);
        }.bind(this));

        this.setCurrent(this.index);
    };

    // 高亮当前tab
    Tabs.prototype.highlight = function (index) {
        let tab = this.nTabs[index];
        this.nThumb.style.width = tab.offsetWidth + 'px';
        this.nThumb.style.left = tab.offsetLeft + 'px';
    };

    // 设置当前选中tab
    Tabs.prototype.setCurrent = function (index) {
        this.nTabs[this.index].classList -= " z-active";
        this.index = index;
        this.nTabs[index].classList += ' z-active';
        this.highlight(index);
    };
    App.Tabs = Tabs;
})(window.App);