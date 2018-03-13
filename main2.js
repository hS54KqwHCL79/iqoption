var Status = 1
var lang = 'eng'

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

}

/*Getting data from file and write lang in cookie*/
function changeLang(language)
{
 //console.log("Language = "+document.cookie.your_lang)
 $.ajax({
        type:     "GET",
		cache:    false,
		url:      "data.json",
		dataType: "json",
		error: function (request, error) {
			console.log(arguments);
			alert("Cannot get request from DATA: " + error);
		},
		success: function (data) {
			var stringy   = JSON.stringify(data)
			json = JSON.parse(stringy)
			resetLang(json[language])
		}
	   }); 
}


 $(document).ready(function()
 {
  //IN THIS FILE RUSSIAN BY DEFAULT
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
		   break;
		   case 'KZ':
			changeLang("russ")
		   break;
		   case 'UZ':
			changeLang("russ")
		   break;
		   case 'KG':
			changeLang("russ")
		   break;
		   case 'AZ':
			changeLang("russ")
		   break;
		   case 'MD':
			changeLang("russ")
		   break;
			changeLang("russ")
		   break;
		   case 'AM':
			changeLang("russ")
		   break;
		   case 'TM':
			changeLang("russ")
		   break;
		   case 'TJ':
			changeLang("russ")
		   break;
		   default:
			changeLang("eng")
		   break;
		  } 		 
       }
      });
 })