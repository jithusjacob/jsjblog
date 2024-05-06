---
title: "Creating Vim binding for checkbox using regex for lua configuration"
date: 2021-07-31T13:07:21+05:30
draft: false
tags: ["Vim", "lua", "NeoVim", "regex"]
sections: ["vim"]
books: ["programming"]
---

So I have todo list in my vim notes and I wanted to create vim bindings to
create checkbox ,close checkbox,open checkbox.I found a article by
[marcelfischer](https://marcelfischer.eu/blog/2019/checkbox-regex/) which had a
similar requirement.He had used regex to do so.I decided to do the same for my
lua configuration.

# Requirement

If there is item with `*` then we need to add a checkbox

```
* todo item 1
*
```

will change into

```

* [ ]todo item 1
* [ ]
```

If there is checkbox we should be able to close the same

```
* [x]todo item 1
* [x]
```

Also we should be able to open the closed checkboxes

# Regex for identifying the pattern

So the regex to identify `* ` or `* [ ]` or `* [x]`will be as below

```
\*\s(\[\s\]|\[x\]|)*
```

and to identify closed checkbox will be

```
\*\s(\[x\]|)*

```

# Vim substitute command

To create the vim key bindings for our requirement we will using the vim
substitute command for single line

```
:s/pattern/text/
```

Here the pattern will be the regex for the pattern.So two commands will be

```
:s/\v\*\s(\[\s\]|\[x\]|)*/* [ ]/
```

Here we added an extra `\v` in the regex.This to handle groups `()` in regex in
vim.Check out this [stack
overflow](https://stackoverflow.com/questions/19902089/vim-regex-capture-groups-bau-byau-ceu-cyeu)
question for more details.

# Keybindings in vim lua configuration

So next I created two vim keybindings for lua configuration.

To create or open checkbox

```
vim.api.nvim_set_keymap('n', '<Leader>to',':s/\\v\\*\\s(\\[\\s\\]|\\[x\\]|)/* [ ]/<CR>',
{ noremap = true, silent = true })
```

To close checkbox

```
vim.api.nvim_set_keymap('n', '<Leader>tc',':s/\\v\\*(\\s\\[\\s\\])/* [x]/<CR>',
{ noremap = true, silent = true })
```

Here you can see we have added a extra escape character `\` to the regex.This is
because lua parser will give error for escape character for regex.Checkout more
details in the [stack overflow
question](https://stackoverflow.com/questions/53729699/invalid-escape-sequence-lua-regex).

You can find the youtube video for the above steps below

{{< youtube id="n44_MprLQp8" title="Vim folding to arrange NeoVim config file" >}}
