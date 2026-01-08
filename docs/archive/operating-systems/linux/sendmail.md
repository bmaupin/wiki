---
title: Sendmail
---

#### Send a test email

```
mail -s "test" user@example.org < /etc/redhat-release
```

Or:

```
echo `date` | mailx -v -s "Test - `date`" user@example.org
```

#### Verify the ability to send mail (doesn't send anything)

```
sudo sendmail -bv user@example.org
sudo sendmail -bv localuser
```

#### Verify the ability to send mail using a custom sendmail.cf

```
sendmail -C sendmail.cf -bv user@example.org
```

#### sendmail.mc

This is the main Sendmail configuration file. It is compiled to sendmail.cf using this command:

```
m4 /etc/mail/sendmail.mc > /etc/mail/sendmail.cf
```

#### sendmail.cf

This is the compiled Sendmail configuration file. See sendmail.mc for generating this file.
