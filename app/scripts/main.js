(function() {

    function SlideTransition(config) {
        console.log('here');
        if (config === undefined) {
            var config = {
                speed: 5000
            };
        };

        this.trans = function(callback) {
            var marginLeft = 0;

            // currLeftPos = Math.abs(parseInt(slider.inner.css('left'), 10));
            marginLeft = marginLeft + parseInt(slider.activePage.css('width'), 10);

            slider.activePage.animate({
                'marginLeft': marginLeft - (marginLeft * 2) // i - (i *2) will negate a number
            }, function() {
                callback();
            });

        };

    };

    function Fadetransition(config) {
        if (config === undefined) {
            var config = {
                speed: 5000
            };
        };

        this.trans = function(callback) {
            slider.activePage.fadeOut(function() {
                callback();
            });
            
        }


    };





    var slider = {
        init: function() {
            this.viewport = $('.viewport');
            this.inner = $('.viewport .inner');
            this.activePages = '';
            this.fetchTrigger = 3; // the threshold determine when to pull new content
            this.numPages = 0;
            this.boilerplate = '';

            this.getSlides(function(data) {
                console.log(slider);
                slider.boilerplate = data;
                slider.inner.append(data);
                slider.activePage = slider.inner.find('.page:first');


                slider.activePage.addClass('active');

                slider.transitionHelper = new Fadetransition();
                slider.startSlideShow();
            });


            // set page width
            slider.resizePage();


            window.slider = this;
        },

        startSlideShow: function() {
            console.log('ger here');
            console.log(slider);


            var slider = this;

            this.refreshIntervalId = window.setInterval(function() {

                slider.transitionHelper.trans(function() {
                    // mark page as shown
                    // slider.activePage.addClass('shown');

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

                    tmp.remove();

                    slider.numPages--;
                });



                // console.log(slider.numPages);
            }, 3000);



        },

        stopSlideShow: function() {
            clearInterval(this.refreshIntervalId);

        },

        getSlides: function(callback) {
            var slider = this;
            var request = $.ajax('/assets/js/slider/templates/slide.html');


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
