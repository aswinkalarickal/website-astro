---
title: "Setting up Virtual Host in MAMP"
description: "Learn to set up virtual host in Apache using MAMP"
pubDate: 2017-02-27T12:12
---

This tutorial will help you to set up a Virtual Host using MAMP without using console. Follow these steps:

1. Open the file `/etc/hosts`. You will be prompted to enter your login password.
2. Navigate to line line containing `127.0.0.1 localhost` and enter the following in the next new line:
   ```
   127.0.0.1   example.dev
   ```
3. Save the file and exit. Now you will be redirected to `127.0.0.1` when you enter `example.dev` in your browser.
   You can do this for any number of addresses.
4. Now open the file `/Applications/MAMP/conf/apache/httpd.conf` and navigate to the lines containing:
   ```apache
   # Virtual hosts
   # Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
   ```
5. Remove the hash(#) before the line that starts with `Include` so that it looks like:
   ```apache
   # Virtual hosts
   Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
   ```
6. Open the file at `/Applications/MAMP/conf/apache/extra/httpd-vhosts.conf`.
   You can see examples of how to define Virtual Hosts. You can either edit this or add one of your own.
   Add this configuration to define your virtual host:

   ```apache
   <VirtualHost *:80>
       DocumentRoot /Applications/MAMP/htdocs
       ServerName localhost
   </VirtualHost>

   <VirtualHost *:80>
       DocumentRoot "/path/to/site"
       ServerName example.dev
   </VirtualHost>
   ```

7. Close the file and restart the servers to get into action.
8. Now if you enter the URL `http://example.dev` in your browser,
   you will be served the files at path `/path/to/site` you had entered in the configuration.
   You can add more Virtual Hosts as and when needed.

Virtual Hosts helps in making workflow easier.
