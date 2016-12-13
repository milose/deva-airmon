# list disks, find card

diskutil list

# replace card

diskutil unmountDisk /dev/disk

# list files, paste bytes

# note rdisk

sudo dd if=image.img | pv -s 1389363200 | sudo dd of=/dev/rdisk2 bs=1m sudo diskutil eject /dev/disk2

ssh pi@ip pass raspberry touch .hushlogin passwd sudo su sudo apt-get update -y && sudo apt-get upgrade -y && sudo apt-get dist-upgrade -y && sudo apt full-upgrade -y sudo apt-get install rpi-update sudo rpi-update sudo reboot

# Write speed

sync; dd if=/dev/zero of=~/test.tmp bs=500K count=1024

# Read speed

sync; echo 3 | sudo tee /proc/sys/vm/drop_caches sync; time dd if=~/test.tmp of=/dev/null bs=500K count=1024

# clean

rm ~/test.tmp

# kernel version

uname -a

# partition info

df -h

# installation

sudo apt-get install git build-essential libssl-dev autoconf libtool git config --global user.name "Milos Sakovic" git config --global user.email m@deva.co git config --global core.editor nano git config --list

# node

curl -sL <https://deb.nodesource.com/setup_7.x> | sudo -E bash - sudo apt install nodejs

# nvm

wget -qO- <https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh> | bash

# verify nvm

command -v nvm

# node

nvm i node

# yarn

sudo npm i -g yarn

# pm2

sudo npm i -g pm2 pm2 startup sudo su -c "env PATH=$PATH:/usr/bin pm2 startup linux -u pi --hp /home/pi" pm2 save

# sound

sudo apt-get install alsa-utils aplay -l

# get card number

sudo nano /etc/asound.conf

# add

```
pcm.!default {
    type hw
    card <number of card>
}
ctl.!default {
    type hw
    card <number of card>
}
```

sudo speaker-test -c2 -D hw:

<number of="" card="">,0
sudo nano /usr/share/alsa/alsa.conf</number>

# ffmpeg

sudo apt-get install ffmpeg

```
# if not
sudo nano /etc/apt/sources.list
# add
    deb http://httpredir.debian.org/debian jessie-backports main
sudo apt-get update
sudo apt-get -t jessie-backports install ffmpeg
```

# record

```bash
arecord -f S16_LE -D hw:1 -r 48000 test.wav
```

# encode

```bash
time ffmpeg -y -i test.wav -ar 32000 -c:a libmp3lame -b:a 64k output.mp3
# time ffmpeg -y -i test.wav -ar 32000 -c:a aac -b:a 64k output-128.m4a
# time ffmpeg -y -i test.wav -ar 32000 -c:a aac -vbr 4 output-vbr.m4a
# time ffmpeg -y -i test.wav -ar 32000 -c:a libmp3lame -q:a 8 output.mp3
# time ffmpeg -y -i test2.wav -ar 32000 -c:a libmp3lame -q:a 8 output2.mp3
# time ffmpeg -y -i test2.wav -ar 32000 -c:a libmp3lame -b:a 64k output2.mp3
```

# todo

1. gpio enable step
2. on gpio record

  - aktiviraj komandu rekord
  - kad zavrsi rekord ukini komandu
  - konvertuj mp3
  - kad se konvertuje posalji ga na slek

3. web interface *. da se utvrdi moze li gpio da se poveze direktno na ulaz kartice i da to bude triger bez releja? pwm? adc?
