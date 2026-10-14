console.log("epUploadFiles");

function epUploadFiles(){
	
	var curObj = this, container, selectedRow = [], uploadedFiles={}, clearAllDiv, clearSelDiv, signAnduploadBtn, fileTypeTb, tblData, fileDataTb, totFileSize=0, totalFileSizeElem, imageUrls = {};
		
	const fileTypeHeader = {name:"File Type", description:"Description", uploadStatus:"Upload Status"};
	
	const fileDataHeader = {name:"File Name", size:"File Size(in KB)", webkitRelativePath:"File Directory", lastModified:"File Last Modified", browse:"Browse"};
	
	const FILE_NOT_UPLOADED = "File Not Uploaded";
	
	this.resetCtx = function(){
		
		container = undefined, selectedRow = [], uploadedFiles={}, clearAllDiv = undefined, clearSelDiv = undefined, signAnduploadBtn = undefined, fileTypeTb = undefined, tblData = undefined, fileDataTb = undefined, totFileSize=0, totalFileSizeElem = undefined, imageUrls = {};
	}

	this.create = function(con, imgUrls, fileList, chooseFileCb, signAndUploadCb, clearCb, errStrCb){
		
		curObj.resetCtx();
		
		container = con;
		container.classList.add("otl_container");			
		
		tblData = fileList;
		imageUrls = imgUrls;
		
		curObj.createBtnHeader(clearCb, chooseFileCb);
		curObj.createTblContainer(chooseFileCb, errStrCb);
		curObj.createProgressBarWrap(signAndUploadCb, errStrCb);
	}
	
	this.createBtnHeader = function(clearCb,chooseFileCb){
		
		var buttonWrap, i;
		
		buttonWrap = otlCreateElement('div').setAttribute('class','otl_btnWrap').appendTo(container);
		
		clearAllDiv = otlCreateElement('div').setAttribute("disabled", true).setAttribute('class','otl_clearButtons otl_btnDisable').addContent('innerHTML',`<img src="${imageUrls.clearAll}" style="width: 15px;margin-right: 5px;"/>Clear All Selection`).appendTo(buttonWrap);
		
		clearSelDiv = otlCreateElement('div').setAttribute("disabled", true).setAttribute('class','otl_clearButtons otl_btnDisable').addContent('innerHTML',`<img src="${imageUrls.clearSel}" style="width: 15px;margin-right: 5px;"/>Clear Selected`).appendTo(buttonWrap);
		
		clearAllDiv.onclick = function(){
			
			if(this.getAttribute("disabled") == "false")
			{
				for(i=0; i<tblData.length;i++)
				{
					curObj.setSelectedRow(i);
					curObj.updateDataTableRow(selectedRow, null);
				}
				selectedRow = [];	 
				clearCb(0);
			}
		};
		
		clearSelDiv.onclick = function(){
			
			if(this.getAttribute("disabled") == "false")
			{
				clearCb(parseInt(selectedRow[0].getAttribute("data-rowIndex")));
				
				curObj.updateDataTableRow(selectedRow, null);				
			}
		}
	}
	
	this.createTblContainer = function(chooseFileCb, errStrCb){
		
		var tableContainer, totalFileSizeCon, key, column;
		
		tableContainer = otlCreateElement('div').setAttribute('class','otl_contentWrap').appendTo(container);
		
		tableContainer["innerHTML"] = `
			<div class='otl_contentLeftPane otl_fileTypeTbl'></div>
			<div class='otl_containerResizer'></div>
			<div class='otl_contentRightPane otl_fileDataTbl'></div>`;

		for(key in fileTypeHeader)
		{
			// Creating file type column
			column =  otlCreateElement('div').setAttribute('class','otl_column').appendTo(tableContainer.children[0]);
			
			otlCreateElement('div').setAttribute('class','fileTypeGrids').addContent('innerHTML',fileTypeHeader[key]).appendTo(column);
		}
		for(key in fileDataHeader)
		{
			// Creating file data column
			column =  otlCreateElement('div').setAttribute('class','otl_column').appendTo(tableContainer.children[2]);
			
			otlCreateElement('div').setAttribute('class','fileDataGrids').addContent('innerHTML',fileDataHeader[key]).appendTo(column);
		}
		
		fileTypeTb = tableContainer.children[0];
		fileDataTb = tableContainer.children[2];
		
		containerResize(tableContainer, fileTypeTb, fileDataTb); // Resize overall table container
		
		curObj.createTblData(chooseFileCb, errStrCb);
		
		totalFileSizeCon = otlCreateElement('div').setAttribute('class','otl_totFileSize').addContent('innerHTML',`Total File Size:&nbsp; <span>0</span>KB`).appendTo(container);
		
		totalFileSizeElem = totalFileSizeCon.children[0];	
	}
	
	this.createProgressBarWrap = function(signAndUploadCb, errStrCb){
		
		var progressContainer = otlCreateElement('div').setAttribute('class','otl_progressWrap').appendTo(container);
		
		progressContainer["innerHTML"] = `<div class='otl_progressDiv'>
										<progress class='otl_progressBars' max='100' value='0'></progress>
										<span class='progressSpans'>0%</span>
										<progress class='otl_progressBars' max='100' value='0'></progress>
										<span class='progressSpans' style='top:55%;'>0%</span>
										</div>`;
										
		signAnduploadBtn = otlCreateElement('div').setAttribute("disabled", true).setAttribute('class','otl_signBtnDiv otl_btnDisable').addContent('innerHTML',`<img src="${imageUrls.upload}" style="width: 15px;margin-right: 5px;"/>Sign & Upload`).appendTo(progressContainer);
		
		signAnduploadBtn.onclick = function(){
			return function(){
				
				if(this.getAttribute("disabled") == "false")
				{
					validateFiles(1, uploadedFiles, [], function(issuccess, files, errstr) {
						if(issuccess == true) signAndUploadCb(files);
						else
						{
							curObj.clear(files);	//"files" variable will be the erroneous file index in case of error
							errStrCb(errstr);
						}
					});
				}
			}
		}();
	}
	
	this.createTblData = function(chooseFileCb, errStrCb){
		
		var i, j, fileTypeCell, fileDataCell, tdData, contentType, pattern, fileIndex;
		
		for(i=0; i< Object.keys(fileTypeHeader).length; i++)
		{			
			for(j=0; j< tblData.length; j++)
			{
				if(Object.keys(fileTypeHeader)[i] == "uploadStatus") 
				{
					tdData = `<img src = "${imageUrls.cross}" class='otl_uploadStatus' style='width: 15px;height: 15px;' />`;
				}
				else tdData = tblData[j][Object.keys(fileTypeHeader)[i]];
				
				fileTypeCell = document.createElement('div');
				fileTypeCell.className = 'fileTypeGrids otl_loadedRow';
				fileTypeCell["innerHTML"] = tdData;
				fileTypeCell.title = tdData.includes('img')? '' : tdData;
				
				if(Object.keys(fileTypeHeader)[i] == "uploadStatus") 
				{
					fileTypeCell.classList.add('fileTypeGrids_uploadStatus');
				}
				
				fileTypeCell.onclick = function(index, selectedCell){
					return function(e){						
						
						// highlight the current selected cell
						if(document.querySelector('.otl_selectedTd')) 
							document.querySelector('.otl_selectedTd').classList.remove('otl_selectedTd');
						selectedCell.classList.add('otl_selectedTd');
						
						curObj.setSelectedRow(index);
						
						// highlight the upload status cell
						if(document.querySelector('.otl_selectedUpTd'))
							document.querySelector('.otl_selectedUpTd').classList.remove('otl_selectedUpTd');
						fileTypeTb.lastElementChild.children[index+1].classList.add('otl_selectedUpTd');
					}
				}(j, fileTypeCell);
				
				fileTypeTb.children[i].appendChild(fileTypeCell);
			}
		}
		
		
		for(i=0; i< Object.keys(fileDataHeader).length; i++)
		{			
			for(j=0; j< tblData.length; j++)
			{
				if(Object.keys(fileDataHeader)[i] == "name") 
				{
					tdData = FILE_NOT_UPLOADED;
				}
				else if(Object.keys(fileDataHeader)[i] == "browse") 
				{
					tdData = `<input type='file' class='otl_browseFile' accept = '${tblData[j].name}' /><img src='${imageUrls.browse}'/>`;
				}
				else 
				{
					tdData = "";
				}
				
				fileDataCell = document.createElement('div');
				fileDataCell.className = 'fileDataGrids otl_emptyRow';
				fileDataCell["innerHTML"] = tdData;
				fileDataCell.title = tdData.includes('img')? '' : tdData;
				
				fileDataCell.onclick = function(index, selectedCell){
					return function(e){
						
						// highlight the current selected cell
						if(document.querySelector('.otl_selectedTd')) 
							document.querySelector('.otl_selectedTd').classList.remove('otl_selectedTd');
						selectedCell.classList.add('otl_selectedTd');
						
						// remove previous highlighted uploadStatus cell
						if(document.querySelector('.otl_selectedUpTd'))
							document.querySelector('.otl_selectedUpTd').classList.remove('otl_selectedUpTd');
						
						curObj.setSelectedRow(index);					
	  
					}
				}(j, fileDataCell);
				
				
				if(Object.keys(fileDataHeader)[i] == "browse")
				{
					fileDataCell.classList.add('fileDataGrids_browse');
					
					fileDataCell.children[0].onchange = function(inputFile, index){
						
						return function(e){
							
							if(inputFile.files.length > 0)
							{
								contentType = getContentType(inputFile.files[0]);
								
								pattern = /[^a-zA-Z0-9._\\/-]/;
								
								for(fileIndex in uploadedFiles)
								{
									if(uploadedFiles[fileIndex].name == inputFile.files[0].name)
									{
										inputFile.value = "";
										errStrCb('Duplicate file name found. Please check the file name.');
										return false;
									}
								}
									
								if(contentType != tblData[index].name)
								{
									inputFile.value = "";
									errStrCb('Please check the file extension and upload in correct format.');
									return false;
								}
								else if(pattern.test(inputFile.files[0].name))
								{
									inputFile.value = "";
									errStrCb('Selected file should not contain special character or space in file name.');
									return false;
								}
								/*else if(inputFile.files[0].size > (40 * 1024 * 1024))
								{
									inputFile.value = "";
									errStrCb('File size exceeds the limit 40 MB.');
									return false;
								}*/
								else if(inputFile.files[0].name.length > 200)
								{
									inputFile.value = "";
									errStrCb('Selected file should not contain more than 200 characters in file name.');
									return false;
								}
								else
								{
									// Plus one for skiping header
									curObj.setSelectedRow(index);
									
									curObj.updateDataTableRow(selectedRow, inputFile.files[0]);
									
									// caller need 1 based file index, so plus one is incremented
									chooseFileCb(index+1, inputFile.files[0]);
								}
								
							}
						}
					}(fileDataCell.children[0], j);
				}
				
				fileDataTb.children[i].appendChild(fileDataCell);
			}
   
		}
		
		tableHeaderResize(fileTypeTb);
		tableHeaderResize(fileDataTb);
	}
	
	this.clear = function(index){
		// index -> 0 - Clear all
		// index != 0 - Clear the respective index
		var i;
		
		if(index == 0) 
		{
			// clearAllDiv.click();
			if(clearAllDiv.getAttribute("disabled") == "false")
			{
				for(i=0; i<tblData.length; i++)
				{
					curObj.setSelectedRow(i);
					curObj.updateDataTableRow(selectedRow, null);
				}
				selectedRow = [];
			}
		}
		else
		{
			// setSelectedRow function expects 0 based index for selecting a row
			index = index - 1;
			
			curObj.setSelectedRow(index);
			
			curObj.updateDataTableRow(selectedRow, null);
		}
	}
	
	this.signProgress = function(value){
		// 0 - 100 in  int
		var progress = document.getElementsByTagName("progress")[0];
		
		if(value == 100)
		{
			progress.nextElementSibling["innerHTML"] = "File Signing Completed. (100%)";
		}
		else if(value == 0)
		{
			progress.nextElementSibling["innerHTML"] = "0%";
		}
		else
		{
			progress.nextElementSibling["innerHTML"] = "File Signing in progress... ("+value+"%)";
		}
		progress.nextElementSibling.style.left = '40%';
		progress.value = value;
	}
	
	this.UploadProgress = function(value){
		// 0 - 100 in  int
		var progress = document.getElementsByTagName("progress")[1];
		if(value == 100)
		{
			progress.nextElementSibling["innerHTML"] = "File Uploaded Successfully. (100%)";
			progress.nextElementSibling.style.left = '40%';
		}
		else if(value == 0)
		{
			progress.nextElementSibling["innerHTML"] = "0%";
			progress.nextElementSibling.style.left = '40%';
		}
		else
		{
			progress.nextElementSibling["innerHTML"] = "File(s) Verification and Validation in progress... ("+value+"%)";
			progress.nextElementSibling.style.left = '30%';
		}
		progress.value = value;
	}
	
	this.updateDataTableRow = function(selectedRow, fileObj){
		
		var key, selectRowIndex, cellIndex=0;
		
		for(key in fileDataHeader)
		{
			// remove both grey and white background
			selectedRow[cellIndex].classList.remove('otl_emptyRow','otl_loadedRow');
			
			if(key == "name")
			{
				if(fileObj != null)
				{
					selectedRow[cellIndex].textContent = fileObj[key];
					selectedRow[cellIndex].classList.add('otl_loadedRow');
				}
				else
				{
					selectedRow[cellIndex].textContent = FILE_NOT_UPLOADED;
					selectedRow[cellIndex].classList.add('otl_emptyRow');
				}
			}
			else if(key == "size")
			{
				if(fileObj != null) 
				{
					selectedRow[cellIndex].textContent = byteToKB(fileObj[key]);
					selectedRow[cellIndex].style.textAlign = 'right';
					selectedRow[cellIndex].classList.add('otl_loadedRow');
				}
				else
				{
					selectedRow[cellIndex].textContent = "";
					selectedRow[cellIndex].classList.add('otl_emptyRow');
				}															
			}
			else if(key == "lastModified")
			{
				// epoch to date format
				if(fileObj != null)
				{
					selectedRow[cellIndex].textContent = dateToString(fileObj[key]);
					selectedRow[cellIndex].classList.add('otl_loadedRow');
				}
				else
				{
					selectedRow[cellIndex].textContent = "";
					selectedRow[cellIndex].classList.add('otl_emptyRow');
				}
			}
			else if(key == "browse") 
			{
				if(fileObj == null)
				{
					selectedRow[cellIndex].children[0].value = "";
					selectedRow[cellIndex].classList.add('otl_emptyRow');
				}
				else
				{
					selectedRow[cellIndex].classList.add('otl_loadedRow');
				}
			}
			else 
			{
				if(fileObj != null)
				{
					selectedRow[cellIndex].textContent = fileObj[key];
					selectedRow[cellIndex].classList.add('otl_loadedRow');
				}
				else
				{
					selectedRow[cellIndex].textContent = "";
					selectedRow[cellIndex].classList.add('otl_emptyRow');
				}
			}
			
			selectedRow[cellIndex].title = (key == "browse")? '' : selectedRow[cellIndex].textContent;
			cellIndex++;
		}
		
		selectRowIndex = parseInt(selectedRow[0].getAttribute("data-rowIndex"));
  
		if(fileObj != null)
		{
			// Change cross icon to tick icon
			fileTypeTb.lastElementChild.children[selectRowIndex]["innerHTML"] = `<img src = "${imageUrls.tick}" class='otl_uploadStatus' style='width: 15px;height: 15px;' />`;
			
			if(uploadedFiles[selectRowIndex] != undefined && uploadedFiles[selectRowIndex].size > 0)
			{
				// In this case, already a file is selected and updated in totFileSize variable. 
				// previous updated total File Size is reduced here
				totFileSize -= byteToKB(uploadedFiles[selectRowIndex].size);
			}
			
			// Change total file size;
			totalFileSizeElem.textContent = totFileSize = totFileSize+byteToKB(fileObj.size);
			
			// Update the file in context
			uploadedFiles[selectRowIndex] = fileObj;
		}
		else
		{
			// Change tick icon to cross icon
			fileTypeTb.lastElementChild.children[selectRowIndex]["innerHTML"] = `<img src = "${imageUrls.cross}" class='otl_uploadStatus' style='width: 15px;height: 15px;' />`;
			
			// Change total file size;
			if(uploadedFiles[selectRowIndex] != undefined) 
			{
				totalFileSizeElem.textContent = totFileSize = totFileSize-byteToKB(uploadedFiles[selectRowIndex].size);
			
				// Clear the file in context
				delete uploadedFiles[selectRowIndex];
			}
		}

		// disable sign and upload button
		signAnduploadBtn.classList.add('otl_btnDisable');
		signAnduploadBtn.classList.remove('otl_btnEnable');
		signAnduploadBtn.setAttribute("disabled", true);
		
		if(Object.keys(uploadedFiles).length > 0)
		{
			// enable clear all button
			clearAllDiv.classList.remove('otl_btnDisable');
			clearAllDiv.classList.add('otl_btnEnable');
			clearAllDiv.setAttribute("disabled", false);
			
			// enable clear selected button
			clearSelDiv.classList.remove('otl_btnDisable');
			clearSelDiv.classList.add('otl_btnEnable');
			clearSelDiv.setAttribute("disabled", false);
			
			if(Object.keys(uploadedFiles).length == tblData.length)
			{
				// All file are uploaded-> enable the sign and upload button
				signAnduploadBtn.classList.remove('otl_btnDisable');
				signAnduploadBtn.classList.add('otl_btnEnable');
				signAnduploadBtn.setAttribute("disabled", false);
			}
		}
		else
		{
			// No file are selected
			
			// disable clear all button
			clearAllDiv.classList.add('otl_btnDisable');
			clearAllDiv.classList.remove('otl_btnEnable');
			clearAllDiv.setAttribute("disabled", true);
			
			// disable clear selected button
			clearSelDiv.classList.add('otl_btnDisable');
			clearSelDiv.classList.remove('otl_btnEnable');
			clearSelDiv.setAttribute("disabled", true);
		}
	}
	
	this.setSelectedRow = function(index){
		
		// Plus one is incremented for skiping header element
		index = index + 1;
		
		selectedRow=[];
		for(var k=0;k<fileDataTb.children.length;k++)
		{
			selectedRow.push(fileDataTb.children[k].children[index]);
		}
		selectedRow[0].setAttribute('data-rowIndex', index);
	}
}

