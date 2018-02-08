var Status = 1
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
 $(".cryp_text").text(jsonData.buy)
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
			resetLang(json[language])
		}
	   }); 
}
 $(document).ready(function()
 {
  $("#language").change(function()
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