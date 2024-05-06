---
title: "Install Neovim on Windows"
date: 2021-06-15T13:10:20+05:30
draft: false
tags: ["Vim", "Windows", "NeoVim"]
sections: ["vim"]
books: ["programming"]
---

I had wanted to use vim as my editor for a long time.So in the lockdown time I
gave it a try.I installed NeoVim on windows.Below are the steps for that

### Install Neovim using chocolatey

So I use chocolatey package manager for installing different software on
windows.I installed the Neovim also using chocolatey with the below command.
Ensure you use the terminal with `Run as administrator`.

```
choco install neovim
```

### Setting up init.vim

After installing Neovim .I needed to setup the `init.vim` for different Neovim
configurations.To find the location where Neovim looks for `init.vim` give the
below command in Neovim

```
:echo stdpath('config')
```

So my setup directory is `C:\Users\jithu\AppData\Local\nvim`. So here I created
a file `init.vim`

### Plugin manager

After setting up `init.vim` I installed the [vim-plug](https://github.com/junegunn/vim-plug)
manager to manage the plugins.I created a folder `autoload` in the Neovim setup
directory where `init.vim` is present.Inside the folder I added the plug.vim
file from [vim-plug](https://github.com/junegunn/vim-plug) Git repository.

Now to install plugins using vim-plug plugin manager,we need to give the below
lines in `init.vim`

```
call plug#begin('~/AppData/Local/nvim/plugged')
Plug 'jiangmiao/auto-pairs'
call plug#end()
```

Here we have specified the directory for plugins as `plugged` folder where
init.vim exits.We can give the list of plugins between the two call commands
using `Plug` command.Next we reloaded `init.vim` and used `:PlugInstall` to
install the plugins.Similarly if you need to delete the plugin then remove the
`Plug` command from `init.vim` and use `:PlugClean` command to delete the
plugin.

You can find the youtube video for the above steps below

{{< youtube id="-Zio2BeVFQs" title="Install Neovim on Windows" >}}
