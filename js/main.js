﻿var Status = 1
var lang = 'eng'
var CURRENCY_DATA = {}
var CURRENT_CURRENCY = 'bitcoin'

function isNumber(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    else
	{
	   var currency = $("#currency_money").children(":selected").attr("value")
	   var money = $("#moneyCash").val()
	   perevod(money, currency, 'bitcoin') 
	   return true
	}
}

function isNumber2(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    else
	{
	   var currency = $("#currency_money").children(":selected").attr("value")
	   var money = $("#moneyCash").val()
	   revod(money, currency, CURRENT_CURRENCY) 
	   return true
	}
}

function next()
{
 var wdth = $(window).width()
 if (wdth > 1024)
 {
  switch (Status)
  {
   case 1:
    $(".items").css("transform","translate(-102%)")
    $("#dot_1").removeClass("colour_dot")
    $("#dot_2").addClass("colour_dot")
    Status++
   break;

   case 2:
    $(".items").css("transform","translate(-183%)")
    $("#dot_2").removeClass("colour_dot")
    $("#dot_3").addClass("colour_dot")
    Status++
   break;
  /*case 3
  case 4
  case 5*/
  }
 }
 else
 {
  switch (Status)
  {
   case 1:
    $(".items").css("transform","translate(-99%)")
    $("#dot_1").removeClass("colour_dot")
    $("#dot_2").addClass("colour_dot")
    Status++
   break;

   case 2:
    $(".items").css("transform","translate(-201%)")
    $("#dot_2").removeClass("colour_dot")
    $("#dot_3").addClass("colour_dot")
    Status++
   break;
   
   case 3:
    $(".items").css("transform","translate(-301%)")
    $("#dot_3").removeClass("colour_dot")
    $("#dot_4").addClass("colour_dot")
    Status++
    break;

	case 4:
     $(".items").css("transform","translate(-372%)")
     $("#dot_4").removeClass("colour_dot")
     $("#dot_5").addClass("colour_dot")
     Status++
	break;
	
	case 5:
	 $(".items").css("transform","translate(-372%)")
     $("#dot_4").removeClass("colour_dot")
     $("#dot_5").addClass("colour_dot") 
	 break;
  }
 }
}

function prev()
{
 var wdth = $(window).width()
 if (wdth > 1024)
 {
  switch (Status)
  {
   case 2:
    $(".items").css("transform","translate(0%)")
    $("#dot_2").removeClass("colour_dot")
    $("#dot_1").addClass("colour_dot")
    Status--
   break;

   case 3:
    $(".items").css("transform","translate(-102%)")
    $("#dot_3").removeClass("colour_dot")
    $("#dot_2").addClass("colour_dot")
    Status--
   break;
  /*case 3
  case 4
  case 5*/
  }
 }
 else
 {
  switch (Status)
  {
   case 2:
    $(".items").css("transform","translate(0%)")
    $("#dot_2").removeClass("colour_dot")
    $("#dot_1").addClass("colour_dot")
    Status--
   break;
   
   case 3:
    $(".items").css("transform","translate(-99%)")
    $("#dot_3").removeClass("colour_dot")
    $("#dot_2").addClass("colour_dot")
    Status--
    break;

	case 4:
     $(".items").css("transform","translate(-201%)")
     $("#dot_4").removeClass("colour_dot")
     $("#dot_3").addClass("colour_dot")
     Status--
	break;
	
	case 5:
	 $(".items").css("transform","translate(-301%)")
     $("#dot_5").removeClass("colour_dot")
     $("#dot_4").addClass("colour_dot") 
     Status--
	 break;
  }
 }
}

