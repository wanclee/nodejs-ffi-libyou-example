# Created by wan.lee, Jan 1, 2014, for nodejs ffi experiment
# Compile and create the shared library 'libyou.so'
#
# Useful links:
#   http://www.cprogramming.com/tutorial/shared-libraries-linux-gcc.html
#   http://www.linuxquestions.org/linux/answers/Programming/Building_C_programs_on_Linux  
#   http://stackoverflow.com/questions/6951672/how-can-i-insert-a-real-tab-character-in-vim
#
# Command line example:
#   gcc -c -Wall -Werror -fpic you.c
#   gcc -shared -o libyou.so you.o
#
# Below is the Makefile approach to generate the same library
#

all:  libyou.so

# compile the library source code into position-independent code(PIC)
you.o: you.c you.h
	gcc -c -Wall -Werror -fpic you.c

# turn the object file into a shared library
libyou.so: you.o

# on linux, use .so extesion for shared library
	gcc -shared -o libyou.so you.o

# on Mac OSX, use .dylib extension for shared library
#	gcc -dynamiclib -o libyou.dylib you.o

clean:
	rm *.so *.o
#	rm *.dylib *.o 

