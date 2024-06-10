# BREW

# Mettre à jour le système et installer les outils de développement essentiels

sudo apt-get update
sudo apt-get upgrade
sudo apt-get install build-essential

# Télécharger et installer Homebrew

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Ajouter Homebrew au PATH

echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/pi/.bashrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

# Vérifier l'installation de Homebrew

brew --version

# NODEJS

# NOTE:

# Homebrew is not a Node.js package manager. Please ensure it is already installed

# on your system. Follow official instructions at https://brew.sh/

# Homebrew only supports installing major Node.js versions and might not support

# the latest Node.js version from the 20 release line.

# download and install Node.js

brew install node@20

# verifies the right Node.js version is in the environment

node -v # should print `v20.14.0`

# verifies the right NPM version is in the environment

npm -v # should print `10.7.0`

https://nodejs.org/dist/v20.14.0/node-v20.14.0-linux-armv7l.tar.xz
