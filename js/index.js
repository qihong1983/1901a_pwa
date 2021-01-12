function Index(opt) {
    if (!(this instanceof Index)) {
        return new Index(opt)
    }

    this.page = 0;
}

Index.prototype = {
    /**
     * 初始化
     */
    init: function () {
        console.log(`init load ${this.name}`);

        this.loadConfig();

        this.gundongLoad();

    },
    /**
     * 加载处理
     */
    loadConfig:function () {
        window.onload = function () {

            setTimeout(() => {
                document.querySelector("body").style.display = "block";
                new Swiper('.swiper-container', {
                    // direction: 'vertical', // 垂直切换选项
                    loop: true, // 循环模式选项
                    autoplay: {
                        disableOnInteraction: false,  //触碰后自动轮播也不会停止
                        delay: 2500,
                    },
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                    },

                })


                new Swiper('.swiper-container1', {
                    // direction: 'vertical', // 垂直切换选项
                    loop: true, // 循环模式选项
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination1',
                    },

                })

            }, 500)

        }
    },
    xyObj: {
        y: undefined
    },
    /**
     * 滚动加载 
     */
    gundongLoad: function () {

        var that = this;

        window.addEventListener('scroll', function (e) {
            if (window.scrollY == 0) {
                document.querySelector(".pageHeader").className = "pageHeader";
            } else {
                document.querySelector(".pageHeader").className = "pageHeader attrRed";
            }

            var diffy = that.xyObj.y - window.pageYOffset;

            if (diffy < 0 && !isNaN(diffy)) {
                that.computerPositon();
            }

            that.xyObj.y = window.pageYOffset;
        });




    },
    /**
     * 计算位置
     */
    computerPositon: function () {


        //滚动top
        var gundongTop = window.scrollY;

        //屏幕高度
        // var clientHeight = document.querySelector('body').clientHeight;
        var clientHeight = document.documentElement.clientHeight;


        var pageFooterTop = $('#pageFooter').offset().top;
        var tarbarTop = $(".tarbar").height();


        //滚动top + 屏幕高度 是否大于等于 页尾top值
        if ((gundongTop + clientHeight) >= (pageFooterTop + tarbarTop)) {

            if (this.page >= 5) {
                $('#block4-ft').text('没有更多');
                return ;
            } else {
                $('#block4-ft').text('加载中');
            }
            
            this.page++;

            this.doAjax(`/data/jdListData.json?page=${this.page}`);

        }
    },
    /**
     * doAajax
     */
    doAjax(url) {

        var that = this;
        if (!(url in this.urls)) {
            this.urls.push(url);

            // 发ajax 
            $.ajax({
                url,
                method: "get",
                success: function (res) {
                    console.log(res);
                    if (res.status) {
                        that.renderList(res.data);
                    }
                },
                error: function (error) {
                    console.log(error, 'error');
                }
            });
        }


    },
    urls: [],
    renderList(datas) {
        console.log(datas, '<---datas');
        var template = '<div class="block4-item">' +
            '<div class="block4-item-hd">' +
            '<img src="$uploadImg">' +
            '</div>' +
            '<div class="block4-item-bd">' +
            '<h3>$title</h3>' +
            '</div>' +
            '<div class="block4-item-ft">' +
            '<div class="price">' +
            '¥$price' +
            '</div>' +
            '<div class="lookBtn">' +
            '看相似' +
            '</div>' +
            '</div>' +
            '</div>';


        var temp = '';
        for (var i = 0; i < datas.length; i++) {
            temp = template
                .replace("$uploadImg", datas[i].img)
                .replace("$title", datas[i].title)
                .replace("$price", datas[i].price);

                
            $('#block4').append(temp);

        }

    }
}