function clearhelp() {
    $("#help_cardnr").css("display", "none");
    $("#help_month").css("display", "none");
    $("#help_year").css("display", "none");
    $("#help_cvv2").css("display", "none");
    document.getElementById('info_show').innerHTML = '';
}

$(function() {
    $("#cardnr").focus(function() {
        clearhelp();
        $('#card_model').css('background-image', 'url(images/maib/img/card_front_ro.jpg)');
        $("#help_cardnr").css("display", "inline");
        $("#help_logo").css("display", "inline");
    });

    $("#expmonth").focus(function() {
        clearhelp();
        $('#card_model').css('background-image', 'url(images/maib/img/card_front_ro.jpg)');
        $("#help_month").css("display", "inline");
        $("#help_logo").css("display", "inline");

    });

    $("#expyear").focus(function() {
        clearhelp();
        $('#card_model').css('background-image', 'url(images/maib/img/card_front_ro.jpg)');
        $("#help_year").css("display", "inline");
        $("#help_logo").css("display", "inline");

    });

    $("#cvc2").focus(function() {
        clearhelp();
        $('#card_model').css('background-image', 'url(images/maib/img/card_back_ro.jpg)');
        $("#help_cvv2").css("display", "inline");
        $("#help_logo").css("display", "none");
        //document.getElementById('info_show').innerHTML = '<div class="cvv2_msg" ><i class="glyphicon glyphicon-info-sign"></i> <span>In cazul in care CVV2/CVC2 nu este indicat pe card, verificati in PIN plic sau contactati banca Dvs la tel indicat pe verso-ul cardului.</span></div>';

    });

    $("#info_show").click(function() {
        document.getElementById('info_show').innerHTML = '';
    });
});

function isNumeric(str) {
    for (i = 0; i < str.length; ++i) {
        if (str.charAt(i) < '0' || str.charAt(i) > '9')
            return false;
    }
    return true;
}

function isPAN(str) {
    if (str.charAt(0) == '4' || str.charAt(0) == '5' || str.charAt(0) == '6' || str.charAt(0) == '2')
        return false;
    else
        return true;
}

function luhnCheck(cardNr) {
    var s = 0;
    var t = cardNr.length;
    var p = t % 2;
    for (var i = 0; i < t; i++) {
        var d = parseInt(cardNr.charAt(i))
        if (i % 2 == p) d *= 2;
        if (d > 9) d -= 9;
        s += d;
    }
    return (s % 10) == 0;
}

function validate_form() {
    var form = document.getElementById("cardentry");
    if (form.cardnr.value.length < 13 || !isNumeric(form.cardnr.value)) {
        document.getElementById('info_show').innerHTML = '<div class="error_msg" ><i class="glyphicon glyphicon-remove-circle"></i> <span>Introduceti numarul cardului din 16 cifre indicat pe partea frontala.</span></div>';
        return (false);
    }
    if (isPAN(form.cardnr.value)) {
        document.getElementById('info_show').innerHTML = '<div class="error_msg" ><i class="glyphicon glyphicon-remove-circle"></i> <span>Numarul cardului incepe cu cifra 4, 5 sau 6.In caz ca nu cunoasteti Nr cardului - contactati banca Dvs la tel indicat pe verso-ul cardului.</span></div>';
        return (false);
    }
    if (!luhnCheck(form.cardnr.value)) {
        document.getElementById('info_show').innerHTML = '<div class="error_msg" ><i class="glyphicon glyphicon-remove-circle"></i> <span>Una sau mai multe cifre din Nr Cardului sunt introduse gresit.In caz ca nu cunoasteti Nr cardului - contactati banca Dvs la tel indicat pe verso-ul cardului.</span></div>';
        return (false);
    }
    if (form.cvc2.value.length != 3 || !isNumeric(form.cvc2.value)) {
        document.getElementById('info_show').innerHTML = '<div class="error_msg" ><i class="glyphicon glyphicon-remove-circle"></i> <span>Introduceti codul din 3 cifre CVV2/CVC2 de pe verso-ul cardului sau din PIN plic.In cazul in care pe card nu sunt indicate aceste cifre  - contactati banca Dvs pe telefonul indicat pe verso-ul cardului.</span></div>';
        return (false);
    }
    form.submit();
    return (true);
}