function epFileSign(){
	
	var curObj = this, container, selectedRow = [], uploadedFiles={}, signAnduploadBtn, tblData, fileDataTb, totFileSize=0, totalFileSizeElem, imageUrls = {};
		
	const fileDataHeader = {name:"File Name", size:"File Size(in KB)", webkitRelativePath:"File Directory", lastModified:"File Last Modified", browse:"Browse"};
	
	const FILE_NOT_UPLOADED = "File Not Uploaded";
	
	this.create = function(con, imgUrls, fileList, chooseFileCb, signAndUploadCb, errStrCb){
		
		container = con;
		container.classList.add("otl_container");			
		
		tblData = fileList;
		imageUrls = imgUrls;
		
		curObj.createTblContainer(chooseFileCb, errStrCb, signAndUploadCb);
	}
	
	this.createTblContainer = function(chooseFileCb, errStrCb, signAndUploadCb){
		
		var tableContainer, totalFileSizeCon, key, column, con;
		
		tableContainer = otlCreateElement('div').setAttribute('class','otl_contentWrap').setAttribute('style','height:calc(100% - 30px);width:100%;').appendTo(container);
		
		tableContainer["innerHTML"] = `<div class='otl_contentRightPane otl_fileDataTbl' style ="width:100%;max-width: none;" ></div>`;

		for(key in fileDataHeader)
		{
			// Creating file data column
			column =  otlCreateElement('div').setAttribute('class','otl_column').appendTo(tableContainer.children[0]);
			
			otlCreateElement('div').setAttribute('class','fileDataGrids').setAttribute('style','height:20px;').addContent('innerHTML',fileDataHeader[key]).appendTo(column);
		}
		
		fileDataTb = tableContainer.children[0];
		
		curObj.createTblData(chooseFileCb, errStrCb);
		
		con = otlCreateElement('div').setAttribute('style','display: flex;height: 30px;justify-content: center;align-items: center;').appendTo(container);
		
		totalFileSizeCon = otlCreateElement('div').setAttribute('style','height: 80%;margin:0').setAttribute('class','otl_totFileSize').addContent('innerHTML',`Total File Size:&nbsp; <span>0</span>KB`).appendTo(con);
		
		totalFileSizeElem = totalFileSizeCon.children[0];	
		
		signAnduploadBtn = otlCreateElement('div').setAttribute("disabled", true).setAttribute('style','flex-grow: initial;margin-left: 15px;height: 80%;padding: 0 8px;').setAttribute('class','otl_signBtnDiv otl_btnDisable').addContent('innerHTML',`<img src="${imageUrls.upload}" style="width: 15px;margin-right: 5px;"/>Sign & Upload`).appendTo(con);
		
		signAnduploadBtn.onclick = function(){
			return function(){
				
				if(this.getAttribute("disabled") == "false")
				{
					validateFiles(1, uploadedFiles, [], (issuccess, files, errstr) => {
						if(issuccess == true) {
							
							this.setAttribute("disabled", true);
							this.classList.add("otl_btnDisable");
							
							signAndUploadCb(files);
						}
						else
						{
							errStrCb(errstr);
						}
					});
				}
			}
		}();
	}
	
	this.createTblData = function(chooseFileCb, errStrCb){
		
		var i, j, fileDataCell, tdData, contentType, pattern, fileIndex;
		
		for(i=0; i< Object.keys(fileDataHeader).length; i++)
		{			
			for(j=0; j< tblData.length; j++)
			{
				if(Object.keys(fileDataHeader)[i] == "name") 
				{
					tdData = tblData[j].fileName;
				}
				else if(Object.keys(fileDataHeader)[i] == "browse") 
				{
					tdData = `<input type='file' class='otl_browseFile' accept = '${tblData[j].expectedFileType}' /><img src='${imageUrls.browse}'/>`;
				}
				else 
				{
					tdData = "";
				}
				
				fileDataCell = document.createElement('div');
				fileDataCell.className = 'fileDataGrids otl_emptyRow';
				fileDataCell.setAttribute('style','height:20px;');
				fileDataCell["innerHTML"] = tdData;
				fileDataCell.title = tdData.includes('img')? '' : tdData;
				
				if(Object.keys(fileDataHeader)[i] == "name") 
				{
					fileDataCell.style.background = "white";
					fileDataCell.style.color = "black";
					fileDataCell.style.fontWeight = "normal";
				}
								
				if(Object.keys(fileDataHeader)[i] == "browse")
				{
					fileDataCell.classList.add('fileDataGrids_browse');
					
					fileDataCell.children[0].onchange = function(inputFile, index){
						
						return function(e){
							
							if(inputFile.files.length > 0)
							{
								contentType = getContentType(inputFile.files[0]);
								
								pattern = /[^a-zA-Z0-9._\\/-]/;
								
								for(fileIndex in uploadedFiles)
								{
									if(uploadedFiles[fileIndex].name == inputFile.files[0].name)
									{
										inputFile.value = "";
										errStrCb('Duplicate file name found. Please check the file name.');
										return false;
									}
								}
								
								if(inputFile.files[0].name != tblData[index].fileName)
								{
									inputFile.value = "";
									errStrCb(`Selected file should be of the name '${tblData[index].fileName}'`);
									return false;
								}
								else if(contentType != tblData[index].expectedFileType)
								{
									inputFile.value = "";
									errStrCb('Please check the file extension and upload in correct format.');
									return false;
								}
								else if(pattern.test(inputFile.files[0].name))
								{
									inputFile.value = "";
									errStrCb('Selected file should not contain special character or space in file name.');
									return false;
								}
								/*else if(inputFile.files[0].size > (40 * 1024 * 1024))
								{
									inputFile.value = "";
									errStrCb('File size exceeds the limit 40 MB.');
									return false;
								}*/
								else if(inputFile.files[0].name.length > 200)
								{
									inputFile.value = "";
									errStrCb('Selected file should not contain more than 200 characters in file name.');
									return false;
								}
								else
								{
									curObj.setSelectedRow(index);
									
									curObj.updateDataTableRow(selectedRow, inputFile.files[0]);
									
									// caller need 1 based file index, so plus one is incremented
									chooseFileCb(index+1, inputFile.files[0]);
								}
								
							}
						}
					}(fileDataCell.children[0], j);
				}
				
				fileDataTb.children[i].appendChild(fileDataCell);
			}
   
		}

	}
	
	this.updateDataTableRow = function(selectedRow, fileObj){
		
		var key, cellIndex=0;
		
		for(key in fileDataHeader)
		{
			// remove both grey and white background
			selectedRow[cellIndex].classList.remove('otl_emptyRow','otl_loadedRow');
			
			if(key == "name")
			{
				if(fileObj != null)
				{
					selectedRow[cellIndex].textContent = fileObj[key];
					selectedRow[cellIndex].classList.add('otl_loadedRow');
				}
				else
				{
					selectedRow[cellIndex].textContent = FILE_NOT_UPLOADED;
					selectedRow[cellIndex].classList.add('otl_emptyRow');
				}
			}
			else if(key == "size")
			{
				if(fileObj != null) 
				{
					selectedRow[cellIndex].textContent = byteToKB(fileObj[key]);
					selectedRow[cellIndex].style.textAlign = 'right';
					selectedRow[cellIndex].classList.add('otl_loadedRow');
				}
				else
				{
					selectedRow[cellIndex].textContent = "";
					selectedRow[cellIndex].classList.add('otl_emptyRow');
				}															
			}
			else if(key == "lastModified")
			{
				// epoch to date format
				if(fileObj != null)
				{
					selectedRow[cellIndex].textContent = dateToString(fileObj[key]);
					selectedRow[cellIndex].classList.add('otl_loadedRow');
				}
				else
				{
					selectedRow[cellIndex].textContent = "";
					selectedRow[cellIndex].classList.add('otl_emptyRow');
				}
			}
			else if(key == "browse") 
			{
				if(fileObj == null)
				{
					selectedRow[cellIndex].children[0].value = "";
					selectedRow[cellIndex].classList.add('otl_emptyRow');
				}
				else
				{
					selectedRow[cellIndex].classList.add('otl_loadedRow');
				}
			}
			else 
			{
				if(fileObj != null)
				{
					selectedRow[cellIndex].textContent = fileObj[key];
					selectedRow[cellIndex].classList.add('otl_loadedRow');
				}
				else
				{
					selectedRow[cellIndex].textContent = "";
					selectedRow[cellIndex].classList.add('otl_emptyRow');
				}
			}
			
			selectedRow[cellIndex].title = (key == "browse")? '' : selectedRow[cellIndex].textContent;
			cellIndex++;
		}
		
		selectRowIndex = parseInt(selectedRow[0].getAttribute("data-rowIndex"));
		
		if(fileObj != null)
		{
			if(uploadedFiles[selectRowIndex] != undefined && uploadedFiles[selectRowIndex].size > 0)
			{
				// In this case, already a file is selected and updated in totFileSize variable. 
				// previous updated total File Size is reduced here
				totFileSize -= byteToKB(uploadedFiles[selectRowIndex].size);
			}
			
			// Change total file size;
			totalFileSizeElem.textContent = totFileSize = totFileSize+byteToKB(fileObj.size);
			
			// Update the file in context
			uploadedFiles[selectRowIndex] = fileObj;
		}
		else
		{
			// Change total file size;
			if(uploadedFiles[selectRowIndex] != undefined) 
			{
				totalFileSizeElem.textContent = totFileSize = totFileSize-byteToKB(uploadedFiles[selectRowIndex].size);
			
				// Clear the file in context
				delete uploadedFiles[selectRowIndex];
			}
		}
		
		// disable sign and upload button
		signAnduploadBtn.classList.add('otl_btnDisable');
		signAnduploadBtn.classList.remove('otl_btnEnable');
		signAnduploadBtn.setAttribute("disabled", true);
		
		if(Object.keys(uploadedFiles).length > 0)
		{
			if(Object.keys(uploadedFiles).length == tblData.length)
			{
				// All file are uploaded-> enable the sign and upload button
				signAnduploadBtn.classList.remove('otl_btnDisable');
				signAnduploadBtn.classList.add('otl_btnEnable');
				signAnduploadBtn.setAttribute("disabled", false);
			}
		}
	}
	
	this.setSelectedRow = function(index){
		
		// Plus one is incremented for skiping header element
		index = index + 1;
		
		selectedRow=[];
		for(var k=0;k<fileDataTb.children.length;k++)
		{
			selectedRow.push(fileDataTb.children[k].children[index]);
		}
		selectedRow[0].setAttribute('data-rowIndex', index);
	}
}

