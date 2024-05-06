---
title: "Fluter IDE with Neovim 0.5 ,built in LSP and lua on windows"
date: 2021-08-02T09:49:50+05:30
draft: false
tags: ["NeoVim", "Flutter", "IDE", "LSP", "lua", "windows"]
sections: ["flutter"]
books: ["programming"]
---

## Introduction

So I recently upgraded to NeoVim 0.5 stable release.This release has a inbuilt
LSP(Language server protocol) which is a client to LSP servers.It also includes
a Lua framework for building enhanced LSP tools.

I used [coc-nvim](https://github.com/neoclide/coc.nvim) earlier as LSP client to
interact with [Dart LSP server](https://github.com/dart-lang/sdk/blob/master/pkg/analysis_server/tool/lsp_spec/README.md)
which it does automatically using
[coc-flutter](https://github.com/iamcco/coc-flutter) extension.If you want to
know how to do that read my previous
[blog post](https://jithusjacob.github.io/post/vim_flutter_ide/) for more
details.

The [coc-nvim](https://github.com/neoclide/coc.nvim) and
[coc-flutter](https://github.com/iamcco/coc-flutter) are great tools with lot
of stability and support.So I might still use it.But I plan to try out setting
up Neovim Flutter IDE with its inbuilt LSP and see if its easy to setup and
worth using.Below are the steps for the same

## NeoVim configuration folder structure for lua.

Since we are migrating to lua based configuration.I have setup my nvim folder as
below.Its not necessary to do this.You can also use old folder structure you have
and use vim script.Just insert the lua script in vim script using lua tags as
below

```
lua << EOF
-- insert lua code here
EOF
```

For more details on migrating and different options check out this [guide](https://github.com/nanotee/nvim-lua-guide)

So I have create the below folder structure in my nvim folder

```
~\AppData\Local\nvim\..
  lua
    colorscheme.lua
    init.lua
    keymappings.lua
    nvim_tree.lua
    plugins.lua
    settings.lua
    telescope.lua
  init.vim
```

Here all the lua files are present in lua folder.In `init.lua` all the lua files
are linked as below

```
-- Map leader to space
  vim.g.mapleader = ' '
   require('plugins')
   require('colorscheme')
   require('nvim_tree')
   require('telescope')
   require('settings')
   require('keymappings')
```

So if I add any files in lua folder I need to mention that in `init.lua` , so
that it can be linked to NeoVim.Next I link my `init.lua` with `init.vim` using
the below command

```
lua << EOF
require('init')
EOF
```

Actually we can use `init.lua` instead of `init.vim`.But since the lua feature
is new so I am using `init.vim` in case there are some scenarios which I cannot
do using lua.

## Plugin Manger in lua

So since we are migrating to Neovim 0.5 with lua support .I will be using a
package manager in lua.There are two options

1. [packer.nvim](https://github.com/wbthomason/packer.nvim)
2. [paq-nvim](https://github.com/savq/paq-nvim)

I tried packer and found that it has lot of options and is little bit
complicated.So I went with [paq-nvim](https://github.com/savq/paq-nvim).

Note: If you are still using vim script for NeoVim configuration then you can
still use your old plugin manager.

### Install paq plugin manager on windows

You install the paq plugin manager on windows using the below command.

```
git clone https://github.com/savq/paq-nvim.git "$env:LOCALAPPDATA\nvim-data\site\pack\paqs\start\paq-nvim"

```

### Install plugins

We can install plugins by giving the below commands in `init.lua`.I have instead
given these commands in the plugins.lua file and given the `require('plugins')`
command in the `init.lua`.

```
require "paq" {
    "savq/paq-nvim";                  -- Let Paq manage itself
    -- Auto Pair
    "jiangmiao/auto-pairs"

}

```

After adding the above lines source your configuration
(using :source % or :luafile %) or quit Neovim and open again and run :PaqInstall.
For more details check [paq-nvim](https://github.com/savq/paq-nvim) page.

## Connecting Dart LSP server to Neovim LSP client

### Dart Language Server

Dart has its own language server.We can check that in [dart SDK github
page](https://github.com/dart-lang/sdk/blob/master/pkg/analysis_server/tool/lsp_spec/README.md).
This is downloaded if you have installed flutter in your system.

To check if Dart language server is working we can use the below command

```
dart C:\Users\jithu\Documents\flutter\bin\cache\dart-sdk\bin\snapshots\analysis_server.dart.snapshot
```

The server gets started.

### Connecting Dart Language server to nvim lspconfig

We can connect to Dart Language server in 2 ways.

1. Manually
2. Using [flutter-tools](https://github.com/akinsho/flutter-tools.nvim) plugin

Note: I prefer the second option as
[flutter-tools](https://github.com/akinsho/flutter-tools.nvim) plugin.It has
lot of flutter related features which we would need to setup manually in the
first option.

#### Manually

To connect the Dart Language server to Neovim manually we need to install
[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)and give the below
lines in our `init.lua`

```
require'lspconfig'.dartls.setup{
cmd = { "dart", "C:\\Users\\jithu\\Documents\\flutter\\bin\\cache\\dart-sdk\\bin\\snapshots\\analysis_server.dart.snapshot", "--lsp" },
}
```

This code is based on the configurations given for dart in
[nvim lspconfig config page](https://github.com/neovim/nvim-lspconfig/blob/master/CONFIG.md#dartls)

We need to ensure two things for the above command to work

1. dart command is added to the environment variable.
2. path to dart lsp server in windows is given with `\\` .This is specific to
   windows

In order to automatically launch a language server, lspconfig searches up the
directory tree from your current buffer to find a file matching the root_dir
pattern defined in each server's configuration. For dartls as per
[nvim lspconfig config page](https://github.com/neovim/nvim-lspconfig/blob/master/CONFIG.md#dartls)
the pattern it checks for is `pubspec.yaml`

After completing the above steps we can check if the LSP server is connected
to Neovim using the below command.I opened a flutter project and gave the below
command.

```
:LspInfo
```

This will give you the details of clients and LSP attached.

#### [Flutter-tools](https://github.com/akinsho/flutter-tools.nvim)

I use the second option because of the flutter related options available in the
plugin.Install by adding the below lines in `plugins.lua` and quit neovim and
open again and do :PaqInstall.

```
{'akinsho/flutter-tools.nvim', requires = 'nvim-lua/plenary.nvim'};
```

After install I created a file call `flutter.lua` under the lua folder and in
that added the below line to setup the flutter tool plugin.

```
require("flutter-tools").setup{}
```

Also added the below line in my `init.lua` to link the `flutter.lua`

```
require('flutter')
```

Flutter related features given by this plugin are,FlutterRun,FlutterDevices,
FlutterEmulators,FlutterReload,FlutterRestar,FlutterQuit,FlutterOutline,
FlutterDevTools etc.It has telescope integration also. For details check the site.
You can create key bindings for these commands as I have done.

```
vim.api.nvim_set_keymap('n', '<Leader>fr',':FlutterRun<CR>'
, { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<Leader>fc',
[[<Cmd>lua require('telescope').extensions.flutter.commands()<CR>]],
{ noremap = true, silent = true })
```

Note: I had a file called telescope.lua for my telescope plugin which was
causing issues with flutter telescope extension.So I renamed the file
telescope_plugin and its working fine now.

You can add individual bindings for Hot restart etc in similar way.Check
[Flutter-tools](https://github.com/akinsho/flutter-tools.nvim) page.

Lets test the LSP is connected or not.I create a test_project for flutter.I
deleted some lines in the `main.dart` to check if errors are coming.It was not
detecting the errors.I searched and tried different things.Finally adding
the dart sdk bin in the PATH variable solved it.

```
C:\Users\jithu\Documents\flutter\bin\cache\dart-sdk\bin
```

Now I can see the errors coming.So now the dart LSP is connected to NeoVim.

Things to consider.

1. flutter tools does not depend on nvim-lspconfig. The two can co-exist but
   please ensure you do NOT configure dartls using lspconfig. It will be
   automatically set up by this plugin instead. So the dart LSP is automatically
   setup and connected to Neovim LSP client by flutter tools.
   2)This plugin does not give auto-complete,code action,formatting options.These
   need to be configured separately which we will be doing in the below steps.

## Auto Completion and Snippets

We can add any autocompletion plugin and snippets plugin.I am planning to use
autocompletion plugin [nvim compe](https://github.com/hrsh7th/nvim-compe)
and a snippets plugins [vim-snip](https://github.com/hrsh7th/vim-vsnip).The
snippets plugin has support to create snippets similar to VS code snippets.So I
can copy the common VS code snippets available for dart and flutter.

So install both the plugins using the below command

```
'hrsh7th/nvim-compe'
'hrsh7th/vim-vsnip'
'hrsh7th/vim-vsnip-integ'
```

### Auto Completion

Now lets setup the auto completion plugin we have installed.I created a file
called `compe_snippets.lua` under lua folder and added the below lines in it.
This last lines will allow tab completion.Also check the source which nvim-compe
uses.Since I plan to use vsnip.I have setup that as true.If you have some other
snippets you can use that.

```
vim.o.completeopt = "menuone,noselect"
vim.api.nvim_set_keymap("i", "<CR>", "compe#confirm({ 'keys': '<CR>', 'select': v:true })",
{ expr = true })

require'compe'.setup {
  enabled = true;
  autocomplete = true;
  debug = false;
  min_length = 1;
  preselect = 'enable';
  throttle_time = 80;
  source_timeout = 200;
  resolve_timeout = 800;
  incomplete_delay = 400;
  max_abbr_width = 100;
  max_kind_width = 100;
  max_menu_width = 100;
  documentation = {
    border = { '', '' ,'', ' ', '', '', '', ' ' }, -- the border option is the same as `|help nvim_open_win|`
    winhighlight = "NormalFloat:CompeDocumentation,FloatBorder:CompeDocumentationBorder",
    max_width = 120,
    min_width = 60,
    max_height = math.floor(vim.o.lines * 0.3),
    min_height = 1,
  };

   source = {
    path = true;
    buffer = true;
    calc = true;
    nvim_lsp = true;
    nvim_lua = true;
    vsnip = true;
    ultisnips = false;
    luasnip = false;
  };                                                                                              }
local t = function(str)
  return vim.api.nvim_replace_termcodes(str, true, true, true)
end

local check_back_space = function()
    local col = vim.fn.col('.') - 1
    return col == 0 or vim.fn.getline('.'):sub(col, col):match('%s') ~= nil
end
-- Use (s-)tab to:
--- move to prev/next item in completion menuone
--- jump to prev/next snippet's placeholder
_G.tab_complete = function()
  if vim.fn.pumvisible() == 1 then
    return t "<C-n>"
  elseif vim.fn['vsnip#available'](1) == 1 then
    return t "<Plug>(vsnip-expand-or-jump)"
  elseif check_back_space() then
    return t "<Tab>"
  else
    return vim.fn['compe#complete']()                                                               end
end
_G.s_tab_complete = function()
  if vim.fn.pumvisible() == 1 then
    return t "<C-p>"
  elseif vim.fn['vsnip#jumpable'](-1) == 1 then
    return t "<Plug>(vsnip-jump-prev)"
  else
    -- If <S-Tab> is not working in your terminal, change it to <C-h>
    return t "<S-Tab>"
  end
end

vim.api.nvim_set_keymap("i", "<Tab>", "v:lua.tab_complete()", {expr = true})
vim.api.nvim_set_keymap("s", "<Tab>", "v:lua.tab_complete()", {expr = true})
vim.api.nvim_set_keymap("i", "<S-Tab>", "v:lua.s_tab_complete()", {expr = true})
vim.api.nvim_set_keymap("s", "<S-Tab>", "v:lua.s_tab_complete()", {expr = true})
```

Also in `init.lua` I added the below line to link `compe.lua`

```
require('compe')
```

### Snippets

I am using [vsnip](https://github.com/hrsh7th/vim-vsnip) for snippets.It allows
to use VS code snippets.So I have taken the snippets from
[Dart-code](https://github.com/Dart-Code/Dart-Code/tree/master/snippets) for VS
code.

To enable snippet support in LSP I modified the `flutter.lua` like this

```
local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities.textDocument.completion.completionItem.snippetSupport = true;

require("flutter-tools").setup{

lsp = {
    capabilities = capabilities,                                                                    }

}
```

So next I have given the path where snippets will be stored as below

```
vim.g.vsnip_snippet_dir = 'C:\\Users\\jithu\\AppData\\Local\\nvim\\snippets\\';
```

You give the path where you want to store.

Then to create snippets follow the below steps

```
Open some file (example: main.dart)
Invoke :VsnipOpen command.
Edit snippet.
Then save
```

### Syntax highlighting and formatting

### Syntax highlighting

For syntax highlighting we will be using the [dart-vim-plugin](https://github.com/dart-lang/dart-vim-plugin)
plugin.Install by adding the below line in the `plugins.lua` file then quite and
open Neovim and :PaqInstall.

```
'dart-lang/dart-vim-plugin';
```

Also some color schemes do not have LSP diagnostics highlighting or are changed
by the color schemes.So I added the below in `colorscheme.lua` at the end.

```
vim.cmd([[ autocmd ColorScheme * :lua require('vim.lsp.diagnostic')._define_default_signs_and_highlights() ]])
```

Source:[https://github.com/neovim/nvim-lspconfig/issues/516](https://github.com/neovim/nvim-lspconfig/issues/516)

### Formatting

The same plugin has a formatting command `:DartFmt`.So for auto formatting on
save I added the below lines in `flutter.lua`

```
-- autoformat on save
vim.cmd 'au BufWritePre *.dart :DartFmt'
```

## Changing the LSP Diagnostic appearance

So we can use the below lines to change the LSP Diagnostic appearance.I added
these line in my 'flutter.lua'

```
-- LSP Enable diagnostics
 vim.lsp.handlers["textDocument/publishDiagnostics"] =
    vim.lsp.with(vim.lsp.diagnostic.on_publish_diagnostics, {
        virtual_text = false,
        underline = true,
        signs = true,
        update_in_insert = false
   })
```

I have disabled virtual text.You can keep it if you want.

## Code Action and UI changes.

For code action and some UI changes I am using the [lspsaga](https://github.com/glepnir/lspsaga.nvim)
plugin.Add the below line in `plugins.lua` quit and start Neovim and the
:PaqInstall to install

```
--  lsp plugin based on neovim built-in lsp
   'glepnir/lspsaga.nvim';
```

Next to change the symbols and code action bindings using lspsaga ,added the
below lines in `flutter.lua`

```
local saga = require 'lspsaga'
saga.init_lsp_saga {
error_sign = '➤',
warn_sign = '➤',
hint_sign = '➤',
infor_sign = '➤',
code_action_icon = '',
code_action_keys = {
  quit = '<ESC>',exec = '<CR>'
  },
}
vim.api.nvim_set_keymap('n', '<Leader>ca',':Lspsaga code_action<CR>',
{ noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<Leader>fe',':Lspsaga diagnostic_jump_next<CR>',
{ noremap = true, silent = true })
```

You can add more keybindings as necessary by referring to [lspsaga](https://github.com/glepnir/lspsaga.nvim)
page.

You can find the youtube video for the above steps below

{{< youtube id="jt83rWqo9co" title="Fluter IDE with Neovim 0.5 ,built in LSP and lua" >}}
