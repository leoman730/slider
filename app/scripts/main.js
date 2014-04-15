(function() {

    var slider = {
        init: function() {
            this.viewport = $('.viewport');
            this.inner = $('.viewport .inner');
            this.activePages = '';
            this.fetchTrigger = 3;   // the threshold determine when to pull new content
            this.numPages = 0;
            this.boilerplate = '\
                        <div class="page"><img src="images/mountain-01.jpg" /></div> \
                        <div class="page"><img src="images/mountain-02.jpg" /></div> \
                        <div class="page"><img src="images/mountain-03.jpg" /></div>';

            this.inner.append(this.boilerplate);
            this.inner.append(this.boilerplate);

            // set page width
            slider.resizePage();

            this.activePage = this.inner.find('.page:first');


            this.activePage.addClass('active');
            


            window.slider = this;
        },

        resizePage: function () {
            console.log('resize window');
            // $('.page').width($(window).width());
            // $('.page').height($(window).height());
        }
    };
    
    slider.init();

    $(window).resize(function(){
        slider.resizePage();
    });

    var marginLeft=0;

    window.setInterval(function(){
        // currLeftPos = Math.abs(parseInt(slider.inner.css('left'), 10));
        marginLeft = marginLeft + parseInt(slider.activePage.css('width'), 10);

        slider.activePage.animate({
            'marginLeft': marginLeft - (marginLeft * 2) // i - (i *2) will negate a number
        }, 3000, function(){
            // delete previous active page
            tmp.remove();
        });

        // mark page as shown
        slider.activePage.addClass('shown');

        if (slider.numPages <= slider.fetchTrigger) {            
            slider.inner.append(slider.boilerplate);

            // set page width
            slider.resizePage();
            
            slider.numPages = slider.inner.find('.page').length;
            // console.log('numpages increas to ', slider.numPages);
        };


        var tmp = slider.activePage;

        // set new active page
        slider.activePage = tmp.siblings().first();

        slider.activePage.addClass('active');

        slider.numPages--;

        // console.log(slider.numPages);

    }, 5000);

})();