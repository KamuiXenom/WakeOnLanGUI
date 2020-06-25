# Wake On LAN GUI

# Requirements
- PHP 7.1+
    - ext_ctype
    - ext_json
    - ext-sockets
- composer

# Installation
- copy all files in your server directory
- execute composer install in this directory

# Important
This script cannot be used by VPN. VPN destroy the package information. 

# Configuration
## computer list
- open data/computer.csv
- add name and mac-address, see below


    name,mac
    Max,00:00:00:00:00:00
    
- save it

# computer list path
You can change the path to the csv file with your computers in the php file "wol.php" on line 12:

    define('COMPUTER_CSV_PATH', 'data/computer.csv');

# broadcast address
You can change the broadcast address in the php file "wol.php" on line 13:

    define('NETWORK_BROADCAST', '255.255.255.255');
    
