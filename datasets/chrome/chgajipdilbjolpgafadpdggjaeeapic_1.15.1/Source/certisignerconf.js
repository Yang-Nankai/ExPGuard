var classCertisignerExtended = false;
var divCertisigner = document.querySelector('div#certisigner-enabled');
if (divCertisigner) {
    // CLASS ABAIXO OBRIGATORIA PARA EXTENDED
    var divCertisignerClass = (divCertisigner != undefined) ? divCertisigner.className : undefined;
    if (divCertisignerClass) {
        classCertisignerExtended = divCertisignerClass.indexOf("certisigner-extended") == 0;
    }
} else {
    console.log('A div certisigner-enabled nao foi encontrada.');
    divCertisigner = false;
}
