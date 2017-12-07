## http hijacking protection
The HTTP hijacking here refers to the method that a network  service provider or a certain level of routing device that modifies the result of user request by means of DNS hijacking or HTTP hijacking, so as to insert advertisements into the page.
As a result of HTTP hijacking, the HTML data obtained by the user will be dynamically modified. For example, the request page is inserted one `<script>` Tag to execute a piece of ad code. These codes are usually not implemented in LayaPlayer, it will lead to app just started on the box error.
For this problem, in addition to the ISP complaints, one solution is to add special properties to the script tag, this can be separated from the inserted script tag
*Example usage：*   
```html
<meta name='laya' layajsprotect='true' >

<script src='main.js' loader='laya' ></script>
```
`layajsprotect='true'` It means to open this protection.  
`loader='laya'` It means that this is its own JS and can be executed.
