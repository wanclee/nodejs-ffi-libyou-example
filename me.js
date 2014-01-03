// Simple ffi examples to demonstrate the use of
// ffi, ref, and ref-array modules
//
// Userful links:
//  https://github.com/rbranson/node-ffi
//  https://github.com/rbranson/node-ffi/wiki/Node-FFI-Tutorial
//  https://github.com/TooTallNate/ref-array

var ffi = require('ffi');
var ref = require('ref');
var ArrayType = require('ref-array'); // this actually returns a function

var char = ref.types.char;
var charPtr = ref.refType(char);
var charPtrPtr = ref.refType(charPtr);
var StringArray = ArrayType('string');
var intPtr = ref.refType('int');

//if we get this far then our require() calls above are finding the modules we need
console.log("Executing me binary program...");

// libyou.so or libyou.dylib (Mac OSX only) is being loaded
var mylib = ffi.Library('libyou', {
  'sayYourName': [ 'void', [] ],
  'getYourName': [ 'string', [] ],
  'getYourID':   [ 'int', [] ],
  'putYourName': [ 'int', ['string'] ],
  'changeYourName': [ 'int', ['string', charPtrPtr] ],
  'changeYourFirstAndLastName': [ 'int', [StringArray, 'int'] ],
  'toUpperCaseName': [ 'int', [StringArray, 'int', StringArray, intPtr] ],
  'toUpperCaseNameAgain': [ 'int', [StringArray, 'int', StringArray, intPtr] ],
  'toUpperCaseNameAgainAgain': [ StringArray, [StringArray, 'int', intPtr] ]
});

console.log("====>invoking sayYourName()...");
mylib.sayYourName();

console.log("====>invoking getYourName()...");
var name = mylib.getYourName();
console.log(name);

console.log("====>invoking getYourID()...");
var id = mylib.getYourID();
console.log("ID is: " + id);

console.log("====>invoking putYourName()...");
var new_name = "Mary";
mylib.putYourName(new_name);

var new_name2 = "Mary Jr.";
//allocate memory for output parameter
var modified_name = ref.alloc(charPtrPtr);

console.log("====>invoking changeYourName()...");
mylib.changeYourName(new_name2, modified_name); 

//note: call deref() to de-reference the charPtrPtr
var name = modified_name.deref();

console.log("Modified name is: " + name);

// use literal array object
var names = [];
names.push("Kathy");
names.push("Julia");
names.push("Doug");
console.log("====>invoking changeYourFirstAndLastName()...");
mylib.changeYourFirstAndLastName(names, names.length);

// use constructor function to create Array object
var names = new StringArray(3);
names[0] = "Kevin"
names[1] = "Robin"
names[2] = "Goodwin"
console.log("====>invoking changeYourFirstAndLastName()...");
mylib.changeYourFirstAndLastName(names, names.length);
var outnames = new StringArray(3);

// allocate memory for output parameter
var outsize = ref.alloc('int');

console.log("====>invoking toUpperCaseName()...");
mylib.toUpperCaseName(names, names.length, outnames, outsize);
var size = outsize.deref();
console.log("Output array size is: " + size);

//dump the array of string
// note: the string memory is allocated by the C function we called
// node GC should automatically reclaim it once it's no longer referenced
var i;
for (i=0; i < outnames.length; i++) { 
  console.log("Output array[" + i + "]: " + outnames[i]);
}

var outnames2 = new StringArray(3);
var names2 = [];
names2.push("Lucy");
names2.push("Nancy");
names2.push("Tracy");
var outsize2 = ref.alloc('int');

// note: the method signature on the c function is actually different from toUpperCaseName()
// but the ffi mapping of data types still looks the same; this is because StringArray maps
// nicely to either char** or char*[]
console.log("====>invoking toUpperCaseNameAgain()...");
mylib.toUpperCaseNameAgain(names2, names2.length, outnames2, outsize2);

var size = outsize2.deref();
console.log("Output array size is: " + size);
var i;
for (i=0; i < outnames2.length; i++) { 
  console.log("Output array[" + i + "]: " + outnames2[i]);
}

var names3 = [];
names3.push("Johny");
names3.push("Kenny");
names3.push("Danny");
var outsize3 = ref.alloc('int');

//demonstrate the handling of returned string array
console.log("====>invoking toUpperCaseNameAgainAgain()...");
var res = mylib.toUpperCaseNameAgainAgain(names3, names3.length, outsize3);

var size = outsize3.deref();
console.log("Output array size is: " + size);

//caveat here: set the size on the returned array explicitly due to ffi bug
// see https://github.com/rbranson/node-ffi/issues/105
res.length = size;

var i;
for (i=0; i < res.length; i++) { 
  console.log("Output array[" + i + "]: " + res[i]);
}

