# deva-airmon

> On-Air monitoring suite for Radio stations.

## Install

```bash
git clone git@github.com:milose/deva-airmon.git

#mount the remote dir
sshfs -o allow_other,defer_permissions pi@192.168.100.3:/var/www/nodes ~/Work/_sandbox/remote
#unmount

#sudo adduser pi gpio
diskutil unmount ~/Work/_sandbox/remote

#this shit doesnt work
sudo adduser pi gpio
sudo chown root.gpio /dev/gpiomem
sudo chmod g+rw /dev/gpiomem
sudo chown root.gpio /dev/mem
sudo chmod g+rw /dev/mem
```

Info [link](http://example.com) here.

## Todo

#### App

- [ ] Clean up readme
- [ ] Dropbox
- [ ] Create an api service to upload files / bucket
- [ ] Find a bot with uploads
- [ ] Command to clean old files / bot?
- [ ] Configuration: station name, api to read anchor name from shift-register, id3 tags etc
- [ ] Web config
<!-- - [ ] Laravel Elixir -->
<!-- - [ ] Vue main -->
<!-- - [ ] Vue components -->

#### GPIO

- [ ] Should not depend on `sudo`
- [ ] Investigate [this](http://elinux.org/RPi_Tutorial_EGHS%3aGPIO_Protection_Circuits)
