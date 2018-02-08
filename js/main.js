﻿var Status = 1
var lang = 'eng'

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function next()
{
 if(Status == 2)
 {
  $(".items").css("transform","translate(-183%)")
  $("#dot_2").removeClass("colour_dot")
  $("#dot_3").addClass("colour_dot")
  Status++
 }
 if(Status == 1)
 {
  $(".items").css("transform","translate(-102%)")
  $("#dot_1").removeClass("colour_dot")
  $("#dot_2").addClass("colour_dot")
  Status++
 }

}
function prev()
{
 if(Status == 2)
 {
  $(".items").css("transform", "translate(0%)")
  $("#dot_2").removeClass("colour_dot")
  $("#dot_1").addClass("colour_dot")
  Status--
 }
 if(Status == 3)
 {
  $(".items").css("transform", "translate(-102%)")
  $("#dot_3").removeClass("colour_dot")
  $("#dot_2").addClass("colour_dot")
  Status--
 }
}

function resetLang(jsonData)
{
 console.log("reseting language")
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
			var stringy = JSON.stringify(data)
			var json    = JSON.parse(stringy)
			console.log("succes")
			resetLang(json[language])
		}
	   }); 
}
 $(document).ready(function()
 {
  $("#languageSelect").change(function()
  {
   var selectLang = $(this).children(":selected").attr("value")
   console.log($(this).children(":selected").attr("value"))
   changeLang(selectLang)
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