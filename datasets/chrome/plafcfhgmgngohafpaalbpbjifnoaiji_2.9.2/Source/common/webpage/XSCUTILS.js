const XSCUTILS = {
	
	str2ab: function(str) {
	
		var strLen = str.length;
		var buf = new ArrayBuffer(strLen);
		var bufView = new Uint8Array(buf);
		for(var i=0; i<strLen; i++) bufView[i] = str.charCodeAt(i);
		return buf;
	},

	ab2str: function(buf) {
		
		var len = buf.byteLength;
		var str = "";
		for(var i=0; i<len; i++) str += String.fromCharCode(buf[i]);
		return str;
	},

	ab2hex: function(byteArray, space) { 
	
		var hex, paddedHex;
		const hexParts = [];
		for(let i = 0; i < byteArray.length; i++) 
		{
			hex = byteArray[i].toString(16);
			paddedHex = ('00' + hex).slice(-2);
			hexParts.push(paddedHex);
		}
		if(space == true) return hexParts.join(' ');
		else return hexParts.join('');
	},

	_base64ToArrayBuffer: function(base64) {
		
		var binary_string = window.atob(base64);
		var len = binary_string.length;
		var bytes = new Uint8Array(len);
		for (var i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes.buffer;
	},

	_arrayBufferToBase64: function (buffer) {
		
		var binary = '';
		var bytes = new Uint8Array( buffer );
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode( bytes[ i ] );
		}
		return window.btoa( binary );
	},

	strToHex: function(str) {
		
		var arr1 = [];
		for (var n = 0, l = str.length; n < l; n ++)  arr1.push(Number(str.charCodeAt(n)).toString(16)); 
		return arr1.join('');
	},
	
	numberToWords:function (number, noAndWord) {
		
		function _words(num, str){
			
			var output=' ';
			var q=Math.floor(num/10);
			var r=num%10;
			var ones=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
			var tens=['','','Twenty','Thirty','Fourty','Fifty','Sixty','Seventy','Eighty','Ninety'];

			if(num>19)
			{
				output+=tens[q]+' '+ones[r];
			}
			else
			{
				output+=ones[num];
			}
			return output+' '+str;
		}
		
		var len, rv, rv1;
		
		len = number.toString().length;
		if(len > 9)
		{
			rv = XSCUTILS.numberToWords(number.toString().substring(0, len - 7), true);
			rv1 = XSCUTILS.numberToWords(number.toString().substring(len - 7));
			return rv+'Crore'+rv1;
		}
		
		 var output=' ';
		 var crore=Math.floor(number/10000000);
		 var crore1=number%10000000;
		 var lakh=Math.floor(crore1/100000);
		 var lakh1=crore1%100000;
		 var thousand=Math.floor(lakh1/1000);
		 var thousand1=lakh1%1000;
		 var hundred=Math.floor(thousand1/100);
		 var hundred1=thousand1%100; 
		 
		 if(crore!=0)
			 output+=_words(crore,'Crore');
		 if(lakh!=0)
			 output+=_words(lakh,'Lakh');
		 if(thousand != 0)
			 output+=_words(thousand,'Thousand');
		 if(hundred != 0)
			output+=_words(hundred,'Hundred');
		 if(noAndWord == undefined && number>100&&(number%100)>0)
		 {
			 output+=' and';
		 }
		 var rem=number%100;
		 output+=_words(hundred1,' ');
		 
		 return output;
	},
	
	inWords: function(number){
		
		return 'Rupees'+XSCUTILS.numberToWords(number)+'Only';
	},
	
	getComponentName: function(service){
		
		if(service == SERVICENAME_ITR || service == SERVICENAME_MCA_V3 || service == SERVICENAME_DGFT)
		{
			return COMPONENT.EMB;
		}
		else if(service == SERVICENAME_IRCEP || service == SERVICENAME_IREPS) return COMPONENT.CRIS;
		else return undefined;
	},
	
	isFreeService: function(service){
		
		if(service == SERVICENAME_ITR || service == SERVICENAME_MCA || service == SERVICENAME_GST || service == SERVICENAME_EPF || service == SERVICENAME_TDS || service == SERVICENAME_MCA_V3) return true;
		else return false;
	},
	
	dateToStr: function(epoch){
		
		var date = new Date(epoch*1000);
		let day = ("0" + date.getDate()).slice(-2);
		let month = ("0" + (date.getMonth() + 1)).slice(-2);
		
		return (day)+"/"+(month)+"/"+date.getFullYear();
	},
	
};
