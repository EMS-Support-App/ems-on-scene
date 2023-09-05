//main
(function () {
    $(document).ready(function () {
        bodyContentMargin();
        if (typeof overridedReadyEventProcedure !== 'undefined') {
            overridedReadyEventProcedure();
        }
        loadKendo();
        //loadMasonry();
    });
})();
//load library functions 
{
    var loadKendo = function () {
        if (typeof kendo === 'undefined') {
            $("<link/>", {
                rel: "stylesheet",
                type: "text/css",
                //href: "https://kendo.cdn.telerik.com/2020.1.406/styles/kendo.common-bootstrap.min.css"
                href: "/styles/kendo.common-bootstrap.min.css"
            }).appendTo("head");
            $("<link/>", {
                rel: "stylesheet",
                type: "text/css",
                //href: "https://kendo.cdn.telerik.com/2020.1.406/styles/kendo.bootstrap.min.css"
                href: "/styles/kendo.bootstrap.min.css"
            }).appendTo("head");
            $("<link/>", {
                rel: "stylesheet",
                type: "text/css",
                //href: "https://kendo.cdn.telerik.com/2020.1.406/styles/kendo.bootstrap.mobile.min.css"
                href: "/styles/kendo.bootstrap.mobile.min.css"
            }).appendTo("head");
            $.getScript({
                //url: 'https://kendo.cdn.telerik.com/2020.1.406/js/kendo.all.min.js',
                url: '/scripts/kendo.all.min.js',
                dataType: "script",
                async: false,
                success: function () { applyKendoUI(document); }
            });
        }
        else {
            applyKendoUI(document);
        }
    };

    var loadOSM = function (lon, lat) {
        if (typeof OpenLayers === 'undefined') {
            $.getScript("http://www.openlayers.org/api/OpenLayers.js", function () {
                _initOSM(lon, lat);
            });
        }
        else {
            _initOSM(lon, lat);
        }
    };
    var CKEDITOR_BASEPATH = '/js/ckeditor/';

    var loadCKEditor = function (afteraction) {
        if (typeof CKEDITOR === 'undefined') {
            $.getScript('/js/ckeditor/ckeditor.js', function () {
                //CKEDITOR.config.customConfig = '/scripts/ckeditor/config.js';
                //CKEDITOR.config.skin = 'office2003';
                //CKEDITOR.config.toolbar = [
                //    { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord'] },
                //    { name: 'undo', items: ['Undo', 'Redo'] },
                //    { name: 'find', items: ['Find', 'Replace'] },
                //    { name: 'selection', items: ['SelectAll'] },
                //    { name: 'spellchecker', items: ['Scayt'] },
                //    { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                //    { name: 'colors', items: ['TextColor', 'BGColor'] },
                //    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
                //    { name: 'cleanup', items: ['RemoveFormat'] },
                //    { name: 'align', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
                //    { name: 'bidi', items: ['BidiLtr', 'BidiRtl', 'Language'] },
                //    { name: 'list', items: ['NumberedList', 'BulletedList'] },
                //    { name: 'indent', items: ['Outdent', 'Indent'] },
                //    { name: 'blocks', items: ['Blockquote', 'CreateDiv'] },
                //    { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
                //    { name: 'tools', items: [/*'Maximize', */'ShowBlocks'] }
                //];
                if (typeof afteraction !== 'undefined' && afteraction != null) {
                    afteraction();
                }
            });
        }
    };

    var loadMasonry = function () {
        if (typeof Masonry === 'undefined') {
            $.getScript('https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js', function () { initMasonry(document); });
        }
    };

}
//initialize procedures
{
    var initMasonry = function (documentElement) {

        $(documentElement).find('.masonry').each(function () {
            $(this).masonry({
                itemSelector: setDefaultValue($(this).data('itemselector'), '.masonry-item'),
                columnWidth: setDefaultValue($(this).data('columnwidth'), 200)
            });
        });
    };
    var _initOSM = function (lon, lat) {
        map = new OpenLayers.Map("mapdiv");
        map.addLayer(new OpenLayers.Layer.OSM(bingmapskey));
        var lonLat = new OpenLayers.LonLat(lon, lat)
            .transform(
                new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                map.getProjectionObject() // to Spherical Mercator Projection
            );
        var zoom = 16;
        var markers = new OpenLayers.Layer.Markers("Markers");
        map.addLayer(markers);
        markers.addMarker(new OpenLayers.Marker(lonLat));
        map.setCenter(lonLat, zoom);
    };

    var mnbexcel2tableauto = function ($documentElement) {
        $documentElement.find(".mnbexcel2table").each(
            function () {
                var $this = $(this);
                $this.html('');
                var _style = 'border:dashed 2px gray;padding:5px;max-height:300px;overflow:auto;';
                var generateTable = function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var pastedText;
                    if (window.clipboardData && window.clipboardData.getData) { // IE
                        pastedText = window.clipboardData.getData('Text');
                    } else if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
                        pastedText = e.originalEvent.clipboardData.getData('text/plain');
                    }
                    var data = pastedText;
                    var rows = data.split("\n");
                    var _result = '<table border="1" cellpadding="3">';
                    for (var y in rows) {
                        if (rows[y] !== null && rows[y] !== '') {
                            var cells = rows[y].split("\t");
                            _result += '<tr>';
                            for (var x in cells) {
                                _result += '<td style="padding:5px;">' + cells[x] + '</td>';
                            }
                            _result += '</tr>';
                        }
                    }
                    _result += '</table>';
                    var $target = $this;
                    $target.html(_result);
                    var hiddeninputname = $target.attr('name');
                    var $hiddeninput = $(document).find('input[name="' + hiddeninputname + '"]');
                    if ($hiddeninput.length === 0) {
                        $hiddeninput = $('<input type="hidden" name="' + hiddeninputname + '" />');
                        $target.append($hiddeninput);
                    }
                    $hiddeninput.val(_result);
                };
                var main = function () {
                    $this.prop('contenteditable', true);
                    $this.prop('style', _style);
                    $this.on('paste', generateTable);
                };
                main();

            }
        );
    };

    var initialKendoApplied = false;
    var applyKendoUI = function (documentElement) {
        $documentElement = $(documentElement);
        securityrequired($documentElement);
        kendosplitterauto($documentElement);
        kendotabstripauto($documentElement);
        kendogridauto($documentElement);
        kendospreadsheetauto($documentElement);
        kendotreelistauto($documentElement);
        kendomasktextbox($documentElement);
        kendodatepickerauto($documentElement);
        kendotimepickerauto($documentElement);
        kendodatetimepickerauto($documentElement);
        jquerydatepickerauto($documentElement);
        ckeditorauto($documentElement);
        kendotreeview($documentElement);
        countrycascade($documentElement);
        kendochart($documentElement);
        kendoschedulerauto($documentElement);
        mnbspreadsheet($documentElement);
        ApplyAjaxPattern($documentElement);
        kendolistview($documentElement);
        kendoautocompleteserverfiltering($documentElement);
        kendoautocalendar($documentElement);
        kendoautopanelbar($documentElement);
        kendocolorpickerauto($documentElement);
        kendobarcodeauto($documentElement);
        mnbexcel2tableauto($documentElement);
        kendocomboboxauto($documentElement);
        kendoratingauto($documentElement);
        kendoMultiSelectauto($documentElement);
        _popupNotification = $('<span></span>').kendoNotification().data("kendoNotification");
        slideimages($documentElement);
        initialKendoApplied = true;
        _init($documentElement);
        if (typeof overridedReadyKendo !== 'undefined') {
            overridedReadyKendo();
        }
    };
    var slideimages = function ($documentElement) {

        var $slideimages = $documentElement.find('.slideimages');
        $slideimages.each(function () {
            var $theImgTag = $(this);
            var $newImgTag = $theImgTag.clone();
            $newImgTag.prop('src', $theImgTag.data('src1'));
            $newImgTag.insertAfter($theImgTag);
            $theImgTag.hide();
            $newImgTag.show();
            setTimeout(_slideImages.bind(null, $theImgTag, $newImgTag), 3000);
        });

    };
    var _slideImages = function ($theImgTag, $newImgTag) {
        $theImgTag.toggle();
        $newImgTag.toggle();
        setTimeout(_slideImages.bind(null, $theImgTag, $newImgTag), 3000);
    };
    var _init = function (documentElement) {
        autocallurl(documentElement);
        showLoadedContent(documentElement);
        fixsubmenubug();
        searchenterkey(documentElement);
    };
    var searchenterkey = function (documentElement) {
        var $searchbutton = $('.glyphicon-search').parent();
        var $searchtextbox = $searchbutton.parent().find('input[type="text"]');
        $searchtextbox.keypress(
            function (event) {
                var keycode = event.keyCode ? event.keyCode : event.which;
                if (keycode === 13) {
                    $searchbutton.click();
                }
            }
        );

    };
    var showLoadedContent = function (documentElement) {
        $(documentElement).find('.loadingdiv').hide();
        $(documentElement).find('.showafterloaded').show();
    };
    var fixsubmenubug = function () {
        $('.dropdown-submenu>a').on("click", function (e) {
            $(this).next('ul').toggle();
            e.stopPropagation();
            e.preventDefault();
        });
    };
}

