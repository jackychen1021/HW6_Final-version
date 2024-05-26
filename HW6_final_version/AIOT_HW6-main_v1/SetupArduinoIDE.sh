#!/bin/bash

cd ~
cd Downloads
# ls

# Download arduino-1.8.19-linuxaarch64.tar.xz
wget -O arduino-1.8.19-linuxaarch64.tar.xz https://downloads.arduino.cc/arduino-1.8.19-linuxaarch64.tar.xz?_gl=1*1ukuqwx*_ga*MTIxMDcyNjM4OS4xNzA4NzgxNjcx*_ga_NEXN8H46L5*MTcwODkzODI5MS40LjAuMTcwODkzODI5MS4wLjAuMA..*_fplc*aW5nTmlpNXJBT1E5Rk1wMnZGdHg5SWVIVlVZOUtLSkRIVzIlMkI4T05JOFJRYVpHSXNTTUZpT0IwTklPUGZMQ0hhQnpSUTR6azVOZ0lxNUglMkZjWUJ6QXhJR294MlZtVFdxeiUyRiUyRk4xb1lMVGx1c1d6VHBOaHE4aTIyanV1c094eUElM0QlM0Q.

# Unzip the file
tar -xf arduino-1.8.19-linuxaarch64.tar.xz

# Move the file to '/opt' folder
sudo mv arduino-1.8.19 /opt

# Install Arduino IDE
sudo /opt/arduino-1.8.19/install.sh


# Download DHT11-2.1.0.zip library
wget -O DHT11-2.1.0.zip https://downloads.arduino.cc/libraries/github.com/dhrubasaha08/DHT11-2.1.0.zip?_gl=1*15b7zco*_ga*MTIxMDcyNjM4OS4xNzA4NzgxNjcx*_ga_NEXN8H46L5*MTcwODkxMDg4Ni4zLjEuMTcwODkxNjM5OC4wLjAuMA..*_fplc*NE40b1FXZjc5TnFKOUM3WWlWb1dYJTJGZzVEeW9aZzl3Y1I3NmdpZWc0d0FXUndDOHpQclM2SExocCUyQkRqWnd3UmJzWElmNzhHbG9xU2JRbkw0MENXQWNxWTFlQ3NTYzVqTTdSJTJCelVLdTE4S0RTeVZyZng2ZDUyeWo2a2xqZjNnJTNEJTNE