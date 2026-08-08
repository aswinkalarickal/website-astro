---
title: "Adding SSH Keys"
description: "Learn how to add SSH keys in a UNIX system"
pubDate: 2017-07-03T16:01
---

Follow these steps to add SSH Keys:

1. Generate private/public RSA key pair using:
   ```bash
   ssh-keygen -t rsa
   ```
   You can use the defaults. The private key will be at `~/.ssh/id_rsa` and the public at `~/.ssh/id_rsa.pub`.
2. Copy the public key to the server using:
   ```bash
   scp ~/.ssh/id_rsa.pub <username>@<host>:<filepath>/id_rsa.pub
   ```
3. Login to the server using:
   ```bash
   ssh <username>@<host>
   ```
4. Add the public key to the host using:
   ```bash
   cat <filepath>/id_rsa.pub >> ~/.ssh/authorized_keys
   ```
   In case of error try changing the file permission:
   ```bash
   chmod 700 ~/.ssh/authorized_keys
   ```

And... Done!
