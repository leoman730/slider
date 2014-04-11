(function() {

    var slider = {
        init: function() {
            this.viewport = $('.viewport');
            this.inner = $('.viewport .inner');
            this.activePages = '';
            this.pageWidth = 300;
            this.boilerplate = '<div class="pages"> \
                        <div class="page">1</div> \
                        <div class="page">2</div> \
                        <div class="page">3</div> \
                    </div>';
            this.inner.append(this.boilerplate);
            this.inner.append(this.boilerplate);

            this.activePages = this.inner.find('.pages:first');

            this.activePages.css({
                'width': this.activePages.find('.page').length * this.pageWidth + 'px'
            });

            this.activePages.addClass('active');
            
            window.slider = this;

        },



    };
    
    slider.init();
    var currLeftPos, newLeftPos;

    window.setInterval(function(){
        currLeftPos = Math.abs(parseInt(slider.inner.css('left'), 10));
        
        newLeftPos = currLeftPos + slider.pageWidth;


        console.log('curr',currLeftPos);
        console.log('new pos', newLeftPos);
        console.log('active page width', slider.activePages.css('width'));

        slider.inner.animate({
            'left': newLeftPos - (newLeftPos * 2) + 'px' // i - (i *2) will negate a number
        });

        if (newLeftPos == parseInt(slider.activePages.css('width'), 10)) {

            var tmp = slider.activePages;

            // append new pages
            slider.inner.append(slider.boilerplate);

            // reset left position
            slider.inner.css({'left': '0px'});
            console.log(slider.inner.css('left'));

            // set new active page
            slider.activePages = tmp.siblings().first();

            // calculate active page width
            slider.activePages.css({
                'width': slider.activePages.find('.page').length * slider.pageWidth+ 'px'
            });

            slider.activePages.addClass('active');
            
            // delete previous active page
            tmp.remove();

        };



    }, 2000);

})();