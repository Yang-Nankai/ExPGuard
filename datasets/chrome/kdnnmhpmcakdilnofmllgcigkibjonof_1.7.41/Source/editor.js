/* Editor - Version 1.7.36 */

var cooleditor = {
	speech_div : document.getElementById("speech_div"),
	styles : ["bold","italic","underline","strikeThrough","justifyLeft","justifyCenter","justifyRight","justifyFull","fontSize","fontName","foreColor","highlightColor","backColor","undo","redo","cut","copy","paste","indent","outdent","insertOrderedList","insertUnorderedList"],
	//fontlist : ["Arial","Helvetica","Times New Roman","Courier","Garamond","Georgia","cursive","Bookman Old Style","Tahoma","Verdana","Monospace"],
	fontlist : {"Arial": "Arial, sans-serif", "Arial Black": "\"Arial Black\", sans-serif", "Bookman Old Style": "\"Bookman Old Style\", serif",
		"Century Schoolbook": "\"Century Schoolbook\", serif", "Consolas": "Consolas, monospace", "Courier": "Courier, monospace", "cursive": "cursive", 
		"Garamond": "Garamond, serif", "Georgia": "Georgia, serif", "Helvetica": "Helvetica, sans-serif", "monospace": "monospace",
		"Tahoma": "Tahoma, sans-serif", "Times New Roman": "\"Times New Roman\", sans-serif", "Verdana": "Verdana, serif"},
	colorlist : {"Black":"rgb(0, 0, 0)","White":"rgb(255, 255, 255)", "Red":"rgb(255, 0, 0)","Blue":"rgb(0, 0, 255)",
		"Green":"rgb(0, 128, 0)","Orange":"rgb(255, 165, 0)","Purple":"rgb(128, 0, 128)",
		"Brown":"rgb(165, 42, 42)","Pink":"rgb(255, 20, 147)","Gold":"rgb(255, 215, 0)"},
	bgcolorlist: {"Clear":"inherit","Dark":"rgb(0, 0, 0)","Light":"rgb(255, 255, 255)","Tomato": "rgb(255, 99, 71)",
		"Aqua":"rgb(0, 255, 255)","Lime":"rgb(0, 255, 0)","Yellow":"rgb(255, 255, 0)","Coral":"rgb(255, 127, 80)",
		"Magenta":"rgb(255, 0, 255)","Chocolate":"rgb(210, 105, 30)","Sky Blue":"rgb(0, 191, 255)",
		"Hot Pink":"rgb(255, 105, 180)", "Wheat":"rgb(245, 222, 179)"},
	
	create_editors () {
		var toolbar = document.createElement("div");
		toolbar.className = "cooleditor_toolbar";
		var toolbar_html = "<form name='cooleditor_form' class='cooleditor_form'>"
		+"<button name='new_file' title='New'>&#128459;</button>"
		+"<input name='load_file' type='file' style='display:none;' accept='text/plain,text/html'><button name='open_file' title='Open'>&#128194;</button>"
		+"<button name='save_file' title='Save'>&#128190;</button>"
		+"<button name='print' title='Print'>&#128438;</button>"
		+"&nbsp;&nbsp;"
		+"<button name='undo' title='Undo'>&#8630;</button>"
		+"<button name='redo' title='Redo'>&#8631;</button>"
		+"<button name='cut' title='Cut'>&#9988;</button>"
		+"<button name='copy' title='Copy'>&boxbox;</button>"
		+"<button name='paste' title='Paste'>&#128203;</button>"
		+"&nbsp;&nbsp;"
		+"<button name='bold' title='Bold'><b>B</b></button>"
		+"<button name='italic' title='Italic'><i>i</i></button>"
		+"<button name='underline' title='Underline'><u>U</u></button>"
		+"<button name='strikeThrough' title='strikethrough'><s>S</s></button>"
		+"&nbsp;&nbsp;"
		+"<button name='justifyLeft' title='Left'>&#x21DA;</button>"
		+"<button name='justifyCenter' title='Center'><span style='transform:scale(2,1);display:inline-block;'>&#x232f;</span></button>"
		+"<button name='justifyRight' title='Right'>&#x21DB;</button>"
		+"<button name='justifyFull' title='Justify'>&#x2261;</button>"
		+"<button name='outdent' title='Outdent'>&#8676;</button>"
		+"<button name='indent' title='Indent'>&#8677;</button>"
		+"&nbsp;&nbsp;"
		+"<select name='fontSize' title='Font Size'>";
		for (var i=1;i<8;i++)
			toolbar_html += "<option value='"+i+"'>"+i+"</option>";
		toolbar_html += "</select>";
		toolbar_html += "<select name='fontName' title='Font Name'>";
		/*for (var i=0;i<cooleditor.fontlist.length;i++)
			toolbar_html += "<option style='font-family: "+cooleditor.fontlist[i]+";'"
			+" value='"+cooleditor.fontlist[i]+"'>"+cooleditor.fontlist[i]+"</option>";*/
		for (var key in cooleditor.fontlist) {
			var aria = (key.match(/arial/i)) ? key.replace(/Arial/i, "Ariel")+";"+key.replace(/Arial/i, "Aerial") : cooleditor.fontlist[key];
			toolbar_html += "<option style='font-family: "+cooleditor.fontlist[key]+";'"
			+" value='"+cooleditor.fontlist[key]+"' aria-label='"+aria+"'>"+key+"</option>";
		}
		toolbar_html += "</select>";
		toolbar_html += "<select name='foreColor' title='Color' aria-label='Colour' style='text-shadow: 1px 1px 1px #888888;'>";
		for (var key in cooleditor.colorlist) {
			var color = (key.match(/clear/i)) ? "rgba(127, 127, 127, 127)" : cooleditor.colorlist[key];
			toolbar_html += "<option style='color: "+color+";'"
			+" value='"+cooleditor.colorlist[key]+"'>"+key+"</option>";
		}
		toolbar_html += "</select>";
		toolbar_html += "<select name='backColor' title='Background Color' aria-label='Background Colour'>";
		for (var key in cooleditor.bgcolorlist) {
			var color = (key.match(/clear/i)) ? "rgba(127, 127, 127, 127)" : cooleditor.bgcolorlist[key];
			toolbar_html += "<option style='background-color: "+color+";'"
			+" value='"+cooleditor.bgcolorlist[key]+"'>"+key+"</option>";
		}
		toolbar_html += "</select>";
		toolbar_html += "&nbsp;&nbsp;"
		+"<button name='insertOrderedList' title='Ordered List'>1.</button>"
		+"<button name='insertUnorderedList' title='Unordered List'>&bull;</button>"
		toolbar_html += "</form>";
		toolbar.innerHTML = toolbar_html;
		var re_styles = new RegExp("^("+cooleditor.styles.join("|")+")$", "i");
		var btns = toolbar.querySelectorAll("button,select");
		for (var i = 0; i < btns.length; i++) {
			var func = btns[i].getAttribute("name");
			btns[i].type = "button"; // So form won't submit and reload iframe on button click
			if (func.match(re_styles)) func = "execCommand";
			var vars=["click"];
			if (btns[i].type == "select-one")
				vars=["change"];
			for (var v=0;v<vars.length;v++)
				btns[i].addEventListener(vars[v], cooleditor[func]);
		}
		var wrapper = document.createElement("div");
		wrapper.className = "cooleditor_wrapper";
		cooleditor.speech_div.parentElement.insertBefore(wrapper, cooleditor.speech_div);
		wrapper.appendChild(cooleditor.speech_div);
		wrapper.parentElement.insertBefore(toolbar, wrapper);
		document.cooleditor_form.load_file.addEventListener("change", cooleditor.load_file);
		cooleditor.toolbar = toolbar;
		document.execCommand("styleWithCSS",null,false);
		cooleditor.speech_div.addEventListener("keydown", function(e){
			console.log(e);
			if(e.keyCode == 9 && !e.shiftKey) { // Tab key
				document.execCommand("insertText",null,"\t")
				e.preventDefault();   
			}
		});
		cooleditor.speech_div.addEventListener("input", function(e){
			window.localStorage.setItem("speech_div", cooleditor.speech_div.innerHTML);
		});
		var previous_speech_data = window.localStorage.getItem("speech_div");
		if (previous_speech_data) {
			cooleditor.speech_div.innerHTML = previous_speech_data;
			cooleditor.speech_div.focus();
		}
		cooleditor.speech_div.focus();
		cooleditor.check_styles_interval = setInterval(() => { cooleditor.check_styles(); }, 1000);
	},
	
	new_file (e) {
		if (document.activeElement != cooleditor.speech_div)
			cooleditor.speech_div.focus();
		document.execCommand("selectAll");
		document.execCommand("delete");
	},
	
	open_file (e) {
		e.target.previousElementSibling.click();
	},
	
	load_file (e) {
		// Version 1.0.5 - https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
		var input = document.cooleditor_form.load_file;
		var reader = new FileReader();
		reader.onload = function(){
			var text = reader.result;
			cooleditor.speech_div.innerHTML = text;	
		}
		reader.readAsText(input.files[0]);

		// <input type='file' accept='text/plain' onchange='import_commands(event)'>
	},
	
	save_file (e) {
		var content = cooleditor.speech_div.innerHTML;
		var file = new Blob([content], {type: 'text/html'});
		var filename = '';
		var match = cooleditor.speech_div.innerText.match(/[^\n.?!]{0,50}/);
		if (match) filename = match[0];
		if (window.navigator.msSaveOrOpenBlob) // IE10+
			window.navigator.msSaveOrOpenBlob(file, filename);
		else { // Others
			var a = document.createElement("a");
			a.style.position = "absolute";
			a.style.left = "-2000px";
			a.href = URL.createObjectURL(file);
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			//URL.revokeObjectURL(url);
		}
	},
	
	print (e) {
		window.print();
	},
	
	check_styles () {
		var sel = window.getSelection();
		if (document.activeElement == document.body && sel.anchorNode && sel.anchorNode.parentElement 
			&& !sel.focusNode.parentElement.closest("#speech_div")) {
			//cooleditor.speech_div.focus();
			sel.removeAllRanges();
			if (cooleditor.caret_range)
				sel.addRange(cooleditor.caret_range);
		}
		if (document.activeElement == cooleditor.speech_div
		|| (sel.anchorNode && sel.anchorNode.parentElement && sel.focusNode.parentElement.closest("#speech_div"))) {
			var re_styles = new RegExp("^("+cooleditor.styles.join("|")+")$", "i");
			var btns = cooleditor.toolbar.querySelectorAll("button,select");
			for (var i = 0; i < btns.length; i++) {
				var func = btns[i].getAttribute("name");
				if (func.match(re_styles)) {
					if (btns[i].type == "button") {
						var state = document.queryCommandState(func);
						if (state)
							btns[i].classList.add("cooleditor_selected");
						else
							btns[i].classList.remove("cooleditor_selected");
					}
					else if (btns[i].type == "select-one") {
						var value = document.queryCommandValue(func);
						for (var j=0;j<btns[i].options.length;j++) {
							var input_value = btns[i].options[j].value;
							if (btns[i].options[j].textContent == "Clear" && func == "backColor" && value == "rgba(0, 0, 0, 0)")
								value = "inherit";
							var re = new RegExp(input_value,"i");
							if (value.match(re) || value == input_value) {
								btns[i].value = input_value;
								var style = btns[i].options[j].getAttribute("style");
								if (style) {
									var styles = style.split(";");
									for (var s=0;s<styles.length;s++) {
										var prop = styles[s].split(/\s*:\s*/);
										if (prop.length > 1 && btns[i].style.hasOwnProperty(prop[0].trim())) 
											btns[i].style[prop[0].trim()] = prop[1].trim();
									}
								}
								break;
							}
						}
					}
				}
			}
		}
		cooleditor.showCaret();
	},
	
	showCaret () {
		var sel = window.getSelection();
		var caret_div = document.getElementById("cooleditor_caret_div")
		if (!caret_div) {
			caret_div = document.createElement("div");
			caret_div.style.position = "fixed";
			caret_div.id = "cooleditor_caret_div";
			caret_div.style.backgroundColor = "#888888";
			caret_div.style.display = "inline-block";
			caret_div.style.opacity = "0.8";
			caret_div.style["pointer-events"] = "none"; // Version 1.7.37 - Because couldn't un-select highlighted text with a click
			document.body.prepend(caret_div);
		}
		if (document.activeElement == cooleditor.speech_div
		|| (sel.focusNode && sel.focusNode.parentElement && sel.focusNode.parentElement.closest("#speech_div"))) {
			var sel = window.getSelection();
			if (sel.rangeCount >= 1) {
				var range = sel.getRangeAt(0);
				cooleditor.caret_range = range; // Save range
				var rects = range.getClientRects(); // Version 1.7.37 - From getBoundingClientRect to getClientRects
				if (rects.length) {
					var rect = rects[0];
					caret_div.style.display = "inline-block";
					caret_div.style.opacity = (rect.width > 5) ? "0.4" : "0.8";
					caret_div.style.left = rect.left + "px";
					caret_div.style.top = rect.top + "px";
					caret_div.style.width = rect.width + 1 + "px";
					caret_div.style.height = rect.height + "px";
					if (parseInt(caret_div.style.width) > 3) // Version 1.7.37 - Because couldn't un-select highlighted text with a click
						caret_div.style.width = 3 + "px";
				}
				else { // Version 1.7.37 - If we say a sentence and then undo at the beginning of box then the caret has no clientRects
					caret_div.style.display = "none"; // so turn off caret display or it shows in wrong place
				}
			}
		}
	},
	
	execCommand (e) {
		if (test_mode) console.log(e);
		//clearInterval(cooleditor.check_styles_interval);
		var btn = e.target.closest("button,select");
		var func = btn.getAttribute("name");
		if (func) {
			if (document.activeElement != cooleditor.speech_div)
				cooleditor.speech_div.focus();
			if (btn.type == "button")
				document.execCommand(func);
			else if (btn.type == "select-one")
				document.execCommand(func,null,btn.value);
		}
		//cooleditor.check_styles_interval = setInterval(() => { cooleditor.check_styles(); }, 1000);
	},
	
}


if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", cooleditor.create_editors);
else
	cooleditor.create_editors();