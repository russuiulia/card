strLocale_loc = new Object();
strLocale_loc.enter_cvc2 = 'Введите код CVV2/CVC2, состоящий из 3 цифр, с оборотной стороны карты';
strLocale_loc.enter_name = 'Введите имя владельца карты';
strLocale_loc.enter_cardnr = 'Введите номер банковской карты. Например:4123567891234567'
strLocale_loc.enter_pan = 'Номер карточки начинается с цифры 2, 4, 5 или 6.\nЕсли вы не знаете номер Вашей карты - свяжитесь с Вашим банком по телефону, указанному на обратной стороне карты'
strLocale_loc.enter_p = 'Введен неправильный номер карты.\nЕсли вы не знаете номер Вашей карты - свяжитесь с Вашим банком по телефону, указанному на обратной стороне карты'
strLocale_loc.enter_expiry = 'Укажите срок действия карты (например 01/14)';

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
        $('#card_model').css('background-image', 'url(images/maib/img/card_front_ru.jpg)');
        $("#help_cardnr").css("display", "inline");
        $("#help_logo").css("display", "inline");
    });

    $("#expmonth").focus(function() {
        clearhelp();
        $('#card_model').css('background-image', 'url(images/maib/img/card_front_ru.jpg)');
        $("#help_month").css("display", "inline");
        $("#help_logo").css("display", "inline");

    });

    $("#expyear").focus(function() {
        clearhelp();
        $('#card_model').css('background-image', 'url(images/maib/img/card_front_ru.jpg)');
        $("#help_year").css("display", "inline");
        $("#help_logo").css("display", "inline");

    });

    $("#cvc2").focus(function() {
        clearhelp();
        $('#card_model').css('background-image', 'url(images/maib/img/card_back_ru.jpg)');
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
        document.getElementById('info_show').innerHTML = '<div class="error_msg" ><i class="glyphicon glyphicon-remove-circle"></i> <span>Введите номер банковской карты из 16 цифр.</span></div>';
        return (false);
    }
    if (isPAN(form.cardnr.value)) {
        document.getElementById('info_show').innerHTML = '<div class="error_msg" ><i class="glyphicon glyphicon-remove-circle"></i> <span>Номер карты начинается с цифры 4, 5 или 6.Если вы не знаете номер Вашей карты - свяжитесь с Вашим банком по телефону, указанному на обратной стороне карты</span></div>';
        return (false);
    }
    if (!luhnCheck(form.cardnr.value)) {
        document.getElementById('info_show').innerHTML = '<div class="error_msg" ><i class="glyphicon glyphicon-remove-circle"></i> <span>Неправильно указан номер карты. Если вы не знаете номер Вашей карты - свяжитесь с Вашим банком по телефону, указанному на обратной стороне карты</span></div>';
        return (false);
    }
    if (form.cvc2.value.length != 3 || !isNumeric(form.cvc2.value)) {
        document.getElementById('info_show').innerHTML = '<div class="error_msg" ><i class="glyphicon glyphicon-remove-circle"></i> <span>Введите код CVV2/CVC2, состоящий из 3 цифр, с оборотной стороны карты. Если на карте не указан код CVV2/CVC2 - свяжитесь с Вашим банком по телефону, указанному на обратной стороне карты</span></div>';
        return (false);
    }
    form.submit();
    return (true);
}
