(function ($) {
  var setArrow = function ($el) {
    if ($el.hasClass('toggleArrow'))
    {
      $el.toggleClass('toggleArrowActive');
    }
  };

  var methods = {
    init: function () {
      return this.each(function () {
        if ($(this).data('toggleInit') !== true) {
          //Prevent multiple initializations
          $(this).data('toggleInit', true);

          $(this).click(function (event) {
            event.preventDefault();
            methods.toggle.apply(this);
          });
        }
      });
    },

    toggle: function (activate) {
      return $(this).each(function () {
        var $toggle,
            data,
            container,
            toggled = false;

        $toggle = $(this);

        container = $($toggle.attr('href'));

        if (activate || activate === false)
        {
          // forced state toggle
          toggled = container.hasClass('hideVisually') === activate;
          $toggle.toggleClass('toggleActive', activate);
          container.toggleClass('hideVisually', !activate);
        }
        else
        {
          // toggle
          toggled = true;
          $toggle.toggleClass('toggleActive');
          container.toggleClass('hideVisually');
        }

        if (toggled)
        {
          // update arrow status
          setArrow($toggle);

          // update the label
          data = $toggle.data();
          if (data.toggleText) {
            var show = data.toggleText;

            //store our current text
            $toggle.data('toggleText', $toggle.text());

            //switch to our toggle text
            $toggle.text(show);
          }

          $toggle.trigger('toggle', [(activate || $toggle.hasClass('toggleActive'))]);
        }
      });
    }

  };

  $.fn.truliaToggle = function (method) {
    if (typeof method === 'string' && typeof methods[method] === 'function')
    {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else if (typeof method === 'object' || !method)
    {
      return methods.init.apply(this, arguments);
    }
    else
    {
      $.error('Method ' +  method + ' does not exist on jQuery.truliaToggle');
    }
  };

}(jQuery));
