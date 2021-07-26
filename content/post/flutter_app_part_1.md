---
title: "Flutter App: part 1 -Plan and starting the project"
date: 2021-07-21T13:07:01+05:30
draft: true
tags: ["App","Flutter","dart"]
categories: ["App","Flutter","dart"]
---
### App Plan
This is the first part in the series of developing a flutter app and publishing
the same.So I am planning to create a finance app to track net worth.It will
have four pages
- Net Worth Page :It will show the total net worth and different categories.
- Add Page :Page to add new entry
- Category Page : Show details for each category
- Details Page : To see the added details and edit if required.

### State Management

After checking various state management options I have decided to use [bloc
package](https://pub.dev/packages/bloc).It has lot of boiler plate but adding
different functionality is very easy once its setup.I tried provider first.It 
was so easy that I was quickly able to develop apps.But it does not force any
structure on us.With complex scenarios it got complicated to mange.

### Database

I am planning to use offline database.I opted for sqlite as my data will be
later on taken backup in CSV.Instead of using sqlite directly I am planning to
use [Moor](https://pub.dev/packages/moor). Moor is a reactive persistence 
library for Flutter and Dart, built on top of sqlite.

### Project structure
Folder Structure will be a mix of [bloc architecture](https://bloclibrary.dev/#/architecture)
and [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### Starting the Project

So lets start the project.Create the flutter app by using the below command
```
flutter create moneypie
```
I got the below error
```
Ambiguous organization in existing files: {com.example, com.jsj}.
The --org command line argument
must be specified to recreate project.
```
So I used

Lets create the necessary folders

common
feature

create the pages

Create Route for networth Page

adding to git.

