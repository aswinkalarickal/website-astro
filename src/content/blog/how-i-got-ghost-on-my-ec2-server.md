---
title: "How I got Ghost on my EC2 server"
description: "Learn to run Ghost on EC2 server"
pubDate: 2015-06-15T17:11
---

I know nothing about blogging, but had always wanted to try it.
I had a Wordpress account for so long, but hadn't tried much on it other than write something and save to drafts.
It's been some time I got a server on [AWS](http://aws.amazon.com/) and wanted to try something.
I was in the process of learning [Node.js](https://nodejs.org/) and got to know about [Ghost](https://ghost.org/).
Well, I tried to give it a shot. So this is how I did it.

I bought a domain name from one of the many domain name sellers out there.
Let's call it example.com. Now, I added an A Records @ pointing to my server's IP address.
I also added a CNAME Record \* pointing to @, which helps me to grab every sub-domain.
Rest of the job is done by [Nginx](http://nginx.org/). It redirects my sub-domains as required.
The Nginx configuration for the site is:

```nginx
server {
	listen 80;
	server_name www.example.com;
	root /path/to/your/files;
}
```

This will redirect _www.example.com_ to the specified folder.
But then I wanted to redirect all my sub-domains to the same folder.
So I had to add a wildcard which is like:

```nginx
server {
	listen 80;
	server_name .example.com;
	return 301 $scheme://www.example.com$request_uri;
}
```

_.example.com_ is used to get every sub-domain, be it foo.example.com or blog.example.com, or one without sub-domain,
like example.com.

The next thing was to get Ghost running on my server. For that you need Node.js running on your server.
If you don't have Node.js running on you system,
follow [this](http://iconof.com/blog/how-to-install-setup-node-js-on-amazon-aws-ec2-complete-guide/#installNode)
tutorial to install it. It is one of the best tutorials you can find online.

After you have installed Node.js, go to [Ghost GitHub](https://github.com/tryghost/Ghost) to get the files.
The best way to install Ghost is to follow the instructions given in the README file.

After installing, try to run Ghost by opening http://example.com:2368 from your browser.
The page won't load because you don't have access to the port 2368 where your Ghost app is running.
For that you will have to add this port number to your launch wizard. It will be like:
![Adding Port](/images/how-i-got-ghost-on-my-ec2-server/adding-port.png)

After this, try loading the site again from your browser. Ghost will now run in your browser.
But this is not what we want. We don't want to run our blog in numbers!
So here's how you can access your blog from a sub-domain like _blog.example.com_ or _ghost.example.com_.

For this, you will need to get back to your Nginx configuration file. Just after the first server block, add this code:

```nginx
server {
	listen 80;
	server_name blog.example.com;
	access_log /var/log/nginx/ghost.log;
	location / {
		proxy_pass http://127.0.0.1:2368;
	}
}
```

This will redirect _blog.example.com_ to your Ghost app and it will successfully run your app.
But there is a problem. What if your server goes down? The Ghost app won't restart on its own.
And if we want it to restart of its own, we need to do a bit more work.

Now is the time for some kind of process control mechanism. For that, let's use [Supervisor](http://supervisord.org/).
This helps to run a process forever, even if it was terminated.
To install Supervisor, follow [this](http://supervisord.org/installing.html) link.
After installing, all you have to do is add the code block given below to the configuration:

```ini
[program:ghost]
	command=/usr/local/bin/npm start --production
	directory=/usr/share/nginx/html/blog.aswink.in
	autostart=true
	autorestart=unexpected
	startsecs=2
	startretries=3
```

This configuration will restart your Ghost app even if it quits unexpectedly,
thereby keeping your app running forever once your Supervisor is started.

> It is always better to keep different file for different configurations(both Nginx and Supervisor),
> which can be included in your main file.

Voila, your Ghost app is up and running! Happy blogging!! 😊
