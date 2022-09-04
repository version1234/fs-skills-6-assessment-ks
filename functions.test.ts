const {shuffleArray} = require('./utils')
const {bots, playerRecord} = require('./data')

describe('shuffleArray should', () => {
    // CODE HERE
    const  funcArray = shuffleArray(bots);
    test("verify Array count ",() =>{
        console.log(funcArray.length)
        expect(funcArray).toHaveLength( bots.length);
    });
   
    test("verify Array or not ",() =>{
        const  funcArray = shuffleArray(bots);
        console.log(funcArray)
        expect.arrayContaining(funcArray);
    });

    test( "verify all data contains",() =>{
        expect(funcArray).toEqual(expect.arrayContaining(bots));
    });

})