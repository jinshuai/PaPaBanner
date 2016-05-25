$(function () {

    banner.init();

});

var config = {
    bannerId: "banner",
    height: 400,
    autoPlayInterval:3000
};


var banner = {
    index: 0,
    count: 0,

    init: function () {

        var obj = this;

        this.count = $("#" + config.bannerId + " .bannerImage").size();

        $("#" + config.bannerId).height(config.height);
        $("#" + config.bannerId + " .bannerImage").height(config.height);

        this.setUrl();
        
        this.setNavigator();
        
        this.setNavigatorHover();
        
        this.setIndex();

        this.timer = setInterval(function () { obj.autoPlay(); }, config.autoPlayInterval);
    },

    autoPlay: function () {

        this.index++;

        if (this.index >= this.count) {

            this.index = 0;
        }
        this.setIndex();
    },
    
    setIndex: function() {

        $("#" + config.bannerId + " .btn li").eq(this.index).addClass("lihover").siblings("li").removeClass("lihover");
        $("#" + config.bannerId + " .bannerImage").eq(this.index).fadeIn(2000).siblings("div").fadeOut(2000);
    },
    
    setUrl: function() {

        $("#" + config.bannerId + " div").each(function () {

            var url = $(this).attr("data-url");

            if ($.trim(url) == "" || url == undefined) {

                return;
            }
            $(this).append("<a href='" + url + "' style='display:block;height:" + config.height + "px;width:100%;' target='_blank' ></a>");

        });
    },
    setNavigator: function() {

        $("#" + config.bannerId).append("<ul class='btn'></ul>");

        for (var i = 0; i < this.count; i++) {

            $("#" + config.bannerId + " .btn").append("<li data-pos='" + i + "' ></li>");
        }
    },
    setNavigatorHover: function () {
        
        var obj = this;

        $("#" + config.bannerId + " .btn li").hover(function () {

            clearInterval(obj.timer);
            obj.index = $(this).attr("data-pos");
            obj.setIndex();

        }, function () {

            obj.timer = setInterval(function () { obj.autoPlay(); }, config.autoPlayInterval);
        });

    }
};
