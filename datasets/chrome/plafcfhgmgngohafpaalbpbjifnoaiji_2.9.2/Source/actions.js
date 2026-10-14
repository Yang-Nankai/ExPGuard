var w, i, img, t;
const _ACTIONSERVICE = "G2C";

const offerElem = document.getElementById("offer");
const d = new Date();
if(d.getTime() < 1727740800000) {
	offerElem.style.display = "block"; 
	document.body.style.height = "580px";
	offerElem.onclick = () => {
		XSG2C.setInfo(_ACTIONSERVICE, undefined, undefined, "action_page", "Offer");
		window.open("https://eprocure.gov.in/cppp/", "_blank");
	};
}

const con = document.getElementById("supported_portals");

const arr = [
	{
		name:"IREPS",
		img:"ireps.png",
		title:"Indian Railways E-Procurement System",
		link:"https://www.ireps.gov.in",
		new:true
	},
	{
		name:"IRCEP",
		img:"cris.png",
		title:"Indian Railways Civil Engineering Portal",
		link:"https://www.ircep.gov.in",
	},
	{
		name:"DGFT",
		img:"dgft.png",
		title:"Directorate General of Foreign Trade",
		link:"https://www.dgft.gov.in/CP/",
	},
	{
		name:"COO DGFT",
		img:"indian.png",
		title:"Certificates of Origin - Directorate General of Foreign Trade",
		link:"https://coo.dgft.gov.in/",
	},
	{
		name:"ICEGATE",
		img:"icegate.png",
		title:"Indian Customs National Trade Portal",
		link:"https://foservices.icegate.gov.in/#/login",
	},
	{
		name:"CPPP",
		img:"gem.png",
		title:"GeM - Central Public Procurement Portal",
		link:"https://eprocure.gov.in/cppp/",
	},
	{
		name:"EPFO",
		img:"epfo.png",
		title:"Employees Provident Fund Organisation",
		link:"https://unifiedportal-emp.epfindia.gov.in/epfo/",
	},
	{
		name:"TDS",
		img:"tds.png",
		title:"TDS Traces",
		link:"https://www.tdscpc.gov.in/app/login.xhtml",
	},
	{
		name:"GST",
		img:"gst.png",
		title:"Goods & Services Tax",
		link:"https://services.gst.gov.in/services/login",
	},
	{
		name:"MCA",
		img:"mca.png",
		title:"Ministry of Corporate Affairs",
		link:"https://www.mca.gov.in/content/mca/global/en/foportal/fologin.html",
	},
	{
		name:"IT",
		img:"itr.png",
		title:"Income Tax Department",
		link:"https://eportal.incometax.gov.in/iec/foservices/#/login",
	},
];

arr.forEach((a) => {
	
	w = document.createElement("div");
	w.setAttribute("class", "grid_wrapper");
	w.title = a.title;
	con.appendChild(w);
	
	i = document.createElement("div");
	i.setAttribute("class", "grid_img");
	w.appendChild(i);
	img = document.createElement("img");
	img.src = "./images/portals/"+a.img;
	i.setAttribute("alt", a.name);
	i.appendChild(img);
	
	t = document.createElement("div");
	t.setAttribute("class", "grid_txt");
	t.innerText = a.name;
	w.appendChild(t);
	
	if(a.new) {
		n = document.createElement("img");
		n.setAttribute("class", "grid_new_img");
		n.src = "./images/new.png";
		w.appendChild(n);
	}
	
	w.onclick = () => {
		XSG2C.setInfo(_ACTIONSERVICE, undefined, undefined, "action_page", a.name);
		window.open(a.link, "_blank");
	};
});

XSG2C.setInfo(_ACTIONSERVICE, undefined, undefined, "action_page", "Opened");