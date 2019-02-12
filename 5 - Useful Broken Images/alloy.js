
var arr1 = [
  '1:S:Walmart Distribution Center #100', //distkey newparent, newprev
  '2:O:ORD1230',// not distkey, not equal to parent, new parent = prev, new prev
  '3:P:Honey Dishwasher Soap 1L,200 pieces', // not distkey, not equal to parent, new parent = prev, new prev 
  '4:P:Blueberry Dishwasher Soap 1L,100 pieces', // not distkey, not equal to parent, equal to prev, new prev keep parent same
  '5:O:ORD4590',// not distkey, equal to parent, new parent, new prev
  '6:P:Honey Dishwasher Soap 1L,120 pieces',// not dist, not equal to parent, new parent = prev, new prev
  '7:S:Walmart Distribution Center #200',// dist, new parent, new prev
  '8:O:ORD3405',
  '9:P:Honey Dishwasher Soap 1L,150 pieces',
  '10:P:Blueberry Dishwasher Soap 1L,210 pieces',
];

var arr2 = [
  '1:S:Walmart Distribution Center #100',
  '2:T:FEDEX TRUCK #120370',
  '3:O:ORD1230',
  '4:I:Honey Dishwasher Soap 1L',
  '5:P:20000 pieces',
  '6:P:15000 pieces',
  '7:S:Walmart Distribution Center #200',
  '8:T:FEDEX TRUCK #23403',
  '9:O:ORD2435',
  '10:I:Blueberry Dishwasher Soap 1L',
  '11:P:10000 pieces',
  '12:P:20000 pieces',
];
// Example 2


const result = [];

class ShipmentInfoLine {
  constructor(lineNumber, parentLineNumber, levelType, description) {
    this.lineNumber = lineNumber;
    this.parentLineNumber = parentLineNumber;
    this.levelType = levelType;
    this.description = description;
  }
}

// lines: Array<string> 
// return: Array<ShipmentInfoLine>
// [
function parse(lines) {
  
  const distKey = lines[0].split(':')[1];
  let prevLine = parentLine = null;

  return lines.map((line) => {
    const splitArr = line.split(':');
    const currKey = splitArr[1];

    if (currKey === distKey) {
      return parentLine = prevLine = new ShipmentInfoLine(splitArr[0], null, currKey, splitArr[2]);
    } else if (currKey === parentLine.levelType) {
      return parentLine = prevLine = new ShipmentInfoLine(splitArr[0], parentLine.parentLineNumber, currKey, splitArr[2]);
    } else if (currKey !== prevLine.levelType) {
      return parentLine = prevLine = new ShipmentInfoLine(splitArr[0], parentLine.lineNumber, currKey, splitArr[2]);
    } else {
      return prevLine = new ShipmentInfoLine(splitArr[0], parentLine.lineNumber, currKey, splitArr[2]);
    }
  });
}

console.table(parse(arr1));