function singleFileUpload(){
	
	var curObj= this, container, txtBox, inputElem, fileObj;
	
		
	this.create = function(con, imageURLS, fileType, submitCb, errorCb){
		
		container = con;
		container.classList.add('otl_uploadContainer');
		var typeArr = fileType.split(',');
		
		
		txtBox = otlCreateElement('input').setAttribute('type','text').setAttribute('class','otl_uploadTxtBox').setAttribute('disabled',true).appendTo(container);
		
		var inputFileWrap = otlCreateElement('div').setAttribute('class','otl_uploadInputFileWrap').style('background-image:url('+imageURLS.upload+')').setAttribute('title','Browse').appendTo(container);
		
		inputElem = otlCreateElement('input').setAttribute('type','file').setAttribute('class','otl_uploadInputFile').setAttribute('accept',fileType).appendTo(inputFileWrap);
		inputElem.onchange = function(){
			
			if(inputElem.files.length > 0)
			{
				var pattern = /[^a-zA-Z0-9._\\/-]/;
				var contentType = getContentType(inputElem.files[0]);
				var i;
				
				for(i=0; i<typeArr.length;i++)
				{
					if(contentType == typeArr[i]) break;
					else 
					{
						if(i==(typeArr.length-1))
						{
							inputElem.value = "";
							txtBox.value = "";
							fileObj = undefined;
							errorCb('Please upload application supported files ('+fileType+').');
							return false;
						}
					}
				}
				
				if(pattern.test(inputElem.files[0].name))
				{
					inputElem.value = "";
					txtBox.value = "";
					fileObj = undefined;
					errorCb('Please remove special characters/space from your file name.');
					return false;
				}
				else if(inputElem.files[0].size > (40 * 1024 * 1024))
				{
					inputElem.value = "";
					txtBox.value = "";
					fileObj = undefined;
					errorCb('File size exceeds the limit 40 MB.');
					return false;
				}
				else if(inputElem.files[0].name.length > 200)
				{
					inputElem.value = "";
					txtBox.value = "";
					fileObj = undefined;
					errorCb('Selected file should not contain more than 200 characters in file name.');
					return false;									
				}
				else
				{
					txtBox.value = inputElem.files[0].name;
					fileObj = inputElem.files[0];
				}
			}
			else
			{
				txtBox.value = "";
				fileObj = undefined;
			}
		};
		
		var submitBtn = otlCreateElement('input').setAttribute('type','button').setAttribute('class','otl_uploadSubmit').style('background-image:url('+imageURLS.sign+')').setAttribute('title','Scan & Sign').appendTo(container);
		submitBtn.onclick = function(){
			
			if(inputElem.files.length <= 0) errorCb('Please select a file to upload.');
			else
			{
				xsg2cpopup.showLoader("Loading the file '"+inputElem.files[0].name+"' ...");
				var r = new FileReader();
				r.onloadend = function(e) {
					
					if(e.target.result == null)
					{
						console.log(e.target.error);
						errorCb(fileSelectionError(inputElem.files[0].name));
						curObj.clear();
						return;
					}
					submitCb(inputElem.files[0], e.target.result);
				};
				r.readAsArrayBuffer(inputElem.files[0]);
			}
		};
	}
	
	this.clear = function(){
		
		txtBox.value = '';
		fileObj = undefined;
		inputElem.value = '';
		console.log('cleared');
	}
}

