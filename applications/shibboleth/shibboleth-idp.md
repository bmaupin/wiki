---
title: Shibboleth IdP
---

## Misc

#### Checking to see if Shibboleth IdP is running
On the local server:

    curl -k1 https://localhost:443/idp/status

(Change the port as necessary)


#### Signing and encryption

Default behaviour:
[https://wiki.shibboleth.net/confluence/display/IDP30/SAML2SSOConfiguration#SAML2SSOConfiguration-Notes](https://wiki.shibboleth.net/confluence/display/IDP30/SAML2SSOConfiguration#SAML2SSOConfiguration-Notes)
- The assertion inside of the response message is encrypted (`encryptAssertions="true"`) but not signed (`signAssertions="false"`)
- The entire response message itself is then encrypted (`signResponses="true"`)


#### Shibboleth IdP 3.x properties

- `idp.authn.defaultLifetime`
    [https://wiki.shibboleth.net/confluence/display/IDP30/SessionConfiguration#SessionConfiguration-SecurityPolicyImplicationsofSessionTimeouts](https://wiki.shibboleth.net/confluence/display/IDP30/SessionConfiguration#SessionConfiguration-SecurityPolicyImplicationsofSessionTimeouts)
    - Default: 60 minutes
    - This is the maximum amount of time that can pass before a user has to log in again to the IdP. If this value is changed, idp.session.timeout will need to be changed as well.
    <br><br>

- `idp.authn.defaultTimeout`
    - Default: 30 minutes
    - A user that logs into the IdP within this time from their last login will not have to log in again, provided the time since their first login isn't greater than idp.authn.defaultLifetime.
    <br><br>

- `idp.session.timeout`
    - Default: 60 minutes
    - This is the amount of time the IdP will internally store a session. This does not actually determine whether a user will have to log in again (that setting is idp.authn.defaultLifetime). idp.session.timeout must be at least as long as idp.authn.defaultLifetime


## Fu

#### Get a list of all entity IDs that have accessed an IdP

    for file in /opt/shibboleth-idp/logs/idp-audit*; do zcat -f $file | cut -d \| -f 4; done | sort -u

Include access counts:

    for file in /opt/shibboleth-idp/logs/idp-audit*; do zcat -f $file | cut -d \| -f 4; done | sort | uniq -c | sort -gr

Include access counts and percentage:

    for file in /opt/shibboleth-idp/logs/idp-audit*; do zcat -f $file | cut -d \| -f 4; done | sort | uniq -c | awk '{b[$2]=$1;sum=sum+$1} END{for (i in b) printf "%s %.2f%% %s\n",b[i],(b[i]/sum)*100,i}' | sort -gr | column -t

Include total and average daily access counts:

    find `ls -1 /opt/shibboleth-idp/logs/idp-audit* | head -n 1` -printf 'Total logins since %t:\n'; for file in /opt/shibboleth-idp/logs/idp-audit*; do zcat -f $file | cut -d \| -f 4; done | sort | uniq -c | sort -gr | column -t | awk '{print}END{print "\nAverage logins per day:"}' | tee /dev/tty | awk -v n=`ls -1 /opt/shibboleth-idp/logs/idp-audit* | wc -l` '{printf "%.1f %s\n", $1/n, $2}' | column -t | head -n -2


#### Get the average daily access count

    for file in /opt/shibboleth-idp/logs/idp-audit-*; do zcat -f $file | wc -l; done | awk '{total+=$1; count+=1} END {print total/count}'
