function xhCreate(placeholder, inWidth, inPad, CB)
{
	placeholder.style.cssText += "white-space:nowrap;overflow:hidden;";
	placeholder["innerHTML"] = '';
	var input = document.createElement("div");
	input.contentEditable = "true";
	input.tabIndex = 1;
	input.style.cssText = "display:inline-block; outline:none !important; padding-left: "+inPad+"px; max-width:"+inWidth+"px; overflow: hidden; vertical-align: top;max-height:2em;-webkit-user-select: text;user-select: text;";
	placeholder.appendChild(input);
	
	var domain = document.createElement("span");
	domain.style.cssText = "color:gray;display:inline-block";
	domain["innerHTML"] = 'Enter xorkee handle';
	placeholder.appendChild(domain);
	
	setTimeout(function(){input.focus();},10);
	input.focus();
	placeholder.onclick = function(){
		input.focus();
	};
	
	input.onkeydown = function(e) {
        var elem = e.target;
        var val = elem["innerHTML"].toString().replace("<br>", "");
        var len = val.length;
        var ph = elem.parentElement.children[1];
        var key = e.key;
        input.style.overflow = "hidden";
		
		if(key == "Backspace" || key == "ArrowLeft" || key == "ArrowRight" || key == "Delete" || key == 'Shift' || key == 'End' || key == 'Home' || key == 'Tab')
		{
			//allowed control keys
		}		
		else
		{
			if(len > 53)
			{
				restrictEvent(e);
			}
			else if(key == '>' || key == '<')
			{
				restrictEvent(e);
			}
			else if((key>="a" && key<="z") || (key>="A" && key<="Z") || key == "-" || key == "." || key == '_' || key == '@' || (key>="0" && key<="9"))
			{
			   //allowed char set 
				var pattern = /^[A-Za-z0-9_\-\.@]$/;
				if(!pattern.test(e.key))
				{
					restrictEvent(e);
				}
			}
			else if(key != "Enter") restrictEvent(e);
		}

        if(key == "Enter" && CB)
        {
            val = val.toLowerCase();
            CB(e,"submit", val);
            restrictEvent(e);
			xhBlur(placeholder);
            return false;
        }
		
        /* if(key != 8 && !(key >= 37 && key <= 40) && key != 46 && len >= 53) restrictEvent(e);
        if((key>=65 && key<=90) || key == 173 || key == 46 || key == 8 || key == 9 || key == 16|| key == 37|| key == 39|| key == 190 || key == 36 || key == 35|| key == 189|| key == 190)
        {
            if(key == 190 && e.key == '>')
                restrictEvent(e);
        }
        else if (key>=48 && key<=57)
        {
            var pattern = /^[0-9@]$/;
            if(!pattern.test(e.key))
            {
                restrictEvent(e);
            };
        }
        else restrictEvent(e);

        if(keycode == 13 && CB)
        {
			val = val.toLowerCase();
            CB(e,"submit", val);
            restrictEvent(e);
			xhBlur(placeholder);
            return false;
        } */
		
        if(len > 0) ph["innerHTML"] = "@xorkee.com";
    };
    input.onkeyup = function(e) {
        var elem = e.target;
        var val = elem["innerHTML"].toString().replace("<br>", "");
        var len = val.length;
        var ph = elem.parentElement.children[1];
        if(len==0)
        {
            ph["innerHTML"] = "Enter xorkee handle";
            return false;
        }
        ph["innerHTML"] = "@xorkee.com";
    }; 
	input.onpaste = function(e){
		var elem = e.target;
		var val = (e.clipboardData).getData('text');
		val = val.replace(/\r?\n|\r/g, "");
		val = val.replace(/\s/g, "");
		val = val.replace(/\t/g, "");
		elem["innerHTML"] = val;
		restrictEvent(e);
		return false;
	}
}
function restrictEvent(e)
{
	e.preventDefault();
	e.stopPropagation();
	e.cancelBubble = true;
}
function xhGetValue(elem)
{
	var val = elem.children[0]["innerHTML"];
	val = val.replace('<br>', "");
	val = val.toLowerCase();
	var pattern = /^([A-Za-z0-9_\-\.@]){4,64}$/;
	if(!pattern.test(val.trim()) || val.length <= 3 || val.length > 64)
	{
		return {'status':false,'value':val,'elem':elem.children[0]};
	} 
	return {'status':true,'value':val,'elem':elem.children[0]};
}
function xhDisbleField(elem)
{
	elem.children[0].onkeydown = function(e){e.preventDefault();};
	elem.children[0].onkeyup = function(e){e.preventDefault();};
	elem.children[0].onpaste = function(e){e.preventDefault();};
	elem.style.background='#e3e3e3';
	elem.style.color='#6d6d6d';
}
function xhEnableField(elem)
{
	elem.style.background='#fff';
	elem.style.color='#000';
}
function xhResetValue(elem)
{
	var ph = elem.children[1];
	ph["innerHTML"] = "Enter xorkee handle";
	elem.children[0]["innerHTML"] = '';
}
function xhSetValue(elem,val)
{
	var ph = elem.children[1];
	ph["innerHTML"] = "@xorkee.com";
	elem.children[0]["innerHTML"] = val;
}
function xhFocus(elem)
{
	elem.children[0].focus();
}
function xhBlur(elem)
{
	elem.children[0].blur();
}
