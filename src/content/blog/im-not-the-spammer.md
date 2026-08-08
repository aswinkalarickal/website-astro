---
title: "I'm not the spammer!!"
description: "How I sent mail to my contacts to report my account is hacked!"
pubDate: 2016-01-29T14:26
---

This morning I found out the hard truth. My e-mail is **HACKED**!!!
I was getting calls and texts from all those zombies in my life. I was wondering why people suddenly remembered me.
The problem was I had sent mails to all my contacts with some malicious link.

I could not figure out what to do other than tell all those who contacted me not to open the link.
But then one of my friends suggested me to send another mail to all my contacts telling them I was hacked and to ignore my other mail.
It should be a broadcast to all. I searched for that online, but could not find a solution.
The only thing I could do was send a mail to every single one of my contact getting their e-mail IDs from my contact list!
This was done to prevent spammers. Good move, Google!!

But then I had to tell this to everyone. I'm a dev, I can do it - I thought, and I did it!
The way to do it was to get all the e-mail IDs from my contacts and send them a mail asking them not to open it.
First I downloaded the VCF from my account. Then I ran this bash command to get all my contact e-mail:

```bash
cat contacts.vcf | grep 'EMAIL' | cut -d: -f2 > email.txt
```

What it did was, iterate through every line of the file _contacts.vcf_ and print the lines having the word _EMAIL_ in it.
Then all the new lines are cut using delimiter _colon(:)_ and the strings obtained are saved to file _email.txt_.

Now all I had to do was to copy the contents of the file, paste it and click send!!
