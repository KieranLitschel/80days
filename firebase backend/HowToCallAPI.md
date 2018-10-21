# What the API does

It queries the Skyscanner API and returns the 5 cheapest flights from the origin to the destination on a given date. The API is hosted in the Google Cloud using Cloud Functions in the Firebase API.

# How to use the API

The following webpage should be requested:

```
https://us-central1-aroundtheworld-1.cloudfunctions.net/getFullQuote?country={COUNTRY}&currency={CURRENCY}&locale={LOCALE}&originPlace={ORIGIN_PLACE}&destinationPlace={DESTINATION_PLACE}&outboundDate={OUTBOUND_DATE}&adults={ADULTS}&ipAddress={IP_ADDRESS}
```

And it should be given the following arguments, with each value replacing {FIELD} in the URL:
* country - The code of the country where the user lives in
    * All possible values for this can be found in the directory "skyscanner api/locale.xml" relative to this one. Possible values are in the tag "Code". Note that you should only pass for this value the part of the code that is to the right of the "-".
* currency - The code of the currency the user purchases in
    * All possible values for this can be found in the directory "skyscanner api/places.xml" relative to this one. Possible values for currency can be found in the block for each Country in the CurrencyID value.
* locale - The code of the country where the user is currently
    * This can have the same values as country, except you should provide the whole of the value inside each "Code"
* origin_place - The place the user wishes to fly from
    * Values for this are found in the places.xml, for our API we focus on flights, so you should enter the airport ID followed by "-sky", for example "LGW-sky", you can read more about other ids [here](https://skyscanner.github.io/slate/#list-of-places)
* destination_place - The place the user wishes to fly to
    * Of the same format as origin_place.
* outbound_date - The date the user wishes to fly
    * Of the format "YYYY-MM-DD".
* adults - The number of adults wishing to fly
    * Integer greater than 1.
* ip_address - The IP address of the user
    * Input as a regular IP address, no need to use escape characters for the bullet points
* skyscanner - Set to "true" if wish to use Skyscanner API, "false" if you wish to use Victor's



The API returns the 5 cheapest results as a JSON list of objects, each with 4 attributes:
* price - The price of a single ticket in the specified currency
* departTime - The date and time of departure, is in the format "YYYY-MM-DDTHH:MM:SS"
    * Note that the T value sits in the specified position in the date and does not change with the values
* arrivalTime - The date and time of arrival, is in the same format as departTime
* url - The booking url provided by Skyscanner that redirects to the website to buy the tickets

# An example of how to the user the API

## What to call:

An example query is the following:
```
https://us-central1-aroundtheworld-1.cloudfunctions.net/getFullQuote?country=GB&currency=GBP&locale=en-GB&originPlace=LGW-sky&destinationPlace=EDI-sky&outboundDate=2018-12-01&adults=1&ipAddress=147.83.201.96&skyscanner=true
```

## Example result:

The above query returned the following result on 21/10/18 at 12:39 AM:
```json
[
  {
    "price": 32.92,
    "departTime": "2018-12-01T18:00:00",
    "arrivalTime": "2018-12-01T19:25:00",
    "url": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=q9KAO3jUxwSfUivtRw7r0UY0WGHFC2lgbfiv1WFM%2b1cN1SFTJDuWfMwhJZJ5tQSo&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUK%2fen-GB%2fGBP%2feasy%2f1%2f13542.11235.2018-12-01%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32356%7c811%7c13542%7c2018-12-01T18%3a00%7c11235%7c2018-12-01T19%3a25%7c85%7c-%7c-%7c-%26carriers%3d-32356%26operators%3d-32356%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d32.92%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26commercial_filters%3dfalse%26q_datetime_utc%3d2018-10-20T22%3a18%3a00"
  },
  {
    "price": 35.96,
    "departTime": "",
    "arrivalTime": "",
    "url": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=q9KAO3jUxwSfUivtRw7r0UY0WGHFC2lgbfiv1WFM%2b1cN1SFTJDuWfMwhJZJ5tQSo&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUK%2fen-GB%2fGBP%2fba__%2f1%2f13542.11235.2018-12-01%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32480%7c2946%7c13542%7c2018-12-01T19%3a45%7c11235%7c2018-12-01T21%3a10%7c85%7cOELZ0KO%7cO%7cBasic%26carriers%3d-32480%26operators%3d-32480%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dtrue%26ticket_price%3d35.96%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26deeplink_ids%3deu-west-1.prod_189988a8644f52cda71ccc44c953744e%26commercial_filters%3dfalse%26q_datetime_utc%3d2018-10-20T15%3a38%3a00%26source_website_id%3damac"
  },
  {
    "price": 57.32,
    "departTime": "2018-12-01T08:25:00",
    "arrivalTime": "2018-12-01T09:55:00",
    "url": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=q9KAO3jUxwSfUivtRw7r0UY0WGHFC2lgbfiv1WFM%2b1cN1SFTJDuWfMwhJZJ5tQSo&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUK%2fen-GB%2fGBP%2feasy%2f1%2f13542.11235.2018-12-01%2fair%2fairli%2fflights%3fitinerary%3dflight%7c-32356%7c803%7c13542%7c2018-12-01T08%3a25%7c11235%7c2018-12-01T09%3a55%7c90%7c-%7c-%7c-%26carriers%3d-32356%26operators%3d-32356%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d57.32%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26commercial_filters%3dfalse%26q_datetime_utc%3d2018-10-20T22%3a18%3a00"
  },
  {
    "price": 81.87,
    "departTime": "2018-12-01T11:55:00",
    "arrivalTime": "2018-12-01T13:25:00",
    "url": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=q9KAO3jUxwSfUivtRw7r0UY0WGHFC2lgbfiv1WFM%2b1cN1SFTJDuWfMwhJZJ5tQSo&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUK%2fen-GB%2fGBP%2fpack%2f1%2f13542.11235.2018-12-01%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32480%7c2938%7c13542%7c2018-12-01T11%3a55%7c11235%7c2018-12-01T13%3a25%7c90%7c-%7c-%7c-%26carriers%3d-32480%26operators%3d-32480%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d81.87%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26deeplink_ids%3deu-west-1.prod_1795aaebe01485c328b225400d072fe0%26commercial_filters%3dfalse%26q_datetime_utc%3d2018-10-20T22%3a36%3a00"
  },
  {
    "price": 86,
    "departTime": "2018-12-01T21:25:00",
    "arrivalTime": "2018-12-02T10:30:00",
    "url": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=q9KAO3jUxwSfUivtRw7r0UY0WGHFC2lgbfiv1WFM%2b1cN1SFTJDuWfMwhJZJ5tQSo&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUK%2fen-GB%2fGBP%2fskyp%2f1%2f13542.11235.2018-12-01%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-31685%7c8773%7c13542%7c2018-12-01T21%3a25%7c10413%7c2018-12-01T23%3a35%7c70%7cDOWVYHB%7cD%7c-%3bflight%7c-32677%7c1686%7c10413%7c2018-12-02T09%3a35%7c11235%7c2018-12-02T10%3a30%7c115%7c-%7c-%7c-%26carriers%3d-31685%2c-32677%26operators%3d-31685%3b-32677%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dtrue%26ticket_price%3d86.00%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26deeplink_ids%3deu-west-1.prod_a3d61f10bf7325eade7cce339c04d91b%26commercial_filters%3dfalse%26q_datetime_utc%3d2018-10-20T22%3a36%3a00%26transfer_protection%3dprotected"
  }
]
```