function epDecryptFiles(){
	
	const tableHeader = {sno:"S.No", packetName:"Packet Name", bidid:"Bid Id",  bidderName:"Bidder Name", status: "Decrypt Status"};
	
	var curObj = this, progress, progressText, statusCell = [], dataList = [];
	
	this.create = function(container, data, proceedBtnCb){
		
		dataList = JSON.parse(JSON.stringify(data));
		
		container.setAttribute("class", "decryptTbl_otl_container");
		curObj.createTable(container); // create table
		curObj.renderData(); // fill data in table
		curObj.createProgressContainer(container, proceedBtnCb); // Create progress bar and progress button
	};
	
	this.createTable = function(container){
		
		var tableContainer, key, column, width, cell;
		
		tableContainer = otlCreateElement('div').setAttribute('class','decryptTbl_otl_contentWrap').appendTo(container);

		for(key in tableHeader)
		{
			// Creating file type column
			column =  otlCreateElement('div').setAttribute('class','decryptTbl_otl_column').appendTo(tableContainer);
			if(key == "sno") width = 10;
			else if(key == "packetName") width = 30;
			else if(key == "bidid") width = 10;
			else if(key == "bidderName") width = 30;
			else if(key == "status")  width = 20;
				
			column.style.width = width+"%";
			
			cell = otlCreateElement('div').setAttribute('class','decryptTbl_fileTypeGrids').style("font-weight:bold;").addContent('innerHTML',tableHeader[key]).appendTo(column);
			
			if(key == "status") 
			{
				// Overall container has border so the last cell doesn't need border
				cell.style.borderRight = "none";
			}
		}
	};
	
	this.renderData = function(){
		
		var column, columnIndex = 0, cell, cellData = "";
		statusCell = [];
		
		column = document.getElementsByClassName("decryptTbl_otl_column");
		
		for(var i=0; i<dataList.length; i++)
		{
			for(key in tableHeader)
			{
				if(key == "sno") cellData = i+1;
				else if(key == "status") cellData = "--";
				else cellData = dataList[i][key];
				
				cell = otlCreateElement('div').setAttribute('class','decryptTbl_fileTypeGrids').style('text-align:left;text-indent:3px;').addContent('innerHTML',cellData).addContent('title',cellData).appendTo(column[columnIndex]);
				columnIndex++;
				
				if(key == "status") 
				{
					// Overall container has border so the last cell doesn't need border
					cell.style.borderRight = "none";
					statusCell.push(cell); // statusCell is preserved. It is used to update the cell when the corresponding data is decrypted.
				}
			}
			
			columnIndex = 0;
		}
	};
	
	this.createProgressContainer = function(container, proceedBtnCb){
		
		var wrapper, progressBody, proceedBtn;
		
		wrapper = otlCreateElement('div').setAttribute('class','decryptTbl_progressWrapper').appendTo(container);
		
		progressBody = otlCreateElement('div').setAttribute('class','decryptTbl_progressBody').appendTo(wrapper);
		
		progress = otlCreateElement('progress').style("width:100%;height:100%;border:none;").setAttribute("max", 100).appendTo(progressBody);
		progressText = otlCreateElement('span').setAttribute("class", "decryptTbl_progressSpans").appendTo(progressBody);
		
		curObj.updateProgress();
		
		proceedBtn = otlCreateElement('div').setAttribute('class','decryptTbl_progressBtn').addContent("innerHTML", "<span>Proceed</span>").appendTo(wrapper);
		
		proceedBtn.onclick = function(){
			
			proceedBtnCb();
			
			// curObj.updateStatus(0);
			
			// setTimeout(function(){curObj.updateStatus(1);} , 1000);
		}
	};
	
	this.updateProgress = function(index){
		
		var percentage, totalDecryptedCount, i, value, txt;
		
		// Calculate the percentage for the total data List for incrementing the progress bar
		percentage = 100 / dataList.length ;
		totalDecryptedCount = 0;
		for(i=0; i<dataList.length; i++)
		{
			if(dataList[i].status == true) totalDecryptedCount++; 
		}
		value = totalDecryptedCount*percentage;
		
		if(value == 0) txt = "0%";
		else txt = `Decrypting packet: ${dataList[index].packetName} Bid Id: ${dataList[index].bidid}`;
		
		progress.value = value;
		progressText.innerHTML = `<span>${txt}<span>`;
	};
	
	this.updateStatus = function(bidid){
		
		for(var i=0; i<dataList.length; i++) 
		{
			if(dataList[i].bidid == bidid)
			{
				statusCell[i].innerHTML = "Success";
				dataList[i].status = true;
				
				curObj.updateProgress(i);
				break;
			}
		}
	};
	
	this.reset = function(){
		
		for(var i=0; i<dataList.length; i++) 
		{
			statusCell[i].innerHTML = "--";
			dataList[i].status = false;
		}
		curObj.updateProgress();
	};
}

