---
title: "Fluter_IDE_with_lua_LSP_neovim_0"
date: 2021-07-23T09:49:50+05:30
draft: true
---
### Introduction
So I recently upgraded to NeoVim 0.5 stable release.This release has a inbuilt
LSP(Language server protocol) which is a client to  LSP servers.It also includes
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

### Connecting Dart LSP server to Neovim LSP client

#### nvim lspconfig plugin
To connect [Dart LSP server](https://github.com/dart-lang/sdk/blob/master/pkg/analysis_server/tool/lsp_spec/README.md)
to Neovim LSP client we will be using [nvim lspconfig](https://github.com/neovim/nvim-lspconfig)
plugin.This plugin is a collection of common configurations for Neovim's 
built-in language server client.This repo handles automatically launching and
initializing language servers that are installed on your system.To install using
[vim-plug](https://github.com/junegunn/vim-plug) use the below and do
:PlugInstall
```
Plug 'neovim/nvim-lspconfig'
```
#### Dart Language Server

As mentioned in the [dart SDK github page](https://github.com/dart-lang/sdk/blob/master/pkg/analysis_server/tool/lsp_spec/README.md)
to start the Dart language server we need to give the below command

```
dart bin/snapshots/analysis_server.dart.snapshot --lsp
```
In order to automatically launch a language server, lspconfig searches up the 
directory tree from your current buffer to find a file matching the root_dir
pattern defined in each server's configuration. For dartls as per  [nvim lspconfig
config page](https://github.com/neovim/nvim-lspconfig/blob/master/CONFIG.md#dartls)
the pattern it checks for is `pubspec.yaml`

We can also use the below command to Start the requested server name. Will only
successfully start if the command detects a root directory matching the currenti
config. Pass autostart = false to your .setup{} call for a language server if 
you would like to launch clients solely with this command. Defaults to all
servers matching current buffer filetype.
```
:LspStart <config_name>
```
config_name in our case will be dartls

#### Connecting Dart Language server to nvim lspconfig

To connect the Dart Language server to nvim lspconfig we need to give the below
lines in our `init.vim`

```
lua << EOF
require'lspconfig'.dartls.setup{
cmd = { "dart", "C:\\Users\\jithu\\Documents\\flutter\\bin\\cache\\dart-sdk\\bin\\snapshots\\analysis_server.dart.snapshot", "--lsp" },
}
EOF
```
This code is based on the configurations given for dart in [nvim lspconfig
config page](https://github.com/neovim/nvim-lspconfig/blob/master/CONFIG.md#dartls)

We need to ensure two things for the above command to work
1) dart command is added to the environment variable.
2) path to dart lsp server in windows is given with `\\` .This is specific to 
windows

In order to automatically launch a language server, lspconfig searches up the 
directory tree from your current buffer to find a file matching the root_dir
pattern defined in each server's configuration. For dartls as per  [nvim lspconfig
config page](https://github.com/neovim/nvim-lspconfig/blob/master/CONFIG.md#dartls)
the pattern it checks for is `pubspec.yaml`

#### Check if LSP server is connected
After completing the above steps we can check if the LSP server is connected
to Neovim using the below command

```
:LspInfo
```
This will give you the details of clients and LSP attached.

### Syntax highlighting

For syntax highlighting we will be using the [dart-vim-plugin](https://github.com/dart-lang/dart-vim-plugin)
plugin.Install by using the below

```
call plug#begin()
"... <snip other plugins>
Plug 'dart-lang/dart-vim-plugin'

call plug#end()
```
### Auto Completion and  Snippets

We can add any autocompletion  plugin and snippets plugin.I am planning to use
autocompletion plugin [nvim compe](https://github.com/hrsh7th/nvim-compe)
and a snippets plugins [LuaSnip](https://github.com/L3MON4D3/LuaSnip).

So install both the plugins using the below command
```
call plug#begin()
"... <snip other plugins>
Plug 'L3MON4D3/LuaSnip'
Plug 'hrsh7th/nvim-compe'
call plug#end()
```
Now we need to modify the previous dartls setup statement with below
```
local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities.textDocument.completion.completionItem.snippetSupport = true

-- Enable the following language servers
local servers = { 'dartls' }
for _, lsp in ipairs(servers) do
  require('lspconfig')[lsp].setup {
cmd = { "dart", "C:\\Users\\jithu\\Documents\\flutter\\bin\\cache\\dart-sdk\\bin\\snapshots\\analysis_server.dart.snapshot", "--lsp" },
    capabilities = capabilities,
  }
end

-- Set completeopt to have a better completion experience
vim.o.completeopt = 'menuone,noinsert'

-- Compe setup
require('compe').setup {
  source = {
    path = true,
    nvim_lsp = true,
    luasnip = true,
    buffer = true,
    calc = false,
    nvim_lua = false,
    vsnip = false,
    ultisnips = false,
  },
}

-- Utility functions for compe and luasnip
local t = function(str)
  return vim.api.nvim_replace_termcodes(str, true, true, true)
end

local check_back_space = function()
  local col = vim.fn.col '.' - 1
  if col == 0 or vim.fn.getline('.'):sub(col, col):match '%s' then
    return true
  else
    return false
  end
end

-- Use (s-)tab to:
--- move to prev/next item in completion menu
--- jump to prev/next snippet's placeholder
local luasnip = require 'luasnip'

_G.tab_complete = function()
  if vim.fn.pumvisible() == 1 then
    return t '<C-n>'
  elseif luasnip.expand_or_jumpable() then
    return t '<Plug>luasnip-expand-or-jump'
  elseif check_back_space() then
    return t '<Tab>'
  else
    return vim.fn['compe#complete']()
  end
end

_G.s_tab_complete = function()
  if vim.fn.pumvisible() == 1 then
    return t '<C-p>'
  elseif luasnip.jumpable(-1) then
    return t '<Plug>luasnip-jump-prev'
  else
    return t '<S-Tab>'
  end
end

-- Map tab to the above tab complete functions
vim.api.nvim_set_keymap('i', '<Tab>', 'v:lua.tab_complete()', { expr = true })
vim.api.nvim_set_keymap('s', '<Tab>', 'v:lua.tab_complete()', { expr = true })
vim.api.nvim_set_keymap('i', '<S-Tab>', 'v:lua.s_tab_complete()', { expr = true })
vim.api.nvim_set_keymap('s', '<S-Tab>', 'v:lua.s_tab_complete()', { expr = true })

-- Map compe confirm and complete functions
vim.api.nvim_set_keymap('i', '<cr>', 'compe#confirm("<cr>")', { expr = true })
vim.api.nvim_set_keymap('i', '<c-space>', 'compe#complete()', { expr = true })

```
lspsaga.nvim for code action
follt we
