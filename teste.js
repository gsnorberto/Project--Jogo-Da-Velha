let possibility = [
    // horizontal
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    // vertical
    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    //transversal
    'a1,b2,c3',
    'a3,b2,c1'
]

let pArray = [];

for(let i in possibility){
    pArray = possibility[i].split(','); //['a1,a2,a3'][]..
    console.log(pArray);
}