function epRegisterEncCert(){
	
	const tableHeader = {commonName:"Certificate", issuerName:"Issued By", type:"Type", expiryDate:"Expiry Date"};
	
	var curObj = this, dataList = [], selectedIndex;
	
	this.create = function(container, data, onBtn){
		
		dataList = data;
		
		container["innerHTML"] = "";
		container.setAttribute("class", "decryptTbl_otl_container");
		container.style.cssText +="background: white;font-size: 11px;";
		
		otlCreateElement('div').addContent("innerHTML", "DSC Enrollment").style("font-weight:bold;text-indent:3px;color:white;background:#5fa7bf;padding: 3px 0;").appendTo(container);
		
		curObj.createTable(container); // create table
		curObj.renderData(); // fill data in table
		curObj.createBtnContainer(container, onBtn); // Create progress bar and progress button
	};
	
	this.createTable = function(container){
		
		var tableContainer, key, column, width, cell;
		
		tableContainer = otlCreateElement('div').setAttribute('class','decryptTbl_otl_contentWrap').style("height: calc(100% - 50px);").appendTo(container);

		for(key in tableHeader)
		{
			// Creating file type column
			column =  otlCreateElement('div').setAttribute('class','decryptTbl_otl_column').appendTo(tableContainer);
			column.style.width = "25%";
			
			cell = otlCreateElement('div').setAttribute('class','decryptTbl_fileTypeGrids').style("text-align:left;text-indent:3px;").addContent('innerHTML',tableHeader[key]).appendTo(column);
			
			if(key == "expiryDate") 
			{
				// Overall container has border so the last cell doesn't need border
				cell.style.borderRight = "none";
			}
		}
	};
	
	this.selectColumn = function(){
		
		var column, i, j;
		column = document.getElementsByClassName("decryptTbl_otl_column");
		
		for(i=0; i<column.length; i++)
		{
			for(j=0; j<column[i].childNodes.length; j++)
			{
				if(j == (selectedIndex + 1)) // Plus one to skip header
				{
					column[i].childNodes[j].style.background = "#daf4fd";
				}
				else 
				{
					column[i].childNodes[j].style.background = "none";
				}
			}
		}
	};
	
	this.renderData = function(){
		
		var column, columnIndex = 0, cell, cellData = "";
		
		column = document.getElementsByClassName("decryptTbl_otl_column");
		
		for(var i=0; i<dataList.length; i++)
		{
			
			(function(index){
				
				// console.log(dataList[index]);
				for(key in tableHeader)
				{
					cellData = dataList[index][key];
					
					cell = otlCreateElement('div').setAttribute('class','decryptTbl_fileTypeGrids').style('text-align:left;text-indent:3px;cursor:pointer;').addContent('innerHTML',cellData).addContent('title',cellData).appendTo(column[columnIndex]);
					columnIndex++;
					
					if(key == "expiryDate") 
					{
						// Overall container has border so the last cell doesn't need border
						cell.style.borderRight = "none";
					}
					
					cell.onclick = function(){
						
						selectedIndex = index;
						
						curObj.selectColumn();
						// alert(dataList[index].commonName);
					}
				}
				columnIndex = 0;
			
			})(i)
		}
	};
	
	this.createBtnContainer = function(container, onBtnCb){
		
		var wrapper, progressBody, proceedBtn;
		
		wrapper = otlCreateElement('div').setAttribute('class','decryptTbl_progressWrapper').style("justify-content:center;height: 30px;").appendTo(container);
		
		proceedBtn = otlCreateElement('div').setAttribute('class','decryptTbl_progressBtn').style("width: auto;padding: 0px 15px;height:20px;").addContent("innerHTML", "<span>Ok</span>").appendTo(wrapper);
		
		proceedBtn.onclick = function(){
			
			onBtnCb((selectedIndex != undefined)?dataList[selectedIndex].certificate:undefined);
		}
	};
}

