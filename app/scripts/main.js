(function() {

    var slider = {
        init: function() {
            this.viewport = $('.viewport');
            this.inner = $('.viewport .inner');
            this.activePages = '';
            this.pageWidth = 100;
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
    var currLeftPos, newLeftPos, marginLeft=0;

    window.setInterval(function(){
        // currLeftPos = Math.abs(parseInt(slider.inner.css('left'), 10));
        marginLeft = marginLeft + slider.pageWidth;

        slider.activePages.animate({
            'marginLeft': marginLeft - (marginLeft * 2) + 'px' // i - (i *2) will negate a number
        });

        console.log('marginLeft', marginLeft);
        console.log('active page width', slider.activePages.css('width'));


        if (marginLeft > parseInt(slider.activePages.css('width'), 10)) {

            var tmp = slider.activePages;

            // append new pages
            slider.inner.append(slider.boilerplate);

            // set new active page
            slider.activePages = tmp.siblings().first();

            // calculate active page width
            slider.activePages.css({
                'width': slider.activePages.find('.page').length * slider.pageWidth+ 'px'
            });

            slider.activePages.addClass('active');

            marginLeft = 0;
            

            // delete previous active page
            tmp.remove();

        } 

        // newLeftPos = currLeftPos + slider.pageWidth;


    }, 2000);

})();