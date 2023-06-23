const pdfMake = require("pdfmake");
const vfsFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = vfsFonts.pdfMake.vfs;

function generatePDF() {
  var resiData = {
    customerName: "John Doe",
    orderNumber: "12345",
    date: new Date().toLocaleDateString(),
    totalAmount: "$100",
  };

  var docDefinition = {
    content: [
      { text: "Resi Pembayaran", style: "header" },
      { text: "====================", style: "subheader" },
      { text: `Nomor Pesanan: ${resiData.orderNumber}` },
      { text: `Tanggal: ${resiData.date}` },
      { text: `Pelanggan: ${resiData.customerName}` },
      { text: `Total Pembayaran: ${resiData.totalAmount}` },
      { text: "====================", style: "subheader" },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
    },
  };

  var pdfDoc = pdfMake.createPdf(docDefinition);
  pdfDoc.open();
}

module.exports = generatePDF;
