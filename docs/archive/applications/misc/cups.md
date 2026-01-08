---
title: CUPS
---

## Useful commands

#### Print from the command line

```
lp -d PRINTER_NAME FILENAME
```

Or:

```
COMMAND | lp -d PRINTER_NAME
```

#### Get status of active print jobs (print queue)

```
lpstat
```

#### List available/default printers

```
lpstat -p -d
```

#### Cancel print job

```
cancel JOB_NAME
```

Ex:

```
cancel hp_8150-97
```

Or:

```
lprm JOB_ID_NUMBER
```

Ex:

```
lprm 97
```

#### Print a test page

- RHEL 5:

  ```
  lp -d PRINTER_NAME /usr/share/cups/data/testprint.ps
  ```

- RHEL 6/Ubuntu 14.04:
  ```
  lp -d PRINTER_NAME /usr/share/cups/data/testprint
  ```

#### Add a printer

```
sudo /usr/sbin/lpadmin -p PRINTER_NAME -D PRINTER_DESCRIPTION -L PRINTER_LOCATION -E -v DEVICE_URI -P PATH_TO_PPD
```

#### Remove a printer

```
sudo /usr/sbin/lpadmin -x PRINTER_NAME
```

#### Set a printer as default

```
sudo /usr/sbin/lpadmin -d PRINTER_NAME
```