function epAuctionSubmit()
{
	var curObj= this, container, txtBox, pattern;
	
	this.create = function(con, imageURLS, submitCb, errorCb){
		
		container = con;
		container.classList.add('otl_uploadContainer');
		container.style.cssText+="display: flex;justify-content: center;align-items: center;";
		
		txtBox = otlCreateElement('input').setAttribute('type','text').setAttribute('class','otl_uploadTxtBox').style("outline:none;height: 20;width: 125;margin-right: 12px;").setAttribute("autofocus", true).appendTo(container);
		
		var submitBtn = otlCreateElement('input').setAttribute('type','button').setAttribute('class','otl_uploadSubmit').style('background-image:url('+imageURLS.sign+')').setAttribute('title','Sign').appendTo(container);
		submitBtn.onclick = function(){
			
			console.log(txtBox.value);
			pattern =  /^(?:[1-9]\d*|0)$/;
			
			if(txtBox.value.length == 0)
			{
				xsg2cpopup.showError("Please enter the value.");
				return;
			}
			else if(pattern.test(txtBox.value) == false || parseInt(txtBox.value) == 0)
			{
				xsg2cpopup.showError("Please enter valid numeric value.");
				return;
			}
			else if(txtBox.value.length > 15)
			{
				xsg2cpopup.showError("Please enter Auction value less than or equal to fifteen digits.");
				return;
			}
			
			xsg2cpopup.auctionValueInWords(txtBox.value, function(yes){
				
				if(yes == true) submitCb(txtBox.value);
			});
		};
	}
	
	this.clear = function(){
		
		txtBox.value = '';
		console.log('cleared');
	}
}

