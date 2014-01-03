/* File: you.h */

void sayYourName();
char* getYourName();
int getYourID();
int putYourName(const char* name);
int changeYourName(const char* name, char** newName);
int changeYourFirstAndLastName(const char* names[], int size);
int toUpperCaseName(const char* names[], int size, char* outnames[], int outSize);
int toUpperCaseNameAgain(const char* names[], int size, char** outnames, int* outsize);
char** toUpperCaseNameAgainAgain(const char* names[], int size, int* outsize);
