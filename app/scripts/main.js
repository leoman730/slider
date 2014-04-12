(function() {

    var slider = {
        init: function() {
            this.viewport = $('.viewport');
            this.inner = $('.viewport .inner');
            this.activePages = '';
            this.pageWidth = 100;
            this.fetchTrigger = 3;
            this.numPages = 0;
            this.boilerplate = '\
                        <div class="page">1</div> \
                        <div class="page">2</div> \
                        <div class="page">3</div>';

            this.inner.append(this.boilerplate);
            this.inner.append(this.boilerplate);

            this.activePage = this.inner.find('.page:first');


            this.activePage.addClass('active');
            
            window.slider = this;

        },



    };
    
    slider.init();
    var currLeftPos, newLeftPos, marginLeft=0;

    window.setInterval(function(){
        // currLeftPos = Math.abs(parseInt(slider.inner.css('left'), 10));
        marginLeft = marginLeft + slider.pageWidth;

        slider.activePage.animate({
            'marginLeft': marginLeft - (marginLeft * 2) + 'px' // i - (i *2) will negate a number
        });

        // mark page as shown
        slider.activePage.addClass('shown');

        if (slider.numPages <= slider.fetchTrigger) {            
            slider.inner.append(slider.boilerplate);
            slider.numPages = slider.inner.find('.page').length;
            // console.log('numpages increas to ', slider.numPages);
        };


        var tmp = slider.activePage;

        // set new active page
        slider.activePage = tmp.siblings().first();

        slider.activePage.addClass('active');

        // delete previous active page
        tmp.remove();

        slider.numPages--;

        // console.log(slider.numPages);

    }, 2000);

})();