function epAuctionDecimalSubmit()
{
	var curObj= this, container, txtBox, pattern;
	
	this.create = function(con, imageURLS, allowedDecimal, submitCb, errorCb){
		
		container = con;
		container.classList.add('otl_uploadContainer');
		container.style.cssText+="display: flex;justify-content: center;align-items: center;";
		
		txtBox = otlCreateElement('input').setAttribute('type','text').setAttribute('class','otl_uploadTxtBox').style("outline:none;height: 20;width: 125;margin-right: 12px;").setAttribute("autofocus", true).appendTo(container);
		
		var submitBtn = otlCreateElement('input').setAttribute('type','button').setAttribute('class','otl_uploadSubmit').style('background-image:url('+imageURLS.sign+')').setAttribute('title','Sign').appendTo(container);
		submitBtn.onclick = function(){
			
			pattern =  /^(0|[1-9]\d*)(\.\d+)?$/;
			
			if(txtBox.value.length == 0)
			{
				xsg2cpopup.showError("Please enter the value.");
				return;
			}
			else if(pattern.test(txtBox.value) == false || parseInt(txtBox.value) == 0)
			{
				xsg2cpopup.showError("Please enter valid numeric value.");
				return;
			}
			
			// Add 2 decimal point by default if the entered number is not in decimal
			if(txtBox.value.indexOf(".") === -1) txtBox.value = txtBox.value+".00";
			
			if(txtBox.value.length > 18)
			{
				xsg2cpopup.showError("Please enter Auction value less than or equal to fifteen digits.");
				return;
			}
			else {
				
				var decimal = txtBox.value.slice(txtBox.value.lastIndexOf(".")+1);
				
				if(decimal.length !== parseInt(allowedDecimal)) {
					
					xsg2cpopup.showError("Auction Value should be rounded to "+allowedDecimal+" decimal places.");
					return;
				}
			}
			
			xsg2cpopup.auctionDecimalValueInWords(txtBox.value, function(yes){
				
				if(yes == true) submitCb(txtBox.value);
			});
		};
	}
	
	this.clear = function(){
		
		txtBox.value = '';
		console.log('cleared');
	}
}

function $(id){return document.getElementById(id);}

function byteToKB(size)
{
	return Math.floor(size/1024);
}

function containerResize(parentElem, fileTypeTb, fileDataTb)
{
	var containerHeight = parentElem.offsetHeight;
	var div = document.getElementsByClassName('otl_containerResizer')[0];
	div.style.height = (containerHeight -5)+'px';
	fileTypeTb.style.position = 'relative';
	setListeners(div,parentElem);
	
	function setListeners(div,parentElem) 
	{
		var  startPageX, nxtGrid, eachGridWidth, nxtGridWidth, containerWidth, diffX;
		
		div.addEventListener('mousedown', function(e) { 
		
			containerWidth = parentElem.offsetWidth;
			fileTypeTb = e.target.previousElementSibling;
			nxtGrid = e.target.nextElementSibling;
			startPageX = e.pageX;
					 
			eachGridWidth = fileTypeTb.offsetWidth;
			nxtGridWidth = nxtGrid.offsetWidth;
			if(parentElem.getAttribute('headerResized')=='true')
			{
				for(var i=0; i<fileTypeTb.children.length;i++)
				{
					fileTypeTb.children[i].style.width = (fileTypeTb.children[i].offsetWidth/fileTypeTb.offsetWidth)*100 +'%';
				}
				for(var i=0; i<fileDataTb.children.length;i++)
				{
					fileDataTb.children[i].style.width = (fileDataTb.children[i].offsetWidth/fileDataTb.offsetWidth)*100+'%';
				}
			}
			
			parentElem.parentElement.addEventListener('mousemove', containerMouseMove);

			parentElem.parentElement.addEventListener('mouseup', containerRemoveEvent);
			
			parentElem.parentElement.addEventListener('mouseleave', containerRemoveEvent);
				
			function containerRemoveEvent()
			{
				fileTypeTb = undefined;
				nxtGrid = undefined;
				startPageX = undefined;
				nxtGridWidth = undefined;
				eachGridWidth = undefined;
				
				parentElem.parentElement.removeEventListener('mousemove', containerMouseMove);
				parentElem.parentElement.removeEventListener('mouseup', containerRemoveEvent);
				parentElem.parentElement.removeEventListener('mouseleave', containerRemoveEvent);
			}
			
			function containerMouseMove(ev)
			{
				if (fileTypeTb)
				{
					diffX = ev.pageX - startPageX;
					if (nxtGrid)
						nxtGrid.style.width = (nxtGridWidth - (diffX)) + 'px';
					fileTypeTb.style.width = (eachGridWidth + diffX) + 'px'; 
				}
			}
		});
	}
}