// kendo utilities
{
    var gSecurity = 'write';

    var securityrequired = function ($documentElement) {
        $documentElement.find('.securityrequired').each(
            function () {
                var $this = $(this);
                var readonlyaction = $this.attr('readonlyaction');
                readonlyaction = readonlyaction === null ? 'hide' : readonlyaction;
                if (typeof gSecurity !== 'undefined' && gSecurity !== 'write') {
                    var _tagName = this.tagName.toLowerCase();
                    if (_tagName === 'button' || _tagName === 'a' || _tagName === 'span' || _tagName === 'input' && ($(this).attr('type') === 'button' || $(this).attr('type') === 'reset' || $(this).attr('type') === 'submit')) {
                        if (readonlyaction === 'clickdisabled') {
                            $this.attr('disabled', 'disabled');
                            $this.css('cursor', 'no-drop');
                            $this.css('opacity', '0.2');
                            $this.addClass('clickdisabled');
                        }
                        else {
                            $this.hide();
                        }

                    }
                    else {
                        $this.find('input').addClass('clickdisabled');
                        $this.find('textarea').addClass('clickdisabled');
                        $this.find('input[type="button"]').removeClass('clickdisabled');
                        $this.find('select').addClass('clickdisabled');
                        $this.find('.securityclick').addClass('clickdisabled');
                    }
                }
            }
        );
    };

    var kendogridauto = function ($documentElement) {
        $documentElement.find(".kendogridauto").each(
            function () {

                var _dataSource = getDataSource(this);
                var filters = [];
                filters = _getDefaultFilter($(this).attr('id'), filters);
                _dataSource.filter({ logic: 'and', filters: filters });
                var _idfield = setDefaultValue($(this).data('kendo-grid-datasource-schema-model-id'), null);
                var kendogridcolumns = setDefaultValue($(this).data('kendo-grid-columns'), null, true);
                var _toolbar = $(this).data('kendo-grid-toolbar');
                _toolbar = typeof _toolbar === 'undefined' ? isNullOrWhitespace($(this).data('kendo-grid-editable')) ? null : ["create"] : _toolbar.length === 0 ? null : _toolbar;
                var _gridSorting = setDefaultValue($(this).data('kendo-grid-sorting'), true);
                var _pageable = setDefaultValue($(this).data('kendo-grid-paging'), true);
                var _filterable = setDefaultValue($(this).data('kendo-grid-filterable'), {
                    mode: "menu"
                });
                var _reorderable = setDefaultValue($(this).data('kendo-grid-reorderable'), true);
                var _resizable = setDefaultValue($(this).data('kendo-grid-resizable'), true);
                var _selectable = setDefaultValue($(this).data('kendo-grid-selectable'), true);
                var _requestParam = setDefaultValue($(this).data('kendoGridRequestParam'), null);
                var _requestParamCode = setDefaultValue($(this).data('kendoGridRequestParamCode'), null);
                var _requestParamName = setDefaultValue($(this).data('kendoGridRequestParamName'), null);
                var _requestParamId = setDefaultValue($(this).data('kendoGridRequestParamId'), null);
                var _searchId = setDefaultValue($(this).data('kendoGridSearchId'), null);

                var _change = setDefaultValue($(this).data('kendo-grid-change'), null, true);
                var _height = setDefaultValue($(this).data('kendo-grid-height'), 300);
                var _editable = setDefaultValue($(this).data('kendo-grid-editable'), "");
                var _paperSize = setDefaultValue($(this).data('kendoGridPdfPapersize'), "Letter");
                var _onDataBound = setDefaultValue($(this).data('kendo-grid-ondatabound'), null, true);
                var _groupable = setDefaultValue($(this).data('kendo-grid-groupable'), false);
                var _excel = {
                    allPages: true
                };
                var _pdf = {
                    allPages: true,
                    avoidLinks: true,
                    repeatHeaders: true,
                    multiPage: true,
                    paperSize: _paperSize,
                    //paperSize: "A2",
                    //paperSize: "Letter",
                    landscape: true,
                    scale: 0.5,
                    margin: { top: "2.5cm", right: "0.5cm", bottom: "2cm", left: "0.5cm" },
                    date: new Date()
                };
                var _autoBind = setDefaultValue($(this).data('kendo-grid-autobind'), true);
                var _afterload = $(this).data('kend-grid-afterload');
                var _selectedfirstrow = setDefaultValue($(this).data('kendo-grid-selectfirstrow'), false);
                var _persistRowSelection = function (e) {
                    var grid = e.sender;
                    var rows = this.table.find('tr');
                    var selectedrow = rows[grid.selectedRowIndex];
                    if (selectedrow !== undefined) {
                        grid.select(selectedrow);
                    }
                    if (_onDataBound !== null) {
                        _onDataBound(e);
                    }
                };
                var _columnsTemplatesConversion = function () {
                    for (var i = 0; i < kendogridcolumns.length; i++) {
                        var kendogridcolumn = kendogridcolumns[i];
                        if (kendogridcolumn.template !== undefined) {
                            if (kendogridcolumn.template.substring(0, 14) === 'kendo.template') {
                                kendogridcolumn.template = eval(kendogridcolumn.template);
                            }
                        }
                    }
                };
                var _setSelectionRows = function (e, args) {
                    var grid = e.sender;
                    grid.selectedRowIndex = grid.getCurrentRowIndex();
                };
                var onchangetrigged = false;
                var _interalactionplus_change = function (e, args) {
                    var grid = e.sender;
                    var currentSelectedUID = grid.select().data('uid');
                    var currentSelectedIndex = grid.getCurrentRowIndex();
                    if (grid.previousSelectedUID !== currentSelectedUID) {
                        _setSelectionRows(e, args);
                        if (_change !== null) {
                            _change(e, args);
                        }
                        grid.previousSelectedUID = currentSelectedUID;
                        grid.previousSelectedIndex = currentSelectedIndex;
                        onchangetrigged = true;
                    }
                };
                var _internalaction4doubleclick = function (e, args) {
                    var $grid = $(this).parent();
                    if (isNullOrWhitespace($grid.data('kendo-grid-doubleclick')) === false) {
                        window[$grid.data('kendo-grid-doubleclick')](e, args);
                    }
                };
                var _internalaction4click = function (e, args) {
                    var $grid = $(this).parent();
                    var grid = $grid.data('kendoGrid');
                    var currentSelectedUID = grid.select().data('uid');
                    var currentSelectedIndex = grid.getCurrentRowIndex();
                    if (onchangetrigged === false && grid.previousSelectedUID === currentSelectedUID) {
                        if (_change !== null) {
                            _change(e, args);
                        }
                        grid.previousSelectedUID = currentSelectedUID;
                        grid.previousSelectedIndex = currentSelectedIndex;
                    }
                    onchangetrigged = false;
                    if (isNullOrWhitespace($grid.data('kendo-grid-click')) === false) {
                        window[$grid.data('kendo-grid-click')](e, args);
                    }
                };
                var _detailInit = setDefaultValue($(this).data('kendo-grid-detailinit'), null, true);
                _columnsTemplatesConversion();
                $(this).kendoGrid({
                    dataSource: _dataSource, columns: kendogridcolumns, toolbar: _toolbar, sortable: _gridSorting, pageable: _pageable
                    , filterable: _filterable, reorderable: _reorderable, resizable: _resizable, selectable: _selectable
                    , change: _interalactionplus_change, dataBound: _persistRowSelection, height: _height, editable: _editable, excel: _excel
                    , excelExport: function (e) {
                        var rows = e.workbook.sheets[0].rows;
                        var _excelExport = false;
                        var _excelTitle = "";
                        var _excelSearch = "";
                        var _excelSubSearch = "";
                        if ($(this).length > 0) {
                            if ($(this)[0].element.length > 0) {
                                _excelExport = setDefaultValue($(this)[0].element[0].dataset.kendoGridExcelexport, false);

                                var today = new Date();
                                var dd = today.getDate();
                                var mm = today.getMonth() + 1;
                                var yyyy = today.getFullYear();
                                if (dd < 10) {
                                    dd = '0' + dd;
                                }
                                if (mm < 10) {
                                    mm = '0' + mm;
                                }
                                today = mm + '/' + dd + '/' + yyyy;

                                if (_excelExport) {
                                    _excelTitle = $(this)[0].element[0].dataset.kendoGridExceltitle;
                                    _excelTitle = _excelTitle + " (" + today + ")";
                                    var arr1 = $(this)[0].element[0].dataset.kendoGridExcelsearchfield.split('|');
                                    var arr2 = $(this)[0].element[0].dataset.kendoGridExcelsearchword.split('|');

                                    for (var r = 0; r < arr1.length; r++) {
                                        var arr3 = arr1[r].split(',');
                                        var arr4 = arr2[r].split(',');
                                        _excelSubSearch = "";

                                        for (var s = 0; s < arr4.length; s++) {
                                            if (arr4.length <= 1) {
                                                _excelSubSearch = _excelSubSearch + $("#" + arr4[s] + "").val() + " ";
                                            }
                                            else {
                                                if ($("#" + arr4[s] + "").val() !== "") {
                                                    if (s !== arr4.length - 1) {
                                                        _excelSubSearch = _excelSubSearch + $("#" + arr4[s] + "").val() + " ~ ";
                                                    } else {
                                                        _excelSubSearch = _excelSubSearch + $("#" + arr4[s] + "").val() + " ";
                                                    }
                                                }
                                            }
                                        }

                                        if (arr1[r] !== "") {
                                            if ($("#" + arr1[r] + " option:selected").val() !== "0") {
                                                _excelSearch = _excelSearch + $("#" + arr1[r] + " option:selected").text() + " : " + _excelSubSearch + " ";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (_excelExport === "true") {
                            rows.unshift({
                                cells: [{ value: _excelTitle, colSpan: e.workbook.sheets[0].columns.length, fontSize: 18, bold: true, underline: true, wrap: true, textAlign: "center" }]
                                , height: 60
                            }
                                , {
                                    cells: [{
                                        value: _excelSearch, colSpan: e.workbook.sheets[0].columns.length, fontSize: 13, bold: true, underline: true, wrap: true, textAlign: "center"
                                    }]
                                    , height: 40
                                });
                        } else {
                            rows.unshift({});
                        }

                        for (var rowIndex = 1; rowIndex < rows.length; rowIndex++) {
                            var row = rows[rowIndex];
                            var numericFormat = "#,##0.0000";
                            for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                                var cell = row.cells[cellIndex];
                                if (row.type === "data") {
                                    if (e.sender.columns[cellIndex].type === "float") {
                                        var _floatingPoint = parseInt(e.sender.columns[cellIndex].FloatingPoint);
                                        cell.value = formattedNumberStringwithComma(cell.value, _floatingPoint);
                                        cell.format = numericFormat;
                                        cell.hAlign = "right";
                                    }
                                }
                            }
                        }
                    }
                    , pdf: _pdf
                    , pdfExport: function (e) {
                        e.promise
                            .progress(function (e) {
                                $("body").append("<style>* { font-family:  H2GTRE !important;}</style > ");
                            })
                            .done(function () {
                                $("body").append("<style>* { font-family:  Oswald !important;}</style > ");
                            });
                    }
                    , scrollable: setDefaultValue($(this).data('kendo-grid-scrollable'), true, true), autoBind: _autoBind
                    , detailInit: _detailInit, groupable: _groupable
                });

                var grid = $(this).data('kendoGrid');
                if (!isNullOrWhitespace(_afterload)) {
                    eval(_afterload);
                }
                $(this).find('.k-grid-content').dblclick(_internalaction4doubleclick);
                $(this).find('.k-grid-content').click(_internalaction4click);
                if (!isNullOrWhitespace($(this).data('kendo-grid-rowclick'))) {
                    $(this).find('.k-grid-content').bind('click', isNullOrWhitespace($(this).data('kendo-grid-rowclick')) ? null : window[$(this).data('kendo-grid-rowclick')]);
                }

                grid.movenextrow = function () {
                    var currentIndex = this.getCurrentRowIndex();
                    var rows = this.table.find('tr');
                    var nextIndex = currentIndex + 1;
                    if (nextIndex < rows.length) {
                        var row = rows[nextIndex];
                        this.select(row);
                    }
                    else {
                        if (grid.dataSource._page <= Math.floor(grid.dataSource._total / grid.dataSource._pageSize)) {
                            grid.dataSource.page(grid.dataSource._page + 1);
                            this.selectedRowIndex = 0;
                        }
                    }
                };
                grid.movepreviousrow = function () {
                    var currentIndex = this.getCurrentRowIndex();
                    var rows = this.table.find('tr');
                    if (currentIndex === 0) {
                        if (grid.dataSource._page > 1) {
                            grid.dataSource.page(grid.dataSource._page - 1);
                            this.selectedRowIndex = grid.dataSource._pageSize - 1;
                        }
                    }
                    else {
                        var previousIndex = currentIndex - 1;
                        if (previousIndex < 0) {
                            previousIndex = 0;
                        }
                        var row = rows[previousIndex];
                        this.select(row);
                    }
                };
                grid.reload = function () {
                    this.dataSource.read();
                };
                grid.getCurrentRowIndex = function () {
                    var currentIndex = -1;
                    var selectedRows = this.select();
                    if (selectedRows.length > 0) {
                        currentIndex = selectedRows[0].rowIndex;
                    }
                    return currentIndex;
                };
                if (_selectedfirstrow === true) {
                    grid.selectedRowIndex = 0;
                }
                exportGridDOM();
            }
        );
    };
    var aspnetMVCODataOptions4KendoGrid = function (odataurl, odatafilter, odatacolumns, odatasort) {
        return {
            dataSource: {
                type: 'odata',
                transport: {
                    read: {
                        url: odataurl,
                        dataType: "json"
                    }
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10,
                filter: odatafilter,
                schema: {
                    data: function (data) {
                        return data["value"];
                    },
                    total: function (data) {
                        return data["odata.count"];
                    }
                },
                sort: odatasort
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: odatacolumns
        };
    };
    var exportGridDOM = function () {
        kendo.pdf.defineFont({
            "NGULIM": "/fonts/korean/NGULIM.TTF",
            "malgunsl": "/fonts/korean/malgunsl.ttf",
            "malgunbd": "/fonts/korean/malgunbd.ttf",
            "malgun": "/fonts/korean/malgun.ttf",
            "HMKMRHD": "/fonts/korean/HMKMRHD.TTF",
            "HMKMMAG": "/fonts/korean/HMKMMAG.TTF",
            "HMKMAMI": "/fonts/korean/HMKMAMI.TTF",
            "HMFMPYUN": "/fonts/korean/HMFMPYUN.TTF",
            "HMFMOLD": "/fonts/korean/HMFMOLD.TTF",
            "HMFMMUEX": "/fonts/korean/HMFMMUEX.TTC",
            "H2PORL": "/fonts/korean/H2PORL.TTF",
            "H2MKPB": "/fonts/korean/H2MKPB.TTF",
            "H2MJSM": "/fonts/korean/H2MJSM.TTF",
            "H2MJRE": "/fonts/korean/H2MJRE.TTF",
            "H2HDRM": "/fonts/korean/H2HDRM.TTF",
            "H2GTRM": "/fonts/korean/H2GTRM.TTF",
            "H2GTRE": "/fonts/korean/H2GTRE.TTF",
            "H2GSRB": "/fonts/korean/H2GSRB.TTF",
            "H2GPRM": "/fonts/korean/H2GPRM.TTF",
            "gulim": "/fonts/korean/gulim.ttc",
            "batang": "/fonts/korean/batang.ttc"
        });
    };

    var kendospreadsheetauto = function ($documentElement) {
        $documentElement.find('.kendospreadsheetauto').each(
            function () {
                var kendogridcolumns = setDefaultValue($(this).data('kendo-grid-columns'), null);
                $(this).kendoSpreadsheet({
                    columns: 3,
                    rows: 100,
                    toolbar: false,
                    sheetsbar: false,
                    sheets: [{
                        name: "Products"
                    }]
                });
                var _sheet = $(this).data('kendoSpreadsheet').activeSheet();
                var _dataSource = getDataSource(this);
                _sheet.setDataSource(_dataSource, kendogridcolumns);
                _sheet.range('1:1').enable(false);
            }
        );
    };

    var kendotreelistauto = function ($documentElement) {
        $documentElement.find(".kendotreelistauto").each(
            function () {
                var _odataurl = $(this).data('kendo-datasource-url');
                var _idField = $(this).data('kendo-treelist-idfield');
                var _parentIdField = $(this).data('kendo-treelist-parentidfield');
                var _columns = $(this).data('kendo-grid-columns');
                var _dataBound = setDefaultValue($(this).data('kendoGridDatabound'), null, true);
                var _gridrowchange = isNullOrWhitespace($(this).data('kendo-grid-change')) ? null : eval($(this).data('kendo-grid-change'));
                var _expanded = setDefaultValue($(this).data('kendo-tree-expanded'), false);
                var _gridheight = isNullOrWhitespace($(this).data('kendo-grid-height')) ? 300 : $(this).data('kendo-grid-height');
                var _sortable = isNullOrWhitespace($(this).data('kendo-grid-sorting')) ? true : $(this).data('kendo-grid-sorting');
                var _selectable = isNullOrWhitespace($(this).data('kendo-grid-selectable')) ? true : $(this).data('kendo-grid-selectable');
                var _filterable = isNullOrWhitespace($(this).data('kendo-grid-filterable')) ? { mode: "menu,row" } : $(this).data('kendo-grid-filterable');
                var _datasourceRequestdataType = isNullOrWhitespace($(this).data('kendo-datasource-requestdata-type')) ? 'odata' : $(this).data('kendo-datasource-requestdata-type') === 'xml' ? null : $(this).data('kendo-datasource-requestdata-type');
                var _modelfield = {};
                _modelfield[_idField] = { field: _idField };
                _modelfield[_parentIdField] = { field: _parentIdField, nullable: true };
                $(this).kendoTreeList({
                    dataSource: {
                        type: _datasourceRequestdataType,
                        transport: {
                            read: {
                                url: _odataurl,
                                dataType: "json"
                            }
                        },
                        schema: {
                            model: {
                                id: _idField,
                                parentId: _parentIdField,
                                fields: _modelfield,
                                expanded: _expanded
                            },
                            data: function (data) { return data["value"]; },
                            total: function (data) { return data['odata.count']; }
                        },
                        sort: $(this).data('kendo-grid-sort')
                    },
                    dataBound: _onGridDataBound,
                    height: _gridheight,
                    filterable: _filterable,
                    sortable: _sortable,
                    selectable: _selectable,
                    columns: _columns,
                    change: _gridrowchange
                });

                var selectedRow = -1;
                function _onGridDataBound(e) {
                    if (_dataBound !== true) return;
                    if (e.sender.table.find("tr").length === 0) return;
                    if (selectedRow === -1)
                        selectedRow = 0;
                    else if (selectedRow >= e.sender.table.find("tr").length)
                        selectedRow = e.sender.table.find("tr").length - 1;
                    var grid = e.sender;
                    var tr = $("[data-uid='" + this.dataItem(e.sender.table.find("tr")[selectedRow]).uid + "']", grid.tbody);
                    grid.select(tr);
                }
            }
        );
    };

    var kendomasktextbox = function ($documentElement) {
        $documentElement.find(".kendomasktextbox").each(
            function () {
                var _maskstring = $(this).data('mask');
                _maskstring = _maskstring.replace('phone_number', '(999) 000-0000').replace('credit_card', '0000 0000 0000 0000').replace('ssn', '000-00-0000');
                $(this).kendoMaskedTextBox({
                    mask: _maskstring
                });
            }
        );
    };

    var kendotabstripauto = function ($documentElement) {
        $documentElement.find(".kendotabstripauto").each(
            function () {
                var $this = $(this);
                var _contenturls = [];
                var _tabPosition = isNullOrWhitespace($this.data('kendotabstrip-tabposition')) ? "top" : $this.data('kendotabstrip-tabposition');
                $this.find('ul li').each(
                    function () {
                        var tabcontenturl = $(this).data('tabcontenturl');
                        if (typeof tabcontenturl !== 'undefined') {
                            _contenturls.push(tabcontenturl);
                        }
                        else {
                            _contenturls.push(null);
                        }

                    });
                $this.kendoTabStrip({
                    tabPosition: _tabPosition,
                    animation: { open: { effects: "fadeIn" } },
                    contentUrls: _contenturls,
                    contentLoad: function (e) {
                        convertToTabStripContent(e.contentElement);
                        applyKendoUI(e.contentElement);
                    }

                }).data('kendoTabStrip');
            }
        );
    };

    var kendodatepickerauto = function ($documentElement) {
        var _DateValue = getToDateString();
        var _format = setDefaultValue($documentElement.find('.kendodatepickerauto').attr("format"), "M/d/yyyy");
        var _setdefaultdate = setDefaultValue($documentElement.find('.kendodatepickerauto').attr("setdefaultdate"), false);
        if (_setdefaultdate) {
            _DateValue = setDefaultValue($documentElement.find('.kendodatepickerauto').val(), getToDateString());
        } else {
            _DateValue = null;
        }
        $documentElement.find('.kendodatepickerauto').kendoDatePicker({
            value: _DateValue,
            format: _format
        });
    };

    var kendotimepickerauto = function ($documentElement) {
        $documentElement.find('.kendotimepickerauto').kendoTimePicker();
    };

    var kendodatetimepickerauto = function ($documentElement) {
        $documentElement.find('.kendodatetimepickerauto').kendoDateTimePicker({
            animation: false
        });
    };

    var jquerydatepickerauto = function ($documentElement) {
        //$documentElement.find('.jquerydatepickerauto').datepicker();
    };

    var ckeditorauto = function ($documentElement) {
        if (typeof CKEDITOR === 'undefined') {
            loadCKEditor(initckeditor);
        }
        else {
            initckeditor();
        }

    };

    var initckeditor = function () {
        $documentElement.find('.ckeditorauto').each(
            function () {
                var ckeditorElementID = $(this).attr('id');
                if (typeof ckeditorElementID === 'undefined') {
                    ckeditorElementID = 'cke' + kendo.guid();
                    $(this).attr('id', ckeditorElementID);
                }
                try {
                    $(this).val(htmlDecode($(this).val()));
                    CKEDITOR.config.height = 200;
                    if (gSecurity !== 'write') {
                        CKEDITOR.config.readOnly = true;
                    }
                    var _instance = CKEDITOR.instances[ckeditorElementID];
                    if (_instance !== undefined) {
                        _instance.removeAllListeners();
                        CKEDITOR.remove(_instance);
                    }
                    CKEDITOR.replace(ckeditorElementID);
                }
                catch (_exp) {
                    console.log(_exp);
                }
            }
        );

    };

    var kendotreeview = function ($documentElement) {
        $documentElement.find('.kendotreeview').kendoTreeView();
        $documentElement.find('.kendotreeview').removeClass('hide');
    };
    var kendocomboboxauto = function ($documentElement) {
        $documentElement.find('.kendoComboBox').kendoComboBox();
    };
    var kendoratingauto = function ($documentElement) {
        $documentElement.find('.kendoRating').kendoRating();
    };
    var kendoMultiSelectauto = function ($documentElement) {
        $documentElement.find('.kendoMultiSelect').each(function (index, element) {
            var _value = $(element).data('value');
            try {
                $(element).kendoMultiSelect({
                    value: typeof _value === 'undefined' ? [] : eval(_value)
                });
            }
            catch { }
        });
    };
    var kendosplitterauto = function ($documentElement) {
        $documentElement.find('.kendosplitterauto').each(
            function () {
                var $this = $(this);
                var _orientation = $this.data('kendo-splitter-orientation');
                //_orientation = _orientation;
                var $panes = $this.find('>.contentwrapper');
                var _panes = [];
                for (var i = 0; i < $panes.length; i++) {
                    var $pane = $($panes[i]);
                    _panes.push({ collapsible: isNullOrWhitespace($pane.data('kendo-splitter-collapsible')) ? false : $pane.data('kendo-splitter-collapsible'), size: $pane.data('kendo-splitter-size') });
                }
                $this.kendoSplitter({
                    orientation: _orientation,
                    panes: _panes
                });

            }
        );
    };

    var countrycascade = function ($documentElement) {
        $documentElement.find('.countrycascade').each(
            function () {
                var $this = $(this);
                cascadeCountryProvince($this);
                $this.bind('change', function () { cascadeCountryProvince($(this)); });
            }
        );
    };

    var kendochart = function ($documentElement) {
        $documentElement.find('.kendochart').each(
            function () {
                var $this = $(this);
                var _dataSource = getDataSource(this);
                var _chartTitle = setDefaultValue($this.data('kendochart-title'), null);
                var _legend = setDefaultValue($this.data('kendochart-legend'), { visible: false });
                var _seriesDefaults = setDefaultValue($this.data('kendochart-seriesdefaults'), { type: "column", labels: { visible: true, background: "transparent" } });
                var _series = $this.data('kendochart-series');
                var _valueAxis = $this.data('kendochart-valueaxis');
                var _categoryAxis = $this.data('kendochart-categoryaxis');

                $this.kendoChart({ dataSource: _dataSource, title: _chartTitle, legend: _legend, seriesDefaults: _seriesDefaults, series: _series, valueAxis: _valueAxis, categoryAxis: _categoryAxis });
            }
        );
    };

    var kendoschedulerauto = function ($documentElement) {
        $documentElement.find('.kendoschedulerauto').each(
            function () {
                var $this = $(this);
                var _date = setDefaultValue($this.data('kendoscheduler-date'), new Date(), true);
                var _startTime = setDefaultValue($this.data('kendoscheduler-starttime'), new Date(), true);
                var _height = setDefaultValue($this.data('kendoscheduler-height'), 800);
                var _views = setDefaultValue($this.data('kendoscheduler-views'), ["day", "week", { type: "month", selected: true }], true);
                var _timezone = setDefaultValue($this.data('kendoscheduler-timezone'), "");
                var _editabletemplateid = setDefaultValue($this.data('kendoscheduler-editable-templateid'), null, false);
                var _eventTemplate = setDefaultValue($this.data('kendoscheduler-eventtemplate'), null, true);
                var _resources = setDefaultValue($this.data('kendoscheduler-resources'), null, true);
                var _add = setDefaultValue($this.data('kendoscheduler-add'), null, true);
                var _datasource = getDataSource(this);
                var _kendoScheduler;
                if (_editabletemplateid === null) {
                    _kendoScheduler = $this.kendoScheduler({ date: _date, startTime: _startTime, height: _height, views: _views, timezone: _timezone, dataSource: _datasource, resources: _resources, add: _add });
                }
                else {
                    _kendoScheduler = $this.kendoScheduler({ date: _date, startTime: _startTime, height: _height, views: _views, timezone: _timezone, dataSource: _datasource, resources: _resources, editable: { template: kendo.template($('#' + _editabletemplateid).html()) }, eventTemplate: _eventTemplate, add: _add });
                }
            }
        );
    };

    var mnbspreadsheet = function ($documentElement) {
        (function () {
            $documentElement.find('.mnbspreadsheet').each(function (key) {
                var _this = this;
                var _errorbackgroundcolor = 'pink';
                _this.autoreload = $(_this).data('mnbspreadsheet-auto-reload');
                _this.beforeaddnew = $(_this).data('mnbspreadsheet-beforeaddnew');
                _this.beforeupdate = $(_this).data('mnbspreadsheet-beforeupdate');
                _this.removebutton = isNullOrWhitespace($(_this).data('mnbspreadsheet-remove-button')) ? false : $(_this).data('mnbspreadsheet-remove-button');
                _this.addbutton = isNullOrWhitespace($(_this).data('mnbspreadsheet-add-button')) ? false : $(_this).data('mnbspreadsheet-add-button');
                _this.autoreload = typeof _this.autoreload === 'undefined' ? true : _this.autoreload;
                _this.setdisablecolumn = $(_this).data('mnbspreadsheet-setdisablecolumn');
                _this.currentRow = 0;
                _this.editablecontrols = [];
                _this.rows = [];
                _this.currentIndex = -1;
                _this.editcell4addition = function (that, type, dropdownid, defaultvalue, columnidx) {
                    var $cell = that;
                    var $editorobject;
                    if (type === 'dropdown') {
                        var $select = $(_this.internaldropdowns[dropdownid]).clone();
                        if (typeof defaultvalue !== 'undefined' && defaultvalue !== null) {
                            $select.val(defaultvalue);
                        }
                        $cell.append($select);
                        $editorobject = $select;
                    }
                    else if (type === 'datepicker') {
                        var $datepicker = $('<input type="text">');
                        $datepicker.width('100%');
                        $datepicker.height('100%');
                        $datepicker.datepicker();
                        $datepicker.hide();
                        $datepicker.on('focusout', function () { $datepicker.hide(); $cell.text($datepicker.val()); });
                        $cell.append($datepicker);
                        $cell.on('click', function () {
                            $datepicker.show();
                        });
                        $editorobject = $cell;
                    }
                    else {
                        $cell.prop('contenteditable', true);
                        $cell.bind('focusin', function () { _this.SelectText($cell[0]); _this.BindCustomControl($cell[0]); });
                        $editorobject = $cell;
                    }

                    var editorobject = $editorobject[0];
                    var newRowIndx = _this.spreadsheet.find('table').find('tr').length - 1;
                    if (_this.rows.length >= newRowIndx) {
                        editorobject.row = _this.rows[_this.rows.length - 1];
                        editorobject.columnidx = _this.rows[_this.rows.length - 1].cells.length - 1;
                    }
                    else {
                        editorobject.row = null;
                        editorobject.columnidx = columnidx;
                    }

                    _this.currentIndex = _this.currentIndex + 1;
                    $editorobject.data('idx', _this.currentIndex);
                    $editorobject.bind('keydown', function () { _this.editcellkeycontrol(event); });
                    $editorobject.bind('focusin', function () { _this.cellfocusin(event); });
                    $editorobject.bind('focusout', function () { _this.validatevalue(event); });
                    _this.editablecontrols.push($editorobject);
                    $editorobject.attr('bindedcontrol', 'true');
                };
                _this.SelectText = function (text) {
                    var range, selection;
                    if (document.body.createTextRange) {
                        range = document.body.createTextRange();
                        range.moveToElementText(text);
                        range.select();
                    } else if (window.getSelection) {
                        selection = window.getSelection();
                        range = document.createRange();
                        range.selectNodeContents(text);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                };
                _this.BindCustomControl = function (cell) {
                    var $cell = $(cell);
                    var customcontrol = this.fields[cell.columnidx].customcontrol;
                    if (!isNullOrWhitespace(customcontrol)) {
                        var customcontrolid = customcontrol.controlid;
                        if (!isNullOrWhitespace(customcontrolid)) {
                            var $customcontrol = $('#' + customcontrolid);
                            var currentPosition = $cell.position();
                            $customcontrol.css({ top: currentPosition.top, left: currentPosition.left, position: 'absolute' });
                            $customcontrol.width($cell.outerWidth() - 3);
                            $customcontrol.height($cell.outerHeight());
                            $customcontrol.show();
                            if (!isNullOrWhitespace(customcontrol.initialtrigger)) {
                                eval(customcontrol.initialtrigger + '(cell);');
                            }
                        }
                    }
                };
                _this.editcellkeycontrol = function (e) {
                    if (e.which === 13 || e.which === 9) {
                        _this.movenextcell(e);
                    }
                };
                _this.movenextcell = function (e) {
                    e.preventDefault();
                    var _target = e.target;
                    _this._movenextcell(_target);

                };
                _this._movenextcell = function (target) {
                    var _nextindex = $(target).data('idx') + 1;
                    if (_nextindex > _this.editablecontrols.length - 1) {
                        if (_this.autoaddnew) {
                            _this.addrow();
                        }
                    }
                    if (_nextindex < _this.editablecontrols.length) {
                        _this.editablecontrols[_nextindex].focus();
                    }
                };
                _this.addrow = function () {
                    var $spreadsheet = _this.spreadsheet.find('table');
                    newRowIdx = $spreadsheet.find('tr:last-child')[0].rowIndex + 1;
                    var $row = $('<tr></tr>');
                    $row[0].rowIndex = newRowIdx;
                    $spreadsheet.append($row);
                    var _fields = _this.fields;
                    for (var j = 0; j < _fields.length; j++) {
                        var $column = $('<td></td>');
                        if (typeof _fields[j].dropdown !== 'undefined') {
                            _this.editcell4addition($column, 'dropdown', _fields[j].dropdown, null, j);

                            if (_fields[j].readonly === true) {
                                var $select = $column.find('select');
                                $select.prop("disabled", true);
                            }
                        }
                        else {
                            $column.html('');
                            if (_fields[j].readonly !== true) {
                                _this.editcell4addition($column, null, null, null, j);
                            }
                        }
                        $column.css('min-width', _fields[j].width);
                        $column.css('display', _fields[j].display);

                        setBackgroundColor(_fields[j], $column);
                        setColumnTextAlign(_fields[j], $column);

                        $row.append($column);
                    }
                    _this.adddeletecolumn($row);

                    if ($spreadsheet[0].parentElement.id.toString().startsWith('PickingJobTicketDetail')) {
                        _this.addeditcolumn($row);
                    }
                };
                _this.adddeletecolumn = function ($row) {
                    var $deletebutton = $('<span class="glyphicon glyphicon-remove mnbspreadsheet-button" ></span>');
                    if (_this.removebutton) {
                        $deletebutton = $('<span class="glyphicon mnbspreadsheet-button" ></span>');
                    }
                    $deletebutton.bind('click', function () {
                        if (confirm('Are you sure?')) {
                            var _row = $row.find('td')[0].row;
                            if (_row !== null) {
                                _this.DataSource.remove(_row.viewmodel);
                                _this.rows.splice(_row.index);
                                _this.DataSource.sync().done(function () { }).fail().then(function () { });
                            }
                            try {
                                $row.remove();
                                popupNotification('deleted');
                            }
                            catch (_exp) {
                                console.log(_exp);
                            }
                            // modified by JHMIN
                            //_this.reload();
                            return;
                        }
                    });
                    var $deletecolumn = $('<td></td>');
                    $deletecolumn.append($deletebutton);
                    $deletecolumn.css('text-align', 'center');
                    $row.append($deletecolumn);
                };
                _this.addeditcolumn = function ($row) {
                    var $addbutton = $('<button type="button" class="btn btn-info">ADD</button>');
                    if (_this.addbutton) {
                        $addbutton = $('<button type="button" class="btn btn-info">ADD</button>');
                    }

                    //$addbutton.bind('click', function () {
                    //    var suggestItemID = $row[0].cells[3].textContent;
                    //    popupWindow('pickingjobticketactualspopupwindow', '/pickingjobticketactuals/create/?id=' + suggestItemID, 'Add Actual Picking');
                    //});

                    var $addcolumn = $('<td></td>');
                    $addcolumn.append($addbutton);
                    $addcolumn.css('text-align', 'center');
                    $row.append($addcolumn);
                };
                _this.initialInternalDropdowns = function (_dropdowninfos) {
                    if (typeof _dropdowninfos !== 'undefined') {
                        _this.internaldropdowns = new Array();
                        for (var i = 0; i < _dropdowninfos.length; i++) {
                            (function (_this) {
                                var _dropdownDataSource = getDataSourceWithReadUrl(_dropdowninfos[i].datasourceurl, false);
                                _dropdownDataSource._dropdowninfo = _dropdowninfos[i];
                                _dropdownDataSource.read().then(function () {
                                    var __data = _dropdownDataSource.data();
                                    $select = $('<select></select>');
                                    for (var j = 0; j < __data.length; j++) {
                                        if (_dropdownDataSource._dropdowninfo.id === "TrueOrFalse") {
                                            if (__data[j][_dropdownDataSource._dropdowninfo.valuefield] === "0") {
                                                $select.append($('<option value="' + false + '" ' + (j === 0 ? 'selected=selected' : '') + '>' + __data[j][_dropdownDataSource._dropdowninfo.textfield] + '</option>'));
                                            }
                                            else {
                                                $select.append($('<option value="' + true + '" ' + (j === 0 ? 'selected=selected' : '') + '>' + __data[j][_dropdownDataSource._dropdowninfo.textfield] + '</option>'));
                                            }
                                        }
                                        else {
                                            $select.append($('<option value="' + __data[j][_dropdownDataSource._dropdowninfo.valuefield] + '" ' + (j === 0 ? 'selected=selected' : '') + '>' + __data[j][_dropdownDataSource._dropdowninfo.textfield] + '</option>'));
                                        }
                                    }
                                    _this.internaldropdowns[_dropdownDataSource._dropdowninfo.id] = $select;
                                });
                            })(this);
                        }
                    }
                };
                _this.getValue = function (_target) {
                    var _value = '';
                    if ($(_target).attr('bindedcontrol') === "true") {
                        if (_target.tagName.toLowerCase() === 'input' || _target.tagName.toLowerCase() === 'select' || _target.tagName.toLowerCase() === 'textarea') {
                            _value = $(_target).val();
                        }
                        else {
                            _value = $(_target).html();
                        }
                    }
                    else {
                        var $children = $(_target).find('*[bindedcontrol="true"]');
                        if ($children.length > 0) {
                            _value = _this.getValue($children[0]);
                        }
                    }
                    return typeof _value === 'undefined' || _value === null ? _value : _value.trim();
                };
                _this.getRowIndex = function (_target) {
                    var _result = 0;
                    if ($(_target).attr('bindedcontrol') === "true") {
                        if (_target.tagName.toLowerCase() === 'input' || _target.tagName.toLowerCase() === 'select' || _target.tagName.toLowerCase() === 'textarea') {
                            _result = $(_target).parent().parent()[0].rowIndex;
                        }
                        else {
                            _result = $(_target).parent()[0].rowIndex;
                        }
                    }
                    else {
                        var $parent = $(_target).parent();
                        if ($parent.length > 0) {
                            _result = _this.getRowIndex($parent[0]);
                        }
                    }
                    return _result;
                };
                _this.validatevalue = function (e) {
                    var _target = e.target;

                    var newvalue = _this.getValue(_target);
                    var _thecellfieldname = _this.fields[e.target.columnidx].field;
                    var _viewmodel = e.target.row === null ? null : e.target.row.viewmodel;
                    var _oldvalue = _viewmodel === null ? null : getPropertyValueByName(_viewmodel, _thecellfieldname);

                    if (typeof _this.fields[e.target.columnidx].trigger !== 'undefined') {
                        eval(_this.fields[e.target.columnidx].trigger + '(e, _oldvalue, newvalue )');
                    }
                    if (_viewmodel !== null && _oldvalue !== newvalue) {
                        _viewmodel.set(_thecellfieldname, newvalue);

                        if (typeof _this.beforeupdate !== 'undefined') {
                            eval(_this.beforeupdate + '(_viewmodel);');
                        }

                        var _dataSource = _this.DataSource;
                        _dataSource.sync().done(function () {
                            $(_target).parent().css('background-color', '');
                            if (_this.autoreload) {
                                _this.reload();
                            }
                        }).fail(function () {
                            popupNotification('error', 'error');
                            e.preventDefault = true;
                            $(_target).parent().css('background-color', _errorbackgroundcolor); $(_target).focus();
                        });
                    }
                    //else if (_viewmodel == null) {
                    //}
                };
                _this.savelastnewrow = function () {
                    var _lastrowindex = _this.spreadsheet.find('tr').length - 1;
                    _this.callAddNew(_lastrowindex);
                };
                _this.callAddNew = function (_rowIndex) {
                    var $spreadsheet = _this.spreadsheet.find('table');
                    var _row = $spreadsheet.find('tr')[_rowIndex];
                    var $cell = $(_row).find('td');
                    if ($cell.length > 0) {
                        if ($cell[0].row === null) {
                            var o = {};
                            for (var i = 0; i < _this.fields.length; i++) {
                                if (_this.fields[i].field.indexOf('.') < 0) {
                                    o[_this.fields[i].field] = _this.getValue($cell[i]);
                                }
                            }
                            if (typeof _this.beforeaddnew !== 'undefined') {
                                eval(_this.beforeaddnew + '(o, _row);');
                            }
                            _this.DataSource.add(o);
                            _this.DataSource.sync().done(function () { _this.reload(); }).fail(function () {
                                popupNotification('error', 'error');
                                $cell.parent().css('background-color', _errorbackgroundcolor);
                                $cell.focus();
                            });
                        }
                    }
                };
                _this.cellfocusin = function (e) {
                    var _previousRowIndex = _this.currentRow;
                    var _newRowIndex = _this.getRowIndex(e.target);
                    if (_previousRowIndex !== _newRowIndex) {
                        _this.callAddNew(_previousRowIndex);
                    }
                    _this.currentRow = _newRowIndex;
                };
                _this.autoaddnew = $(_this).data('mnbspreadsheet-auto-addnew') === true ? true : false;
                var $table = $('<table class="table table-bordered mnbspread"><tbody></tbody></table>');
                var _fields = $(_this).data('kendo-grid-columns');
                _this.fields = _fields;
                _this.initialInternalDropdowns($(_this).data('kendo-dropdown-datasource'));
                _this.defaultDatasourceTransportParametermapping = function (d, t) {
                    if (t === 'update' || t === 'create') {
                        var LQColumns = Enumerable.From(_this.fields);
                        var intColumns = LQColumns.Where(function (c) { return c.type === 'int'; }).ToArray();
                        for (var i = 0; i < intColumns.length; i++) {
                            var _temp = kendo.parseInt(d[intColumns[i].field]);
                            if (_temp === null) {
                                delete d[intColumns[i].field];
                            }
                        }
                        var floatColumns = LQColumns.Where(function (c) { return c.type === 'float'; }).ToArray();
                        for (var i1 = 0; i1 < floatColumns.length; i1++) {
                            var _temp1 = kendo.parseFloat(d[floatColumns[i1].field]);
                            if (_temp1 === null) {
                                delete d[floatColumns[i1].field];
                            }
                        }
                        var dateColumns = LQColumns.Where(function (c) { return c.type === 'date'; }).ToArray();
                        for (var i2 = 0; i2 < dateColumns.length; i2++) {
                            _tempParseDate = kendo.parseDate(d[dateColumns[i2].field]);
                            if (_tempParseDate === null) {
                                delete d[dateColumns[i2].field];
                            }
                            else {
                                d[dateColumns[i2].field] = _tempParseDate.toJSON();
                            }
                        }
                        var keys = Object.keys(d);
                        for (var i3 = 0; i3 < keys.length; i3++) {
                            if (typeof d[keys[i3]] === 'object') {
                                delete d[keys[i3]];
                            }
                        }
                        return kendo.stringify(d);
                    }
                };
                if (typeof $(_this).data('kendo-datasource-transport-parametermap') === 'undefined') {
                    $(_this).data('kendo-datasource-transport-parametermap', _this.defaultDatasourceTransportParametermapping);
                }
                var _dataSource = getDataSource(_this, true);
                _dataSource.bind('error', function (e) {
                });
                _this.DataSource = _dataSource;
                $(_this).append($table);
                _this.spreadsheet = $(this);
                _dataSource.read().done(function () {
                    var _data = _dataSource.data();
                    var $emptyrow = $('<tr></tr>');
                    for (var j = 0; j < _fields.length; j++) {
                        var $emptycolumn = $('<th></th>');
                        $emptycolumn.text(_fields[j].title);
                        $emptycolumn.css('min-width', _fields[j].width);
                        $emptycolumn.css('display', _fields[j].display);
                        $emptyrow.append($emptycolumn);
                    }
                    var $commandsheader = $('<th></th>');
                    $commandsheader.css('width', '45px');
                    $emptyrow.append($commandsheader);
                    $table.append($emptyrow);
                    for (var i = 0; i < _data.length; i++) {
                        var $row = $('<tr></tr>');
                        var _datum = _data[i];
                        _this.rows.push({ index: i, viewmodel: _datum, cells: [], $row: $row });
                        var _newrow = _this.rows[_this.rows.length - 1];
                        for (var j1 = 0; j1 < _fields.length; j1++) {
                            _newrow.cells.push(_fields[j1]);
                            var $column = $('<td></td>');
                            if (typeof _fields[j1].dropdown !== 'undefined') {
                                _this.editcell4addition($column, 'dropdown', _fields[j1].dropdown, _datum[_fields[j1].field]);
                            }
                            else if (typeof _fields[j1].template !== 'undefined') {
                                var template = kendo.template(_fields[j1].template);
                                var result = template(_datum);
                                $column.html(result);
                                if (_fields[j1].readonly !== true) {
                                    _this.editcell4addition($column);
                                }
                                if (_fields[j1].readonly === true && _fields[j1].autosave === true) {
                                    $column.css("pointer-events", "none");
                                    $column.css("background-color", "#EBEBEB");
                                    _this.editcell4addition($column);
                                }
                            }
                            else {
                                if (_fields[j1].type === "number") {
                                    $column.text(formattedNumberString(_datum[_fields[j1].field]));
                                    if (_fields[j1].readonly !== true) {
                                        _this.editcell4addition($column);
                                    }
                                    if (_fields[j1].readonly === true && _fields[j1].autosave === true) {
                                        $column.css("pointer-events", "none");
                                        $column.css("background-color", "#EBEBEB");
                                        _this.editcell4addition($column);
                                    }
                                }
                                else if (_fields[j1].type === "date") {
                                    var _dateValue = kendo.parseDate(_datum[_fields[j1].field]);
                                    $column.text(_dateValue === null ? '' : _dateValue.toLocaleDateString());
                                    if (_fields[j1].readonly !== true) {
                                        _this.editcell4addition($column);
                                    }
                                    if (_fields[j1].readonly === true && _fields[j1].autosave === true) {
                                        $column.css("pointer-events", "none");
                                        $column.css("background-color", "#EBEBEB");
                                        _this.editcell4addition($column);
                                    }
                                }
                                else {
                                    $column.text(_datum[_fields[j1].field]);
                                    if (_fields[j1].readonly !== true) {
                                        _this.editcell4addition($column);
                                    }
                                    if (_fields[j1].readonly === true && _fields[j1].autosave === true) {
                                        $column.css("pointer-events", "none");
                                        $column.css("background-color", "#EBEBEB");
                                        _this.editcell4addition($column);
                                    }
                                }
                            }
                            $column.css('min-width', _fields[j1].width);
                            $column.css('display', _fields[j1].display);

                            setBackgroundColor(_fields[j1], $column);
                            setColumnTextAlign(_fields[j1], $column);
                            $row.append($column);
                        }
                        _this.adddeletecolumn($row);
                        var $spreadsheet = _this.spreadsheet.find('table');
                        $table.append($row);
                    }
                    _this.reload();
                });
                _this.reload = function () {
                    _dataSource.read().done(function () {
                        var _data = _dataSource.data();
                        $rows = _this.spreadsheet.find('tr');
                        var cnt = 0;
                        for (var i = 0; i < _data.length; i++) {
                            var $row = $($rows[i + 1]);
                            var $columns = $row.find('td');
                            var _fields = _this.fields;
                            var _datum = _data[i];
                            _this.rows[i] = { index: i, viewmodel: _datum, cells: [], $row: $row };
                            for (var j = 0; j < _fields.length; j++) {
                                var $column = $($columns[j]);
                                _this.rows[i].cells.push(_fields[j]);
                                editorobject = $column[0];
                                if (typeof _fields[j].dropdown !== 'undefined') {
                                    var $select = $column.find('select');
                                    if (_fields[j].dropdown === 'TrueOrFalse') {
                                        $select[0].value = _datum[_fields[j].field];
                                    }
                                    else {
                                        $select.val(_datum[_fields[j].field]);
                                    }

                                    editorobject = $select[0];
                                }
                                else if (typeof _fields[j].template !== 'undefined') {
                                    var template = kendo.template(_fields[j].template);
                                    var result = template(_datum);
                                    $column.html(result);
                                }
                                else {
                                    if (_fields[j].type === "number") {
                                        $column.text(formattedNumberString(_datum[_fields[j].field]));
                                    }
                                    else if (_fields[j].type === "date") {
                                        var _dateValue = kendo.parseDate(_datum[_fields[j].field]);
                                        $column.text(_dateValue === null ? '' : _dateValue.toLocaleDateString());
                                    }
                                    else {
                                        $column.text(_datum[_fields[j].field]);
                                    }
                                }
                                if (typeof _this.setdisablecolumn !== 'undefined') {
                                    eval(_this.setdisablecolumn + '($rows, _fields, _data);');
                                }

                                editorobject.row = _this.rows[i];
                            }
                            cnt++;
                        }
                    });
                };
            });
        })();
    };

    var kendolistview = function ($documentElement) {
        $documentElement.find(".kendolistview").each(
            function () {
                var _listviewid = $(this).attr("id");
                var _pager = setDefaultValue($("#" + _listviewid).data('kendo-listview-pager'), null);
                var _template = setDefaultValue($("#" + _listviewid).data('kendo-listivew-template'), null);
                var _edittemplate = setDefaultValue($("#" + _listviewid).data('kendo-listivew-edittemplate'), null);
                var _dataSource = getDataSource(this, true, customParameterMap4ODataCRUD);

                $("#" + _pager).kendoPager({
                    dataSource: _dataSource
                });

                if (_edittemplate === null) {
                    $("#" + _listviewid).kendoListView({
                        dataSource: _dataSource,
                        template: kendo.template($("#" + _template).html())
                    });

                } else {
                    var kendosampleslistview = $("#" + _listviewid).kendoListView({
                        dataSource: _dataSource,
                        template: kendo.template($("#" + _template).html()),
                        editTemplate: kendo.template($("#" + _edittemplate).html())
                    }).data("kendoListView");

                    $(".k-add-button").click(function (e) {
                        kendosampleslistview.add();
                        e.preventDefault();
                    });
                }


            }
        );
    };

    var kendoautocompleteserverfiltering = function ($documentElement) {
        $documentElement.find(".kendoautocompleteserverfiltering").each(
            function () {
                var _dataSource = getDataSource(this);
                var _dataTextField = $(this).data('kendo-autocomplete-datafield');
                var _filter = setDefaultValue($(this).data('kendo-autocomplete-filter'), 'contains', false);
                var _minLength = setDefaultValue($(this).data('kendo-autocomplete-minLength'), 2, false);
                var _dataBound = setDefaultValue($(this).data('kendoAutocompleteDatabound'), null, true);
                var _open = setDefaultValue($(this).data('kendo-autocomplete-open'), null, true);
                var _close = setDefaultValue($(this).data('kendo-autocomplete-close'), null, true);
                var _filtering = setDefaultValue($(this).data('kendo-autocomplete-filtering'), null, true);
                var _change = setDefaultValue($(this).data('kendo-autocomplete-change'), null, true);
                var _select = setDefaultValue($(this).data('kendo-autocomplete-select'), null, true);
                var _separator = setDefaultValue($(this).data('kendo-autocomplete-separator'), ', ', false);

                $(this).kendoAutoComplete({
                    dataTextField: _dataTextField,
                    filter: _filter,
                    minLength: _minLength,
                    dataSource: _dataSource,
                    select: _select,
                    change: _change,
                    filtering: _filtering,
                    close: _close,
                    open: _open,
                    dataBound: _dataBound,
                    separator: _separator
                });
            }
        );
    };
    var kendoautopanelbar = function ($documentElement) {
        $documentElement.find(".kendopanelbar").each(
            function () {
                var _expandmode = setDefaultValue($(this).data('expandmode'), 'single', false);

                $(this).kendoPanelBar({
                    expandMode: _expandmode
                });
            }
        );
    };

    var kendocolorpickerauto = function ($documentElement) {
        $documentElement.find(".kendocolorpickerauto").each(
            function () {
                $(this).kendoColorPicker({ name: "color", value: "#ffffff" });
            }
        );
    };

    var kendoautocalendar = function ($documentElment) {
        $documentElement.find(".kendocalendar").each(
            function () {
                $(this).kendoCalendar();
            }
        );
    };
    var kendobarcodeauto = function ($documentElment) {
        $documentElement.find(".kendobarcodeauto").each(
            function () {
                var $this = $(this);
                $(this).kendoBarcode({
                    value: $this.data('kendobarcode-value'),
                    type: $this.data('kendobarcode-type'),
                    height: $this.data('kendobarcode-height'),
                    width: $this.data('kendobarcode-width')
                });
            }
        );
    };
}

{
    var setDefaultValue = function (value, defaultvalue, bEval) {
        try {
            if (bEval) {
                return isNullOrWhitespace(value) ? defaultvalue : eval(value);
            }
            else {
                return isNullOrWhitespace(value) ? defaultvalue : value;
            }
        }
        catch (_exp) {
            console.log(_exp);
        }
    };

    var getDataSourceWithReadUrl = function (_readurl, _async) {
        _async = typeof _async === 'undefined' ? true : _async;
        return new kendo.data.DataSource({
            type: 'odata', transport: { read: { url: _readurl, async: _async, type: "GET", dataType: 'json' } }, schema: {
                data: function (data) {
                    var _value = data['value'];
                    if (typeof _value === 'undefined') {
                        _value = data;
                        delete _value['odata.metadata'];
                    }
                    return _value;
                }, total: function (data) { return data['odata.count']; }
            }
        });
    };

    var getDataSource = function (that, async, _customParameterMap) {
        var _async = typeof async === 'undefined' ? true : async;
        var _datasourceRequestdataType = isNullOrWhitespace($(that).data('kendo-datasource-requestdata-type')) ? 'odata' : $(that).data('kendo-datasource-requestdata-type') === 'xml' ? null : $(that).data('kendo-datasource-requestdata-type');
        var _datasourceResponsedataType = setDefaultValue($(that).data('kendo-datasource-responsedata-type'), 'json');
        var _readurl = setDefaultValue($(that).data('kendo-datasource-url'), null);
        var _requestParam = setDefaultValue($(that).data('kendoGridRequestParam'), null);
        var _updateurl = setDefaultValue($(that).data('kendo-datasource-update-url'), _readurl);
        var _idfield = setDefaultValue($(that).data('kendo-grid-datasource-schema-model-id'), null);
        var _fields = setDefaultValue($(that).data('kendo-grid-datasource-schema-model-fields'), null);
        var _aggregate = setDefaultValue($(that).data('kendo-grid-aggregate'), null);
        var _gridServerSorting = setDefaultValue($(that).data('kendo-grid-serversorting'), true);
        var _gridServerPaging = setDefaultValue($(that).data('kendo-serverpaging'), true);
        var _gridPagesize = _gridServerPaging === true && $(that).hasClass('kendoschedulerauto') === false ? setDefaultValue($(that).data('kendo-grid-pagesize'), 10) : null;
        var _gridServerFiltering = setDefaultValue($(that).data('kendo-grid-serverfiltering'), true);
        var _gridSort = $(that).data('kendo-grid-sort');
        var _datasourceChange = setDefaultValue($(that).data('kendo-datasource-change'), null, true);
        var _parameterMap = setDefaultValue($(that).data('kendo-datasource-transport-parametermap'), null, true);
        var _group = setDefaultValue($(that).data('kendo-datasource-group'), null, true);

        _parameterMap = _parameterMap !== null ? _parameterMap : typeof _customParameterMap === 'undefined' ? null : _customParameterMap;

        var _transport = {
            read: { url: function (data) { return _readurl; }, type: "GET", dataType: _datasourceResponsedataType, async: _async }
            , destroy: { url: function (data) { return _updateurl + "(" + data[_idfield] + ")"; }, type: "DELETE", dataType: _datasourceResponsedataType, async: _async }
            , update: { url: function (data) { return _updateurl + "(" + data[_idfield] + ")"; }, type: "PUT", dataType: _datasourceResponsedataType, async: _async }
            , create: { url: function (data) { return _updateurl; }, type: "POST", dataType: _datasourceResponsedataType, async: _async }
            , parameterMap: _parameterMap
        };
        var _error = setDefaultValue($(that).data('kendo-datasource-error'), null, true);
        var _change = setDefaultValue($(that).data('kendo-datasource-change'), null, true);
        var _requestEnd = setDefaultValue($(that).data('kendo-datasource-requestend'), null, true);

        var _schema = {
            model: { id: _idfield, fields: _fields }, data: function (data) {
                var _value = data['value'];
                if (typeof _value === 'undefined') {
                    _value = data;
                    delete _value['odata.metadata'];
                }
                return _value;
            }, total: function (data) { return data['odata.count']; }
        };

        var _datasource = {
            type: _datasourceRequestdataType, transport: _transport, schema: _schema, pageSize: _gridPagesize, serverPaging: _gridServerPaging, serverFiltering: _gridServerFiltering, serverSorting: _gridServerSorting, sort: _gridSort, aggregate: _aggregate, error: _error, change: _change, requestEnd: _requestEnd, group: _group
        };

        if (_datasource.transport.parameterMap === null) {
            delete _datasource.transport.parameterMap;
        }
        if (_datasource.error === null) {
            delete _datasource.error;
        }
        if (_datasource.change === null) {
            delete _datasource.change;
        }
        if (_datasource.requestEnd === null) {
            delete _datasource.requestEnd;
        }
        if (_datasource.pageSize === null) {
            delete _datasource.pageSize;
        }
        if (_datasource.group === null) {
            delete _datasource.group;
        }
        if ($(that).hasClass('kendoschedulerauto')) {
            return new kendo.data.SchedulerDataSource(_datasource);
        }
        else {
            return new kendo.data.DataSource(_datasource);
        }
    };

    var copyProperties = function (source, target) {
        var _keys = Object.keys(target);
        for (var i = 0; i < _keys.length; i++) {
            var _value = source[_keys[i]];
            if (typeof _value !== 'undefined') {
                target[_keys[i]] = _value;
            }
        }
    };

    var customParameterMap4ODataCRUD = function (data, type) {
        if (type !== "read" && data) {
            var _keys = Object.keys(data);
            for (var i = 0; i < _keys.length; i++) {
                if (_keys[0] === 'SchedulerID' && data[_keys[i]] instanceof Date) {
                    data[_keys[i]] = data[_keys[i]].ChangeToUtc();
                }
                else if (type === 'update' && _keys[0] === 'SchedulerID' && data[_keys[i]] !== null && typeof data[_keys[i]].value !== 'undefined') {
                    data[_keys[i]] = data[_keys[i]].value;
                }
                if (data[_keys[i]] === '') {
                    delete data[_keys[i]];
                }
            }
            return kendo.data.transports.odata.parameterMap(data, type);
        }
        else {
            var _parameterMap = kendo.data.transports.odata.parameterMap(data, type);
            delete _parameterMap.$format;
            return _parameterMap;
        }

    };

    var cascadeCountryProvince = function ($this) {
        var _targetID = $this.attr('cascadetarget');
        if (!isNullOrWhitespace(_targetID)) {
            var $target = $('#' + _targetID);
            if ($this.val().toUpperCase() === "US") {
                var _val = $target.val();
                $target.replaceTag('<select><option>Loading...</option></select>', true);
                $.get('/help/usstates', function (data) {
                    $('#' + _targetID).html(data);
                    $('#' + _targetID).val(_val);
                });
            }
            else {
                if ($target[0].tagName === 'INPUT') {
                    return;
                }
                var _val1 = $target.val();
                $target.replaceTag('<input>', true);
                $target.val(_val1);
            }
        }
    };

    var convertToTabStripContent = function (contentElement) {
        convert2JAMESAjaxContent(contentElement);
    };

    var confirmdeletion = function (e) {
        if (!confirm('Do you want to delete it?')) {
            return false;
        }
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
        CKupdate();
        $.ajax({ type: 'POST', url: $this.attr('action'), data: $this.serialize(), async: $this.data('async') === 'false' ? false : true }).done(function (data) {
            if (actiononly !== true) {
                $(_contentElement).html(data);
                convertToTabStripContent(_contentElement);
                applyKendoUI(_contentElement);
            }
            closewaittingimage($this);
        }).fail(ajaxErrorHandler).always(function () { closewaittingimage($this); });
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
            popupNotification(_errorMessage, 'error');
        }

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
            convertToTabStripContent(contentElement);
            applyKendoUI(contentElement);
            closewaittingimage($(contentElement));
        }).fail(ajaxErrorHandler).always(function () { closewaittingimage($(contentElement)); });
    };
    var openwaittingimage = function ($target) {
        if (isNullOrWhitespace($target)) {
            $target = $('body');
        }
        kendo.ui.progress($target, true);
    };
    var closewaittingimage = function ($target) {
        if (isNullOrWhitespace($target)) {
            $target = $(document);
        }
        kendo.ui.progress($target, false);
    };
    var openscreenblockmessage = function (msg) {
        var $screenblockmessage = $('<div id="screenblockmessage" style="background-color:rgba(0,0,0,0.7);width:100%;height:100%;position:fixed;z-index:10100;top:0;left:0;color:white;text-align:center;padding-top:300px;font-size:x-large;">' + (isNullOrWhitespace(msg) ? '&nbsp;' : msg) + '</div>');
        $('body').append($screenblockmessage);
    };
    var closescreenblockmessage = function () {
        $('#screenblockmessage').remove();
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

    var kendoGridSearch = function (GridId, SearchPanelId, gridtype) {
        var $searchfield = $('#' + SearchPanelId + ' #searchfield option:selected');
        var searchterm = $('#' + SearchPanelId + ' #searchword').val();
        var searchtermdatatype = $searchfield.data('filter-type');
        var _operator = $searchfield.data('filter-operator');
        if (searchtermdatatype === 'int') {
            searchterm = parseInt(searchterm);
            if (isNaN(searchterm)) {
                popupNotification('Please, Input number', 'error');
                searchterm = '';
                _operator = '';
            }
        }
        applyFilterKendoGrid(GridId, $searchfield.val(), searchterm, gridtype, _operator);
    };

    var applyFilterKendoGrid = function (gridId, fieldName, searchword, gridtype, operator) {
        var filters = [];
        if (isNullOrWhitespace(searchword)) {
            _applyFilterKendGrid(gridId, null, filters, gridtype);
        }
        else {
            filters.push({ field: fieldName, operator: isNullOrWhitespace(operator) ? 'contains' : operator, value: searchword });
            _applyFilterKendGrid(gridId, 'and', filters, gridtype);
        }
    };

    var SetReadOnly = function (fieldID, readonlyYn) {
        if (readonlyYn) {
            $("#" + fieldID).css("pointer-events", "none");
            $("#" + fieldID).css("background-color", "#EBEBEB");
            $("#" + fieldID).attr('readonly', 'readonly');
        }
        else {

            $("#" + fieldID).css("pointer-events", "auto");
            $("#" + fieldID).css("background-color", "#FFFFFF");
            $("#" + fieldID).removeAttr('readonly');
        }
    };

    var _applyFilterKendGrid = function (gridId, logic, filters, gridtype) {

        var _dataSource = $('#' + gridId).data(isNullOrWhitespace(gridtype) ? "kendoGrid" : gridtype).dataSource;
        filters = _getDefaultFilter(gridId, filters);
        _dataSource.filter({ logic: logic, filters: filters });
    };
    var _getDefaultFilter = function (gridId, filters) {
        var $defaultsearchconditions = $('.defaultsearchconditions' + gridId + '>.condition');
        var _defaultfilters = [];
        $defaultsearchconditions.each(function (index, item) {
            var $item = $(item);
            var _type = $item.data('type');
            var _value = $item.data("value");
            _defaultfilters.push({ field: $item.data("field"), operator: $item.data("operator"), value: typeof _type === "undefined" ? _value : _type === 'Date' ? new Date(_value) : _type === 'Int' ? parseInt(_value) : _type === 'Float' ? parseFloat(_value) : _type === 'String' ? _value.toString() : _value });
        });
        var $searchpanel = $('.searchpanel' + gridId);
        if (!isNullOrWhitespace($searchpanel)) {
            var $searchfield = $searchpanel.find('.searchfield' + gridId);
            var $searchword = $searchpanel.find('.searchword' + gridId);
            if (!isNullOrWhitespace($searchword)) {
                var _searchword = $searchword.val();
                if (!isNullOrWhitespace(_searchword)) {
                    _defaultfilters.push({ field: $searchfield.val(), operator: 'contains', value: _searchword });
                }
            }
        }
        if (_defaultfilters.length > 0) {
            filters.push({ logic: $('.defaultsearchconditions' + gridId).data('logic'), filters: _defaultfilters });
        }
        return filters;
    };
    var CKupdate = function () {
        if (typeof CKEDITOR === 'undefined') {
            return;
        }
        for (instance in CKEDITOR.instances)
            $('#' + instance).val(htmlEncode(CKEDITOR.instances[instance].getData()));
    };

    var htmlEncode = function (value) {
        return $('<div/>').text(value).html();
    };

    var htmlDecode = function (value) {
        return $('<div/>').html(value).text();
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

    var NullDate = function (input) {
        if (typeof input === 'undefined') return true;
        if (typeof input === 'object') {
            if (input === null) return '';
            return input;
        }
        if (typeof input === 'string') {
            if (input === null) return '';
            return input;
        }
        else {
            return input;
        }
    };

    var setCommandURLwithsomeGridRowID = function (that, gridID, commandURL, IDPropertyName, NotSelectedMsg) {
        var _selectedDataItem = getSelectedItem(gridID);
        if (_selectedDataItem === null) {
            $(that).attr('href', '#');
            if (NotSelectedMsg !== null && typeof NotSelectedMsg !== 'undefined') {
                popupNotification(NotSelectedMsg, 'error');
            }
            return false;
        }
        else {
            $(that).attr('href', commandURL + _selectedDataItem[IDPropertyName]);
            return true;
        }
    };

    var reloadKendoGrid = function (gridId, gridtype) {
        $('#' + gridId).data(isNullOrWhitespace(gridtype) ? "kendoGrid" : gridtype).dataSource.read();
    };

    var setKendoTabs = function (tabStripId, urls, selectedTabIndex) {
        $('#' + tabStripId).show();
        var _tabStrip = $('#' + tabStripId).data('kendoTabStrip');
        for (var i = 0; i < urls.length; i++) {
            GoUrlOnTabStrip(urls[i], _tabStrip.contentElements[i]);
        }
        if (!isNullOrWhitespace(selectedTabIndex)) {
            _tabStrip.select(selectedTabIndex);
        }
    };

    var getSelectedItem = function (gridId, gridtype) {
        var entityGrid = $('#' + gridId).data(isNullOrWhitespace(gridtype) ? "kendoGrid" : gridtype);
        return entityGrid.dataItem(entityGrid.select()[0]);
    };

    var closelayer = function (layerid) {
        $('#' + layerid).hide();
    };

    var showlayer = function (layerid) {
        var $targetlayer = $('#' + layerid).show();
        if (typeof event !== 'undefined') {
            if (typeof event.x !== 'undefined' && event.srcElement !== null) {
                if ($targetlayer.css('position') === 'fixed') {
                    $targetlayer.offset({
                        top: Math.max(0, ($(window).height() - $targetlayer.outerHeight()) / 2),
                        left: Math.max(0, ($(window).width() - $targetlayer.outerWidth()) / 2)
                    });
                }
            }
        }
    };

    var removeAllSpecialChars = function (value) {
        return value.replace(/[^a-zA-Z ]/g, '');
    };

    var _popupNotification;

    var popupNotification = function (msg, type) {
        //"info", "success", "warning" and "error"
        _popupNotification.show(msg, type);
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
                    convertToTabStripContent(this.element);
                    applyKendoUI(this.element);
                    this.center();
                    this.open();
                    closewaittingimage($('body'));
                }
            });
            var dialog1 = $('#' + windowID).data('kendoWindow');
        }
    };

    var popupWindowWithHeight = function (windowID, url, title, width, height, message, okfunction) {
        if (isNullOrWhitespace(title)) {
            title = 'Untitled';
        }
        if (isNullOrWhitespace(width)) {
            width = '500px';
        }
        if (isNullOrWhitespace(height)) {
            height = '500px';
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
                height: height,
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
                maxWidth: width,
                maxHeight: height,
                actions: ['Minimize', 'Maximize', 'Close'],
                title: title,
                close: function () {
                    $('#' + windowID).parent().remove();
                },
                visible: false,
                content: url,
                refresh: function () {
                    convertToTabStripContent(this.element);
                    applyKendoUI(this.element);
                    this.center();
                    this.open();
                    closewaittingimage($('body'));
                }
            });
            var dialog1 = $('#' + windowID).data('kendoWindow');
        }
    };

    var popupWindowFixed = function (windowID, url, title, width, height, message, okfunction) {
        if (isNullOrWhitespace(title)) {
            title = 'Untitled';
        }
        if (isNullOrWhitespace(width)) {
            width = '500px';
        }
        if (isNullOrWhitespace(height)) {
            height = '500px';
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
                height: height,
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
                height: height,
                actions: ['Minimize', 'Maximize', 'Close'],
                title: title,
                close: function () {
                    $('#' + windowID).parent().remove();
                },
                visible: false,
                content: url,
                refresh: function () {
                    convertToTabStripContent(this.element);
                    applyKendoUI(this.element);
                    this.center();
                    this.open();
                    closewaittingimage($('body'));
                }
            });
            var dialog1 = $('#' + windowID).data('kendoWindow');
        }
    };

    var closePopupWindow = function (windowID, functionName) {
        $('#' + windowID).parent().remove();
        //$.unblockUI();
        if (typeof functionName === 'function') {
            functionName();
        }
        else if (typeof functionName === 'string') {
            if (typeof window[functionName] === 'function') {
                window[functionName]();
            }
        }
    };

    var isFunction = function (functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    };

    var DateDiff = {

        inSeconds: function (d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2 - t1) / (1000));
        },

        inMinutes: function (d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2 - t1) / (60 * 1000));
        },

        inHours: function (d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2 - t1) / (3600 * 1000));
        },

        inDays: function (d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2 - t1) / (24 * 3600 * 1000));
        },

        inWeeks: function (d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
        },

        inMonths: function (d1, d2) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();

            return d2M + 12 * d2Y - (d1M + 12 * d1Y);
        },

        inYears: function (d1, d2) {
            return d2.getFullYear() - d1.getFullYear();
        }
    };

    var DateTimeFormatString = function (_date, _formatstring) {
        return _date === null ? '' : kendo.toString(new Date(_date), _formatstring);
    };

    var ISODatetoLocaleDateString = function (ISODate) {
        if (isNullOrWhitespace(ISODate)) {
            return '';
        }
        date = new Date(ISODate);
        var now_utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return now_utc.toLocaleDateString();
    };

    var ISODatetoNotUTCLocaleDateString = function (ISODate) {
        if (isNullOrWhitespace(ISODate)) {
            return '';
        }
        var d = new Date(ISODate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        return [month, day, year].join('/');
    };

    var ISODatetoNotUTCTimeLocaleDateString = function (ISODate) {
        if (isNullOrWhitespace(ISODate)) {
            return '';
        }

        var d = new Date(ISODate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        hour = d.getHours();
        minutes = d.getMinutes();
        seconds = d.getSeconds();
        return [month, day, year].join('/') + " " + [hour, minutes, seconds].join(':');
    };

    Date.prototype.addDays = function (num) {
        var value = this.valueOf();
        value += 86400000 * num;
        return new Date(value);
    };

    Date.prototype.ChangeToUtc = function () {
        var date = this;
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    };
    var bodyContentMargin = function () {
        fixBodyContentTopMargin();
        $(window).bind('resize', function () {
            fixBodyContentTopMargin();
        });
    };

    var fixBodyContentTopMargin = function () {
        $('.body-content').css('margin-top', $('.navbar-fixed-top').height() - 30 + 'px');
    };

    var printTabContent = function (tabstripid, index, pdf_file_name, noPDF) {
        if (isNullOrWhitespace(noPDF)) {
            noPDF = false;
        }
        if (noPDF) {
            printContent($($('#' + tabstripid + '>.k-content')[index]));
        }
        else {
            downloadPDFContent($($('#' + tabstripid + '>.k-content')[index]), pdf_file_name);
        }
    };

    var printContent = function ($content) {
        //$content.printThis({
        //    importCSS: true,
        //    importStyle:true,
        //    loadCSS: "",
        //    header: null
        //});
    };

    var downloadPDFContent = function ($content, proxyURL, filename, inline, buttons) {
        openscreenblockmessage('Waiting for printing documents.');
        hideforPDF($content);
        var _scale = (isNullOrWhitespace($content.data("scale")) ? null : parseFloat($content.data("scale")));
        var _paperSize = isNullOrWhitespace($content.data("papersize")) ? "auto" : $content.data("papersize");
        var _kendoDrawingSettings = {
            margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" },
            keepTogether: ".prevent-split",
            forcePageBreak: ".pdf-page-break"
        };
        if (_paperSize != null)
            _kendoDrawingSettings.paperSize = _paperSize;
        if (_scale != null)
            _kendoDrawingSettings.scale = _scale;

        kendo.drawing.drawDOM($content, _kendoDrawingSettings)
            .then(function (group) {
                return kendo.drawing.exportPDF(group, {
                });
            })
            .done(function (data) {
                restoreHiddenElementsForPDF($content);
                var $newprintembed = $('<div id="printtempwrapper" style="position:fixed;left:0;top:0;width:100%;height:100%;z-index:11000;background-color:white;"><div class="pull-right buttonarea" style="text-align:right;" ><button type="button" class="btn btn-danger" style="margin:10px;" onclick="$(\'#printtempwrapper\').remove();" >Close print window</button></div><h3 style="padding-left:10px;">PRINT DOCUMENTS</h3><iframe id="printtemp" name="printtemp" style="width:100%;height:100%;"></iframe></div>');
                if (proxyURL === undefined) {
                    $newprintembed.find('#printtemp').attr('src', data);
                    $('body').append($($newprintembed));
                }
                else {
                    var $tempform = $('<form action="' + proxyURL + '" method="post" target="printtemp"><input type="hidden" name="data" /><input type="hidden" name="filename" /><input type="hidden" name="inline" /></form>');
                    $('body').append($($tempform));
                    $tempform.find('input[name="data"]').val(data);
                    $tempform.find('input[name="filename"]').val(filename);
                    $tempform.find('input[name="inline"]').val(inline === true ? true : false);
                    if (inline === true) {
                        $newprintembed.find('#printtemp').attr('src', 'about:blank');
                        var $closebutton = $newprintembed.find('.buttonarea>button');
                        buttons.forEach(function (button, index) { $('<button></button>').text(button.text).addClass(button.class).on('click', button.function).insertBefore($closebutton); });

                        $('body').append($($newprintembed));
                    }
                    else {
                        $('body').append($($newprintembed));
                        $newprintembed.hide();
                    }
                    $tempform.submit();
                    $tempform.remove();
                }
                closescreenblockmessage();
            });
    };
    var hideforPDF = function ($content) {
        $content.find('button').addClass('hide4pdf');
        $content.find('.btn').addClass('hide4pdf');
        $content.find('.span-btn').addClass('hide4pdf');
        $content.find('.k-grid-filter').addClass('hide4pdf');
        $content.find('input[type="file"]').addClass('hide4pdf');
        $content.find('.noscroll4pdf').css('width', 'initial').css('max-width', 'initial').css('overflow-x', 'visible');
        $content.find('.remove4pdf').css('display', 'none');
        $content.find('.whitespaceinitialpdf').css('white-space', 'initial');
    };
    var restoreHiddenElementsForPDF = function ($content) {
        $content.find('.hide4pdf').removeClass('hide4pdf');
        $content.find('.noscroll4pdf').css('width', '').css('max-width', '').css('overflow-x', '');
        $content.find('.remove4pdf').css('display', '');
        $content.find('.whitespaceinitialpdf').css('white-space', '');
    };
    var formattedDateString = function (n) {
        var date = new Date();
        var datestring = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

        if (n === null || isNaN(n)) {
            return datestring;
        }

        return n;
    };
    var isDate = function (date) {
        return date instanceof Date && !isNaN(date.valueOf());
    }
    var isDateString = function (datestring) {
        date = new Date(datestring);
        return date instanceof Date && !isNaN(date.valueOf());
    }

    var getDateTicks = function (date) {
        return ((date.getTime() * 10000) + 621355968000000000);
    };

    var getToDateString = function () {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;
        //var date = new Date();
        //var month = (("" + (date.getMonth() + 1)).length < 2 ? "0" : "") + (date.getMonth() + 1);
        //var day = (("" + (date.getDate())).length < 2 ? "0" : "") + date.getDate();
        //var year = date.getFullYear();
        //var today = year + '-' + month + '-' + day;
        return today;
    };

    var getDateSettingString = function (yr, mt, dy) {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (yr !== "") {
            yyyy = yyyy - yr;
        }
        if (mt !== "") {
            mm = mm - mt;
        }
        if (dy !== "") {
            dd = dd - dy;
        }

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;
        //var date = new Date();
        //var month = (("" + (date.getMonth() + 1)).length < 2 ? "0" : "") + (date.getMonth() + 1);
        //var day = (("" + (date.getDate())).length < 2 ? "0" : "") + date.getDate();
        //var year = date.getFullYear();
        //var today = year + '-' + month + '-' + day;
        return today;
    };

    var ConvertToDecimalPlaceDigit = function (m) {
        if (typeof m === 'undefined') {
            m = getDecimalplacesdigit('Default');
        }
        if (!$.isNumeric(m)) {
            m = getDecimalplacesdigit(m);
        }
        return m;
    };

    var formattedNumberString = function (n, m) {
        if (n === null || isNaN(parseFloat(n))) {
            return "";
        }
        m = ConvertToDecimalPlaceDigit(m);
        return parseFloat(n).toFixed(m);
    };

    var formattedAttributeString = function (Attribute1, Attribute2, Attribute3, Attribute4) {

        var v_Attribute1 = "";
        var v_Attribute2 = "";
        var v_Attribute3 = "";
        var v_Attribute4 = "";

        if (typeof Attribute1 !== 'undefined') {
            if (Attribute1 !== null) {
                v_Attribute1 = Attribute1;
            }
        }

        if (typeof Attribute2 !== 'undefined') {
            if (Attribute2 !== null) {
                v_Attribute2 = " , " + Attribute2;
            }
        }

        if (typeof Attribute3 !== 'undefined') {
            if (Attribute3 !== null) {
                v_Attribute3 = " , " + Attribute3;
            }
        }

        if (typeof Attribute4 !== 'undefined') {
            if (Attribute4 !== null) {
                v_Attribute4 = " , " + Attribute4;
            }
        }

        return v_Attribute1 + v_Attribute2 + v_Attribute3 + v_Attribute4;
    };

    var formattedNumberStringwithComma = function (n, m) {
        if (n === null || isNaN(parseFloat(n))) {
            return "";
        }
        m = ConvertToDecimalPlaceDigit(m);
        return addCommas(parseFloat(n).toFixed(m).toString());

    };

    var formattedNumberStringwithCommaR = function (n, m) {
        if (n === null || isNaN(parseFloat(n))) {
            return "";
        }
        m = ConvertToDecimalPlaceDigit(m);
        return "<div style='text-align:right;'>" + addCommas(parseFloat(n).toFixed(m).toString()) + "</div>";

    };

    var addCommas = function (nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    };

    var setBackgroundColor = function (field, column) {
        if (field.readonly === true) {
            column.css("background", "#F8F8F8");
        }
        else {
            column.css("background", "white");
        }
    };

    var setColumnTextAlign = function (field, column) {
        if (typeof field.dropdown !== 'undefined') {
            column.css("text-align", "center");
        }
        else {
            if (field.type === "int" || field.type === "float") {
                column.css("text-align", "right");
            }
            else if (field.type === "date") {
                column.css("text-align", "center");
            }
        }
    };

    var checkValidationFields = function (field, o, cell) {
        var isValid = true;

        for (var i = 0; i < field.length; i++) {
            var validation = field[i].validation;
            if (validation !== undefined && validation.required) {
                if (o[field[i].field] === "") {
                    isValid = false;

                    popupNotification('Plese input ' + field[i].field + ' column', 'validation error');

                    var style = cell[i].attributes[2].textContent.replace('background: white;', 'background: pink;');
                    cell[i].attributes[2].textContent = style;
                    cell[i].focus();
                }
                else {
                    var style1 = cell[i].attributes[2].textContent.replace('background: pink;', 'background: white;');
                    cell[i].attributes[2].textContent = style1;
                }
            }
        }

        return isValid;
    };

    var setZone = function (value) {
        if (value !== null && value !== "") {
            $.get({
                async: false,
                url: '/odata/WarehouseZones?$filter=WarehouseID%20eq%20' + value,
                success: function (data) {
                    $('#ZoneID').empty();

                    if (data.value.length > 0) {
                        $('#ZoneID').append($('<option>', { value: null, text: "Please Select" }));

                        for (i = 0; i < data.value.length; i++) {
                            $('#ZoneID').append($('<option>', { value: data.value[i].ZoneID, text: data.value[i].ZoneCode }));
                        }

                        $('#ZoneID')[0].options.selectedIndex = 1;
                    }
                }
            });

            setSection($('#ZoneID').val());
        }
        else {
            $('#ZoneID').empty();
            $('#SectionID').empty();
            $('#PickingLocationID').empty();
        }
    };

    var setSection = function (value) {
        if (value !== null && value !== "") {
            var warehouseid = $('#WarehouseID').val();

            $.get({
                async: false,
                url: '/odata/WarehouseSections?$filter=WarehouseID%20eq%20' + warehouseid + '%20and%20ZoneID%20eq%20' + value,
                success: function (data) {
                    $('#SectionID').empty();

                    if (data.value.length > 0) {
                        $('#SectionID').append($('<option>', { value: null, text: "Please Select" }));

                        for (i = 0; i < data.value.length; i++) {
                            $('#SectionID').append($('<option>', { value: data.value[i].SectionID, text: data.value[i].SectionCode }));
                        }

                        $('#SectionID')[0].options.selectedIndex = 1;
                    }
                }
            });

            setLocation($('#SectionID').val());
        }
        else {
            $('#SectionID').empty();
            $('#PickingLocationID').empty();
        }
    };

    var setLocation = function (value) {
        if (value !== null && value !== "") {
            var warehouseid = $('#WarehouseID').val();
            var zoneid = $('#ZoneID').val();

            $.get({
                async: false,
                url: '/odata/WarehouseLocations?$filter=WarehouseID%20eq%20' + warehouseid + '%20and%20ZoneID%20eq%20' + zoneid + '%20and%20SectionID%20eq%20' + value,
                success: function (data) {
                    $('#PickingLocationID').empty();

                    if (data.value.length > 0) {
                        $('#PickingLocationID').append($('<option>', { value: null, text: "Please Select" }));

                        for (i = 0; i < data.value.length; i++) {
                            $('#PickingLocationID').append($('<option>', { value: data.value[i].LocationID, text: data.value[i].LocationCode }));
                        }

                        $('#PickingLocationID')[0].options.selectedIndex = 1;
                    }
                }
            });
        }
        else {
            $('#PickingLocationID').empty();
        }
    };

    var noDecimalNumberString = function (n, m) {
        if (n === null || isNaN(parseFloat(n))) {
            return "";
        }
        if (typeof m === 'undefined') {
            m = 0;
        }
        return parseFloat(n).toFixed(m);
    };

    var getPropertyValueByName = function (o, n) {
        var names = n.split('.');
        var _value = null;
        for (var i = 0; i < names.length; i++) {
            if (i === 0) {
                _value = o[names[i]];
            }
            else {
                _value = _value[names[i]];
            }
        }
        return _value;
    };

    $.extend({
        replaceTag: function (currentElem, newTagObj, keepProps) {
            var $currentElem = $(currentElem);
            var $newTag = $(newTagObj).clone();
            if (keepProps) {//{{{
                newTag = $newTag[0];
                newTag.className = currentElem.className;
                for (var i = 0; i < currentElem.attributes.length; i++) {
                    $newTag.attr(currentElem.attributes[i].name, currentElem.attributes[i].value);
                }
            }//}}}
            $currentElem.replaceWith($newTag);
            return this; // Suggested by ColeLawrence
        }
    });

    $.fn.extend({
        replaceTag: function (newTagObj, keepProps) {
            // "return" suggested by ColeLawrence
            return this.each(function () {
                jQuery.replaceTag(this, newTagObj, keepProps);
            });
        }
    });


    var ApplyAjaxPattern = function ($documentElement) {
        $documentElement.find('.ApplyAjaxPattern').each(function () {
            convert2JAMESAjaxContent(this);
        });
    };

    var OpenReportPrintViewer = function (paramSet) {
        OpenReportPrintWin(paramSet);
    };

    var OpenReportPrintWin = function (paramSet) {
        var ua = window.navigator.userAgent;
        var isEdge = ua.indexOf("Edge");

        if (isEdge >= 0) {
            ExportData("/Report/ExportReportToPDF", toObjectForExportData(paramSet));
        }
        else {
            OpenScrollWindow4Rpt("/Report/ReportViewer", 1365, 850, paramSet);
        }
    };

    var OpenScrollWindow4Rpt = function (popupUrl, winWidth, winHeight, paramSet) {
        var milliseconds = new Date().getTime();
        var windowName = "popup_map" + milliseconds;
        var mapForm = GetOpenWindowDmyForm(popupUrl);

        SetOpenWindowParams(mapForm, paramSet);
        mapForm.target = windowName;


        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var xpos = screen.width / 2 - winWidth / 2 + dualScreenLeft;
        var ypos = screen.height / 2 - winHeight / 2 + dualScreenTop;

        var windowFeatures = "top=" + 0 + ",left=" + xpos + ",width=" + winWidth + ",height=" + winHeight + ",toolbar=no,status=no,directories=no,location=no,resizable=yes,border=0,menubar=no";

        var map = window.open('', windowName, windowFeatures);

        if (map) {
            mapForm.submit();

            if (window.focus) {
                map.focus();
            }
        } else {
            alert('please allow pop-ups.');
        }
    };

    var getOffsetTop = function (el) {
        var top = 0;
        if (el.offsetParent) {
            do { top += el.offsetTop; }
            while (el === el.offsetParent);
            return [top - 72];
        }
    };

    var AlertMessage = function (message, okfunction) {
        if (isNullOrWhitespace(message)) {
            message = "Please check the information that is not entered.";
        }
        popupWindow('AlertPopUP', null, 'MessageBox', '500px', message, okfunction);
    };

    var AlertMessageSize = function (message, boxsize, id) {
        if (message !== "") {
            popupWindow('AlertPopUP', '/PopupLayout/Alert?message=' + message + '&id=' + id + '', 'MessageBox', '' + boxsize + 'px');
        }
        else {
            message = "Please check the information that is not entered.";
            popupWindow('AlertPopUP', '/PopupLayout/Alert?message=' + message + '&id=' + id + '', 'MessageBox', '' + boxsize + 'px');
        }
    };

    var GetOpenWindowDmyForm = function (popupUrl) {

        var mapForm = document.createElement("form");

        mapForm.method = "POST";
        mapForm.action = popupUrl;

        return mapForm;
    };

    var SetOpenWindowParams = function (mapForm, paramSet) {
        //if (IsNullOrEmpty(paramSet) == false && (paramSet.length > 0)) {
        if (paramSet.length > 0) {

            $.each(paramSet, function (i, p) {
                var mapInput = document.createElement("input");
                mapInput.type = "hidden";
                mapInput.name = p.text;
                mapInput.value = p.value;
                mapForm.appendChild(mapInput);
            });

            document.body.appendChild(mapForm);
        }
    };

    var goPreviousRow = function (gridId, pagename, id) {
        var grid = $("#" + gridId).data("kendoGrid");
        grid.movepreviousrow();
    };

    var goNextRow = function (gridId, pagename, id) {
        var grid = $("#" + gridId).data("kendoGrid");
        grid.movenextrow();
    };

    var goPreviousRow2 = function (gridId, pagename, id) {
        var grid = $("#" + gridId).data("kendoGrid");
        var rowIndex = $("#" + gridId).find("tbody>tr[data-uid=" + getSelectedItem(gridId).uid + "]")[0].rowIndex;
        var pageNo = grid.dataSource._page;

        if (pageNo === 1 && rowIndex < 1) {
            if (rowIndex < 1) {
                $('btnPrevioius').prop("disabled", true);
            }
            else {
                $('btnPrevioius').prop("disabled", false);
                var uid = grid.dataSource.at(rowIndex - 1).uid;
                grid.select("tr[data-uid='" + uid + "']");

                id = $($($("#" + gridId).find("tbody>tr[data-uid=" + getSelectedItem(gridId).uid + "]")[0]).find('td')[0]).text();
                if (id !== "") {
                    popupWindow('CompletePopup', '/' + pagename + '/edit/?id=' + id + '', 'Complete PutAway');
                }

                //$.get({
                //    async: false,
                //    url: '/' + pagename + '/Edit',
                //    data: { id: id }
                //});
            }
        }
        else {
            if (rowIndex < 1) {
                // set Page
                grid.dataSource._page = pageNo - 1;

                // get previous data
                $('btnPrevioius').prop("disabled", false);
                var uid1 = grid.dataSource.at(rowIndex - 1).uid;
                grid.select("tr[data-uid='" + uid1 + "']");

                id = $($($("#" + gridId).find("tbody>tr[data-uid=" + getSelectedItem(gridId).uid + "]")[0]).find('td')[0]).text();
                if (id !== "") {
                    popupWindow('CompletePopup', '/' + pagename + '/edit/?id=' + id + '', 'Complete PutAway');
                }

                //$.get({
                //    async: false,
                //    url: '/' + pagename + '/Edit',
                //    data: { id: id }
                //});
            }
            else {
                $('btnPrevioius').prop("disabled", false);
                var uid2 = grid.dataSource.at(rowIndex - 1).uid;
                grid.select("tr[data-uid='" + uid2 + "']");

                id = $($($("#" + gridId).find("tbody>tr[data-uid=" + getSelectedItem(gridId).uid + "]")[0]).find('td')[0]).text();
                if (id !== "") {
                    popupWindow('CompletePopup', '/' + pagename + '/edit/?id=' + id + '', 'Complete PutAway');
                }

                //$.get({
                //    async: false,
                //    url: '/' + pagename + '/Edit',
                //    data: { id: id }
                //});
            }
        }
    };

    var goNextRow2 = function (gridId, pagename, id) {
        BindingFlag = 1;
        var grid = $("#" + gridId).data("kendoGrid");
        var rowIndex = $("#" + gridId).find("tbody>tr[data-uid=" + getSelectedItem(gridId).uid + "]")[0].rowIndex;
        var pageNo = grid.dataSource._page;

        if (rowIndex === grid.dataSource._pageSize) {
            $('btnNext').prop("disabled", true);
        }
        else {
            $('btnNext').prop("disabled", false);
            var uid = grid.dataSource.at(rowIndex + 1).uid;
            grid.select("tr[data-uid='" + uid + "']");
            id = $($($("#" + gridId).find("tbody>tr[data-uid=" + getSelectedItem(gridId).uid + "]")[0]).find('td')[0]).text();
            if (id !== "") {
                popupWindow('CompletePopup', '/' + pagename + '/edit/?id=' + id + '', 'Complete PutAway');
                //$.get({
                //    async: false,
                //    url: '/' + pagename + '/Edit',
                //    data: {
                //        id: id
                //    }
                //});
            }

        }
    };

    var SelectCurrentRow = function (gridId, pagename, id, type) {
        //var grid = $("#" + gridId).data("kendoGrid");
        //var rowIndex = $("#" + gridId).find("tbody>tr[data-uid=" + getSelectedItem(gridId).uid + "]")[0].rowIndex;

        //if (type == "Create"){
        //    SelectedrowIndex = 0 ;
        //    BindingFlag = 1;
        //    gridIDValue = gridId;
        //}
        //else {
        //    SelectedrowIndex = rowIndex;
        //    BindingFlag = 1;
        //    gridIDValue = gridId;
        //}
    };

    var GetBindingChk = function (BindingFlag) {

        var resultBinding = true;
        if (BindingFlag === 0) {
            resultBinding = false;
        } else {
            resultBinding = true;
        }

        return resultBinding;
    };

    var applyTableFilter = function (searchword, tableID, applyfiltering) {

        searchword = searchword.toUpperCase();
        var $table = $('#' + tableID);
        var $rows = $table.find('tr').each(
            function (idx, eachobject) {
                var $eachobject = $(eachobject);
                var _filteringvalue = $eachobject.data('filteringvalue');
                if (_filteringvalue !== undefined) {
                    _filteringvalue = _filteringvalue.toString().toUpperCase();
                    if (_filteringvalue.indexOf(searchword) === 0 || applyfiltering === false) {
                        $eachobject.show();
                    }
                    else {
                        $eachobject.hide();
                    }
                }
            }
        );
    };

    var applyGridFilter = function (searchword, $table, applyfiltering) {
        searchword = searchword.toUpperCase();
        var $rows = $table.find('tr').each(
            function (idx, eachobject) {
                var $eachobject = $(eachobject);
                var _filteringvalue = $eachobject.text();
                if (_filteringvalue !== undefined) {
                    _filteringvalue = _filteringvalue.toString().toUpperCase();
                    if (_filteringvalue.indexOf(searchword) >= 0 || applyfiltering === false) {
                        $eachobject.show();
                    }
                    else {
                        $eachobject.hide();
                    }
                }
            }
        );
    };

    var scrollToTop = function () {
        window.scrollTo(0, 0);
    };
}
var URLExists = function (url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status === 200) {
        return true;
    }
    else {
        return false;
    }
};
//charts
{
    var chartcolors = ['rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)'];

    var addInventoryChart = function (chart, Label, data, color) {
        if (typeof color === 'undefined' || color === null) {
            color = 'rgba(255,99,132,1)';
        }
        chart.config.data.datasets.push({
            label: Label,
            data: data,
            backgroundColor: [
                'transparent'
            ],
            borderColor: [
                color
            ],
            borderWidth: 1
        });
        chart.update();
        return chart;
    };

    var drawInventoryChart = function (chartDivId, Label, data, color) {
        if (typeof color === 'undefined' || color === null) {
            color = 'rgba(255,99,132,1)';
        }
        var ctx = document.getElementById(chartDivId).getContext('2d');
        var myChart = data === null ? new Chart(ctx, {
            type: 'line',
            options: {

                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }) : new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: Label,
                    data: data,
                    backgroundColor: [
                        'transparent'
                    ],
                    borderColor: [
                        color
                    ],
                    borderWidth: 1
                }]
            },
            options: {

                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        return myChart;
    };
}
//image tooltip
var $imagetooltip = null;
var showimagetooltip = function (thumbimage, e, height = 400) {
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
var showimagetooltipmulti = function (thumbimage, e, height = 400) {
    if ($imagetooltip === null) {
        $imagetooltip = $('<div id="imagetooltip" style="display:none;position:absolute;z-index:100000;height:' + height + 'px;"></div>');
        $('body').append($imagetooltip);
    }
    $imagetooltip.width(`${$(thumbimage).data('bigsrc').length * 266}px`);

    if ($imagetooltip.css('display') === 'none') {
        if ($imagetooltip.find('#tooltipimageviewer').data('bigsrc') !== $(thumbimage).data('bigsrc')) {
            var html = "<div id='tooltipimageviewer' data-bigsrc='" + $(thumbimage).data('bigsrc') + "' style='white-space: nowrap;'>";
            $.each($(thumbimage).data('bigsrc'), function (_, e) {
                html += '<img id="tooltipimageviewer" src="' + e + '" style="width:266px;max-height:100%;" />';
            });
            html += "</div>";

            $imagetooltip.html(html);
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
var showimagetooltipwithtext = function (thumbimage, text, e) {
    if ($imagetooltip === null) {
        $imagetooltip = $('<div id="imagetooltip" style="display:none;position:absolute;z-index:100000;width:266px;height:400px;"></div>');
        $('body').append($imagetooltip);
    }
    if ($imagetooltip.css('display') === 'none') {
        if ($imagetooltip.find('#tooltipimageviewer').attr('src') !== $(thumbimage).data('bigsrc')) {
            var imageHtml =
                '<div style="display: inline-block; text-align: center;">' +
                '<img id="tooltipimageviewer" src="' + $(thumbimage).data('bigsrc') + '" style="max-width:100%;max-height:100%;" />' +
                '<div style="font-weight:bold;">' + text + '</div>'
            '</div>';

            $imagetooltip.html(imageHtml);
        }
        $imagetooltip.show();
    }
    $imagetooltip.css({
        left:
            (e.pageX + 10 > window.innerWidth + window.scrollX - $imagetooltip.width()) ? (window.innerWidth - $imagetooltip.width() - 30) : e.pageX + 10,
        top:
            (e.pageY + 20 + $imagetooltip.height() > window.innerHeight + window.scrollY) ? (e.pageY - $imagetooltip.height() - 20) : e.pageY + 20
    });
};
var $styleallcolorimages = null;
var showimagetooltipstyleallcolors = function (e, styleno, poseason) {
    if ($styleallcolorimages === null) {
        $styleallcolorimages = $('<div id="styleallcolorimages" style="display:none;position:absolute;z-index:100000;background-color:white;display:nonw;padding:10px;border:1px solid #eee;border-radius:3px;margin-right:10px;"></div>');
        $('body').append($styleallcolorimages);
    }
    if ($styleallcolorimages.data('styleno') !== styleno) {
        $styleallcolorimages.html("<h3 class=\"text-center\">Loading...</h3>");
        $styleallcolorimages.show();
        var randomNumber = Math.random();
        $.get('/styles/viewallcolorimages/' + styleno + '?poseason=' + escape(poseason) + '&_=' + randomNumber).done(function (html) {
            $styleallcolorimages.html(html);
            $styleallcolorimages.css({
                left:
                    (e.pageX + 10 > window.innerWidth + window.scrollX - $styleallcolorimages.width()) ? (window.innerWidth - $styleallcolorimages.width() - 30) : e.pageX + 10,
                top:
                    (e.pageY + 20 + $styleallcolorimages.height() > window.innerHeight + window.scrollY) ? (e.pageY - $styleallcolorimages.height() - 20) : e.pageY + 20
            });
        });
        $styleallcolorimages.data('styleno', styleno);
        $styleallcolorimages.show();
        $styleallcolorimages.css({
            left:
                (e.pageX + 10 > window.innerWidth + window.scrollX - $styleallcolorimages.width()) ? (window.innerWidth - $styleallcolorimages.width() - 30) : e.pageX + 10,
            top:
                (e.pageY + 20 + $styleallcolorimages.height() > window.innerHeight + window.scrollY) ? (e.pageY - $styleallcolorimages.height() - 20) : e.pageY + 20
        });
    }
    else {
        $styleallcolorimages.toggle();
        $styleallcolorimages.css({
            left:
                (e.pageX + 10 > window.innerWidth + window.scrollX - $styleallcolorimages.width()) ? (window.innerWidth - $styleallcolorimages.width() - 30) : e.pageX + 10,
            top:
                (e.pageY + 20 + $styleallcolorimages.height() > window.innerHeight + window.scrollY) ? (e.pageY - $styleallcolorimages.height() - 20) : e.pageY + 20
        });
    }
};
var showimagetooltipstyleallcolorsRev = function (e, styleno, poseason, zindex) {
    var $styleallcolorimages = null;
    if ($('.styleallcolorimages[data-styleno="' + styleno + '"]').length === 0) {
        $styleallcolorimages = $(`<div style="position:fixed; top:10px;display:inline-block;${zindex == undefined ? "z-index:999;" : "z-index:" + zindex + ";"} background-color: white; padding: 5px; border: 1px solid #eee; border - radius: 3px; margin - right: 10px; " class="styleallcolorimages ui - widget - content" data-styleno="${styleno} "></div>`);
        $('body').append($styleallcolorimages);
        $styleallcolorimages.html("<h3 class=\"text-center\">Loading...</h3>");
        $styleallcolorimages.show();
        $styleallcolorimages.draggable();
        var randomNumber = Math.random();
        $.get('/styles/viewallcolorimages/' + styleno + '?poseason=' + escape(poseason) + '&_=' + randomNumber).done(function (html) {
            $styleallcolorimages.html('<div class="contentwrapper" style="max-width:800px;padding:0;margin:0;"><div style="height: calc(100% - 20px);overflow:auto;"><div class="pull-right"><button onclick="$(\'.styleallcolorimages\').remove();" style="margin-right:5px;">Close all</a> <button onclick="$(this).parent().parent().parent().parent().remove();">X</a></div>' + html + '</div></div>');
            $styleallcolorimages.find('.contentwrapper').resizable();
            $styleallcolorimages.css({
                left:
                    e.clientX + $styleallcolorimages.width() > window.innerWidth ? window.innerWidth - $styleallcolorimages.width() : e.clientX,
                top:
                    e.clientY + $styleallcolorimages.height() > window.innerHeight ? window.innerHeight - $styleallcolorimages.height() : e.clientY,
            });
        });
        $styleallcolorimages.css({
            left:
                e.clientX + $styleallcolorimages.width() > window.innerWidth ? window.innerWidth - $styleallcolorimages.width() : e.clientX,
            top:
                e.clientY + $styleallcolorimages.height() > window.innerHeight ? window.innerHeight - $styleallcolorimages.height() : e.clientY,
        });
        $styleallcolorimages.on('click', function () { bringFront($(this), '.styleallcolorimages'); });
    }
};
var showimagetooltipstyleallcolorsPO = function (e, styleno, poseason) {
    var $styleallcolorimages = null;
    if ($('.styleallcolorimages[data-styleno="' + styleno + '"]').length === 0) {
        $styleallcolorimages = $(`<div style="position:fixed; top:10px;display:inline-block;background-color:white;padding:5px;border:1px solid #eee;border-radius:3px;margin-right:10px;" class="styleallcolorimages ui-widget-content" data-styleno="${styleno}"></div>`);
        $('body').append($styleallcolorimages);
        $styleallcolorimages.html("<h3 class=\"text-center\">Loading...</h3>");
        $styleallcolorimages.show();
        $styleallcolorimages.draggable();
        var randomNumber = Math.random();
        $.get('/styles/viewallcolorimagespo/' + styleno + '?poseason=' + escape(poseason) + '&_=' + randomNumber).done(function (html) {
            $styleallcolorimages.html('<div class="contentwrapper" style="max-width:800px;padding:0;margin:0;"><div style="height: calc(100% - 20px);overflow:auto;"><div class="pull-right"><button onclick="$(\'.styleallcolorimages\').remove();" style="margin-right:5px;">Close all</a> <button onclick="$(this).parent().parent().parent().parent().remove();">X</a></div>' + html + '</div></div>');
            $styleallcolorimages.find('.contentwrapper').resizable();
            $styleallcolorimages.css({
                left:
                    e.clientX + $styleallcolorimages.width() > window.innerWidth ? window.innerWidth - $styleallcolorimages.width() : e.clientX,
                top:
                    e.clientY + $styleallcolorimages.height() > window.innerHeight ? window.innerHeight - $styleallcolorimages.height() : e.clientY,
            });
        });
        $styleallcolorimages.css({
            left:
                e.clientX + $styleallcolorimages.width() > window.innerWidth ? window.innerWidth - $styleallcolorimages.width() : e.clientX,
            top:
                e.clientY + $styleallcolorimages.height() > window.innerHeight ? window.innerHeight - $styleallcolorimages.height() : e.clientY,
        });
        $styleallcolorimages.on('click', function () { bringFront($(this), '.styleallcolorimages'); });
    }
};
function bringFront(elem, stack) {
    var min, group = $(stack);
    if (group.length < 1) return;
    min = parseInt(group[0].style.zIndex, 10) || 0;
    $(group).each(function (i) {
        this.style.zIndex = min + i;
    });
    if (elem == undefined) return;
    $(elem).css({ 'zIndex': min + group.length });
}
var hideimagetooltip = function (thumbimage) {
    if ($imagetooltip === null) {
        return;
    }
    if ($imagetooltip.css('display') !== 'none') {
        $imagetooltip.hide();
    }
};
//htmlurl tooltip
var $htmlurltooltip = null;
var showhtmlurltooltip = function (htmlurl, cachedhtmlid, width, height, zindex, e, transparent = false) {
    if ($htmlurltooltip === null) {
        $htmlurltooltip = $('<div id="$htmlurltooltip" style="display:none;position:absolute;z-index:' + zindex + ';height:' + height + 'px;background-color:white;padding:5px;border:1px solid #999;border-radus:5px;overflow:visible;"></div>');
        $('body').append($htmlurltooltip);
    }
    var fixed = typeof $htmlurltooltip.data('fixed') == 'undefined' ? false : $htmlurltooltip.data('fixed');
    if (fixed) {
        return;
    }
    if (Number.isInteger(width) && Number.isInteger(height)) {
        $htmlurltooltip.css('background-color', transparent == true ? 'transparent' : 'white').css('border', transparent == true ? 'none' : '1px solid black').css('width', width + 'px').css('height', height + 'px');
    } else if (Number.isInteger(width)) {
        $htmlurltooltip.css('background-color', transparent == true ? 'transparent' : 'white').css('border', transparent == true ? 'none' : '1px solid black').css('width', width + 'px');
    } else if (Number.isInteger(height)) {
        $htmlurltooltip.css('background-color', transparent == true ? 'transparent' : 'white').css('border', transparent == true ? 'none' : '1px solid black').css('height', height + 'px');
    } else {
        $htmlurltooltip.css('background-color', transparent == true ? 'transparent' : 'white').css('border', transparent == true ? 'none' : '1px solid black');
    }

    if (!Number.isInteger(width)) {
        $htmlurltooltip.css('width', '');
    }
    if (!Number.isInteger(height)) {
        $htmlurltooltip.css('height', '');
    }

    if ($htmlurltooltip.css('display') === 'none') {
        // somethings
        var $cachedhtml = $('#' + cachedhtmlid);
        if ($('#' + cachedhtmlid).length > 0) {
            $htmlurltooltip.html($cachedhtml.html());
        }
        else {
            $cachedhtml = $('<div id=\"' + cachedhtmlid + '\" style=\"display:none;\"><h3>Loading...</h3></div>');
            $('body').append($cachedhtml);

            $htmlurltooltip.html($cachedhtml.html());
            if (htmlurl.substring(0, 1) === '#') {
                var data = $(htmlurl).html();
                $htmlurltooltip.html(data);
                $cachedhtml.html(data);
            }
            else {
                $.get(htmlurl, function (data) {
                    if ($cachedhtml.html() == $htmlurltooltip.html()) {
                        $htmlurltooltip.html(data);
                    }
                    $cachedhtml.html(data);
                });
            }
        }
        $htmlurltooltip.show();
    }
    $htmlurltooltip.css({
        left:
            (e.pageX + 10 > window.innerWidth + window.scrollX - $htmlurltooltip.width()) ? (window.innerWidth - $htmlurltooltip.width() - 30) : e.pageX + 10,
        top:
            (e.pageY + 20 + $htmlurltooltip.height() > window.innerHeight + window.scrollY) ? (e.pageY - $htmlurltooltip.height() - 20) : e.pageY + 20
    });
};
var showhtmlurltooltip2 = function (htmlurl, cachedhtmlid, width, height, zindex, e, distinctX = 10, distinctY = 20, transparent = false) {
    if ($htmlurltooltip === null) {
        $htmlurltooltip = $('<div id="htmlurltooltip" style="display:none;position:absolute;z-index:' + zindex + ';height:' + height + 'px;background-color:white;padding:5px;border:1px solid #999;border-radus:5px;overflow:visible;"></div>');
        $('body').append($htmlurltooltip);
    }

    if (Number.isInteger(width) && Number.isInteger(height)) {
        $htmlurltooltip.css('background-color', transparent == true ? 'transparent' : 'white').css('border', transparent == true ? 'none' : '1px solid black').css('width', width + 'px').css('height', height + 'px');
    } else if (Number.isInteger(width)) {
        $htmlurltooltip.css('background-color', transparent == true ? 'transparent' : 'white').css('border', transparent == true ? 'none' : '1px solid black').css('width', width + 'px');
    } else if (Number.isInteger(height)) {
        $htmlurltooltip.css('background-color', transparent == true ? 'transparent' : 'white').css('border', transparent == true ? 'none' : '1px solid black').css('height', height + 'px');
    } else {
        $htmlurltooltip.css('background-color', transparent == true ? 'transparent' : 'white').css('border', transparent == true ? 'none' : '1px solid black');
    }

    if (!Number.isInteger(width)) {
        $htmlurltooltip.css('width', '');
    }
    if (!Number.isInteger(height)) {
        $htmlurltooltip.css('height', '');
    }

    if ($htmlurltooltip.css('display') === 'none') {
        // somethings
        var $cachedhtml = $('#' + cachedhtmlid);
        if ($('#' + cachedhtmlid).length > 0) {
            $htmlurltooltip.html($cachedhtml.html());
        }
        else {
            $cachedhtml = $('<div id=\"' + cachedhtmlid + '\" style=\"display:none;\"><h3>Loading...</h3></div>');
            $('body').append($cachedhtml);

            $htmlurltooltip.html($cachedhtml.html());
            if (htmlurl.substring(0, 1) === '#') {
                var data = $(htmlurl).html();
                $htmlurltooltip.html(data);
                $cachedhtml.html(data);
            }
            else {
                $.get(htmlurl, function (data) {
                    if ($cachedhtml.html() == $htmlurltooltip.html()) {
                        $htmlurltooltip.html(data);
                    }
                    $cachedhtml.html(data);
                });
            }
        }
        $htmlurltooltip.show();
    }
    $htmlurltooltip.css({
        left:
            (e.pageX + distinctX > window.innerWidth + window.scrollX - $htmlurltooltip.width()) ? (window.innerWidth - $htmlurltooltip.width() - 30 - distinctX) : e.pageX + distinctX,
        top:
            (e.pageY + distinctY + $htmlurltooltip.height() > window.innerHeight + window.scrollY) ? (e.pageY - $htmlurltooltip.height() - 20) : e.pageY + distinctY
    });
};
var toggleFixed = function () {
    $htmlurltooltip.data('fixed', typeof $htmlurltooltip.data('fixed') == 'undefined' ? true : $htmlurltooltip.data('fixed') ? false : true);
    $htmlurltooltip.draggable();
}
var hidehtmlurltooltip = function () {
    var fixed = typeof $htmlurltooltip.data('fixed') == 'undefined' ? false : $htmlurltooltip.data('fixed');
    if ($htmlurltooltip === null) {
        return;
    }
    if ($htmlurltooltip.css('display') !== 'none' && fixed == false) {
        $htmlurltooltip.hide();
    }
};

var _ctrlFind = function (str) {
    if (str == "") {
        alert("Please enter some text to search!");
        return;
    }
    var supported = false;
    var found = false;
    if (window.find) {
        supported = true;
        found = window.find(str);
    }
    else {
        if (document.selection && document.selection.createRange) {
            var textRange = document.selection.createRange();
            if (textRange.findText) {
                supported = true;
                if (textRange.text.length > 0) {
                    textRange.collapse(true);
                    textRange.move("character", 1);
                }
                found = textRange.findText(str);
                if (found) {
                    textRange.select();
                }
            }
        }
    }
    if (supported) {
        if (!found) {
            alert("The following text was not found:\n" + str);
        }
    }
    else {
        //alert("Your browser does not support this example!");
    }
}
var CtrlFind = function (e, obj) {
    if (e.keyCode == 13) {
        _ctrlFind($(obj).val());
    }
};


var setKendoBox = function (tr) {

    // 여러탭에서 호출할경우 중복으로 kendoNumericTextBox가 바인딩되면서 오류가 발생함
    // 꼭 범위를 지정해서 호출하도록 변경
    if (tr == undefined)
        return;

    //var intergetboxList = new Array();
    //var decimalboxList = new Array();

    //if (tr != undefined) {
    //    intergetboxList = $(tr).find("input.integerbox");
    //    decimalboxList = $(tr).find("input.decimalbox");
    //}
    //else {
    //    intergetboxList = $("input.integerbox");
    //    decimalboxList = $("input.decimalbox");
    //}

    intergetboxList = $(tr).find("input.integerbox");
    decimalboxList = $(tr).find("input.decimalbox");

    intergetboxList.each((_, ele) => {
        if ($(ele).data("kendoNumericTextBox") == undefined) {
            $(ele).kendoNumericTextBox({
                min: 0,
                step: 1,
                format: "n0",
                decimals: 0,
                spinners: false,
                rounded: null
            });

            $(ele).parent(".k-numeric-wrap").css("border", "0");
            $(ele).parent(".k-numeric-wrap").css("text-align", "right");
        }
    });

    decimalboxList.each((_, ele) => {
        if ($(ele).data("kendoNumericTextBox") == undefined) {
            $(ele).kendoNumericTextBox({
                min: 0,
                step: 1,
                format: "n",
                decimals: 2,
                spinners: false,
                rounded: null
            });

            $(ele).parent(".k-numeric-wrap").css("border", "0");
            $(ele).parent(".k-numeric-wrap").css("text-align", "right");
        }
    });
}
var checkBoxToogleClass = function (that, classname) {
    if ($(that).is(':checked')) {
        $('.' + classname).show();
    }
    else {
        $('.' + classname).hide();
    }
}
var checkBoxToogleClassReverse = function (that, classname) {
    if ($(that).is(':checked')) {
        $('.' + classname).hide();
    }
    else {
        $('.' + classname).show();
        $('.' + classname).each(
            function (index, eachObject) {
                if ($(eachObject).position().left < 20) {
                    $(eachObject).hide();
                }
            }
        );
    }
}
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