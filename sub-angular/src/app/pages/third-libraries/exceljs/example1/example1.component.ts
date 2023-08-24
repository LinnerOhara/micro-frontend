import { Component } from '@angular/core';

declare const ExcelJS: any

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component {
  ExcelJS: any

  constructor() {
    const url = 'https://unpkg.com/exceljs/dist/exceljs.min.js'
    const scripts = document.querySelectorAll('script')
    const hasExceljs = Array.from(scripts).some(item => {
      return item.src.includes(url)
    })
    if (hasExceljs) {
      this.ExcelJS = ExcelJS
    } else {
      const script = document.createElement('script')

      script.src = 'https://unpkg.com/exceljs/dist/exceljs.min.js'
      script.onload = () => {
        this.ExcelJS = ExcelJS
        console.log('加载完成', ExcelJS)
      }
      script.onerror = () => {
        console.log('加载ExcelJS失败，可能会导致导出异常')
      }

      document.head.appendChild(script)
    }
  }

  async onFileSelected(event: any) {
    const workbook: any = await this.readExcelFile(event.target.files[0])
    this.xlsxHandle(workbook)
  }

  private async xlsxHandle(workbook: any) {
    const worksheet = workbook.getWorksheet(1)
    const dataToInsert = [
      [3, 'Sam', new Date()],
      [4, 'Sam', new Date()]
    ]
    worksheet.spliceRows(1, 0, ...dataToInsert)

    const newworkbook = new this.ExcelJS.Workbook()
    const newWorkSheet = newworkbook.addWorksheet('sheet')

    this.copyWorkSheet(worksheet, newWorkSheet)
    newWorkSheet.views = [
      { state: 'frozen', ySplit: dataToInsert.length + 1 }
    ]

    const buffer = await newworkbook.xlsx.writeBuffer()

    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, 'example.xlsx')
  }

  private copyWorkSheet(sourceSheet: any, targetSheet: any) {
    // 复制行高和列宽
    sourceSheet.eachRow((sourceRow: any, rowNumber: any) => {
      const targetRow = targetSheet.getRow(rowNumber);
      targetRow.height = sourceRow.height;
    });

    sourceSheet.columns.forEach((sourceColumn: any, colNumber: any) => {
      const targetColumn = targetSheet.getColumn(colNumber + 1);
      targetColumn.width = sourceColumn.width;
    });

    // 遍历源工作表的每一行
    sourceSheet.eachRow((row: any, rowNumber: any) => {
      // 读取行中的每个单元格数据
      row.eachCell((cell: any, colNumber: any) => {
        // 获取源单元格的值、样式和其他属性
        const cellValue = cell.value;
        const cellStyle = cell.style;
        const cellProtection = cell.protection;
        const cellComment = cell.comment;

        // 获取目标单元格并设置值、样式和其他属性
        const targetCell = targetSheet.getCell(rowNumber, colNumber);
        targetCell.value = cellValue;
        targetCell.style = cellStyle;
        targetCell.protection = cellProtection;
        targetCell.comment = cellComment;

        // 复制超链接
        if (cell.hasHyperlink) {
          const sourceHyperlink = cell.hyperlink;
          targetCell.addHyperlink({
            hyperlink: sourceHyperlink,
            text: sourceHyperlink.tooltip || sourceHyperlink.address,
          });
        }
      });
    });
  }

  private readExcelFile(blob: any) {
    return new Promise(async (resolve) => {
      const workbook = new this.ExcelJS.Workbook()
      // workbook.addWorksheet('测试测试')
      await workbook.xlsx.load(blob)

      resolve(workbook)
    })
  }

  private downloadFile(url: string, filename: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  }
}
