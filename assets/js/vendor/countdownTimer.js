(function ($) {
    "use strict";

    function initTimer(selector) {
        var $elements = $(selector);
        if (!$elements.length) return;

        var rawDate = $elements.first().data("date");
        if (!rawDate) return;

        var futureTime = Date.parse(rawDate);
        if (isNaN(futureTime)) return;

        function update() {
            var now = new Date().getTime();
            var diff = futureTime - now;

            if (diff <= 0) {
                $elements.html('<div class="dealend-timer expired">Deal Ended</div>');
                clearInterval(timerInterval);
                return;
            }

            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var secs = Math.floor((diff % (1000 * 60)) / 1000);

            var html =
                '<div class="dealend-timer">' +
                '<div class="time-block"><div class="time">' + days + '</div><span class="day">Days</span></div>' +
                '<div class="time-block"><div class="time">' + (hours < 10 ? '0' + hours : hours) + '</div><span class="dots">:</span></div>' +
                '<div class="time-block"><div class="time">' + (mins < 10 ? '0' + mins : mins) + '</div><span class="dots">:</span></div>' +
                '<div class="time-block"><div class="time">' + (secs < 10 ? '0' + secs : secs) + '</div></div>' +
                '</div>';

            $elements.html(html);
        }

        update();
        var timerInterval = setInterval(update, 1000);
    }

    $(document).ready(function () {
        initTimer(".timer1");
        initTimer(".timer2");
        initTimer(".timer3");
    });
})(jQuery);