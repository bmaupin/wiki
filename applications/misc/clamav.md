---
title: ClamAV
---

#### Install clamav
```
sudo apt install clamav
```


#### Disable update service
```
sudo systemctl disable clamav-freshclam
```


#### Stop update service
```
sudo systemctl stop clamav-freshclam
```


#### Update clamav manually
```
sudo freshclam
```


#### Scan system
```
mkdir $HOME/Desktop/infected; sudo clamscan -r --bell -i --move=$HOME/Desktop/infected --exclude-dir=$HOME/Desktop/infected / &> $HOME/Desktop/infected/scan.txt
```
