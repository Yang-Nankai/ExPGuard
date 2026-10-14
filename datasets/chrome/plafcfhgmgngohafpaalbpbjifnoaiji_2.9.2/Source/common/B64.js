/*
* This file is subject to the terms and conditions defined in
* file 'LICENSE.txt', which is part of this extension package.
*/

function B64() { }

B64.table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

B64.decode = function(val)		
{
	var num = 0,len = val.toString().length;
	var i,count = 0;
	var result = [];

	if(len%4 != 0)
		return null;
	for(i=0;i<len-4;i+=4)
	{
		num = B64.table.indexOf(val.charAt(i));
		num = (num << 6) | B64.table.indexOf(val.charAt(i+1));
		num = (num << 6) | B64.table.indexOf(val.charAt(i+2));
		num = (num << 6) | B64.table.indexOf(val.charAt(i+3));
		result.push((num >>> 16)&0xff)
		result.push((num >>> 8)&0xff)
		result.push(num&0xff)
	}
	num = B64.table.indexOf(val.charAt(i));
	num = (num << 6) | B64.table.indexOf(val.charAt(i+1));
	if(val.charAt(i+2) == '=')
	{
		num = num << 6;
		count = 1;
	}
	else
	{
		num = (num << 6) | B64.table.indexOf(val.charAt(i+2));
		count = 2;
	}
	if(val.charAt(i+3) == '=')
		num = num << 6;
	else
	{
		num = (num << 6) | B64.table.indexOf(val.charAt(i+3));
		count = 3;
	}
	result.push((num >>> 16)&0xff);
	if(count > 1)
		result.push((num >>> 8)&0xff);
	if(count > 2)	
		result.push(num&0xff);
	return result;
}

B64.encode = function(val)
{
	var num = 0,len = val.length-(val.length%3);
	var i;var result = '';
	for(i = 0;i<len;i+=3)
	{
		num = 0;
		num = (num << 8)|(val[i] & 0xff);
		num = (num << 8)|(val[i+1] & 0xff);
		num = (num << 8)|(val[i+2] & 0xff);
		result = result+B64.table.charAt((num >>> 18) &0x3f);
		result = result+B64.table.charAt((num >>> 12) &0x3f);
		result = result+B64.table.charAt((num >>> 6) &0x3f);
		result = result+B64.table.charAt(num &0x3f);
	}
	if(val.length % 3 === 1)
	{
		result = result+(B64.table.charAt((val[i]>>>2)&0x3f));
		result = result+(B64.table.charAt((val[i]<<4)&0x30));
		result = result+'==';
	}
	if(val.length % 3 === 2)
	{
		num = 0;
		num = (num << 8)|(val[i] & 0xff);
		num = (num << 8)|(val[i+1] & 0xff);
		result = result+(B64.table.charAt((num >>> 10) & 0x3f));
		result = result+(B64.table.charAt((num >>> 4) & 0x3f));
		result = result+(B64.table.charAt((num << 2) & 0x3c));
		result = result + '=';
	}
	return result;
}
