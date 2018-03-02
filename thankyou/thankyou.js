// JavaScript source code
function showThankYou(type)
{
 console.log("thank You!")
 var link = 'thankyou.html'
 if(type == 'relocate')
 {
  window.location.href = link
 }
 else if (type == 'blank')
 {
  window.top.open(link,'_blank')
 }
}