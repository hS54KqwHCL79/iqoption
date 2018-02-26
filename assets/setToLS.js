$( document ).ready(function() {
//setToLS

    var _pass = '';

 function getParameterByName(name) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setParametersToLS () {
  var landingUrl = window.location.href.split('?')[0];
  var a_aid = getParameterByName('a_aid') || landingUrl;
  var a_cid = getParameterByName('a_cid') || landingUrl;

  var parameters = {
    'a_aid' : a_aid,
    'a_cid' : a_cid
  }

  var clickid = getParameterByName('clickid');
  var pid = getParameterByName('pid');
  var offer_id = getParameterByName('offer_id');

  if ((clickid && clickid.length) || (pid && pid.length) || (offer_id && offer_id.length)) {
    var additionalMarketingInfo = {};

    if (clickid && clickid.length) {
      additionalMarketingInfo.clickid = clickid;
    }

    if (pid && pid.length) {
      additionalMarketingInfo.pid = pid;
    }

    if (offer_id && offer_id.length) {
        additionalMarketingInfo.offer_id = offer_id;
    }

    localStorage.setItem('AdditionalMarketingInfo', JSON.stringify(additionalMarketingInfo));
  }

  localStorage.setItem('specParameters', JSON.stringify(parameters));
}

setParametersToLS();

    var varList = {
        currency: 'USD',
        //  emailValidation: 'https://api.leomarkets.com/api/public/account-exist?email=',
        // // replace w/ local links
        // getCountryByIp: 'http://leo2.dev47.lc/api/public/country-by-ip',
        // getCountriesList: 'http://leo2.dev47.lc/api/affiliate-countries',
        // registerUrl: 'http://leo2.dev47.lc/api/affiliate-customer',
        // redirect: 'http://leo2.dev47.lc/api/affiliate-auto-login/generate-broker-deposit-url'

        // emailValidation: 'http://api.leomarkets.lc/api/public/account-exist?email=',
        // getCountryByIp: 'http://api-affiliates.leomarkets.lc/api/public/country-by-ip',
        // getCountriesList: 'http://api-affiliates.leomarkets.lc/api/affiliate-countries',
        // registerUrl: 'http://api-affiliates.leomarkets.lc/api/affiliate-customer',
        // redirect: 'http://api-affiliates.leomarkets.lc/api/affiliate-auto-login/generate-broker-deposit-url'

        emailValidation: 'https://api.leomarkets.com/api/public/account-exist?email=',
        getCountryByIp: 'https://api-affiliates.leomarkets.com/api/public/country-by-ip',
        getCountriesList: 'https://api-affiliates.leomarkets.com/api/affiliate-countries',
        registerUrl: 'https://api-affiliates.leomarkets.com/api/affiliate-customer',
        redirect: 'https://api-affiliates.leomarkets.com/api/affiliate-auto-login/generate-broker-deposit-url'
    }

    var registerForm = document.querySelectorAll('#caffForm');

    registerForm.forEach(function(el) {
        el.addEventListener('submit', validationForm)
    })

    getCountryByIp();

    function validationForm (event) {
        event.preventDefault();
        var FromValues = [].slice.call(this.querySelectorAll(".form-control")).map(function(el) {
            return el.value
        })

        emailValidate(FromValues[4], FromValues)
    }

    function emailValidate(email, FromValues) {
        var url = varList.emailValidation + email;

        $.ajax({
            type: "GET",
            url: url,
            beforeSend: function(request) {
                request.setRequestHeader("Accept-Language", "ru");
            }
        }).done( function (responseObj) {
            if (responseObj) {
                ShowError("email")
                return;
            } else {
                getCountryList(FromValues)
            }
        })
    }

    function getCountryByIp () {
        $.ajax({
            type: "GET",
            url: varList.getCountryByIp,
            beforeSend: function(request) {
                request.setRequestHeader("Accept-Language", "ru");
            }
        }).done( function (responseObj) {
            if(responseObj.IsoCode === 'UA' || responseObj.IsoCode === 'US') {
                responseObj.IsoCode = 'RU'
            }
            $('.email-form').attr('data-country', responseObj.IsoCode)
            INIT_SCRIPT_HEAD()
        } ).fail(function () {
            $('.email-form').attr('data-country', "RU")
            INIT_SCRIPT_HEAD()
        })
    }

    function getCountryList (FromValues) {
        $.ajax({
            type: "GET",
            url: varList.getCountriesList,
            beforeSend: function(request) {
                request.setRequestHeader("Accept-Language", "ru");
            }
        }).done( function (responseObj) {
            var idCountry = ""
            responseObj.Countries.forEach(function(el) {
                if(el.Iso === FromValues[2]) {
                    idCountry = el.Id
                }
            })

            registration(FromValues, idCountry)
        })
    }

    function ShowError (error) {
	 console.log(error)
        if (error === "email") {
            $(".hidden-message").text("Такой адрес почты уже существует");
            $(".hidden-message").css("display", "block");
        } else {
            $(".hidden-message").css("display", "block");
        }

        setTimeout(function(){
            $(".hidden-message").css("display", "none");
         }, 5000);
    }

    function registration(FromValues, idCountry) {

        var getParametersFromLS = JSON.parse( localStorage.getItem('specParameters'))
        var getAdditionalMarketingParametersFromLS = JSON.parse( localStorage.getItem('AdditionalMarketingInfo'))

        var currency = getParameterByName('currency');
        if(!currency) {
            currency = varList.currency
        }
        currency = currency.toUpperCase().slice(0, 3)
        var payload = {
          FirstName: FromValues[0],
          LastName: FromValues[1],
          Phone: FromValues[3],
          Email: FromValues[4],
          // Password: FromValues[5],
          Password: _pass,
          Country: +idCountry,
          Currency: currency,
          a_aid: getParametersFromLS.a_aid,
          a_cid: getParametersFromLS.a_cid
        }

        if (getAdditionalMarketingParametersFromLS) {
          payload.AdditionalMarketingInfo = {};

          if (getAdditionalMarketingParametersFromLS.clickid) {
            payload.AdditionalMarketingInfo.AffiseClickId = getAdditionalMarketingParametersFromLS.clickid;
          }

          if (getAdditionalMarketingParametersFromLS.pid) {
            payload.AdditionalMarketingInfo.Pid = getAdditionalMarketingParametersFromLS.pid;
          }

          if (getAdditionalMarketingParametersFromLS.offer_id) {
            payload.AdditionalMarketingInfo.AffiseOfferId = getAdditionalMarketingParametersFromLS.offer_id;
          }

        }

        var registerData = JSON.stringify(payload)
        console.log('payload', payload)

        $.ajax({
            type: 'POST',
            url: varList.registerUrl,
            beforeSend: function(request) {
                request.setRequestHeader("Accept-Language", "ru");
            },
            data: registerData,
            contentType: "application/json",
        }).done( function (responseObj) {
            console.log('responseObj', responseObj)
            _pass = responseObj.customer.Password
            localStorage.removeItem('specParameters');
            localStorage.removeItem('AdditionalMarketingInfo');
            redirect (payload.Email, responseObj.customer.Password);
        } )
    }

    function getParameterByName(name) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function redirect (email, password) {
        var loginPayload = {
            Username: email,
            Password: password
        }

        $.ajax({
            type: 'POST',
            url: varList.redirect,

            data: loginPayload
        }).done( function (responseObj) {
            console.log(responseObj)
			console.log('linkingSphere = '+linkingSphere)
		//	window.top.open(responseObj.url)
            window.location.replace(responseObj.url);
        })
    }

    function INIT_SCRIPT_HEAD () {
        if(!jQuery){throw new Error("Bootstrap Form Helpers requires jQuery")}var BFHCountriesList={AF:"Afghanistan",AL:"Albania",DZ:"Algeria",AS:"American Samoa",AD:"Andorra",AO:"Angola",AI:"Anguilla",AQ:"Antarctica",AG:"Antigua and Barbuda",AR:"Argentina",AM:"Armenia",AW:"Aruba",AU:"Australia",AT:"Austria",AZ:"Azerbaijan",BH:"Bahrain",BD:"Bangladesh",BB:"Barbados",BY:"Belarus",BE:"Belgium",BZ:"Belize",BJ:"Benin",BM:"Bermuda",BT:"Bhutan",BO:"Bolivia",BA:"Bosnia and Herzegovina",BW:"Botswana",BV:"Bouvet Island",BR:"Brazil",IO:"British Indian Ocean Territory",VG:"British Virgin Islands",BN:"Brunei",BG:"Bulgaria",BF:"Burkina Faso",BI:"Burundi",CI:"Côte d'Ivoire",KH:"Cambodia",CM:"Cameroon",CA:"Canada",CV:"Cape Verde",KY:"Cayman Islands",CF:"Central African Republic",TD:"Chadddd",CL:"Chile",CN:"China",CX:"Christmas Island",CC:"Cocos (Keeling) Islands",CO:"Colombia",KM:"Comoros",CG:"Congo",CK:"Cook Islands",CR:"Costa Rica",HR:"Croatia",CU:"Cuba",CY:"Cyprus",CZ:"Czech Republic",CD:"Democratic Republic of the Congo",DK:"Denmark",DJ:"Djibouti",DM:"Dominica",DO:"Dominican Republic",TP:"East Timor",EC:"Ecuador",EG:"Egypt",SV:"El Salvador",GQ:"Equatorial Guinea",ER:"Eritrea",EE:"Estonia",ET:"Ethiopia",FO:"Faeroe Islands",FK:"Falkland Islands",FJ:"Fiji",FI:"Finland",MK:"Former Yugoslav Republic of Macedonia",FR:"France",FX:"France, Metropolitan",GF:"French Guiana",PF:"French Polynesia",TF:"French Southern Territories",GA:"Gabon",GE:"Georgia",DE:"Germany",GH:"Ghana",GI:"Gibraltar",GR:"Greece",GL:"Greenland",GD:"Grenada",GP:"Guadeloupe",GU:"Guam",GT:"Guatemala",GN:"Guinea",GW:"Guinea-Bissau",GY:"Guyana",HT:"Haiti",HM:"Heard and Mc Donald Islands",HN:"Honduras",HK:"Hong Kong",HU:"Hungary",IS:"Iceland",IN:"India",ID:"Indonesia",IR:"Iran",IQ:"Iraq",IE:"Ireland",IL:"Israel",IT:"Italy",JM:"Jamaica",JP:"Japan",JO:"Jordan",KZ:"Kazakhstan",KE:"Kenya",KI:"Kiribati",KW:"Kuwait",KG:"Kyrgyzstan",LA:"Laos",LV:"Latvia",LB:"Lebanon",LS:"Lesotho",LR:"Liberia",LY:"Libya",LI:"Liechtenstein",LT:"Lithuania",LU:"Luxembourg",MO:"Macau",MG:"Madagascar",MW:"Malawi",MY:"Malaysia",MV:"Maldives",ML:"Mali",MT:"Malta",MH:"Marshall Islands",MQ:"Martinique",MR:"Mauritania",MU:"Mauritius",YT:"Mayotte",MX:"Mexico",FM:"Micronesia",MD:"Moldova",MC:"Monaco",MN:"Mongolia",ME:"Montenegro",MS:"Montserrat",MA:"Morocco",MZ:"Mozambique",MM:"Myanmar",NA:"Namibia",NR:"Nauru",NP:"Nepal",NL:"Netherlands",AN:"Netherlands Antilles",NC:"New Caledonia",NZ:"New Zealand",NI:"Nicaragua",NE:"Niger",NG:"Nigeria",NU:"Niue",NF:"Norfolk Island",KP:"North Korea",MP:"Northern Marianas",NO:"Norway",OM:"Oman",PK:"Pakistan",PW:"Palau",PS:"Palestine",PA:"Panama",PG:"Papua New Guinea",PY:"Paraguay",PE:"Peru",PH:"Philippines",PN:"Pitcairn Islands",PL:"Poland",PT:"Portugal",PR:"Puerto Rico",QA:"Qatar",RE:"Reunion",RO:"Romania",RU:"Russia",RW:"Rwanda",ST:"Sao Tome and Principe",SH:"Saint Helena",PM:"St. Pierre and Miquelon",KN:"Saint Kitts and Nevis",LC:"Saint Lucia",VC:"Saint Vincent and the Grenadines",WS:"Samoa",SM:"San Marino",SA:"Saudi Arabia",SN:"Senegal",RS:"Serbia",SC:"Seychelles",SL:"Sierra Leone",SG:"Singapore",SK:"Slovakia",SI:"Slovenia",SB:"Solomon Islands",SO:"Somalia",ZA:"South Africa",GS:"South Georgia and the South Sandwich Islands",KR:"South Korea",ES:"Spain",LK:"Sri Lanka",SD:"Sudan",SR:"Suriname",SJ:"Svalbard and Jan Mayen Islands",SZ:"Swaziland",SE:"Sweden",CH:"Switzerland",SY:"Syria",TW:"Taiwan",TJ:"Tajikistan",TZ:"Tanzania",TH:"Thailand",BS:"The Bahamas",GM:"The Gambia",TG:"Togo",TK:"Tokelau",TO:"Tonga",TT:"Trinidad and Tobago",TN:"Tunisia",TR:"Turkey",TM:"Turkmenistan",TC:"Turks and Caicos Islands",TV:"Tuvalu",VI:"US Virgin Islands",UG:"Uganda",AE:"United Arab Emirates",GB:"United Kingdom",UM:"United States Minor Outlying Islands",UY:"Uruguay",UZ:"Uzbekistan",VU:"Vanuatu",VA:"Vatican City",VE:"Venezuela",VN:"Vietnam",WF:"Wallis and Futuna Islands",EH:"Western Sahara",YE:"Yemen",ZM:"Zambia",ZW:"Zimbabwe"};var BFHPhoneFormatList={AF:"+93 0dd ddd ddddddd",AL:"+355 0dd ddd dddddd",DZ:"+213 0ddd dd dd ddddd",AS:"+1 (ddd) ddd-ddddddd",AD:"+376 dddddddddddd",AO:"+244 ddd ddd dddddd",AI:"+1 (ddd) ddd-ddddddd",AQ:"+672 dddddddddddd",AG:"+1 (ddd) ddd-ddddddd",AR:"+54 dddddddddddd",AM:"+374 0dd ddddddddd",AW:"+297 ddd ddddddd",AU:"+61 ddd ddd dddddd",AT:"+43 dddddddddddd",AZ:"+994 dddddddddddd",BH:"+973 dddddddddddd",BD:"+880 dddddddddddd",BB:"+1 dddddddddddd",BY:"+375 dddddddddddd",BE:"+32 dddddddddddd",BZ:"+501 dddddddddddd",BJ:"+229 dddddddddddd",BM:"+1 (ddd) ddd-ddddddd",BT:"+975 dddddddddddd",BO:"+591 dddddddddddd",BA:"+387 dddddddddddd",BW:"+267 dddddddddddd",BV:"+0 dddddddddddd",BR:"+55 dddddddddddd",IO:"+0 dddddddddddd",VG:"+1 (ddd) ddd-ddddddd",BN:"+673 dddddddddddd",BG:"+359 dddddddddddd",BF:"+226 dddddddddddd",BI:"+257 dddddddddddd",CI:"+225 dddddddddddd",KH:"+855 dddddddddddd",CM:"+237 dddddddddddd",CA:"+1 (ddd) ddd-ddddddd",CV:"+238 dddddddddddd",KY:"+1 (ddd) ddd-ddddddd",CF:"+236 dddddddddddd",TD:"+235 dddddddddddd",CL:"+56 dddddddddddd",CN:"+86 dddddddddddd",CX:"+61 dddddddddddd",CC:"+61 dddddddddddd",CO:"+57 dddddddddddd",KM:"+269 dddddddddddd",CG:"+242 dddddddddddd",CK:"+682 dddddddddddd",CR:"+506 dddddddddddd",HR:"+385 dddddddddddd",CU:"+53 dddddddddddd",CY:"+357 dddddddddddd",CZ:"+420 dddddddddddd",CD:"+243 dddddddddddd",DK:"+45 dddddddddddd",DJ:"+253 dddddddddddd",DM:"+1 (ddd) ddd-ddddddd",DO:"+1 (ddd) ddd-ddddddd",TL:"+670 dddddddddddd",EC:"+593 dddddddddddd",EG:"+20 dddddddddddd",SV:"+503 dddddddddddd",GQ:"+240 dddddddddddd",ER:"+291 dddddddddddd",EE:"+372 dddddddddddd",ET:"+251 dddddddddddd",FO:"+298 dddddddddddd",FK:"+500 dddddddddddd",FJ:"+679 dddddddddddd",FI:"+358 dddddddddddd",MK:"+389 dddddddddddd",FR:"+33 d dd dd dd ddddd",GF:"+594 dddddddddddd",PF:"+689 dddddddddddd",TF:"+262 dddddddddddd",GA:"+241 dddddddddddd",GE:"+995 dddddddddddd",DE:"+49 dddddddddddd",GH:"+233 dddddddddddd",GI:"+350 dddddddddddd",GR:"+30 dddddddddddd",GL:"+299 dddddddddddd",GD:"+1 (ddd) ddd-ddddddd",GP:"+590 dddddddddddd",GU:"+1 (ddd) ddd-ddddddd",GT:"+502 dddddddddddd",GN:"+224 dddddddddddd",GW:"+245 dddddddddddd",GY:"+592 dddddddddddd",HT:"+509 dddddddddddd",HM:"+0 dddddddddddd",HN:"+504 dddddddddddd",HK:"+852 dddddddddddd",HU:"+36 dddddddddddd",IS:"+354 dddddddddddd",IN:"+91 dddddddddddd",ID:"+62 dddddddddddd",IR:"+98 dddddddddddd",IQ:"+964 dddddddddddd",IE:"+353 dddddddddddd",IL:"+972 dddddddddddd",IT:"+39 dddddddddddd",JM:"+1 (ddd) ddd-ddddddd",JP:"+81 dddddddddddd",JO:"+962 dddddddddddd",KZ:"+7 dddddddddddd",KE:"+254 dddddddddddd",KI:"+686 dddddddddddd",KW:"+965 dddddddddddd",KG:"+996 dddddddddddd",LA:"+856 dddddddddddd",LV:"+371 dddddddddddd",LB:"+961 dddddddddddd",LS:"+266 dddddddddddd",LR:"+231 dddddddddddd",LY:"+218 dddddddddddd",LI:"+423 dddddddddddd",LT:"+370 dddddddddddd",LU:"+352 dddddddddddd",MO:"+853 dddddddddddd",MG:"+261 dddddddddddd",MW:"+265 dddddddddddd",MY:"+60 dddddddddddd",MV:"+960 dddddddddddd",ML:"+223 dddddddddddd",MT:"+356 dddddddddddd",MH:"+692 dddddddddddd",MQ:"+596 dddddddddddd",MR:"+222 dddddddddddd",MU:"+230 dddddddddddd",YT:"+262 dddddddddddd",MX:"+52 dddddddddddd",FM:"+691 dddddddddddd",MD:"+373 dddddddddddd",MC:"+377 dddddddddddd",MN:"+976 dddddddddddd",MS:"+1 (ddd) ddd-ddddddd",MA:"+212 dddddddddddd",MZ:"+258 dddddddddddd",MM:"+95 dddddddddddd",NA:"+264 dddddddddddd",NR:"+674 dddddddddddd",NP:"+977 dddddddddddd",NL:"+31 dddddddddddd",AN:"+599 dddddddddddd",NC:"+687 dddddddddddd",NZ:"+64 dddddddddddd",NI:"+505 dddddddddddd",NE:"+227 dddddddddddd",NG:"+234 dddddddddddd",NU:"+683 dddddddddddd",NF:"+672 dddddddddddd",KP:"+850 dddddddddddd",MP:"+1 (ddd) ddd-ddddddd",NO:"+47 dddddddddddd",OM:"+968 dddddddddddd",PK:"+92 dddddddddddd",PW:"+680 dddddddddddd",PA:"+507 dddddddddddd",PG:"+675 dddddddddddd",PY:"+595 dddddddddddd",PE:"+51 dddddddddddd",PH:"+63 dddddddddddd",PN:"+870 dddddddddddd",PL:"+48 dddddddddddd",PT:"+351 dddddddddddd",PR:"+1 (ddd) ddd-ddddddd",QA:"+974 dddddddddddd",RE:"+262 dddddddddddd",RO:"+40 dddddddddddd",RU:"+7 dddddddddddd",RW:"+250 dddddddddddd",ST:"+239 dddddddddddd",SH:"+290 dddddddddddd",KN:"+1 (ddd) ddd-ddddddd",LC:"+1 (ddd) ddd-ddddddd",PM:"+508 dddddddddddd",VC:"+1 (ddd) ddd-ddddddd",WS:"+685 dddddddddddd",SM:"+378 dddddddddddd",SA:"+966 dddddddddddd",SN:"+221 dddddddddddd",SC:"+248 dddddddddddd",SL:"+232 dddddddddddd",SG:"+65 dddddddddddd",SK:"+421 dddddddddddd",SI:"+386 dddddddddddd",SB:"+677 dddddddddddd",SO:"+252 dddddddddddd",ZA:"+27 dddddddddddd",GS:"+0 dddddddddddd",KR:"+82 dddddddddddd",ES:"+34 dddddddddddd",LK:"+94 dddddddddddd",SD:"+249 dddddddddddd",SR:"+597 dddddddddddd",SJ:"+0 dddddddddddd",SZ:"+268 dddddddddddd",SE:"+46 dddddddddddd",CH:"+41 dddddddddddd",SY:"+963 dddddddddddd",TW:"+886 dddddddddddd",TJ:"+992 dddddddddddd",TZ:"+255 dddddddddddd",TH:"+66 dddddddddddd",BS:"+1 (ddd) ddd-ddddddd",GM:"+220 dddddddddddd",TG:"+228 dddddddddddd",TK:"+690 dddddddddddd",TO:"+676 dddddddddddd",TT:"+1 (ddd) ddd-ddddddd",TN:"+216 dddddddddddd",TR:"+90 dddddddddddd",TM:"+993 dddddddddddd",TC:"+1 (ddd) ddd-ddddddd",TV:"+688 dddddddddddd",VI:"+1 (ddd) ddd-ddddddd",UG:"+256 dddddddddddd",AE:"+971 dddddddddddd",GB:"+44 (ddd) dddd ddddddd",UM:"+0 dddddddddddd",UY:"+598 dddddddddddd",UZ:"+998 dddddddddddd",VU:"+678 dddddddddddd",VA:"+39 dddddddddddd",VE:"+58 dddddddddddd",VN:"+84 dddddddddddd",WF:"+681 dddddddddddd",EH:"+0 dddddddddddd",YE:"+967 dddddddddddd",YU:"+0 dddddddddddd",ZM:"+260 dddddddddddd",ZW:"+263 ddddddddd"};+function(e){"use strict";var t=function(t,n){this.options=e.extend({},e.fn.bfhcountries.defaults,n);this.$element=e(t);if(this.$element.is("select")){this.addCountries()}if(this.$element.hasClass("bfh-selectbox")){this.addBootstrapCountries()}if(this.$element.is("span")){this.displayCountry()}};t.prototype={constructor:t,getCountries:function(){var t,n;if(this.options.available){if(typeof this.options.available==="string"){n=[];this.options.available=this.options.available.split(",");for(t in BFHCountriesList){if(BFHCountriesList.hasOwnProperty(t)){if(e.inArray(t,this.options.available)>=0){n[t]=BFHCountriesList[t]}}}}else{n=this.options.available}return n}else{return BFHCountriesList}},addCountries:function(){var e,t,n;e=this.options.country;n=this.getCountries();this.$element.html("");if(this.options.blank===true){this.$element.append('<option value=""></option>')}for(t in n){if(n.hasOwnProperty(t)){this.$element.append('<option value="'+t+'">'+n[t]+"</option>")}}this.$element.val(e)},addBootstrapCountries:function(){var e,t,n,r,i,s;r=this.options.country;e=this.$element.find('input[type="hidden"]');t=this.$element.find(".bfh-selectbox-option");n=this.$element.find("[role=option]");s=this.getCountries();n.html("");if(this.options.blank===true){n.append('<li><a tabindex="-1" href="#" data-option=""></a></li>')}for(i in s){if(s.hasOwnProperty(i)){if(this.options.flags===true){n.append('<li><a tabindex="-1" href="#" data-option="'+i+'"><i class="glyphicon bfh-flag-'+i+'"></i>'+s[i]+"</a></li>")}else{n.append('<li><a tabindex="-1" href="#" data-option="'+i+'">'+s[i]+"</a></li>")}}}this.$element.val(r)},displayCountry:function(){var e;e=this.options.country;if(this.options.flags===true){this.$element.html('<i class="glyphicon bfh-flag-'+e+'"></i> '+BFHCountriesList[e])}else{this.$element.html(BFHCountriesList[e])}}};var n=e.fn.bfhcountries;e.fn.bfhcountries=function(n){return this.each(function(){var r,i,s;r=e(this);i=r.data("bfhcountries");s=typeof n==="object"&&n;if(!i){r.data("bfhcountries",i=new t(this,s))}if(typeof n==="string"){i[n].call(r)}})};e.fn.bfhcountries.Constructor=t;e.fn.bfhcountries.defaults={country:"",available:"",flags:false,blank:true};e.fn.bfhcountries.noConflict=function(){e.fn.bfhcountries=n;return this};e(document).ready(function(){e("form select.bfh-countries, span.bfh-countries, div.bfh-countries").each(function(){var t;t=e(this);if(t.hasClass("bfh-selectbox")){t.bfhselectbox(t.data())}t.bfhcountries(t.data())})})}(window.jQuery);+function(e){"use strict";function n(e,t){var n,r,i,s;n="";t=String(t).replace(/\D/g,"");for(r=0,i=0;r<e.length;r=r+1){if(/\d/g.test(e.charAt(r))){if(e.charAt(r)===t.charAt(i)){n+=t.charAt(i);i=i+1}else{n+=e.charAt(r)}}else if(e.charAt(r)!=="d"){if(t.charAt(i)!==""||e.charAt(r)==="+"){n+=e.charAt(r)}}else{if(t.charAt(i)===""){n+=""}else{n+=t.charAt(i);i=i+1}}}s=e.charAt(n.length);if(s!=="d"){n+=s}return n}function r(e){var t=0,n;if(document.selection){e.focus();n=document.selection.createRange();n.moveStart("character",-e.value.length);t=n.text.length}else if(e.selectionStart||e.selectionStart===0){t=e.selectionStart}return t}function i(e,t){var n;if(document.selection){e.focus();n=document.selection.createRange();n.moveStart("character",-e.value.length);n.moveStart("character",t);n.moveEnd("character",0);n.select()}else if(e.selectionStart||e.selectionStart===0){e.selectionStart=t;e.selectionEnd=t;e.focus()}}var t=function(t,n){this.options=e.extend({},e.fn.bfhphone.defaults,n);this.$element=e(t);if(this.$element.is('input[type="text"]')||this.$element.is('input[type="tel"]')){this.addFormatter()}if(this.$element.is("span")){this.displayFormatter()}};t.prototype={constructor:t,addFormatter:function(){var n;if(this.options.country!==""){n=e(document).find("#"+this.options.country);if(n.length!==0){this.options.format=BFHPhoneFormatList[n.val()];n.on("change",{phone:this},this.changeCountry)}else{this.options.format=BFHPhoneFormatList[this.options.country]}}this.$element.on("keyup.bfhphone.data-api",t.prototype.change);this.loadFormatter()},loadFormatter:function(){var e;e=n(this.options.format,this.$element.val());this.$element.val(e)},displayFormatter:function(){var e;if(this.options.country!==""){this.options.format=BFHPhoneFormatList[this.options.country]}e=n(this.options.format,this.options.number);this.$element.html(e)},changeCountry:function(t){var n,r;n=e(this);r=t.data.phone;r.$element.val(String(r.$element.val()).replace(/\+\d*/g,""));r.options.format=BFHPhoneFormatList[n.val()];r.loadFormatter()},change:function(t){var s,o,u,a;s=e(this).data("bfhphone");if(s.$element.is(".disabled")||s.$element.attr("disabled")!==undefined){return true}o=r(s.$element[0]);u=false;if(o===s.$element.val().length){u=true}if(t.which===8&&s.options.format.charAt(s.$element.val().length)!=="d"){s.$element.val(String(s.$element.val()).substring(0,s.$element.val().length-1))}a=n(s.options.format,s.$element.val());if(a===s.$element.val()){return true}s.$element.val(a);if(u){o=s.$element.val().length}i(s.$element[0],o);return true}};var s=e.fn.bfhphone;e.fn.bfhphone=function(n){return this.each(function(){var r,i,s;r=e(this);i=r.data("bfhphone");s=typeof n==="object"&&n;if(!i){r.data("bfhphone",i=new t(this,s))}if(typeof n==="string"){i[n].call(r)}})};e.fn.bfhphone.Constructor=t;e.fn.bfhphone.defaults={format:"",number:"",country:""};e.fn.bfhphone.noConflict=function(){e.fn.bfhphone=s;return this};e(document).ready(function(){e('form input[type="text"].bfh-phone, form input[type="tel"].bfh-phone, span.bfh-phone').each(function(){var t;t=e(this);t.bfhphone(t.data())})})}(window.jQuery);+function(e){"use strict";function r(){var n;e(t).each(function(t){n=i(e(this));if(!n.hasClass("open")){return true}n.trigger(t=e.Event("hide.bfhselectbox"));if(t.isDefaultPrevented()){return true}n.removeClass("open").trigger("hidden.bfhselectbox")})}function i(e){return e.closest(".bfh-selectbox")}var t="[data-toggle=bfh-selectbox]",n=function(t,n){this.options=e.extend({},e.fn.bfhselectbox.defaults,n);this.$element=e(t);this.initSelectBox()};n.prototype={constructor:n,initSelectBox:function(){var r;r="";this.$element.find("div").each(function(){r=r+'<li><a tabindex="-1" href="#" data-option="'+e(this).data("value")+'">'+e(this).html()+"</a></li>"});this.$element.html('<input type="hidden" name="'+this.options.name+'" value="">'+'<a class="bfh-selectbox-toggle '+this.options.input+'" role="button" data-toggle="bfh-selectbox" href="#">'+'<span class="bfh-selectbox-option"></span>'+'<span class="'+this.options.icon+' selectbox-caret"></span>'+"</a>"+'<div class="bfh-selectbox-options">'+'<div role="listbox">'+'<ul role="option">'+"</ul>"+"</div>"+"</div>");this.$element.find("[role=option]").html(r);if(this.options.filter===true){this.$element.find(".bfh-selectbox-options").prepend('<div class="bfh-selectbox-filter-container"><input type="text" class="bfh-selectbox-filter form-control"></div>')}this.$element.val(this.options.value);this.$element.on("click.bfhselectbox.data-api touchstart.bfhselectbox.data-api",t,n.prototype.toggle).on("keydown.bfhselectbox.data-api",t+", [role=option]",n.prototype.keydown).on("mouseenter.bfhselectbox.data-api","[role=option] > li > a",n.prototype.mouseenter).on("click.bfhselectbox.data-api","[role=option] > li > a",n.prototype.select).on("click.bfhselectbox.data-api",".bfh-selectbox-filter",function(){return false}).on("propertychange.bfhselectbox.data-api change.bfhselectbox.data-api input.bfhselectbox.data-api paste.bfhselectbox.data-api",".bfh-selectbox-filter",n.prototype.filter)},toggle:function(t){var n,s,o;n=e(this);s=i(n);if(s.is(".disabled")||s.attr("disabled")!==undefined){return true}o=s.hasClass("open");r();if(!o){s.trigger(t=e.Event("show.bfhselectbox"));if(t.isDefaultPrevented()){return true}s.toggleClass("open").trigger("shown.bfhselectbox").find('[role=option] > li > [data-option="'+s.val()+'"]').focus()}return false},filter:function(){var t,n,r;t=e(this);n=i(t);r=e("[role=option] li a",n);r.hide().filter(function(){return e(this).text().toUpperCase().indexOf(t.val().toUpperCase())!==-1}).show()},keydown:function(r){var s,o,u,a,f,l,c;if(!/(38|40|27)/.test(r.keyCode)){return true}s=e(this);r.preventDefault();r.stopPropagation();u=i(s);f=u.hasClass("open");if(!f||f&&r.keyCode===27){if(r.which===27){u.find(t).focus()}return s.click()}o=e("[role=option] li:not(.divider) a:visible",u);if(!o.length){return true}e("body").off("mouseenter.bfh-selectbox.data-api","[role=option] > li > a",n.prototype.mouseenter);l=o.index(o.filter(":focus"));if(r.keyCode===38&&l>0){l=l-1}if(r.keyCode===40&&l<o.length-1){l=l+1}if(!l){l=0}o.eq(l).focus();e("body").on("mouseenter.bfh-selectbox.data-api","[role=option] > li > a",n.prototype.mouseenter)},mouseenter:function(){var t;t=e(this);t.focus()},select:function(t){var n,s,o,u;n=e(this);t.preventDefault();t.stopPropagation();if(n.is(".disabled")||n.attr("disabled")!==undefined){return true}s=i(n);s.val(n.data("option"));s.trigger("change.bfhselectbox");r()}};var s=e.fn.bfhselectbox;e.fn.bfhselectbox=function(t){return this.each(function(){var r,i,s;r=e(this);i=r.data("bfhselectbox");s=typeof t==="object"&&t;this.type="bfhselectbox";if(!i){r.data("bfhselectbox",i=new n(this,s))}if(typeof t==="string"){i[t].call(r)}})};e.fn.bfhselectbox.Constructor=n;e.fn.bfhselectbox.defaults={icon:"caret",input:"form-control",name:"",value:"",filter:false};e.fn.bfhselectbox.noConflict=function(){e.fn.bfhselectbox=s;return this};var o;if(e.valHooks.div){o=e.valHooks.div}e.valHooks.div={get:function(t){if(e(t).hasClass("bfh-selectbox")){return e(t).find('input[type="hidden"]').val()}else if(o){return o.get(t)}},set:function(t,n){var r,i;if(e(t).hasClass("bfh-selectbox")){r=e(t);if(r.find("li a[data-option='"+n+"']").length>0){i=r.find("li a[data-option='"+n+"']").html()}else if(r.find("li a").length>0){i=r.find("li a").eq(0).html()}else{n="";i=""}r.find('input[type="hidden"]').val(n);r.find(".bfh-selectbox-option").html(i)}else if(o){return o.set(t,n)}}};e(document).ready(function(){e("div.bfh-selectbox").each(function(){var t;t=e(this);t.bfhselectbox(t.data())})});e(document).on("click.bfhselectbox.data-api",r)}(window.jQuery)
    }
})