function resetLang(jsonData)
{
 $(".cryp_text").text(jsonData.buy)
 $("#amount").text(jsonData.amount)
 $("#invest").text(jsonData.invest)
 $("#uget").text(jsonData.uget)
 $("#commision").text(jsonData.commision)
 $("#visa_master").text(jsonData.visa_master)
 $("#people_buy").text(jsonData.people_buy)
 $("#people_invest").text(jsonData.people_invest)
 $("#help").text(jsonData.help)
 $("#what_is").text(jsonData.what_is)
 $("#what_is_text").text(jsonData.what_is_text)
 $("#is_safe").text(jsonData.is_safe)
 $("#is_safe_text").text(jsonData.is_safe_text)
 $("#where_is").text(jsonData.where_is)
 $("#where_is_text").text(jsonData.where_is_text)
 $("#how_can").text(jsonData.how_can)
 $("#how_can_text").text(jsonData.how_can_text)
 $("#what_commis").text(jsonData.what_commis)
 $("#what_commis_text").text(jsonData.what_commis_text)
 $("#what_terms").text(jsonData.what_terms)
 $("#what_terms_text").text(jsonData.what_terms_text)
 $("#when_i").text(jsonData.when_i)
 $("#when_i_text").text(jsonData.when_i_text)
 $("#risk_warn").text(jsonData.risk_warn)
 $("#risk_text").text(jsonData.risk_text)
 $("#non_exl").text(jsonData.non_exl)
 $("#language").text(jsonData.language)
 $("#terms").text(jsonData.terms)
 /*SECOND PAGE GOING*/
 $("#step_1").text(jsonData.step_1)
 $("#step1_text").text(jsonData.step1_text)
 $("#step_2").text(jsonData.step_2)
 $("#step2_text").text(jsonData.step2_text)
 $("#step3").text(jsonData.step3)
 $("#step3_text").text(jsonData.step3_text)
 $("#step4").text(jsonData.step4)
 $("#step4_text").text(jsonData.step4_text)
 $("#sign_up").text(jsonData.sign_up)
 $("#after_sign").text(jsonData.after_sign)
 $("#sign_text1").text(jsonData.sign_text1)
 $("#sign_sub1").text(jsonData.sign_sub1)
 $("#sign_text2").text(jsonData.sign_text2)
 $("#sign_sub2").text(jsonData.sign_sub2)
 $("#sign_text3").text(jsonData.sign_text3)
 $("#sign_sub3").text(jsonData.sign_sub3)
 $("#name_label").text(jsonData.name_input)
 $("#name_input").attr('placeholder',jsonData.name_input)
 $("#telephone").text(jsonData.teleplone)
 $("#email_input").text(jsonData.email_input)
 $("#input_email").attr('placeholder', jsonData.input_email)
 $("#button_header").text(jsonData.button_header)
 $("#button_text_title").text(jsonData.button_text_title)

}

function changeLang(language)
{
 $.ajax({
        type:     "GET",
		cache:    false,
		url:      "data/data.json",
		dataType: "json",
		error: function (request, error) {
			console.log(arguments);
			alert(" Can't do because: " + error);
		},
		success: function (data) {
			var stringy   = JSON.stringify(data)
			json = JSON.parse(stringy)
			resetLang(json[language])
		}
	   }); 
}

function perevod(money, currency, crypt)
{
 var result = money*0.9/CURRENCY_DATA[crypt][currency]
 $("#result").attr("value", result)
}

function revod(result, currency, crypt)
{
 var money = result*CURRENCY_DATA[crypt][currency]/0.9
 $("#moneyCash").attr("value", money)
}

 $(document).ready(function()
 {

  $.ajax({
        type:     "GET",
		cache:    false,
		url:      "data/currency.json",
		dataType: "json",
		error: function (request, error) {
			console.log(arguments);
			alert(" Can't do because: " + error);
		},
		success: function (data) {
			var stringy = JSON.stringify(data)
			var json    = JSON.parse(stringy)
			CURRENCY_DATA = json
			perevod(1000,'usd', CURRENT_CURRENCY)
		}
	   }); 

  $(".items li").click(function()
  {
   CURRENT_CURRENCY = $(this).children("div").attr("id")
   var money = $("#moneyCash").val()
   var cur   = $("#currency_money").children(":selected").attr('value')
   $("#name_crypt").text("buy "+CURRENT_CURRENCY)
   perevod(money, cur, CURRENT_CURRENCY)
  })

  $("#languageSelect").change(function()
  {
   var selectLang = $(this).children(":selected").attr("value")
   changeLang(selectLang)
  })
  
  $("#currency_money").change(function()
  {
   var currency = $(this).children(":selected").attr("value")
   var money = $("#moneyCash").attr("value")
   perevod(money, currency, CURRENT_CURRENCY)
  })

  $(".acor_text").hide()
  $(".acor_clicker").click(function()
  {
   if($(this).children(".icon_change").text() == "+")
    $(this).children(".icon_change").text("-")
   else
    $(this).children(".icon_change").text("+")
   $(this).next().toggle(500)
  })
  $('.carusel_item').click(function()
  {
   $('.carusel_item').each(function()
   {
    $(this).removeClass('carousel_item_clicked')
    $(this).children().css("color","#4e4c67")
    $(this).children().css("opacity","0.5")
   })
   $(this).addClass("carousel_item_clicked")
   $(this).children().css("color","#4982ff")
   $(this).children().css("opacity","1")
  })
 })