﻿var Status = 1
var lang = 'eng'
//Data about crypto currency curs
var CURRENCY_DATA = {}
var CURRENT_CURRENCY = 'BTC' //DEFAULT BTC 

//LIST OF ALL USED CRYPTO
var CryptArry = ['BTC', 'ETH', 'XRP', 'BHC', 'LTC', 'NEO', 'XLM', 'DASH', 'TRX', 'ETC', 'QTUM', 'ZEC', 'OMNI', 'BTG'];

//Only numbers
function isNumber(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    else //Convert money
	{
	   var currency = $("#currency_money").children(":selected").attr("value")
	   var money = $("#moneyCash").val()
	   perevod(money, currency, CURRENT_CURRENCY) //convert
	   return true
	}
}

//convert money reverse
function isNumber2(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    else
	{
	   var currency = $("#currency_money").children(":selected").attr("value")
	   var money = $("#moneyCash").val()
	   revod(money, currency, CURRENT_CURRENCY) //reverse
	   return true
	}
}

//slide next item list
function next()
{
 var wdth = $(window).width()
 if (wdth > 768)
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
    $(".items").css("transform","translate(-104%)")
    $("#dot_1").removeClass("colour_dot")
    $("#dot_2").addClass("colour_dot")
    Status++
   break;

   case 2:
    $(".items").css("transform","translate(-209%)")
    $("#dot_2").removeClass("colour_dot")
    $("#dot_3").addClass("colour_dot")
    Status++
   break;
   
   case 3:
    $(".items").css("transform","translate(-312%)")
    $("#dot_3").removeClass("colour_dot")
    $("#dot_4").addClass("colour_dot")
    Status++
    break;

	case 4:
     $(".items").css("transform","translate(-382%)")
     $("#dot_4").removeClass("colour_dot")
     $("#dot_5").addClass("colour_dot")
     Status++
	break;
  }
 }
 //console.log(Status)
}

//Slide prev list item
function prev()
{
 var wdth = $(window).width()
 if (wdth > 768)
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
    $(".items").css("transform","translate(-102%)")
    $("#dot_3").removeClass("colour_dot")
    $("#dot_2").addClass("colour_dot")
    Status--
    break;

	case 4:
     $(".items").css("transform","translate(-209%)")
     $("#dot_4").removeClass("colour_dot")
     $("#dot_3").addClass("colour_dot")
     Status--
	break;
	
	case 5:
	 $(".items").css("transform","translate(-312%)")
     $("#dot_5").removeClass("colour_dot")
     $("#dot_4").addClass("colour_dot") 
     Status--
	 break;
  }
 }
// console.log(Status)
}

//Prize
function newPrize(object)
{
 var result = object.USD - (object.USD - object.USD * 0.15)
 object.USD = (object.USD - object.USD*0.15).toFixed(2)
 object.EUR = (object.EUR - object.EUR*0.15).toFixed(2)
 object.RUB = (object.RUB - object.RUB*0.15).toFixed(2)
 object.GBP = (object.GBP - object.GBP*0.15).toFixed(2)
 //console.log(object.USD)
}
/*Reseting data from data.json*/
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
 $("#terms_of_use").text(jsonData.accept)
 $("#term_of_use_language").html(jsonData.term_of_use_language)
 console.log(jsonData)

}

/*Getting data from file and write lang in cookie*/
function changeLang(language)
{
 if(language == "eng")
 {
  $("#english_terms_of_use").css("display","block")
  $("#germany_terms_of_use").css("display","none")
  $("#russian_terms_of_use").css("display","none")
 }
 else if(language == "ger")
 {
  $("#english_terms_of_use").css("display","none")
  $("#germany_terms_of_use").css("display","block")
  $("#russian_terms_of_use").css("display","none")
 }
 else 
 {
  $("#english_terms_of_use").css("display","none")
  $("#germany_terms_of_use").css("display","none")
  $("#russian_terms_of_use").css("display","block")
 }
 console.log("Language = "+document.cookie.your_lang)
 $.ajax({
        type:     "GET",
		cache:    false,
		url:      "data/data.json",
		dataType: "json",
		error: function (request, error) {
			console.log(arguments);
			alert("Cannot get request from DATA: " + error);
		},
		success: function (data) {
			document.cookie = "your_lang="+language
			console.log("Language = "+document.cookie.your_lang)
			var stringy   = JSON.stringify(data)
			json = JSON.parse(stringy)
			resetLang(json[language])
		}
	   }); 
}

//changing money to crypt
function perevod(money, currency, crypt)
{
 //console.log(CURRENCY_DATA[crypt][currency])
 var result = money*0.9/CURRENCY_DATA[crypt][currency]
 $("#result").attr("value", result)
}

