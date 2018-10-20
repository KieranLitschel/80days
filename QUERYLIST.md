Querying flights:
* country - The country the user is registered in
    * See locale.xml for list of valid countries
* currency - The currency you want the prices in
    * See currency.xml for list of valid currencies
* locale - The country the user is in now (can just make this same as country if easier)
* originPlace - Where they're flying from
* destinationPlace - Where they want to fly to
* outboundPartialDate - The outbound date
    * Date format "yyyy-mm-dd"
* inboundPartialDate - The inbound date (optional)
Example - http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/GBP/ES/LGW/EDI/2018-12-01/?apiKey={apikey}