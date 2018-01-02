# JSON data information

### 1. What is JSON?

JSON (JavaScript Object Notation) refers to the JavaScript object representation, which is a lightweight data interchange format. It is based on a subset of ECMAScript. JSON uses JavaScript syntax to describe data objects, but JSON is still independent of language and platform. The JSON parser and the JSON library support many different programming languages. At present, very much dynamic (PHP, JSP,.ENT) become language, all support JSON. It is easy to read and write, and also easy to machine analysis and generation (generally used to improve network transmission rate).



### 2. JSON syntax grammar rules

JSON syntax is a subset of JavaScript object representation syntax.

- JS data is in the name / value pair.
- data is separated by commas
- Curly braces save objects
- Square brackets save arrays



### 3. JSON name / value pair

JSON data writing format is: name / value pairs.

name / value pair includes the field name (in double quotation marks), followed by a colon, followed by a value:

“name”：“LayaAir Tutorial”；

This is easy to understand, equivalent to JavaScript statement:

name=“LayaAir Tutorial”；



### 4. JSON values

The value of JSON can be:

- Numeric (integer or floating point)
- Strings (in double quotes)
- Logical value (true or false)
- Array (in square brackets)
- Object (in curly braces)
- null



### 5. JSON object

JSON object is written in curly braces:

Objects can contain multiple name / value pairs:

{"name":"LayaAir tutorial","url":"http://layabox.com/"}

This is also easy to understand, equivalent to this JavaScript statement:

name="LayaAir tutorial" url="http://layabox.com/"



### 6. JSON file

- File type of the JSON text is ".Json""
- MIME type of the JSON text is "application/json""



### 7. JSON advantage

- Based on plain text, cross platform delivery is extremely simple;
- JavaScript native support, background language almost all support;
- Lightweight data formats, which occupy very few characters, are especially suited for Internet delivery;
- Readability is strong, although not as clear as XML, but after a reasonable indentation is still very easy to identify;
- Easy to write and analysis, of course, the premise is that you want to know the data structure;

PS: might think of XML here. supporter between XML and JSON is a debate topics. They speak their own principles. Since they are debating, they need to keep their positions. But personally, prefer to use JSON in the network, JSON also has a huge advantage in the H5 era, and each browser support for XML and the degree of compatibility remains to be considered, the analytical efficiency is different, for game developers, JSON is enough to use.


### 8. LayaAir and JSON

The LayaAir engine is almost inseparable from JSON, including the format of the chart packaging, the loading of resources, the description of the editor components, the export of classes, the support of language packs, and so on.
