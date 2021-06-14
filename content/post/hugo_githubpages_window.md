---
title: "Hugo with Git Hub Pages on Windows"
date: 2021-06-14T13:16:19+05:30
draft: false
tags: ["Hugo","Git Hub Pages",Windows]
categories: ["Hugo","Git","Windows"]
---

I created this blog using Hugo and Git Hub Pages on windows.Hugo is a static site generator.Its very fast and 
written in Go language.Git Hub Pages lets you host the static sites created using Hugo.

### Installing Hugo
First install Hugo on windows.I used the [chocolate](https://chocolatey.org/) package manager to install Hugo on
windows.There are two versions available to install.I installed the extended version as it is required if you plan
to customize the themes you will be using.

```
choco install hugo-extended -confirm
```

After install check Hugo version to confirm if installed successfully

```
hugo version
```

### Git Repositories and folder structure
Now that we have installed Hugo let create our blog.Lets discuss the Git repositories and folder structure
I will create two Git repositories.

1. Development repository - This will contain all the Hugo files and the posts I create in markdown.
2. Git Hub Pages repository - This will contain the output of Hugo which will the static sites for my blog.

Since I have two git repositories,I will have two folders for the same.First I will create a folder blog where the two
folders will be.Inside blog folder using Hugo create a new site jsjblog.The jsjblog folder will be linked to the git 
development repository.Then the output of Hugo which will be static sites will be stored in jsjblog_site folder which I 
created in later steps.

```
mkdir blog
hugo new site jsjblog
```
If you go inside the jsjblog folder you will find all the Hugo setup files.

```
d-----         archetypes
d-----         content
d-----         data
d-----         layouts
d-----         resources
d-----         static
d-----         themes
-a----         config.toml
```
### Hugo theme and config.toml file
The themes folder contains all the website design details.There are many custom Hugo [themes](https://themes.gohugo.io/)
available.I have decided to use the [Even](https://themes.gohugo.io/hugo-theme-even/) theme for my blog.I will download the
theme from git instead of `git clone` as I don't want any other git links in my development git repository.So after 
downloading and unzipping the theme,I have pasted the contents inside `theme/even` folder.Also as mentioned in 
[Even](https://themes.gohugo.io/hugo-theme-even/) theme page I copied the config.toml file from examples to the jsjblog 
folder and replaced the existing file.Now lets check our website using the below command

```
hugo server
```

You can see the site by going to ` http://localhost:1313/` as mentioned in the terminal message.Since its a example website
title,name etc needs to be changed.These all can be changed in the config.toml file under jsjblog.So after editing the 
config.toml file once you run the `hugo server` again you see the updated website with your details.

We can also edit the themes as required.Now as mentioned in  [Even](https://themes.gohugo.io/hugo-theme-even/) theme page we
can do many customizations to our website. I did a simple colour change inside `themes/even/assests/sass/_variable.scss`.
Saved the change and now you see the colour change in the website 


### Create new blog post
Since there are no posts in the blog,lets add a new blog post.As mentioned in the  [Even](https://themes.gohugo.io/hugo-theme-even/) theme page.We can create a new post using the below command

```
hugo new post/initial_post.md
```
**Note that post or posts in command will vary based on the theme you are using**

Open initial_post from `jsjblog\content\post` and start writing the post.At the starting of the post there will me some meta
data which Hugo populated automatically.Hugo needs this meta data for creating the static sites.Draft in the meta data should
made to false once we have completed the post and are ready to publish.If its true, Hugo will not show the post in the website.
You can add other meta data like tags,category,author ,etc.These all will depend upon the type of theme you use.So now after
creating out first post lets run `hugo server` again. We can see out post on the site.

### Git Repositories and going online 
Now our development of the site with our first post is completed.Lets create the git repository for blog development.I created
a jsjblog git repository without a README file.Then I linked the jsjblog folder to this git repository using the below 
commands

```
echo "# jsjblog" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/jithusjacob/jsjblog.git
git push -u origin main
```

Above instead of adding only README.md I actually added all the files in jsjblog folder by using the below command
```
git add .
```
So our development setup is saved in Git Hub.So as on when new post is created.You can move the same to this Git Hub 
repository.


Now will create the Git repository for Git Hub Pages.While creating this repository we need to ensure the repository name
has the format `username.github.io` where username is your Git username.Here also I created the repository without README
file.Next we will create the Hugo output folder which will have the static sites and will be linked to this this repository.
We can use `hugo` command to build the output files and it will be created inside jsjblog folder under a new folder called
`public` .But Since I want to separate the jsjblog folder and output folder so that its easier to maintain different Git
repositories will use `-d` flag to give the destination of the output files.
blog folders

```
hugo -d ../jsjblog_site
```
I gave the output folder as jsjblog_site inside blog folder.So now blog folder will have two folders corresponding to the
two Git Hub repositories.

```
d-----         jsjblog
d-----         jsjblog_site
```

Lets link the jsjblog_site folder with Git Hub Pages repository.So that we can finally see our blog online.
```
echo "# jithusjacob.github.io" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/jithusjacob/jithusjacob.github.io.git
```
This time I did not do `git add .` as I was getting some error. I followed the above steps.Linked the Git repository to the
folder.Then I added remaining files and moved to the Git repository.

So Now my Hugo blog is ready to be accessed on `https://jithusjacob.github.io/`

You can also see the above steps in my youtube video 


{{< youtube id="JvvFd1JBeQU" title="Hugo with Git Hub Pages on Windows" >}}

