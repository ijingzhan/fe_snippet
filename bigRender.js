(function($){
    $.fn.bigrender = function(opts){

        var winHeight = document.documentElement.clientHeight;
        var sum = 0;
        var count = 0;
        var flash = new Array();
       
        // 'class' 是textarea父节点的类；'textarea' 是textarea标签的类；'threshold'是距离进入屏幕还有150像素就开始渲染；'remove'是否删除textarea标签       
        options = $.extend({
            'class' : '.br-warp',
            'textarea' : '.br-rendered',
            'threshold' : 150,
            'remove' : true,
        },opts);   
       
        $brenders = $(options.class);
        // 渲染首屏的内容
        initBigrender();   
        // 绑定滚动条事件
        scrollDisplay();
       
       
        // 函数定义
        function initBigrender(){      
            $brenders.each(function(n,object){
                sum++;
                if(isRender($(this))){
                    display($(this));
                    count++;
                    flash[n] = true;
                }else{
                    flash[n] = false;
                }
            });
        }
       
        // 判断时候需要渲染
        function isRender(object){
            offsetTop = object.offset().top;
            ojh = object.outerHeight(true);
            st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);

            if(offsetTop+ojh+options.threshold >= st && offsetTop-options.threshold < (st+winHeight)){
                return true;
            }else return false;
           
        }
       
        // 渲染textarea内的html代码
        function display(object){
            $display = object.find(options.textarea).eq(0);
            if(options.remove){
                object.append($display.val());
                $display.remove();
            }else{
                object.append($display.val());
            }
        }
       
        // 屏幕绑定滚动条事件，当待渲染的内容进入可视屏幕就触发isRender函数
        function scrollDisplay(){
            $(window).scroll(function() {65                 if(count < sum){
                    $brenders.each(function(n,object){
                        if(flash[n] == false){
                            if(isRender($(this))){
                                display($(this));
                                count++;
                                flash[n] = true;
                            }75                         }
                    });
                }
            });    
        }
    };
})(jQuery);
