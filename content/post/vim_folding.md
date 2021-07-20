---
title: "Vim folding to arrange NeoVim config file"
date: 2021-07-19T16:09:06+05:30
draft: false
tags: ["Vim","Folding","NeoVim"]
categories: ["Vim","Folding","NeoVim"]
---

### Folding in vim

I have started using NeoVim as my editor.So I have added lot of configurations
in my `init.vim` file.I keep updating the same when I find some new
requirements. So I wanted to manage all the configurations related to NeoVim and
its Plugins. I checked various ways and found that folding was one of the
methods to do that.Folding is a way of collapsing a group of lines into a single
line.This gives a uncluttered view and helps in focusing on a part of the page.
Also we can perform actions like copy delete on the fold as we do on a single
line.I am using the manual mode of folding. I will so visual selection and
create a fold.So I split the `init.vim` into different sections and created
the folds for the same. So some the commands I used are as below

### Commands for folding

`zf` - **Apply fold to the selected lines**  
`zo` - **Open the folded lines**  
`zc` - **Close the open lines back to fold**  
`zM` - **Close all folds**  
`zR` - **Open all folds**  
`zE` - **Delete all the folds**  
`zd` - **Delete the fold under the cursor**  

### Saving folds in vim

After creating folds.Once you close the buffer,the folds are lost.So to save the
folds we need to give the below lines in our `init.vim`

```
augroup remember_folds
  autocmd!
  autocmd BufWinLeave * mkview
  autocmd BufWinEnter * silent! loadview
augroup END
```

Source [stackOverflow](https://stackoverflow.com/questions/37552913/vim-how-to-keep-folds-on-save)

You can find the youtube video for the above steps below

{{< youtube id="6iYDUHCJOBU" title="Vim folding to arrange NeoVim config file" >}}
