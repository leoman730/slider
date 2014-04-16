(function() {

    var slider = {
        init: function() {
            this.viewport = $('.viewport');
            this.inner = $('.viewport .inner');
            this.activePages = '';
            this.fetchTrigger = 3; // the threshold determine when to pull new content
            this.numPages = 0;
            this.boilerplate = '';

            this.getSlides( function (data) {
                console.log(slider);
                slider.boilerplate = data;
                slider.inner.append(data);
                slider.startSlideShow();
            });


            // set page width
            slider.resizePage();

            this.activePage = this.inner.find('.page:first');


            this.activePage.addClass('active');



            window.slider = this;
        },

        startSlideShow: function() {
            var marginLeft = 0;
            var slider = this;

            this.refreshIntervalId = window.setInterval(function() {
                // currLeftPos = Math.abs(parseInt(slider.inner.css('left'), 10));
                marginLeft = marginLeft + parseInt(slider.activePage.css('width'), 10);

                slider.activePage.animate({
                    'marginLeft': marginLeft - (marginLeft * 2) // i - (i *2) will negate a number
                }, 3000, function() {
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

            }, 100000);
        },

        stopSlideShow: function() {
            clearInterval(this.refreshIntervalId);

        },

        getSlides: function(callback) {
            var slider = this;
            var request = $.ajax('/templates/slide.html');

            request.done(function(data) {

                callback(data);

            });

            request.fail(function(data, textStatus, jqXHR) {
                console.log(textStatus);
            });
        },


        resizePage: function() {
            console.log('resize window');
            // $('.page').width($(window).width());
            // $('.page').height($(window).height());
        }
    };

    slider.init();

    $(window).resize(function() {
        slider.resizePage();
    });



})();