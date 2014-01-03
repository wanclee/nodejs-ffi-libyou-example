nodejs-ffi-libyou-example
=========================

Demonstrate nodejs ffi mapping to c functions.

You can change the c source code and compile new version of libyou.so (or libyou.dylib) and explore new ffi mapping from node side.

That's how I learn to use ffi.

Step 1: Setup (with -g option if shared):
  npm install ffi -g
  npm install ref -g
  npm install ref-array -g

  This will install the nodules under /usr/local/lib/node_modules

  You may need to add a new variable NODE_PATH to your system environment:
    export NODE_PATH=/usr/local/lib/node_modules

Step2:
  make
    or
  make clean;make

  If you're on Mac OSX, modify Makefile to build libyou.dylib (instead of libyou.so)
  The C source files are you.c and you.h

Step3:
  node me.js

