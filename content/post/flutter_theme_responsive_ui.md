---
title: "Flutter theme and responsive UI"
date: 2021-08-30T10:58:51+05:30
draft: false
tags: ["App","Flutter","dart","Theme","MediaQuery","bloc"]
categories: ["App","Flutter","dart"]
---

## Introduction
In the flutter application I am creating I need a single place where the app
theme can be added which will reflect in the whole application.This includes
color,font size and other look and feel elements.This is so if any changes are
required in the UI. It can be easily done at a single place.Also the text size
and position of other elements should be dynamic based on the screen size for a
responsive UI.Below is a somewhat solution.Its not perfect but fine for my
needs.

## Flutter Themes
Flutter has a option to use Theme option in Material App to share a theme across 
the entire app.As such if no themes are provided flutter creates a default theme
for you.It has themes for most of the widgets , color and font style for text
used in different widgets and a lot of more options.

So I have created a app_theme.dart file to be used for my application.

```
import 'package:flutter/material.dart';

/// Single place for color,size,font theme for the app
class AppTheme {
  /// base theme to be used for the whole app
  static final ThemeData baseTheme = ThemeData(
    textTheme: const TextTheme(
      /// summary Headings
      bodyText1: TextStyle(
          color: Colors.blueGrey, fontWeight: FontWeight.bold, fontSize: 35), // TextStyle

      /// dropdown text,TextField Text
      subtitle1: TextStyle(
          color: Colors.blueGrey, fontSize: 25, fontWeight: FontWeight.bold), // TextStyle
    ), // TextTheme
    iconTheme: const IconThemeData(
      color: Colors.blueGrey,
    ), // IconThemeData
    inputDecorationTheme: const InputDecorationTheme(
      border: OutlineInputBorder(),
      labelStyle: TextStyle(
        color: Colors.blueGrey,
        fontWeight: FontWeight.normal,
      ), // TextStyle
      floatingLabelBehavior: FloatingLabelBehavior.always,
    ), // InputDecorationTheme
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
          primary: Colors.blueGrey,
          onPrimary: Colors.white, // button text color
          textStyle: const TextStyle(
            fontSize: 30,
            fontWeight: FontWeight.bold,
          )), // TextStyle
    ), // ElevatedButtonThemeData
  ); // ThemeData
}
```

And used this theme in Material App as below

```
Documents\Flutter_Projects\moneypie\lib\common\app_theme.dart                                                                                         1,1            All
import 'package:flutter/material.dart';
import 'package:moneypie/common/app_theme.dart';
import 'package:moneypie/features/net_worth/presentation/screens/add_edit_page.dart';

/// Starting of the app
class MyApp extends StatelessWidget {
  /// Initializes [key] for subclasses.
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: AppTheme.baseTheme,
        routes: {
          '/': (_) => const AddEditPage(),
        },
      ); // MaterialApp
  }
}
```

## Responsive UI

But the Default themes have the text size hard coded as per the initial test
device I used.To make the app responsive we need to make the text size and the
placement of widgets based on the screen size.For this we need to use
MediaQuery. But MediaQuery can be called only after the Material app and so we
cannot use it with Flutter theme directly.So I decided to use the text scale
factor of MediaQuery.It is the number of font pixels for each logical pixel.For 
example, if the text scale factor is 1.5, text will be 50% larger than 
the specified font size.So I need to calculate a scale ratio based on the device
screen sizes and base screen sizes for which the font size is hard coded in the
theme file.Then by giving this ratio as text scale factor will make the UI some
what responsive.

### Calculate Scale ratio.

So the screen size has two parameters -height,width. So I can get two scale
ratios 

```
heightScaleRatio =  screenHeight / baseHeight 
widthScaleRatio =   screenWidth / baseWidth 
```
I decided to use width scale ratio for text sizes as that is what gave a better
responsive  look for text.Also since I a planning to create a mobile
application,I decided to keep the maximum value of the ratio as 1 base height 
as 700 and base width as 480.I will use the both ratios to position the widgets
in the screen.

So first I created a size config file for this.

```
/// Size configuration for responsive screen
class SizeConfig {
  /// Initialaizer
  SizeConfig({required this.screenHeight, required this.screenWidth})
      : heightScaleRatio =
            screenHeight / baseHeight > 1 ? 1 : screenHeight / baseHeight,
        widthScaleRatio =
            screenWidth / baseWidth > 1 ? 1 : screenWidth / baseWidth;


  ///base height of the screen
  static const double baseHeight = 700;

  /// base width of the width
  static const double baseWidth = 480;

  /// device screen height
  final double screenHeight;

  /// device screen width
  final double screenWidth;

  /// screen height/base height
  final double heightScaleRatio;

  /// screen width/base width
  final double widthScaleRatio;
}
```


Then I create a size config bloc to access the values through out the app