function tableHeaderResize(table)
{
	for (var i=0;i<table.children.length;i++)
	{
		var div = createDiv(table.children[i].children[0].offsetHeight);
		div.setAttribute('data-otl_index',i);
		table.children[i].children[0].appendChild(div);
		setListeners(div,table);
	}

	function setListeners(div,table)
	{
		var startPageX, curCol, curColWidth, curColWidthDummy, movedColIndex = parseInt(div.getAttribute('data-otl_index')), i, j, diffX, indColDiffX, incrementInd, colToBeResized=0,prevIndColDiffX=0,minWidthAttainedColCount=0;
		
		var remainingIndCol = [];				//data cells of remaining columns
		var remainingIndColWidth = [];			//width of all remaining data cells
		
		div.addEventListener('mousedown', function(e)
		{
			table.parentElement.setAttribute('headerResized',true);
			colToBeResized=0;
			prevIndColDiffX=0;
			minWidthAttainedColCount=0;
			remainingIndCol = [];
			remainingIndColWidth = [];
		
			startPageX = e.pageX;
			curCol = e.target.parentElement.parentElement;
			var startCol = curCol;
						
			while(startCol.nextElementSibling)
			{
				remainingIndCol.push(startCol.nextElementSibling);
				
				remainingIndColWidth.push(Math.ceil(startCol.nextElementSibling.offsetWidth));
				
				startCol = startCol.nextElementSibling;
																							  
	 
			}
			curColWidth = curColWidthDummy = curCol.offsetWidth;
			
			table.parentElement.addEventListener('mousemove', mouseMoveFn);

			table.parentElement.addEventListener('mouseup', removeHeaderResizeEvts);
			
			table.parentElement.addEventListener('mouseleave', removeHeaderResizeEvts);
			
			function mouseMoveFn(ev)
			{
				if(curCol)
				{
					diffX = ev.pageX - startPageX;
					incrementInd = 0;
					colToBeResized=0;
					minWidthAttainedColCount=0;
					
					while(incrementInd < remainingIndCol.length)
					{
						if((curColWidth + diffX) >= 10 && (remainingIndColWidth[incrementInd] >= 10))
						{
							colToBeResized++;		
							indColDiffX = Math.floor(diffX/colToBeResized);
							
							if(incrementInd == remainingIndCol.length-1 && colToBeResized!=0 && indColDiffX!=0)
							{
								curColWidthDummy = curColWidth;
								
								for(j=0;j<remainingIndCol.length;j++)
								{
									if(remainingIndColWidth[j] - (indColDiffX) >=10)
									{
										remainingIndCol[j].style.width = remainingIndColWidth[j] - (indColDiffX) +'px';
										
										curColWidthDummy += indColDiffX;									
									}
									else
									{
										remainingIndCol[j].style.width = '10px';
										minWidthAttainedColCount++;
									}
									
									if(j == remainingIndCol.length-1 && minWidthAttainedColCount == remainingIndCol.length)
									{
										curColWidthDummy = (Number.isNaN(parseInt(curCol.style.width)))? curCol.offsetWidth:parseInt(curCol.style.width);
									}
									else if(j == remainingIndCol.length-1 && minWidthAttainedColCount!=0)
									{
										curColWidthDummy = (Number.isNaN(parseInt(curCol.style.width)))? curCol.offsetWidth:parseInt(curCol.style.width);
										
										for(i=0;i<remainingIndCol.length - minWidthAttainedColCount;i++)
										{
											curColWidthDummy += indColDiffX - prevIndColDiffX;
										}
									}
								}
								curCol.style.width = curColWidthDummy + 'px';
							}
						}
						incrementInd++;
					}
					prevIndColDiffX = indColDiffX;
				}
			}
			
			function removeHeaderResizeEvts(e) {
				
				startPageX = undefined;
				diffX = undefined;
				indColDiffX = undefined;
				curCol = undefined;
				startPageX = undefined;
				colToBeResized = undefined;
				prevIndColDiffX = undefined;
				minWidthAttainedColCount = undefined;
				
				curColWidth = undefined;
				curColWidthDummy = undefined;
				remainingIndCol = undefined;
				remainingIndColWidth = undefined;
				
				table.parentElement.removeEventListener('mousemove', mouseMoveFn);
				table.parentElement.removeEventListener('mouseup', removeHeaderResizeEvts);
				table.parentElement.removeEventListener('mouseleave', removeHeaderResizeEvts);
			}
		});

	}

	function createDiv(height)
	{
		var div = document.createElement('div');
		div.style.top = 0;
		div.style.right = 0;
		div.style.width = '5px';
		div.style.position = 'absolute';
		div.style.cursor = 'ew-resize';
		div.style.userSelect = 'none';
		div.style.height = height + 'px';
		return div;
	}

}

function getContentType(fileObj)
{
	var type = fileObj.name.slice(fileObj.name.lastIndexOf('.'))
	return type;
}

function otlCreateElement(type)
{
	var elem = document.createElement(type);
	this.appendTo = function(parent){
		if(parent) parent.appendChild(elem);
		return elem;
	}
	this.setAttribute = function(attName,attValue) // For Setting an attribute
	{
		 elem.setAttribute(attName,attValue);
		return this; 
	}
	this.setEvent = function(ev, callback){
		try{
			elem.attachEvent(ev,callback);
		}
		catch(e){
			elem.addEventListener(ev,callback);
		}
		return this;
	}
	this.style = function(css){
		elem.style.cssText = css;
		return this;
	}
	this.addContent = function(key,value) // For displaying the text.
	{
		elem[key] = value;
		return this;
	}
	return this;
}

function dateToString(ttdate,formatflag)                        // To convert epoch time into normal date format
{
	if((typeof ttdate===undefined) || ttdate=='undefined' || !ttdate) return '-';
    var dt=new Date(ttdate);
	var tempDate='',tempMonth='',tempHour='',tempMin='',tempSec='';
    tempDate = setPrefixZero(dt.getDate());
    tempMonth = setPrefixZero(dt.getMonth()+1);
    tempHour = setPrefixZero(dt.getHours());
    tempMin = setPrefixZero(dt.getMinutes());
    tempSec = setPrefixZero(dt.getSeconds());
 
    if( formatflag )
        var tempDateStr = tempDate +"/"+tempMonth+"/"+dt.getFullYear();
    else
        var tempDateStr = tempDate +"/"+tempMonth+"/"+dt.getFullYear()+"  "+ tempHour + ":" + tempMin + ":" + tempSec ;
    return tempDateStr;
} 

function setPrefixZero(strval)                                  // Used in dataToString function to setPrefixZero
{
    return ((strval < 10) ? '0'+ strval : strval);
}

function validateFiles(index, files, filesBuf, cb)
{
	if(index > Object.keys(files).length)
	{
		cb(true, filesBuf, undefined);
		return;
	}
	
	var file = files[index];
	if(file == undefined)
	{
		filesBuf = undefined;
		console.log("WARNING: File object is undefined");
		cb(false, index, "Please select a file.");
	}
	else
	{
		xsg2cpopup.showLoader("Loading the file '"+file.name+"' ...");
		var f = new FileReader();
		f.onloadend = function(e) {	//TODO: read files in Worker?
			
			if(e.target.result == null)
			{
				console.log(e.target.error);
				filesBuf = undefined;
				cb(false, index, fileSelectionError(file.name));
				return;
			}
			else
			{
				filesBuf.push({name:file.name,buf:e.target.result});
				validateFiles(++index, files, filesBuf, cb);
			}
		};
		f.readAsArrayBuffer(file);
	}
}

function fileSelectionError(fileName)
{
			
	return `<div class = "xsg2cboldtext"  style = "padding: 0 15px;font-weight: bold;" >The file '${fileName}' could not be selected.</div>
<div class = "xsg2csemiboldtext" style = "margin-top: 20px;font-size: 13px;" >This might be due the following reasons:</div>
<ul class = 'xsg2c-ul' style = "font-size: 13px;" >
	<li><b>File modified/removed/renamed after selection.</b> Please select the file again</li>
	<li><b>Insufficient permissions.</b> Please copy the file to a different path and select the file from the new path.</li>
</ul>`;
}
