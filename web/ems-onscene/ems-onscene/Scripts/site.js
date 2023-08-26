// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var $imagetooltip = null;
var showimagetooltip = function (thumbimage, e, height = 200) {
    if ($imagetooltip === null) {
        $imagetooltip = $('<div id="imagetooltip" style="display:none;position:absolute;z-index:100000;width:266px;height:' + height + 'px;"></div>');
        $('body').append($imagetooltip);
    }
    if ($imagetooltip.css('display') === 'none') {
        if ($imagetooltip.find('#tooltipimageviewer').attr('src') !== $(thumbimage).data('bigsrc')) {
            $imagetooltip.html('<img id="tooltipimageviewer" src="' + $(thumbimage).data('bigsrc') + '" style="max-width:100%;max-height:100%;" />')
        }
        $imagetooltip.height(height).show();
    }
    $imagetooltip.css({
        left:
            (e.pageX + 10 > window.innerWidth + window.scrollX - $imagetooltip.width()) ? (window.innerWidth - $imagetooltip.width() - 30) : e.pageX + 10,
        top:
            (e.pageY + 20 + $imagetooltip.height() > window.innerHeight + window.scrollY) ? (e.pageY - $imagetooltip.height() - 20) : e.pageY + 20
    });
};
var hideimagetooltip = function () {
    if ($imagetooltip === null) {
        return;
    }
    if ($imagetooltip.css('display') !== 'none') {
        $imagetooltip.hide();
    }
};
var ApplyAjaxPattern = function ($documentElement) {
    $documentElement.find('.ApplyAjaxPattern').each(function () {
        convert2JAMESAjaxContent(this);
    });
};
var convert2JAMESAjaxContent = function (contentElement) {
    $(contentElement).find('a[embededNavigation=True]').each(
        function () {
            var $this = $(this);
            $this.bind('click', function (e) {
                var _result;
                if ($this.hasClass('confirmdeletion')) {
                    _result = confirmdeletion(e);
                    if (_result === false) {
                        return false;
                    }
                }
                if ($this.attr('href') !== '#') {
                    if ($this.attr('onbeforeclick') !== null) {
                        _result = eval($this.attr('onbeforeclick'));
                        if (_result === false) {
                            return false;
                        }
                    }
                    var partialSelector = $this.data('partialselector');
                    if ($this.attr('targetContentElementSelector') !== undefined) {
                        contentElement = $($this.attr('targetContentElementSelector'))[0];
                    }
                    GoUrl4JAMESAjax($this.attr('href'), contentElement, $this, partialSelector);
                    return false;
                }
            });
        }
    );
    $(contentElement).find('form[embededNavigation=True]').each(
        function () {
            var $this = $(this);
            $this.bind('submit', function (event) {
                event.preventDefault();
                if ($this.attr('targetContentElementSelector') !== undefined) {
                    contentElement = $($this.attr('targetContentElementSelector'))[0];
                }
                formajaxcall($this, contentElement);
                return false;
            });
        }
    );
};

var formajaxcall = function ($this, _contentElement, actiononly) {
    _contentElement = _contentElement === null ? $('<div></div>')[0] : _contentElement;
    openwaittingimage($this);
    $.ajax({ type: 'POST', url: $this.attr('action'), data: $this.serialize(), async: $this.data('async') === 'false' ? false : true }).done(function (data) {
        if (actiononly !== true) {
            $(_contentElement).html(data);
            convert2JAMESAjaxContent(_contentElement);
        }
        closewaittingimage($this);
    }).fail(ajaxErrorHandler).always(function () { closewaittingimage($this); });
};
var GoUrl4JAMESAjax = function (url, contentElement, $this, partialSelector) {
    openwaittingimage($(contentElement));
    $.get(url, { __: new Date().getTime() }).done(function (data) {
        if (typeof partialSelector === 'undefined') {
            $(contentElement).html(data);
        }
        else {
            var $newhtml = $(data);
            $(contentElement).html($newhtml.find(partialSelector).html());
        }
        convert2JAMESAjaxContent(contentElement);
        closewaittingimage($(contentElement));
    }).fail(ajaxErrorHandler).always(function () { closewaittingimage($(contentElement)); });
};
var autocallurl = function (contentElement) {
    $(contentElement).find('.callurl').each(
        function () {
            var $this = $(this);
            GoUrlOnTabStrip($this.data('tabcontenturl'), $this[0]);
        }
    );
};
var GoUrlOnTabStrip = function (url, contentElement, partialSelector) {
    $(contentElement).data('tabcontenturl', url);
    GoUrl4JAMESAjax(url, contentElement, $(contentElement), partialSelector);
};
var closewaittingimage = function ($target) {
    //if (isNullOrWhitespace($target)) {
    //    $target = $(document);
    //}
    //kendo.ui.progress($target, false);
};
var openwaittingimage = function ($target) {
    //if (isNullOrWhitespace($target)) {
    //    $target = $('body');
    //}
    //kendo.ui.progress($target, true);
};
var callAjaxVoidResult = function (url, $this, successmessage) {
    openwaittingimage($this);
    $.get(url, function (data) {
        closewaittingimage($this);
        AlertMessage(successmessage);
    }).fail(ajaxErrorHandler).always(function () { closewaittingimage($this); });
};

