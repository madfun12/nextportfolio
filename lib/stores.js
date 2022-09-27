// bring in sample data
import flowerData from '../data/flowerData.json'


//goes through each object in the flowerData array and returns the store name as a 
//lowercase string with no spaces so that we know the possible pages
export function getAllStoreIds(){
    return flowerData.map((fileName) => {
        return {
            params: {
            id: fileName.store.replace(/\s+/g, '').toLowerCase(),
            },
        };
        });
}

//goes through the flowerdata array and returns the id(store name with no spaces)
//and then the corresponding object as a whole for us to bring in data to match the page

export function getStoreData(id) {
    let targetData
    flowerData.map(item => {
      if(id === item.store.replace(/\s+/g, '').toLowerCase()){
        targetData = item
      }
    })
    return {
      id
      ,
      ...targetData
    };
  }