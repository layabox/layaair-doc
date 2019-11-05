#AS3 Subcontracting Description

> author: Charley

###1. Why Subcontract

Layabox's unique compiler supports compiling projects written in AS3 into JS code. But by default, all the code will be compiled into a js. If the project is large, the compiled JS will also be larger. When the JS is large enough to affect the loading experience, some independent late function JS will be subcontracted and loaded when needed. It can reduce the preliminary loading pressure.



2,,







Subcontracting should be independent, not Import, and __JS() quotation

