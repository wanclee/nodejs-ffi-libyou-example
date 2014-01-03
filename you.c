#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

void sayYourName()
{
  printf("***lib*** Johnny Walker\n");
}

char* getYourName()
{
  char* name = "my name is Johnny Walker";
  return name;
}

int getYourID()
{
  int id = 999;
  return id;
}

int putYourName(const char* name)
{
  printf("***lib*** value of name: %s\n", name);
  return 0;
}

// example of output paramter
int changeYourName(const char* name, char** newName)
{
  printf("***lib*** value of input name: %s\n", name);
  char* n = (char*)calloc(256, sizeof(char));
  memcpy(n, "Kenneth", 7);
  *newName = n;
  printf ("***lib*** value of output name: %s\n", n);
  return 0;
}

int changeYourFirstAndLastName(const char* names[], int size)
{
  int i;
  for (i = 0; i < size; i++)
  {
    printf("***lib*** value of array[%d]: %s\n", i, names[i]);
  }
  return 0;
}


// example of output paramter - outnames and outSize
int toUpperCaseName(const char* names[], int size, char* outnames[], int* outSize)
{
  int i;
  char* p;
  for (i = 0; i < size; i++)
  {
    char* buf = (char*)calloc(strlen(names[i])+1, sizeof(char));
    memcpy(buf, names[i], strlen(names[i]));
    p = buf;
    while (p && *p != '\0')
    {
      *p = toupper(*p);
      p++;
    }
    printf("***lib*** upper case value of array[%d]: %s\n", i, buf);
    outnames[i] = buf;
  }
  *outSize = size;
  return 0;
}


// example of output paramter - outnames and outSize
// note: outnames param is char**
int toUpperCaseNameAgain(const char* names[], int size, char** outnames, int* outsize)
{
  int i;
  char* p;
  char** t;
  for (i = 0; i < size; i++)
  {
    char* buf = (char*)calloc(strlen(names[i])+1, sizeof(char));
    memcpy(buf, names[i], strlen(names[i]));
    p = buf;
    while (p && *p != '\0')
    {
      *p = toupper(*p);
      p++;
    }
    printf("***lib*** upper case value of array[%d]: %s\n", i, buf);
    t = outnames + i;
    *t = buf;
  }
  *outsize = size;
  return 0;
}

char** toUpperCaseNameAgainAgain(const char* names[], int size, int* outsize)
{
  int i;
  char* p;
  char** outnames = (char**) malloc(sizeof(char**) * size);
  char** t;
  for (i = 0; i < size; i++)
  {
    char* buf = (char*)calloc(strlen(names[i])+1, sizeof(char));
    memcpy(buf, names[i], strlen(names[i]));
    p = buf;
    while (p && *p != '\0')
    {
      *p = toupper(*p);
      p++;
    }
    printf("***lib*** upper case value of array[%d]: %s\n", i, buf);
    t = outnames + i;
    *t = buf;
  }
  *outsize = size;
  return outnames;
}

