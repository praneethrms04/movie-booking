/** 
 * 3. Find the average of largest and smallest numbers in an unsorted integer array?
Eg. 
Input Case 1:  
input: [1, 4, 3, 2]
output:  2.5
solution : average = (1+4)/2 =>5/2 => 2.5

input: [1, 4, 3, 4]
output:  3
solution : average = (1+4 +4)/3 =>9/3 => 3
*/

const findAvg = (arr)=> {
    arr.sort(function(a, b){return a-b});
    let avgarr = []
    var smallest = avgarr.push(arr[0]);
    var largest = avgarr.push(arr[arr.length - 1]);
    console.log(avgarr)
    var avg = (smallest + largest) / 2;
    return avg;
}

const findAverage =(arr)=>{
    let min = arr[0];
    let max = arr[0];
    let equal = arr[0];
    for(let i=0; i<arr.length; i++){
        if(max < arr[i]){
            max = arr[i]
        }else if(min > arr[i]){
            min = arr[i]
        }else if(equal === arr[i]){
            equal = arr[i]
        }
    }
    console.log(min,max,equal);
}
const arr = [1,2,3,4];
findAverage(arr)
findAvg(arr);