```
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:moneypie/common/size_config.dart';

/// The events which `SizeConfigBloc` will react to.
class SizeConfigEvent extends Equatable {
        /// SizeConfigEvent constructor
        const SizeConfigEvent({required this.screenHeight, required
                this.screenWidth});
  /// device screen height
  final double screenHeight;

  /// device screen width
  final double screenWidth;
  @override
  List<Object> get props => [screenHeight,screenWidth];
}


/// A `SizeConfigBloc` which handles converting `SizeConfigEvent`s.
class SizeConfigBloc extends Bloc<SizeConfigEvent,SizeConfig > {
  /// The initial state of the `SizeConfigBloc` is 700*480.
  SizeConfigBloc() : super(SizeConfig(screenHeight: 700, screenWidth: 480));

  @override
  Stream<SizeConfig> mapEventToState(SizeConfigEvent event) async* {
          yield SizeConfig(screenHeight: event.screenHeight, screenWidth:
                          event.screenWidth);
    }
  }
```


Now to apply text scale factor throughout the app you can see the example below
```
  import 'package:flutter/material.dart'; 
  import 'package:flutter_bloc/flutter_bloc.dart';
  import 'package:moneypie/common/bloc/size_config_bloc.dart';
  import 'package:moneypie/common/size_config.dart';

  ///Common Page for add and editing entry as the fields
  ///are same
  class AddEditPage extends StatelessWidget {
    /// Key to
    const AddEditPage({Key? key}) : super(key: key);

    @override
    Widget build(BuildContext context) {
      // Obtain the current media query information.
      final mediaQueryData = MediaQuery.of(context);
      final w = mediaQueryData.size.width;
      final h = mediaQueryData.size.height;
      context.read<SizeConfigBloc>().add(
            SizeConfigEvent(screenHeight: w, screenWidth: h),
          );
      return MediaQuery(
        data: mediaQueryData.copyWith(
            textScaleFactor:
                context.read<SizeConfigBloc>().state.widthScaleRatio),
        child: Scaffold(
          body: SafeArea(
            child: SingleChildScrollView(
                child: BlocBuilder<SizeConfigBloc, SizeConfig>(
                    buildWhen: (previous, current) =>
                        previous.heightScaleRatio != current.heightScaleRatio ||
                        previous.widthScaleRatio != current.widthScaleRatio,
                    builder: (context, state) {
                      return Column(
                        children: [
                          Row(
                            children: [
                              Expanded(
                                child: IconButton(
                                 onPressed: () => {print("pressed")},
                                  icon: const Icon(
                                    Icons.arrow_back,
                                  ), // Icon
                                ), // IconButton
                              ), // Expanded
                              Expanded(
                                flex: 8,
                                child: Align(
                                  child: Text(
                                    'Add Details',
                                    style: Theme.of(context).textTheme.bodyText1,
                                  ), // Text
                                ), // Align
                              ), // Expanded
                              Expanded(
                                child: IconButton(
                                 onPressed: () => {print("pressed")},
                                  icon: const Icon(
                                    Icons.add,
                                  ), // Icon
                                ), // IconButton
                              ), // Expanded
                            ],
                          ), // Row
                          Padding(
                            padding: EdgeInsets.fromLTRB(
                              20 * state.widthScaleRatio,
                              20 * state.heightScaleRatio,
                              20 * state.widthScaleRatio,
                              20 * state.heightScaleRatio,
                            ), // EdgeInsets.fromLTRB
                            child: _TypeInput(),
                          ), // Padding
                          Padding(
                            padding: EdgeInsets.fromLTRB(
                              20 * state.widthScaleRatio,
                              20 * state.heightScaleRatio,
                              20 * state.widthScaleRatio,
                              20 * state.heightScaleRatio,
                            ), // EdgeInsets.fromLTRB
                            child: _CategoryInput(),
                          ), // Padding
                          Padding(
                            padding: EdgeInsets.fromLTRB(
                              20 * state.widthScaleRatio,
                              20 * state.heightScaleRatio,
                              20 * state.widthScaleRatio,
                              20 * state.heightScaleRatio,
                            ), // EdgeInsets.fromLTRB
                            child: _DescInput(),
                          ), // Padding
                          Padding(
                            padding: EdgeInsets.fromLTRB(
                              20 * state.widthScaleRatio,
                              20 * state.heightScaleRatio,
                              20 * state.widthScaleRatio,
                              20 * state.heightScaleRatio,
                            ), // EdgeInsets.fromLTRB
                            child: _AmountInput(),
                          ), // Padding
                          Padding(
                            padding: EdgeInsets.fromLTRB(
                              20 * state.widthScaleRatio,
                              20 * state.heightScaleRatio,
                              20 * state.widthScaleRatio,
                              20 * state.heightScaleRatio,
                            ), // EdgeInsets.fromLTRB
                            child: _AddButton(),
                          ), // Padding
                        ],
                      ); // Column
                    })), // BlocBuilder
          ), // SafeArea
        ), // Scaffold
      ); // MediaQuery
    }
  }

```

This might not be the perfect solution and might need to be modified further.But
as of now it suits my needs.Also in future one thing to do to add breakpoints 
in case you need to use the UI for mobile ,desktop and web

You can find the youtube video for the above steps below

{{< youtube id="PtVfpxo3EKA" title="Flutter theme and responsive UI" >}}
