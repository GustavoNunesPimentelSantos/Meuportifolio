//Aqui eu crio uma matriz e reduzo
function ElementMerger(arr) {

  while (arr.length > 1) {
    let newArr = [];

    for (let i=0; i < arr.length - 1; i++) {
      newArr.push(Math.abs(arr[i] - arr[i + 1]));
    } 
    arr = newArr;
  }

  return arr[0]; 

}
   
// keep this function call here 
console.log(ElementMerger((readline())));
