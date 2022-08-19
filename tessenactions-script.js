const request = require('request');
var TESSEN_ACCOUNTID = XXXXXXX
var QUERYKEY = XXXXXXXXXXXXXX
var CLIENT_ACCOUNTID = XXXXXXXX
var INSERTAPIKEY = XXXXXXXXXXX

// GET TessenActions data
const options = {
  method: 'GET',
  url: 'https://staging-insights-api.newrelic.com/v1/accounts/' + TESSEN_ACCOUNTID + '/query',
  qs: {
    nrql: 'FROM TessenAction SELECT email, userType, instrumentationProviders, provider, accountName, category, nerdpackId, nr_product, nr_subproduct, pageComponent, customer_account_name WHERE email LIKE \'%@nombreoficial.com%\' SINCE 1 MINUTE AGO LIMIT MAX'
  },
  headers: {
    Accept: 'application/json',
    'X-Query-Key': QUERYKEY
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  // console.log(body);
  var parsedJSONBody = JSON.parse(body);
  var results = parsedJSONBody["results"];
  var events = results[0].events;

  var records = [];
  for(let i=0; i < events.length; i++) {
      records.push(events[i]);
      const options2 = {
        method: 'POST',
        url: 'https://insights-collector.newrelic.com/v1/accounts/' + CLIENT_ACCOUNTID + '/events',
        json: true,
        headers: {
          Accept: 'application/json',
          'X-Insert-Key': INSERTAPIKEY,
          'accept-encoding':  'gzip, deflate'
        },
        body: {
            "eventType": "newRelicActions",
            "email": records[i].email,
            "userType": records[i].userType,
            "instrumentationProviders": records[i].instrumentationProviders,
            "provider": records[i].provider,
            "accountName": records[i].accountName,
            "category": records[i].category,
            "nerdpackId": records[i].nerdpackId,
            "nr_product": records[i].nr_product,
            "nr_subproduct": records[i].nr_subproduct,
            "pageComponent": records[i].pageComponent,
            "customer_account_name": records[i].customer_account_name
        }
      };
      
      request(options2, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(body);
      });
  }
});
