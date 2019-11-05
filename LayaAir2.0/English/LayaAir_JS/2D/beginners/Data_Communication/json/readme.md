#JSON Data Explanation

###First, what is JSON?

JSON (JavaScript Object Notation) refers to JavaScript object representation, which is a lightweight data exchange format. It is based on a subset of ECMAScript. JSON uses JavaScript syntax to describe data objects, but JSON is still independent of language and platform. JSON parsers and JSON libraries support many different programming languages. At present, many dynamic languages (PHP, JSP,.ENT) support JSON. It is easy for people to read and write, but also easy for machine parsing and generation (generally used to improve network transmission rate).



###JSON grammar rules

JSON grammar is a subset of JavaScript object representation French.

##- Data in name/value pairsData is separated by commas
##- Curly brackets save objectsSquare brackets save arrays



###III. JSON Name/Value Pairs

JSON data is written in name/value pairs.

Name/value pairs include field names (in double quotes), followed by a colon, followed by values:

"Name": "LayaAir Course";

This is easy to understand, equivalent to this JavaScript statement:

Name= "LayaAir tutorial";



###IV. Value of JSON

The value of JSON can be:

##- Numbers (integers or floating-point numbers)String (in double quotation marks)
##- Logical value (true or false)Array (in square brackets)
##- Object (in curly brackets)Null



###V. JSON Objects

JSON objects are written in curly brackets:

Objects can contain multiple name/value pairs:

{"name": "LayaAir tutorial", "url": "http://layabox.com/"}

This is also easy to understand, equivalent to this JavaScript statement:

Name= "LayaAir tutorial" url= "http://layabox.com/"



###VI. JSON Files

##- The file type of JSON text is ".json"The MIME type of JSON text is "application/json"



###VII. Advantages of JSON

##- Based on pure text, cross-platform transmission is extremely simple.JavaScript native support, background language almost all support;
##- Lightweight data format, which occupies a very small number of characters, is especially suitable for Internet transmission.Readability is strong, although not as clear as XML at a glance, but it is easy to recognize after a reasonable sequence of indentation;
- Easy to write and analyze, of course, if you know the data structure;

PS: You might think of XML here. The battle between XML and JSON is like a debate, each saying its own truth, since it is a debate, it is necessary to maintain its own position after all. However, as far as individuals are concerned, they prefer to use JSON. JSON also has great advantages in network transmission. Moreover, in the H5 era, the support and compatibility of various browsers to XML still need to be considered. The efficiency of parsing varies greatly. For game developers, JSON is enough to use.



###8. LayaAir and JSON

LayaAir engine is almost inseparable from JSON, including the format of atlas packaging and storage, the loading of resources, the description of editor components, the export of classes, the support of language packages and so on.