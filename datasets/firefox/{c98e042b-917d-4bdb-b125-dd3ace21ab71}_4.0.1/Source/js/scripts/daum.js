"use strict";
/***********************************************************
Daum
***********************************************************/
scripts["daum"]={
    config:{
        inboxOnly:true,
        showFolders:true,
        showSnippets:true,
        includeSpam:true,

        cookies:[{domain:".daum.net",name:"TS"}],

    iconURL: "https://mail.daum.net/favicon_daum.ico",
    },

    init:function(){
        this.infoURL="https://cmail.daum.net/v2/setting/basic";
        this.dataURL="https://cmail.daum.net/v2/folders?resultType=list";
        this.dataURL2="https://cmail.daum.net/v2/mails?offset=0&limit=30&folderId=INBOX&labelIds=";
        this.viewURL = "https://mail.daum.net";
        this.baseURL = "https://mail.daum.net/top";
    },

    getUser:function(aData){
        let fnd=aData.match(/"accounts":\[.+?"email":"(\S+?)"/)
        if(fnd){
          return fnd[1];
        }
        return null;
    },

    getInfo:function(aData){
        return true;
    },

    getData:function(aData){
        this.count=-1;
        let folders=[];
        let obj=[];
        let fnd;
        try{
            fnd=JSON.parse(aData);
        }catch(e){};
        if(fnd){
            let num=0;
            for(let i=0;i<fnd.length;i++){
              let o=fnd[i];
              if(o.type=="basic")continue;
              if(o.id=="SENT")continue;
              if(o.id=="DRAFT")continue;
              if(o.id=="SPAM"){
                  this.spam=o.mailsUnread;
                  continue;
              }
              if(o.id=="TRASH")continue;
              let n=o.mailsUnread;
              if(this.inboxOnly){
                if(o.id=="INBOX")num=n;
              }else num+=n;
              if(n>0&&o.id!="INBOX"){
                    folders.push({ id: o.id, title: o.name, count: n, url: this.baseURL + "/" + o.id });
              }
            }
            this.count=num;
        }
        if (this.spam > 0) folders.push({ id: "Spam", count: this.spam, url: this.baseURL + "/SPAM" })

        let rs={count:this.count,user:this.user,folders:folders,msg:obj,spam:this.spam};
        return rs;
    },

    getData2:function(aData,rs){
        let obj=rs.msg;
        let fnd;
        try{
            fnd=JSON.parse(aData);
        }catch(e){};
        if(!fnd)return false;
        function parseTime(t){
            let s=t.substring(0,4);
            s+="-"+t.substring(4,6);
            s+="-"+t.substring(6,8);
            s+=" "+t.substring(8,10);
            s+=":"+t.substring(10,12);
            s+=":"+t.substring(12,14);
            return new Date(s).getTime();
        }
        
        let o=fnd.mails;
        for(let i=0,j=0;i<o.length;i++){
            let m=o[i];            
            let d={};
            if(m.labelIds.indexOf("UNREAD")==-1)continue;
            j++;            
            d.mid=m.id;
            d.email=m.from.addr;
            d.name=m.from.name;
            d.title=m.subject;
            d.time=parseTime(m.recvTime);
            d.url = this.baseURL + "/INBOX/" + d.mid;
            
            rs.action={};
            rs.action["read"]=this.getActionUrl("removeLabelIds=%5B%22UNREAD%22%5D");
            rs.action["spam"]=this.getActionUrl("moveToFolderId=SPAM");
            rs.action["del"]=this.getActionUrl("moveToFolderId=TRASH");

            obj.push(d);
            if(obj.length>=MAX_MSG)break;
        }
        return true;
    },
    getActionUrl:function(act){
        let rs=[];
        rs[0]="https://cmail.daum.net/v2/mails/modify";
        rs[1]=["mailIds=%5B","%22","%s","%22,","","%22%5D&"+act];
        return rs;
    }    
}