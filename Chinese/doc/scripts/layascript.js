var searchBox = document.querySelector("input.searchBox");
var nav = document.getElementById("nav");
var classBeforeBeginLi;
var selectedLi;

window.onload = function()
{
	var file = location.search;
	if (file)
	{
		file = file.substr(1) + ".html";
		loadClass(file);
		for (var i = 0; i < classLis.length; i++)
		{
			navLi = classLis[i];
			if (navLi.querySelector("a").getAttribute("href") == file)
			{
				selectedLi = navLi;
				break;
			}
		}

		// selected item is a class
		if(selectedLi)
			expand(selectedLi);
	}
}

function registerCodeViews()
{
	// as、ts、js代码显示切换
	var langButtonGroups = main.querySelectorAll(".languageButtonGroup");
	for (var i = 0; i < langButtonGroups.length; i++)
	{
		var langButtonGroup = langButtonGroups[i];
		for (var j = 0; j < langButtonGroup.childElementCount; j++)
		{
			var button = langButtonGroup.children[j];

			button.__index = j;
			button.onclick = onToggleExampleLanguage;

			if (j == 0)
				onToggleExampleLanguage(
				{
					target: button
				});
		}
	}
}

function onToggleExampleLanguage(e)
{
	var preIndex = 0;
	var element = e.target.parentElement;
	while (element = element.nextElementSibling)
	{
		if (element instanceof HTMLPreElement)
		{
			if (e.target.__index == preIndex)
				element.style.display = "block";
			else
				element.style.display = "none";

			preIndex++;

			if (preIndex == 3)
				break;
		}
	}
}

var navLis = nav.querySelectorAll("li.nav-heading");
var classLis = [];
var navLi;
var i;
var classBeginIndex;
for (i = 0; i < navLis.length; i++)
{
	navLi = navLis[i];
	if (navLi.innerText == "Classes")
	{
		classBeforeBeginLi = navLi;
		classBeginIndex = i + 1;
	}
	if (i >= classBeginIndex)
		classLis.push(navLi);
}

var classWithMembersLis = [];
navLi = classBeforeBeginLi;
do {
	navLi = navLi.nextElementSibling;
	classWithMembersLis.push(navLi);
} while (navLi.nextElementSibling)

for (i = 0; i < navLis.length; i++)
{
	navLi = navLis[i];
	var headingLi = navLi;

	if (navLi.childElementCount > 0)
		navLi.onclick = onToggleContent;

	navLi = navLi.nextElementSibling;
	while (navLi && navLi.getAttribute("class") == "nav-item")
	{
		navLi.belongsTo = headingLi;

		// 类成员和方法的页内跳转
		var a = navLi.querySelector("a");
		var href = a.getAttribute("href");
		a.setAttribute("href", href.replace(/.*?(?=#)/, ""));

		navLi = navLi.nextElementSibling;
	}
}

function onToggleContent(e)
{
	e.preventDefault();

	if (selectedLi == e.currentTarget)
		return;

	if (selectedLi)
		collapse(selectedLi);

	selectedLi = e.currentTarget;
	var fileName = selectedLi.querySelector("a").getAttribute("href");
	history.pushState(
	{}, "", "?" + fileName.replace(".html", ""));
	loadClass(fileName);

	expand(selectedLi);
}

function collapse(li)
{
	li = li.nextElementSibling;
	while (li && li.belongsTo)
	{
		li.style.display = 'none';
		li = li.nextElementSibling;
	}
}

function expand(li)
{
	li = li.nextElementSibling;
	while (li && li.belongsTo)
	{
		li.style.display = 'block';
		li = li.nextElementSibling;
	}
}

function loadClass(fileName)
{
	var loader = new XMLHttpRequest();
	loader.onreadystatechange = onLoadStateChange;
	loader.open("GET", fileName, true);
	loader.send();
}

function onLoadStateChange(e)
{
	var loader = e.target;
	if (loader.readyState == 4)
	{ // 4 = "loaded"
		if (loader.status == 200)
		{ // 200 = OK
			// main.scrollTop = 0;
			document.body.scrollTop = 0;

			main.innerHTML = loader.responseText;
			registerCodeViews();
			prettyPrint();

			var as = main.querySelectorAll("a");
			for (i = 0; i < as.length; i++)
			{
				var a = as[i];
				a.onclick = onToggleContentByContentHref;
			}

			if(location.hash)
			{
				var anchor = location.hash.substr(1);
				var anchorElement = window[anchor];
				document.body.scrollTop = anchorElement.offsetTop;
			}
		}
		else
		{
			console.error("Problem retrieving data");
		}
	}
}

function onToggleContentByContentHref(e)
{
	e.preventDefault();

	var fileName = e.currentTarget.getAttribute("href")
	for (var i = 0; i < classLis.length; i++)
	{
		navLi = classLis[i];
		if (navLi.querySelector("a").getAttribute("href") == fileName)
			break;
	}

	if (selectedLi == navLi)
		return;

	collapse(selectedLi);

	selectedLi = navLi;
	history.pushState(
	{}, "", "?" + fileName.replace(".html", ""));
	loadClass(fileName);

	expand(selectedLi);
}

searchBox.oninput =
	C_checkbox.onchange =
	F_checkbox.onchange =
	E_checkbox.onchange =
	R_checkbox.onchange =
	M_checkbox.onchange =
	A_checkbox.onchange = filterNav;

function filterNav(e)
{
	navLi = nav.lastElementChild;
	// remove li
	while (navLi != classBeforeBeginLi)
	{
		var prev = navLi.previousElementSibling;
		navLi.remove();
		navLi = prev;
	}

	// reappend
	if (searchBox.value.length == 0)
	{
		for (i = 0; i < classWithMembersLis.length; i++)
		{
			navLi = classWithMembersLis[i];
			if (navLi == selectedLi || !navLi.belongsTo || navLi.belongsTo == selectedLi)
				nav.appendChild(navLi);
		}
	}
	else
	{
		var expected, actual;
		if (R_checkbox.checked)
		{
			try
			{
				expected = new RegExp(searchBox.value, A_checkbox.checked ? "" : "i");
			}
			catch (e)
			{
				return;
			}
		}
		else
		{
			expected = A_checkbox.checked ? searchBox.value : searchBox.value.toLowerCase();
		}

		for (i = 1; i < classWithMembersLis.length; i++)
		{
			navLi = classWithMembersLis[i];
			// is item
			if (navLi.childElementCount > 1)
			{
				if (!C_checkbox.checked && navLi.firstElementChild.innerText == "C")
					continue;
				if (!F_checkbox.checked && navLi.firstElementChild.innerText == "F")
					continue;
				if (!E_checkbox.checked && navLi.firstElementChild.innerText == "E")
					continue;
				if (!M_checkbox.checked && navLi.firstElementChild.innerText == "M")
					continue;

				actual = navLi.children[1].innerText;
				if (!R_checkbox.checked && !A_checkbox.checked)
					actual = actual.toLowerCase();

				if (!match(expected, actual))
				{
					continue;
				}

				navLi.style.display = 'block';

				if (navLi.belongsTo && !nav.contains(navLi.belongsTo))
				{
					nav.appendChild(navLi.belongsTo);
				}
				nav.appendChild(navLi);
			}
			else
			{
				nav.appendChild(navLi);
			}
		}
	}
}

function match(expected, actual)
{
	// is string
	if (expected.substr)
		return actual.indexOf(expected) > -1;
	else
		return expected.test(actual);
}