# tessenactions
script for sending Tessen Actions events to New Relic customer accounts to track usage

## getting started
1. Required - Update the `QUERYKEY`, `INSERTAPIKEY`, `CLIENT_ACCOUNTID` and `TESSEN_ACCOUNTID` variables
2. Required - Update the email domain in the query to match the domain of your organization - by default, this is set to `%@nombreoficial.com%` (line 12)
3. Optional - Update the name parameter within the event payload - by default, this is set to `newRelicActions`

## installation
Once you have updated the script according to your needs, create the monitor as follows:

1. Select Endpoint availability (Scripted API)
2. Select Node 10 Runtime
3. Name your monitor
4. Select a location (any)
5. Validate the script and confirm no errors
6. Save the monitor
7. Run test check and view data by querying `FROM Metric SELECT * WHERE metricName='newRelicActions'`

## dashboard
A dashboard for reviewing this data is available in `dashboard.json`

<img width="1409" alt="image" src="https://user-images.githubusercontent.com/68360819/185676235-55f4c935-1cc5-4ec2-9fb9-9fd372190e17.png">
