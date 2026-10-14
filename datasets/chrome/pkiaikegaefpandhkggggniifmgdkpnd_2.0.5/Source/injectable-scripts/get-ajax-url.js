const getAjaxURL = () => {
  const ajaUrlElement = document.createElement('label');
  ajaUrlElement.style.display = 'none';
  ajaUrlElement.innerText = ajaxurl;
  ajaUrlElement.id = 'ajaxurl-element';
  document.body.appendChild(ajaUrlElement);
}

getAjaxURL();