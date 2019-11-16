# bostonhacks-bit-bots
Submission for the 2019 BostonHacks for the Bit Bots Team


# Setup

## Setup Python Environment

1. `pip install libsoundtouch`


## Setup Bose API Stuff

1. Get API Key by creating a new app: https://developer.bose.com/user/me/apps
2. Set Consumer Key in your env. variable: `export BOSE_API_KEY=<YOUR_KEY>`
3. Run the discovery script: `python discovery.py`
4. Set the bose ip address in your env variable: `export BOSE_IP=<IP_ADDRESS>`
3. Test:
```
curl -d \
"<play_info><app_key>${BOST_API_KEY}</app_key><url>http://www.example.com/notification.mp3</url><service>service text</service><reason>reason text</reason><message>message text</message><volume>25</volume></play_info>" http://${IP_ADDRESS}:8090/speaker
```