var callAjaxWidthCallback = function (url, $this, callback) {
    openwaittingimage($this);
    $.get(url, function (data) {
        closewaittingimage($this);
        callback(data);
    }).fail(ajaxErrorHandler).always(function () { closewaittingimage($this); });
};
var AlertMessage = function (message, okfunction) {
    if (isNullOrWhitespace(message)) {
        message = "Please check the information that is not entered.";
    }
    popupWindow('AlertPopUP', null, 'MessageBox', '500px', message, okfunction);
};
var popupWindow = function (windowID, url, title, width, message, okfunction) {
    if (isNullOrWhitespace(title)) {
        title = 'Untitled';
    }
    if (isNullOrWhitespace(width)) {
        width = '500px';
    }
    var $popupWindow = $("#" + windowID);
    if ($popupWindow.length <= 0) {
        var _html = '<div id=\"' + windowID + '\"></div>';
        $('body').append(_html);
    }
    $popupWindow = $('#' + windowID);
    if (isNullOrWhitespace(url)) {
        message = message === null ? '' : message;
        message = message.replace(/\r\n|\r|\n/g, '<br />');
        message = '<div id="notify">    <div class="form-horizontal messagebox_overlay" style="text-align: center;"><h4>' + message + '</h4>    </div>    <div class="form-horizontal" style="text-align: center;">        <button type="button" id="btnClose" class="btn btn-primary securityrequired" onclick=" closePopupWindow(\'AlertPopUP\', ' + okfunction + ')">OK</button>    </div></div>';
        $popupWindow.html(message);
        $popupWindow.kendoWindow({
            width: width,
            actions: ['Minimize', 'Maximize', 'Close'],
            title: title,
            close: function () {
                $('#' + windowID).parent().remove();
            },
            visible: false
        });
        var dialog = $('#' + windowID).data('kendoWindow').center().open();
    }
    else {
        openwaittingimage($('body'));
        $popupWindow.kendoWindow({
            width: width,
            actions: ['Minimize', 'Maximize', 'Close'],
            title: title,
            close: function () {
                $('#' + windowID).parent().remove();
            },
            visible: false,
            content: url,
            refresh: function () {
                convert2JAMESAjaxContent(this.element);
                this.center();
                this.open();
                closewaittingimage($('body'));
            }
        });
        var dialog1 = $('#' + windowID).data('kendoWindow');
    }
};
var isNullOrWhitespace = function (input) {
    if (typeof input === 'undefined') return true;
    if (typeof input === 'object') {
        if (input === null) return true;
        return false;
    }
    if (typeof input === 'string') {
        if (input === null) return true;
        return input.replace(/\s/g, '').length < 1;
    }
    else {
        return false;
    }
};
var ajaxErrorHandler = function (xhr, type, statusText) {
    var _errorMessage = xhr.statusText;
    if (xhr.responseText.indexOf('&lt;ErrorMessage: ') > 0) {
        var responseText = xhr.responseText;
        var startingString = '&lt;ErrorMessage: ';
        var endingString = '.&gt;';
        var startingPoint = responseText.indexOf(startingString) + startingString.length;
        var endingPoint = responseText.indexOf(endingString, responseText.indexOf(startingString));
        _errorMessage = responseText.substring(startingPoint, endingPoint);
        AlertMessage(_errorMessage);
    }
    else {
        AlertMessage(_errorMessage);
    }

};
var insertImageToCK = function (e, ckid, fileid) {
    if (typeof CKEDITOR == 'undefined') {
        return;
    }
    var editor = CKEDITOR.instances[ckid];
    var input = document.getElementById(fileid);
    // Get the selected file
    var file = e.target.files[0];

    // Create a new FileReader instance
    var reader = new FileReader();

    // Add an event listener to the reader
    reader.addEventListener('load', function (e) {
        // Create a new image element
        var img = new CKEDITOR.dom.element('img');

        // Set the image source to the data URL
        img.setAttribute('src', e.target.result);
        img.setAttribute('style', 'max-width:90%');

        // Insert the image into the editor
        editor.insertElement(img);
    });

    // Read the file as a data URL
    reader.readAsDataURL(file);
    $(input).val('');
}

//(function () {
//    $('.hoverimage').on('mousemove', function (e) { var _height = $(this).data('popup-height') == 'undefined' ? 200 : $(this).data('popup-height'); showimagetooltip(this, e, _height); }).on('mouseout', function () { hideimagetooltip(this); });
//    autocallurl(document);
//})();

