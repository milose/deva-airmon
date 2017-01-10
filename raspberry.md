# list disks, find card

```bash
diskutil list
```

# replace card
```bash
diskutil unmountDisk /dev/disk2
```

# note rdisk
```bash
# list files, paste bytes below
sudo dd if=image.img | pv -s 1390411776 | sudo dd of=/dev/rdisk2 bs=1m
sudo diskutil eject /dev/disk2
ssh pi@ip pass raspberry
```

# rpi
```bash
sudo raspi-config
touch .hushlogin
passwd
sudo su
sudo apt-get update -y && sudo apt-get upgrade -y && sudo apt-get dist-upgrade -y && sudo apt full-upgrade -y
sudo apt-get install rpi-update
sudo rpi-update
sudo reboot
```

# Write speed
```bash
sync; dd if=/dev/zero of=~/test.tmp bs=500K count=1024
```

# Read speed
```bash
sync; echo 3 | sudo tee /proc/sys/vm/drop_caches
sync; time dd if=~/test.tmp of=/dev/null bs=500K count=1024
```

# clean
```bash
rm ~/test.tmp
```

# kernel version
```bash
uname -a
```

# partition info
```bash
df -h
```

# installation
```bash
sudo apt-get install git build-essential libssl-dev autoconf libtool
git config --global user.name "Milos Sakovic"
git config --global user.email m@deva.co
git config --global core.editor nano
git config --list
```

# node
```bash
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt install nodejs
```

# nvm
```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
# verify nvm
command -v nvm
# node
nvm i node
# yarn
sudo npm i -g yarn
# pm2
sudo npm i -g pm2
pm2 startup
sudo su -c "env PATH=$PATH:/usr/bin pm2 startup linux -u pi --hp /home/pi"
pm2 save
```

# Node environment
```bash
sudo usermod -a -G www-data pi
sudo mkdir /var/www
sudo mkdir /var/www/nodes
sudo chown www-data:www-data -R /var/www
cd ~
ln -s /var/www ./www
```
# sound
```bash
sudo apt-get install alsa-utils
aplay -l
```

# get card number
```bash
sudo nano /etc/asound.conf```

add
```config
    pcm.!default {
        type hw
        card <number of card>
    }
    ctl.!default {
        type hw
        card <number of card>
    }
```

```bash
sudo speaker-test -c2 -D hw:<number of card>,0
sudo nano /usr/share/alsa/alsa.conf
```

# ffmpeg
```bash
sudo apt-get install ffmpeg
# if cant
# open sudo nano /etc/apt/sources.list
# add deb http://httpredir.debian.org/debian jessie-backports main
# sudo apt-get update
# sudo apt-get -t jessie-backports install ffmpeg
```

# Audio
```bash
#working: arecord -f S16_LE -D hw:1 -r 48000 test.wav
#arecord -f cd -D hw:1 test.wav
arecord -f cd test.wav
```

# encode
```bash
ffmpeg -nostats -loglevel 0 -y -i test.wav -ar 32000 -c:a libmp3lame -b:a 64k output.mp3
#time ffmpeg -y -i test.wav -ar 32000 -c:a aac -b:a 64k output-128.m4a
#time ffmpeg -y -i test.wav -ar 32000 -c:a aac -vbr 4 output-vbr.m4a
#time ffmpeg -y -i test.wav -ar 32000 -c:a libmp3lame -q:a 8 output.mp3
#time ffmpeg -y -i test2.wav -ar 32000 -c:a libmp3lame -q:a 8 output2.mp3
#time ffmpeg -y -i test2.wav -ar 32000 -c:a libmp3lame -b:a 64k output2.mp3
```

# todo
1. gpio enable step
2. on gpio record
    - aktiviraj komandu rekord
    - kad zavrsi rekord ukini komandu
    - konvertuj mp3
    - kad se konvertuje posalji ga na slek

3. web interface
4. da se utvrdi moze li gpio da se poveze direktno na ulaz kartice i da to bude triger bez releja? pwm? adc?


# Info
Cpu Info
http://www.raspberrypi-spy.co.uk/2012/09/checking-your-raspberry-pi-board-version/
