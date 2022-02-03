import { Worker } from '../core/models/worker';

export class PDFModel {
  constructor(worker: Worker, pic) {


return {
  content:[
    {text: 'Tables', style: 'header'},
		'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
		{text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
    {
      alignment: 'justify',
      columns: [
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [120, '*',],
            body: [
              [{ text: 'Datos:',     style: 'subheader', colSpan: 2 }, {}],
              ['Primer Aombre', ': ' + worker.firstName],
              ['Segundo Nombre', ': ' + worker.secondName],
              ['Primer Apellido', ': ' + worker.firstLastname],
              ['Segundo Apellido', ': ' + worker.secondLastname],
              ['Cedula', ': ' + worker.DNI],
              ['Correo', { text: ': ' + worker.email }],
            ]
          },
          layout: 'noBorders'
        },

        {
          image: pic,
          width: 200,

        }


      ],
    },




  ],
  info: {
    title: worker.firstName + '_' + worker.firstLastname,
    author: 'ProlixApp',
    subject: 'RESUMEN',
    keywords: 'RESUMEN,  RESUMEN ONLINE'
  },
  styles: {
    header: {
      fontSize: 18,
      bold: true
    },
    subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5]
    },
    bigger: {
      fontSize: 15,
      italics: true
    },
    tableExample: {
      margin: [0, 5, 0, 15]
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black'
    },
    headersBold:{
      bold:true
    } ,
  },
  defaultStyle: {
    columnGap: 20,
  }
}



  }

}
