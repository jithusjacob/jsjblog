---
title: "Storing Dotfiles on git repository using git orphan branches"
date: 2021-07-26T10:54:57+05:30
draft: false
tags: ["Neovim","Git","Windows","Orphan branch","empty repository","clone
without folder"]
categories: ["Neovim","Git","Windows"]
---

So recently Neovim 0.5 version was released with in built LSP(Language Server
Protocol) and Lua language support. So I modifed my `init.vim` with 'coc-nvim'
to `init.lua` and the in built LSP.I want to save both the config files in
GitHub.I googled and found that people have dot files repository where they
store all the configuration files.So I decided to follow the same approach.I
used the git orphan branches to store different configuration files.So they are
independent of each other and can be tracked separately.


### Creating a empty dotfile repository

I created the empty dotfile GitHub repository without a README.md file.
Then used the below commands to create a emtpy Github repository.

```
git init
git commit --allow-empty
git branch -M main
git remote add origin https://github.com/jithusjacob/dotfiles.git
git push -u origin main
```

### Clone the empty repository without folder

So now the empty GitHub repository is ready. I will clone it to my new Neovim
configuration folder without the dotfiles folder using the below commands

```
git init
git remote add origin https://github.com/jithusjacob/dotfiles.git 
```
If there no files in the existing folder we can also used the below command
```
git clone https://github.com/jithusjacob/dotfiles.git .
```
### Creating the first Orphan git branch

An orphan branch is a branch which starts with a  different root commit.So it
will not have any history when created and the first commit in this branch will
be the root of this branch.So this branch will be a independent branch without
any relation to any of the available branches.So lets create the new orphan
branch using the below Commands

```
git checkout --orphan nvim_lsp_lua
nvim README.md
git add .
git commit -m "Initial Commit"
git push origin nvim_lsp_lua
```

So now if I want to clone these files I can use the below command

```
git clone --branch nvim_lsp_lua https://github.com/jithusjacob/dotfiles.git .
```

Some other commands that might be Required  
**git push -d origin <branch_name>** -- To delete a branch from remote  
**git branch -r** -- To list the branches  
**git branch** -- To check the current branch  

### Repeating the above steps for second orphan branch

So now I repeated the above steps and created a second orphan branch for my old
Neovim configuration files.I now have two orphan branches independent of each
other.So in future I have some other configuration files ,I will create a new
orphan branch for that.


You can also see the above steps in my youtube video 


{{< youtube id="JvvFd1JBeQU" title="Hugo with Git Hub Pages on Windows" >}}
