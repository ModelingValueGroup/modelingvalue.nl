function getPageParams () {
    var result = {};
    var vars = window.location.search.substring(1).split("&");
    for (var i = 0; i<vars.length; i++) {
        var pair = vars[i].split("=");
        var pair0 = pair[0];
        var pair1 = pair[1];
        if (typeof result[pair0]==="undefined") {
            // first entry with this name
            result[pair0] = pair1;
        } else if (typeof result[pair0]==="string") {
            // second entry with this name
            result[pair0] =
                [
                    result[pair0],
                    pair1
                ];
        } else {
            // If third or later entry with this name
            result[pair0].push(pair1);
        }
    }
    return result;
}

var MVG_LANG;
var MVG_PAGE;
var MVG_NLS;
var MVG_ENS;
var MVG_P0S;
var MVG_P1S;
var MVG_P2S;
var MVG_P3S;
var MVG_P4S;
var MVG_BARBUTTONS;
var MVG_FLAGS;
var MVG_CONTACT;

function showIf (c, l) {
    if (c) {
        l.fadeIn(500);
    } else {
        l.hide();
    }
}

function selectLang (l, pushHist) {
    if (l!=MVG_LANG) {
        MVG_LANG = l;
        // animate contents:
        showIf(MVG_LANG=="NL", MVG_NLS);
        showIf(MVG_LANG=="EN", MVG_ENS);

        // animate flag background
        var left = $(".flag"+MVG_LANG).first().position().left;
        $(".flagSelect").animate({left: left-2}, {duration: 300});

        if (pushHist) {
            history.pushState({}, "", "?page="+MVG_PAGE+"&lang="+MVG_LANG);
        }
    }
}

function selectPage (p, pushHist) {
    if (p!=MVG_PAGE) {
        MVG_PAGE = p;
        showIf(MVG_PAGE=="p0", MVG_P0S);
        showIf(MVG_PAGE=="p1", MVG_P1S);
        showIf(MVG_PAGE=="p2", MVG_P2S);
        showIf(MVG_PAGE=="p3", MVG_P3S);
        showIf(MVG_PAGE=="p4", MVG_P4S);

        MVG_BARBUTTONS.removeClass("act").addClass("inact");
        $("."+MVG_PAGE.toUpperCase()).removeClass("inact").addClass("act");
        if (pushHist) {
            history.pushState({}, "", "?page="+MVG_PAGE+"&lang="+MVG_LANG);
        }
    }
}

function getPageParamsAndSelectState () {
    $.fancybox.close();
    selectState(getPageParams());
}

function selectState (pageParams) {
    var defaultLang = (window.navigator.userLanguage || window.navigator.language || "NL").substr(0, 2).toUpperCase();
    var defaultPage = "p0";
    selectLang(pageParams.lang && (pageParams.lang=="NL" ||pageParams.lang=="EN") ? pageParams.lang : defaultLang, false);
    selectPage(pageParams.page && pageParams.page.match(/p[0-4]/) ? pageParams.page : defaultPage, false);
}

function flagClicked () {
    selectLang($(this).first().attr("lang"), true);
}

function buttonBarClick () {
    selectPage($(this).first().attr("page"), true);
}

function makeButtonBar (titlesNL, titlesEN) {
    document.write('<div class="buttonBar noselect">');
    var left = 0;
    $.each(titlesNL, function (i) {
        document.write('<div page=p'+i+' style="left:'+left+'px" class="P'+i+' inact"><span class=NL style:"z-index: 100">'+titlesNL[i]+'</span><span class=EN>'+titlesEN[i]+'</span></div>');
        left += 111;
    });
    document.write('<div class=left style="left:'+left+'px">');
    document.write('</div>');
    left += 33;
    document.write('<div class=middle style="left:'+left+'px;width:'+(858-left)+'px">');
    document.write('    <div class=flags>');
    document.write('        <div class=flagSelect></div>');
    document.write('        <div class="flag flagNL" lang="NL"></div>');
    document.write('        <div class="flag flagEN" lang="EN"></div>');
    document.write('    </div>');
    document.write('</div>');
    left = 858;
    document.write('<div class=right style="left:'+left+'px">');
    document.write('</div>');
    document.write('</div>');
}
$(function () {
    // this is an attempt to hide the email address from harvesters (zero width space and at sign as calc):
    var at = '&#8203;&#'+(63+1)+';&#8203;';
    var dot = '&#8203;.&#8203;';
    $('.fillWithMail').html("info"+at+"modelingvalue"+dot+"nl");

    MVG_NLS = $(".NL");
    MVG_ENS = $(".EN");
    MVG_P0S = $(".p0");
    MVG_P1S = $(".p1");
    MVG_P2S = $(".p2");
    MVG_P3S = $(".p3");
    MVG_P4S = $(".p4");
    MVG_BARBUTTONS = $(".P0,.P1,.P2,.P3,.P4");
    MVG_FLAGS = $(".flag");
    MVG_CONTACT = $('.contactBallon');

    MVG_FLAGS.attr('draggable', false);
    MVG_BARBUTTONS.click(buttonBarClick);
    MVG_FLAGS.click(flagClicked);
    MVG_CONTACT.hover(function () {
        $(this).animate({backgroundColor: "#A9E400", left: '648px', width: '242px'}, {duration: 300});
    }, function () {
        $(this).animate({backgroundColor: "#A9D400", left: '652px', width: '234px'}, {duration: 300});
    });

    $("#sfSmall").fancybox({
        'openSpeed' : 800,
        'closeSpeed': 500,
        title       : function () {
            return MVG_LANG=="NL" ? "Principe schema van Next Level Software Factories" : "Schematic of Next Level Software Factory principle"
        }
    });

    window.onpopstate = getPageParamsAndSelectState;
    getPageParamsAndSelectState();

    // pre load some images:
    new Image().src = "../images/colorWim.jpg";
    new Image().src = "../images/colorTom.jpg";
    new Image().src = "../images/sfSmall.png";
    new Image().src = "../images/sfBig.png";
});
