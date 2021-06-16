---
title: "Setup Vim as a Flutter IDE"
date: 2021-06-15T15:41:34+05:30
draft: false
tags: ["Vim","Flutter","IDE"]
categories: ["Vim","Flutter","IDE"]
---

I recently started using Neovim as my text editor.Also right now I am learning Flutter to 
create a mobile application for my personal project. So I decided to setup Neovim as a 
Flutter IDE.With this I can practice Vim with Flutter.

### Install Plugins
To setup Neovim as Flutter IDE we need to use [coc.nvim](https://github.com/neoclide/coc.nvim)
plugin .Also for formatting, I am using the 
[dart_vim_plugin](https://github.com/dart-lang/dart-vim-plugin).We also need the snippets to
be loaded like the ones for stateless/stateful widget.For this we will 
use [honza/vim-snippets](https://github.com/honza/vim-snippets).
So I installed these three plugins using the plugin manager.
```
Plug 'honza/vim-snippets'
Plug 'dart-lang/dart-vim-plugin'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
```
After installing the plugins when I open Neovim I get the below error

> [coc.nvim] "node" is not executable, checkout https://nodejs.org/en/download/

So as the error says I installed node on my system using the
[chocolatey](https://chocolatey.org/)
package manager for windows.You will need to run the power shell as administrator to install.
```
choco install nodejs
```
After installing node the next error I got when I opened Neovim is related to by python3.
> [coc.nvim] Error on execute python script: request error nvim_command - Vim(pyxfile):
  E319: No "python3" provider found. Run ":checkhealth provider"

Since I did not have python in my system,so I installed Python 3.9.5 using
[chocolatey](https://chocolatey.org/) package manager in power shell as administrator.

```
choco install python
```
Now I don't get any errors when I open Neovim.

## Install Coc extension

Next we need to install the
[coc-flutter](https://github.com/iamcco/coc-flutter) extension.We can do this in different
ways.I have added the extension name to global extension variable in `init.vim` config file.
Coc will install the extensions after coc.vim service is started.Also I will also add the
[coc-snippets](https://github.com/neoclide/coc-snippets) to load different snippets stored.
[coc-yaml](https://github.com/neoclide/coc-yaml) extension for yaml support.If you need any
other language or feature support,if the extension is available you can append it to global
extension variable.

```
let g:coc_global_extensions = [
  \ 'coc-flutter',
  \ 'coc-snippets',
  \ 'coc-yaml',
  \]
```

## Coc Key Bindings for Flutter

Next I will setup Coc key bindings for Flutter

### TAB and SHIFT+TAB key to select,change selection and auto completion.

Once all the above setup is completed,we will start getting suggestion whenever we type.
We bind the TAB key to select option,or next option in the list.While option is selected it 
will auto complete that selection.Auto complete will change as the suggestion selected 
changes.We will bind the SHIFT+TAB key to go in backward direction.This will only happen for
suggestions and not for snippets.For snippets auto completion after selection you will need
to press ENTER key.They key binding is as below.

**NOTE: Use command :verbose imap <tab> to make sure tab is not mapped by any other plugin**


```
inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  	  let col = col('.') - 1
  	    return !col || getline('.')[col - 1]  =~# '\s'
endfunction

```

### ENTER Key to auto select the first suggestion and complete it.

```
inoremap <silent><expr> <cr> pumvisible() ? coc#_select_confirm()
                              \: "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"
```
### Code Action binding
 Next we bind keys for code action like wrap with widget,wrap with center etc.
```
 xmap <leader>a  <Plug>(coc-codeaction-selected)
 nmap <leader>a  <Plug>(coc-codeaction-selected)

```
 So code action can be used like `<leader>aap` for current paragraph, `<leader>aw` for the 
 current word. My leader key is SPACE.

### Format the Flutter code on Saving and max line length of 80

```
 let g:dart_format_on_save = 1
 let g:dartfmt_options = ['--fix', '--line-length 80']
```
### Coc commands

```
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)
nmap <leader>rn <Plug>(coc-rename)
```
### Use K how documentation in preview window

```
nnoremap <silent> K :call <SID>show_documentation()<CR>
function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  elseif (coc#rpc#ready())
    call CocActionAsync('doHover')
  else
    execute '!' . &keywordprg . " " . expand('<cword>')
  endif
endfunction"
```
### Flutter commands

``` 
nnoremap <leader>fe :CocCommand flutter.emulators <CR>
nnoremap <leader>fd :below new output:///flutter-dev <CR>
nnoremap <leader>fr :CocCommand flutter.run <CR> 
```

There are many more Flutter commands you can find more details at
[https://github.com/iamcco/coc-flutter](https://github.com/iamcco/coc-flutter).

You can find the youtube video for the above steps below