//reverse chang brypt to money
function revod(result, currency, crypt)
{
 var money = result*CURRENCY_DATA[crypt][currency]/0.9
 $("#moneyCash").attr("value", money)
}

/*GET API FOR CRYPT_CURRENCY*/
function getDataApi(crypt)
{
 var urlApi = "https://min-api.cryptocompare.com/data/price?fsym="+crypt+"&tsyms=USD,EUR,RUB,GBP"
 $.ajax(
 {
  type: "GET",
  cache: false,
  url: urlApi,
  dataType:'json',
  error: function(request, error)
	{
	 console.log(error)
	 alert("Can't take request")
	},
  success: function(data)
	{
	 CURRENCY_DATA[crypt] = data
	 newPrize(CURRENCY_DATA[crypt])
	 perevod(1000, "USD", "BTC")
	 $("#"+crypt).children(".crypt_prize").text("$"+CURRENCY_DATA[crypt].USD)
	}
  })
 }


 //Getting cookie by key name
 function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

 $(document).ready(function()
 {
  $( ".items" ).on( "swipeleft", next );
  $( ".items" ).on( "swiperight", prev );
  /*GETTING GEOLOCATION*/
  if(!getCookie("your_lang"))
  {
   $.ajax({
        type:     "GET",
		cache:    false,
		url:      "https://freegeoip.net/json/",
		dataType: "json",
		error: function (request, error) {
			console.log(arguments);
			alert("Cannot get IP DATA from freegeoip: " + error);
		},
		success: function (data) 
	   {	 //Getting location and check what is by api
			//  console.log(result.countryCode);
			/*IF UA OR NOT RUSSIA GET ENGLISH TEXT*/
		  switch(data.country_code)
		  {
		   case 'RU':
			changeLang("russ")
			document.cookie = "your_lang=russ"
		   break;
		   case 'KZ':
			changeLang("russ")
			document.cookie = "your_lang=russ"
		   break;
		   case 'UZ':
			changeLang("russ")
			document.cookie = "your_lang=russ"
		   break;
		   case 'KG':
			changeLang("russ")
			document.cookie = "your_lang=russ"
		   break;
		   case 'AZ':
			changeLang("russ")
			document.cookie = "your_lang=russ"
		   break;
		   case 'MD':
			changeLang("russ")
			document.cookie = "your_lang=russ"
		   break;
			changeLang("russ")
			document.cookie = "your_lang=russ"
		   break;
		   case 'AM':
			changeLang("russ")
			document.cookie = "your_lang=russ"
		   break;
		   case 'TM':
			changeLang("russ")
			document.cookie = "your_lang=russ"		   
		   break;
		   case 'TJ':
			changeLang("russ")
			document.cookie = "your_lang=russ"
		   break;
		   case 'DE':
			changeLang("ger")
			document.cookie = "your_lang=ger"
			break;
		   default:
			changeLang("eng")
            document.cookie = "your_lang=eng"
		   break;
		  } 		
		if(data.country_code == "UA" || !(data.country_code == "RU"))
		{
		 changeLang("eng")
         document.cookie = "your_lang=eng"
		}
		else //ELSE GET RUSS
		{
		 changeLang("rus")
         document.cookie = "your_lang=russ"
		}	 
       }
      });
  }
  else 
  {
   changeLang(getCookie("your_lang"))
  }

  //Getting all items from Crypt array and send api
  CryptArry.forEach(function(item, i, CryptArry) 
	{
	 getDataApi(item)
	});

  //changing crypto for item
  $(".items li").click(function()
  {
   CURRENT_CURRENCY = $(this).children("div").attr("id")
   var money = $("#moneyCash").val()
   var cur   = $("#currency_money").children(":selected").attr('value')
   $("#name_crypt").text("buy "+CURRENT_CURRENCY)
   perevod(money, cur, CURRENT_CURRENCY)
  })

 //Changing language
  $("#languageSelect").change(function()
  {
   var selectLang = $(this).children(":selected").attr("value")
   changeLang(selectLang)
  })
  
  //Changing currency
  $("#currency_money").change(function()
  {
   var currency = $(this).children(":selected").attr("value")
   var cur_char = ""
   var money = $("#moneyCash").attr("value")
   if (currency == "USD") cur_char = "$"
   if (currency == "GBP") cur_char = "£"
   if (currency == "EUR") cur_char = "€"
   if (currency == "RUB") cur_char = "₽"
   CryptArry.forEach(function(item, i, CryptArry) 
	{
	 $(".items li")
	 .children("#"+CryptArry[i])
	 .children(".crypt_prize")
	 .text(cur_char + CURRENCY_DATA[CryptArry[i]][currency])
	});
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

  function swipeleftHandler()
  {
   alert("swipe")
  }

 // Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("terms");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}